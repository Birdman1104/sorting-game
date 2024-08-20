import { Container, Rectangle, Sprite } from 'pixi.js';
import { SHELF_IMAGE } from '../base64/images/shelf';

export class BoxView extends Container {
    constructor(private _i: number, private _j: number, private _uuid: string) {
        super();

        this.build();
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, 250, 31);
    }

    get i(): number {
        return this._i;
    }

    get j(): number {
        return this._j;
    }

    get uuid(): string {
        return this._uuid;
    }

    private build(): void {
        const shelf = Sprite.from(SHELF_IMAGE);
        this.addChild(shelf);
    }
}
