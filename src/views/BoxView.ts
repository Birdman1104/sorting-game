import { Container, Sprite } from "pixi.js";

export class BoxView extends Container {
    constructor(private _i: number, private _j: number, private _uuid: string) {
        super();

        this.build()
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
        const shelf = this.getShelfSprite(this._i, this._j);
        this.addChild(shelf);
    }

    private getShelfSprite(i: number, j: number): Sprite {
      const img = i === 0 ? 'top.png' : i === 2 ? 'bottom.png' : 'middle.png';
      const shelf = Sprite.from(img);
      return shelf;
    }

}
