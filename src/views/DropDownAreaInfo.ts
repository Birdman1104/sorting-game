import { ItemView } from './ItemView';

export class DropDownAreaInfo {
    public startX: number;
    public startY: number;
    public endX: number;
    public endY: number;
    public insertedItem: ItemView | null;

    constructor(info) {
        this.startX = info.startX;
        this.startY = info.startY;
        this.endX = info.endX;
        this.endY = info.endY;
    }

    get centerX(): number {
        return this.startX + (this.endX - this.startX) / 2;
    }

    get centerY(): number {
        return this.startY + (this.endY - this.startY) / 2;
    }

    get isFree(): boolean {
        return !this.insertedItem;
    }

    public update(info): void {
        this.startX = info.startX;
        this.startY = info.startY;
        this.endX = info.endX;
        this.endY = info.endY;
        this.insertedItem?.setOriginalPosition(this.centerX, this.centerY);
        this.insertedItem?.position.set(this.centerX, this.centerY);
    }

    public setItem(item: ItemView): void {
        this.insertedItem = item;
    }

    public empty(): void {
        this.insertedItem = null;
    }
}
