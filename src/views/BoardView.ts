import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Point, Rectangle } from 'pixi.js';
import { BoardEvents } from '../events/MainEvents';
import { BoardModelEvents, BoxModelEvents, GameModelEvents } from '../events/ModelEvents';
import { BoxModel } from '../models/BoxModel';
import { ItemModel } from '../models/ItemModel';
import { BoxView } from './BoxView';
import { DropDownAreaInfo } from './DropDownAreaInfo';
import { ItemView } from './ItemView';
import { TimerView } from './TimerView';

export class BoardView extends Container {
    private items: ItemView[] = [];
    private boxes: BoxView[] = [];
    private canDrag = true;
    private dragPoint: Point;
    private dragStarted = false;

    private draggingItem: ItemView | null;

    private finalPositions: DropDownAreaInfo[] = [];

    private timer: TimerView;

    private addingElementsQueue: { box: BoxView; elements: ItemModel[]; index: number }[] = [];

    constructor() {
        super();

        lego.event
            .on(BoardModelEvents.BoxesUpdate, this.onBoxesUpdate, this)
            .on(BoxModelEvents.ElementsUpdate, this.onBoxElementsUpdate, this)
            .on(GameModelEvents.GameTimeUpdate, this.onTimerUpdate, this);
        this.build();
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, -140, 768, 540);
    }

    private build(): void {
        this.buildTimer();
    }

    private buildTimer(): void {
        this.timer = new TimerView();
        this.timer.position.set(798 / 2, -100);
        this.addChild(this.timer);
    }

    private onTimerUpdate(time: number): void {
        this.timer?.updateTime(time);
    }

    private onBoxesUpdate(data: BoxModel[]): void {
        data.forEach((box) => {
            const sprite = new BoxView(box.i, box.j, box.uuid);
            const { x, y } = this.getShelfPosition(sprite);
            sprite.position.set(x, y);
            this.boxes.push(sprite);
            this.addChild(sprite);
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
            area?.empty();
            this.draggingItem.emptyArea();
            this.dropItemToArea(dropArea, this.draggingItem);
            this.checkMatches();
        } else {
            this.dropItemToOriginalPosition();
        }

        this.draggingItem = null;
    }

    private onDragMove(event): void {
        if (!this.canDrag || !this.draggingItem) return;

        const newPoint = event.data.getLocalPosition(this.draggingItem.parent);
        this.draggingItem.x = newPoint.x - this.dragPoint.x;
        this.draggingItem.y = newPoint.y - this.dragPoint.y;
        lego.event.emit(BoardEvents.Click);
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

                elements = []

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
    }

    private getShelfPosition(box: BoxView): { x: number; y: number } {
        const x = (box.width + 10) * box.j;
        const y = box.i * 160 + 50;
        return { x, y };
    }

    private checkMatch(c1: DropDownAreaInfo, c2: DropDownAreaInfo, c3: DropDownAreaInfo): boolean {
        if (!c1.insertedItem || !c2.insertedItem || !c3.insertedItem) return false;
        return c1.insertedItem?.type === c2.insertedItem?.type && c2.insertedItem?.type === c3.insertedItem?.type;
    }
}
