import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Rectangle, Sprite } from 'pixi.js';
import { BKG_IMAGE } from '../base64/images/bkg';
import { getBackgroundGridConfig } from '../configs/gridConfigs/BackgroundViewGC';

export class BackgroundView extends PixiGrid {
    constructor() {
        super();
        // this.build();
    }
    
    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0,0, 1280, 661)
    }

    public getGridConfig(): ICellConfig {
        return getBackgroundGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        const bkg = Sprite.from(BKG_IMAGE);
        // bkg.anchor.set(0.5);
        this.setChild('bkg', bkg);
    }
}
