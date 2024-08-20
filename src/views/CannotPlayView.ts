import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Sprite } from 'pixi.js';
import { CANNOT_PLAY_TEXTURE } from '../base64/images/cannotPlay';
import { getCannotPlayGridConfig } from '../configs/gridConfigs/CannotPlayViewGC';

export class CannotPlayView extends PixiGrid {
    constructor() {
        super();
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getCannotPlayGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        const text = Sprite.from(CANNOT_PLAY_TEXTURE);
        text.anchor.set(0.5);
        this.setChild('text', text);
    }
}
