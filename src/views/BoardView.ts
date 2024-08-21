import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Graphics, Point, Rectangle, Sprite, Texture } from 'pixi.js';
import { lp } from '../Utils';
import { BKG_IMAGE_L } from '../base64/images/bkgL';
import { BKG_IMAGE_P } from '../base64/images/bkgP';
import { POWERED_BY } from '../base64/images/poweredBy';
import { GAME_CONFIG } from '../configs/constants';
import { BoardEvents, ForegroundEvents } from '../events/MainEvents';
import { BoardModelEvents, BoxModelEvents, GameModelEvents } from '../events/ModelEvents';
import { BoxModel } from '../models/BoxModel';
import { GameState, IdleState } from '../models/GameModel';
import { ItemModel } from '../models/ItemModel';
import { BoxView } from './BoxView';
import { DropDownAreaInfo } from './DropDownAreaInfo';
import { ItemView } from './ItemView';
import { TimerView } from './TimerView';

const BOUNDS = {
    landscape: { width: 1280, height: 660 },
    portrait: { width: 800, height: 1280 },
};

const BOXES_POSITIONS = {
    landscape: [
        {
            x: 250,
            y: 230,
        },
        {
            x: 510,
            y: 230,
        },
        {
            x: 770,
            y: 230,
        },
        {
            x: 250,
            y: 390,
        },
        {
            x: 510,
            y: 390,
        },
        {
            x: 770,
            y: 390,
        },
        {
            x: 250,
            y: 550,
        },
        {
            x: 510,
            y: 550,
        },
        {
            x: 770,
            y: 550,
        },
    ],
    portrait: [
        {
            x: 10,
            y: 500,
        },
        {
            x: 270,
            y: 500,
        },
        {
            x: 530,
            y: 500,
        },
        {
            x: 10,
            y: 660,
        },
        {
            x: 270,
            y: 660,
        },
        {
            x: 530,
            y: 660,
        },
        {
            x: 10,
            y: 820,
        },
        {
            x: 270,
            y: 820,
        },
        {
            x: 530,
            y: 820,
        },
    ],
};

export class BoardView extends Container {
    private items: ItemView[] = [];
    private boxes: BoxView[] = [];
    private canDrag = true;
    private dragPoint: Point;
    private dragStarted = false;

    private bkg: Sprite;
    private poweredBy: Sprite;

    private draggingItem: ItemView | null;

    private finalPositions: DropDownAreaInfo[] = [];

    private timer: TimerView;

    private addingElementsQueue: { box: BoxView; elements: ItemModel[]; index: number }[] = [];

    private whiteBlocker: Graphics;
    private blackBlocker: Graphics;

    constructor() {
        super();

        lego.event
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
            .on(BoardModelEvents.BoxesUpdate, this.onBoxesUpdate, this)
            .on(BoxModelEvents.ElementsUpdate, this.onBoxElementsUpdate, this)
            .on(GameModelEvents.GameTimeUpdate, this.onTimerUpdate, this)
            .on(GameModelEvents.IdleStateUpdate, this.onGameIdleStateUpdate, this);
        this.build();
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        const { width, height } = lp(BOUNDS.landscape, BOUNDS.portrait);
        return new Rectangle(0, 0, width, height);
    }

    public rebuild(): void {
        this.bkg.texture = Texture.from(lp(BKG_IMAGE_L, BKG_IMAGE_P));
        this.repositionBoxes();
        this.updateDropAreas();
        this.updateTimerPosition();
        this.updateBlockers();
    }

    public destroyElements(): void {
        this.items.forEach((item) => item.destroy());
        this.boxes.forEach((box) => box.destroy());
        this.items = [];
        this.boxes = [];
        this.finalPositions = [];
        this.addingElementsQueue = [];
        this.draggingItem = null;
        this.timer?.destroy();
        // @ts-ignore
        this.timer = null;
    }

    private build(): void {
        this.buildBkg();
        this.buildPoweredBy()
        !GAME_CONFIG.FREE && this.buildTimer();

        const { width, height } = lp(BOUNDS.landscape, BOUNDS.portrait);
        this.buildWhiteBlocker({ width, height });
        this.buildBlackBlocker({ width, height });
    }

    private buildWhiteBlocker({ width, height }): void {
        this.whiteBlocker = new Graphics();
        this.whiteBlocker.beginFill(0xaeaeae, 1);
        this.whiteBlocker.drawRect(0, 0, width, height);
        this.whiteBlocker.endFill();
        this.whiteBlocker.alpha = 0;
        this.addChild(this.whiteBlocker);
    }

    private buildBlackBlocker({ width, height }): void {
        this.blackBlocker = new Graphics();
        this.blackBlocker.beginFill(0x000000, 1);
        this.blackBlocker.drawRect(0, 0, width, height);
        this.blackBlocker.endFill();
        this.blackBlocker.alpha = 0;
        this.addChild(this.blackBlocker);
    }

    private buildBkg(): void {
        this.bkg = Sprite.from(lp(BKG_IMAGE_L, BKG_IMAGE_P));
        this.addChild(this.bkg);
    }

    private buildPoweredBy(): void {
        this.poweredBy = Sprite.from(POWERED_BY);
        this.poweredBy.anchor.set(0);
        this.poweredBy.position.set(10, 10);
        this.poweredBy.scale.set(0.5);

        this.addChild(this.poweredBy);
    }

    private buildTimer(): void {
        this.timer = new TimerView();
        this.timer.position.set(this.width / 2, lp(60, 260));
        this.addChild(this.timer);
    }

    private onTimerUpdate(time: number): void {
        this.timer?.updateTime(time);
    }

    private onBoxesUpdate(data: BoxModel[]): void {
        const arr = [];
        data.forEach((b) => {
            const box = new BoxView(b.i, b.j, b.uuid);
            const { x, y } = this.getShelfPosition(box);
            // @ts-ignore
            arr.push({ x, y });
            box.position.set(x, y);
            this.boxes.push(box);
            this.addChild(box);
        });

        this.setDropAreas();

        data.forEach((box, j) => {
            box.elements.forEach((element, i) => {
                const dropArea = this.finalPositions[j * 3 + i];
                const item = new ItemView(element);
                item.position.set(dropArea.centerX, dropArea.centerY);
                dropArea.setItem(item);
                item.setArea(dropArea);
                item.setOriginalPosition(dropArea.centerX, dropArea.centerY);
                this.setDragEvents(item);
                this.items.push(item);
            });
        });
        this.items.forEach((item) => this.addChild(item));

        this.readdBlockers();
    }

    private setDragEvents(item: ItemView): void {
        item.eventMode = 'static';
        item.on('pointerdown', (e) => this.onDragStart(e, item));
        item.on('pointerout', this.stopDrag, this);
        item.on('pointerup', this.stopDrag, this);
        item.on('disableDrag', () => (this.canDrag = false));
        item.on('enableDrag', () => (this.canDrag = true));
    }

    private onDragStart(event, item: ItemView): void {
        lego.event.emit(BoardEvents.Click);
        if (!this.canDrag || this.dragStarted) return;
        this.dragStarted = true;
        event.stopPropagation();
        this.draggingItem && this.draggingItem.emptyArea();
        this.draggingItem = item;
        this.draggingItem.startDrag();
        this.dragPoint = event.data.getLocalPosition(item.parent);
        this.dragPoint.x -= item.x;
        this.dragPoint.y -= item.y;
        this.removeChild(this.draggingItem);
        this.addChild(this.draggingItem);
        item.on('pointermove', this.onDragMove, this);
    }

    private stopDrag(): void {
        this.dragStarted = false;
        if (!this.draggingItem) return;
        this.draggingItem.off('pointermove', this.onDragMove, this);

        const dropArea = this.findDropArea();
        this.draggingItem.emptyArea();
        const area = this.draggingItem.area;
        if (dropArea) {
            lego.event.emit(BoardEvents.Drop);
            area?.empty();
            this.draggingItem.emptyArea();
            this.dropItemToArea(dropArea, this.draggingItem);
            this.checkMatches();
        } else {
            this.dropItemToOriginalPosition();
        }

        this.draggingItem = null;

        this.readdBlockers();
    }

    private onDragMove(event): void {
        if (!this.canDrag || !this.draggingItem) return;

        const newPoint = event.data.getLocalPosition(this.draggingItem.parent);
        this.draggingItem.x = newPoint.x - this.dragPoint.x;
        this.draggingItem.y = newPoint.y - this.dragPoint.y;
        lego.event.emit(BoardEvents.Move);
    }

    private setDropAreas(): void {
        this.boxes.forEach((box) => {
            let startingX = box.x + 10;
            for (let i = 0; i < 3; i++) {
                const startX = startingX + 80 * i;
                const startY = box.y - 80;
                const endX = startingX + 80 * i + 80;
                const endY = box.y + 20;
                const area = new DropDownAreaInfo({ startX, startY, endX, endY });
                this.finalPositions.push(area);
            }
        });
    }

    private findDropArea(): DropDownAreaInfo | undefined {
        if (!this.draggingItem) return;
        const { x, y } = this.draggingItem;
        let dropArea = this.finalPositions.find(
            (area) => x > area.startX && x < area.endX && y > area.startY && y <= area.endY && area.isFree,
        );

        return dropArea;
    }

    private dropItemToArea(dropArea: DropDownAreaInfo, item: ItemView): void {
        anime({
            targets: item,
            x: dropArea.centerX,
            y: dropArea.centerY,
            duration: 50,
            easing: 'easeInOutSine',
        });
        item.emptyArea();
        item.dropTo(dropArea);
        dropArea.setItem(item);
    }

    private dropItemToOriginalPosition(): void {
        if (!this.draggingItem) return;
        lego.event.emit(BoardEvents.Drop);
        anime({
            targets: this.draggingItem,
            x: this.draggingItem.originalX,
            y: this.draggingItem.originalY,
            duration: 200,
            easing: 'easeInOutSine',
        });
    }

    private checkMatches(): void {
        for (let i = 0; i < 9; i++) {
            const b1 = this.finalPositions[i * 3];
            const b2 = this.finalPositions[i * 3 + 1];
            const b3 = this.finalPositions[i * 3 + 2];

            if (this.checkMatch(b1, b2, b3)) {
                const elements = [b1, b2, b3].map((el) => el.insertedItem).filter((el) => el) as ItemView[];
                b1.empty();
                b2.empty();
                b3.empty();
                lego.event.emit(BoardEvents.Match, b1.insertedItem?.type, i);
                this.animateMatch(elements);
            }
        }
    }

    private animateMatch(elements: ItemView[]): void {
        const targets = elements.map((el) => el.scale);
        anime({
            targets,
            x: 0,
            y: 0,
            duration: 300,
            easing: 'easeInOutSine',
            complete: () => {
                elements.forEach((el) => {
                    el.emptyArea();
                    el.destroy();
                });

                elements = [];

                this.addingElementsQueue.forEach(({ box, elements, index }) => {
                    elements.forEach((element, i) => {
                        const area = this.finalPositions[index * 3 + i];
                        const item = new ItemView(element);
                        item.position.set(area.centerX, area.centerY);
                        area.setItem(item);
                        item.setArea(area);
                        item.setOriginalPosition(area.centerX, area.centerY);
                        this.setDragEvents(item);
                        this.items.push(item);
                        this.addChild(item);
                    });
                });
                this.addingElementsQueue = [];
            },
        });
    }

    private onBoxElementsUpdate(elements: ItemModel[], oldElement: ItemModel[], uuid): void {
        const box = this.boxes.find((box) => box.uuid === uuid);
        if (!box) return;
        const index = this.boxes.indexOf(box);

        if (elements.length === 0) {
            for (let i = 0; i < 3; i++) {
                const area = this.finalPositions[index * 3 + i];
                area.empty();
            }
        } else {
            this.addingElementsQueue.push({ box, elements, index });
        }

        this.readdBlockers();
    }

    private repositionBoxes(): void {
        if (this.boxes.length === 0) return;
        this.boxes.forEach((box) => {
            if (!box) return;
            const { x, y } = this.getShelfPosition(box);
            box?.position.set(x, y);
        });
    }

    private updateDropAreas(): void {
        if (this.boxes.length === 0) return;
        this.boxes.forEach((box, j) => {
            if (!box) return;
            let startingX = box.x + 10;
            for (let i = 0; i < 3; i++) {
                const startX = startingX + 80 * i;
                const startY = box.y - 80;
                const endX = startingX + 80 * i + 80;
                const endY = box.y + 20;
                this.finalPositions[j * 3 + i].update({ startX, startY, endX, endY });
            }
        });

        this.finalPositions.forEach((area) => {
            if (area.insertedItem) {
                const { centerX, centerY } = area;
                area.insertedItem.position.set(centerX, centerY);
            }
        });
    }

    private updateTimerPosition(): void {
        if (!this.timer) return;
        const { width } = lp(BOUNDS.landscape, BOUNDS.portrait);
        this.timer.position.set(width / 2, lp(60, 260));
    }

    private getShelfPosition(box: BoxView): { x: number; y: number } {
        // P
        // const x = (box.width + 10) * box.j + 10;
        // const y = box.i * 160 + 500;
        // L
        // const x = (box.width + 10) * box.j + 250;
        // const y = box.i * 160 + 230;
        const pos = lp(BOXES_POSITIONS.landscape, BOXES_POSITIONS.portrait);
        const { x, y } = pos[box.i * 3 + box.j];
        return { x, y };
    }

    private checkMatch(c1: DropDownAreaInfo, c2: DropDownAreaInfo, c3: DropDownAreaInfo): boolean {
        if (!c1.insertedItem || !c2.insertedItem || !c3.insertedItem) return false;
        return c1.insertedItem?.type === c2.insertedItem?.type && c2.insertedItem?.type === c3.insertedItem?.type;
    }

    private onGameStateUpdate(state: GameState): void {
        switch (state) {
            case GameState.Game:
                this.onGameStart();
                break;
            case GameState.TimeOver:
                this.onTimerOver();
                break;

            default:
                break;
        }
    }

    private onGameStart(): void {
        this.hideWhiteBlocker();
    }

    private hideWhiteBlocker(): void {
        anime({
            targets: this.whiteBlocker,
            alpha: 0,
            duration: 200,
            easing: 'linear',
            complete: () => {
                this.whiteBlocker.eventMode = 'none';
                this.whiteBlocker.visible = false;
            },
        });
    }

    private hideBlackBlocker(): void {
        anime({
            targets: this.blackBlocker,
            alpha: 0,
            duration: 200,
            easing: 'linear',
            complete: () => {
                this.blackBlocker.eventMode = 'none';
                this.blackBlocker.visible = false;
            },
        });
    }

    private showBlackBlocker(emitEvent = true): void {
        this.blackBlocker.visible = true;
        anime({
            targets: this.blackBlocker,
            alpha: 0.7,
            duration: 200,
            easing: 'linear',
            complete: () => {
                this.blackBlocker.eventMode = 'static';
                if (emitEvent) {
                    this.blackBlocker.on('pointerdown', () => {
                        lego.event.emit(ForegroundEvents.BlackBlockerClicked);
                    });
                }
            },
        });
    }

    private onGameIdleStateUpdate(state: IdleState): void {
        if (state === IdleState.Idle) {
            this.showBlackBlocker();
        } else {
            this.hideBlackBlocker();
        }
    }

    private onTimerOver(): void {
        this.showBlackBlocker(false);
    }

    private updateBlockers(): void {
        const { width, height } = lp(BOUNDS.landscape, BOUNDS.portrait);
        if (this.whiteBlocker) {
            this.whiteBlocker.width = width;
            this.whiteBlocker.height = height;
        }

        if (this.blackBlocker) {
            this.blackBlocker.width = width;
            this.blackBlocker.height = height;
        }
    }

    private readdBlockers(): void {
        this.removeChild(this.blackBlocker);
        this.addChild(this.blackBlocker);

        this.removeChild(this.whiteBlocker);
        this.addChild(this.whiteBlocker);
    }
}
