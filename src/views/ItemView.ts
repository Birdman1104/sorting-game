import { Container, Sprite } from 'pixi.js';
import { ItemModel } from '../models/ItemModel';
import { DropDownAreaInfo } from './DropDownAreaInfo';

export class ItemView extends Container {
    public originalX: number;
    public originalY: number;
    private sprite: Sprite;
    private dropArea: DropDownAreaInfo | null = null;

    constructor(private config: ItemModel) {
        super();
        this.build();
    }

    get uuid(): string {
        return this.config.uuid;
    }

    get type(): string {
        return this.config.type;
    }

    get area(): DropDownAreaInfo | null {
        return this.dropArea;
    }

    private build(): void {
        this.sprite = Sprite.from(`${this.type}.png`);
        this.sprite.scale.set(0.5)
        this.sprite.interactive = true;
        this.addChild(this.sprite);
        // drawBounds(this);
    }
}
