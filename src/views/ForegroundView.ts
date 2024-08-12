import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Graphics, SCALE_MODES, Sprite } from 'pixi.js';
import { getForegroundGridConfig } from '../configs/gridConfigs/ForegroundViewGC';
import { KeyboardView } from './keyboard/KeyboardView';

export class ForegroundView extends PixiGrid {
    private keyboardBkg: Sprite;
    private keyboard: KeyboardView;

    constructor() {
        super();
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getForegroundGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.buildKeyboardBkg();
        this.buildKeyboard();
    }

    private buildKeyboardBkg(): void {
        const gr = new Graphics();
        gr.beginFill(0xd1d3d8, 1);
        gr.drawRect(0, 0, 16, 16);
        gr.endFill();
        const p1 = window.game.renderer.generateTexture(gr, SCALE_MODES.LINEAR, 72);
        gr.clear();

        this.keyboardBkg = new Sprite(p1);
        this.keyboardBkg.interactive = true;
        this.setChild('keyboard_bkg2', this.keyboardBkg);
    }

    private buildKeyboard(): void {
        this.keyboard = new KeyboardView();
        this.setChild('keyboard2', this.keyboard);
    }
}
