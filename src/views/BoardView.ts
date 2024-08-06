import { lego } from '@armathai/lego';
import { Container, Point, Rectangle, Sprite } from 'pixi.js';
import { BoardModelEvents } from '../events/ModelEvents';
import { BoxModel } from '../models/BoxModel';
import { DropDownAreaInfo } from './DropDownAreaInfo';
import { ItemView } from './ItemView';

export class BoardView extends Container {
    private items: ItemView[] = [];
    private canDrag = true;
    private dragPoint: Point;
    private dragStarted = false;

    private draggingItem: ItemView | null;

    private finalPositions: DropDownAreaInfo[] = [];

    constructor() {
        super();

        lego.event.on(BoardModelEvents.BoxesUpdate, this.onBoxesUpdate, this);
        this.build();
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, 738, 478);
    }

    private build(): void {
        //
    }

    private onBoxesUpdate(data: BoxModel[]): void {
        data.forEach((box) => {
            const sprite = this.getShelfSprite(box.i, box.j);
            box.elements.forEach((element, i) => {
                const item = new ItemView(element);
                item.x = sprite.x + 15 + 70 * i;
                item.y = sprite.y + 50;
                this.setDragEvents(item);
                this.items.push(item);
            });
            this.addChild(sprite);
        });
        this.items.forEach((item) => this.addChild(item));
    }


    private setDragEvents(item: ItemView): void {
        item.interactive = true;
        item.on('pointerdown', (e) => this.onDragStart(e, item));
        item.on('pointerout', this.stopDrag, this);
        item.on('pointerup', this.stopDrag, this);
        item.on('disableDrag', () => (this.canDrag = false));
        item.on('enableDrag', () => (this.canDrag = true));
    }

    private onDragStart(event, item: ItemView): void {
        if (!this.canDrag) return;
        this.dragStarted = true;
        event.stopPropagation();
        
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

        this.draggingItem = null;
    }

    private onDragMove(event): void {
        if (!this.canDrag || !this.draggingItem) return;

        const newPoint = event.data.getLocalPosition(this.draggingItem.parent);
        this.draggingItem.x = newPoint.x - this.dragPoint.x;
        this.draggingItem.y = newPoint.y - this.dragPoint.y;
    }

    private getShelfSprite(i: number, j: number): Sprite {
        const img = i === 0 ? 'top.png' : i === 2 ? 'bottom.png' : 'middle.png';
        const shelf = Sprite.from(img);
        const x = shelf.width * j;
        const y = i === 2 ? 308 : shelf.height * i;
        shelf.x = x;
        shelf.y = y;
        return shelf;
    }
}
