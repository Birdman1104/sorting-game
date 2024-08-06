import { lego } from '@armathai/lego';
import { Container, Rectangle, Sprite } from 'pixi.js';
import { BoardModelEvents } from '../events/ModelEvents';
import { BoxModel } from '../models/BoxModel';
import { ItemView } from './ItemView';

export class BoardView extends Container {
    private items: ItemView[] = [];

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
                this.items.push(item);
            });
            this.addChild(sprite);
        });
        this.items.forEach((item) => this.addChild(item));
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
