import { Container, Graphics, Rectangle, Sprite, Texture } from 'pixi.js';
import { lp } from '../Utils';
import { BKG_IMAGE_L } from '../base64/images/bkgL';
import { BKG_IMAGE_P } from '../base64/images/bkgP';
import { ERROR_TEXT_IMAGE } from '../base64/images/errorText';
import { POWERED_BY } from '../base64/images/poweredBy';

const BOUNDS = {
    landscape: { width: 1280, height: 660 },
    portrait: { width: 800, height: 1280 },
};

export class ErrorMessage extends Container {
    private bkg: Sprite;
    private poweredBy: Sprite;
    private message: Sprite;

    private blackBlocker: Graphics;

    constructor() {
        super();

        // lego.event
        //     .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
        this.build();
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        const { width, height } = lp(BOUNDS.landscape, BOUNDS.portrait);
        return new Rectangle(0, 0, width, height);
    }

    public rebuild(): void {
        const { width, height } = lp(BOUNDS.landscape, BOUNDS.portrait);

        this.bkg.texture = Texture.from(lp(BKG_IMAGE_L, BKG_IMAGE_P));
        this.message.position.set(width / 2, height / 2);

        this.updateBlockers();
    }

    public setMessage(message: string): void {
        // console.warn('setMessage', message);
    }
        

    private build(): void {
        this.buildBkg();

        const { width, height } = lp(BOUNDS.landscape, BOUNDS.portrait);
        this.buildBlackBlocker({ width, height });
        this.buildPoweredBy();
        this.buildMessage();
    }

    private buildBlackBlocker({ width, height }): void {
        this.blackBlocker = new Graphics();
        this.blackBlocker.beginFill(0x000000, 0.7);
        this.blackBlocker.drawRect(0, 0, width, height);
        this.blackBlocker.endFill();
        // this.blackBlocker.alpha = 0;
        this.addChild(this.blackBlocker);
    }

    private buildBkg(): void {
        this.bkg = Sprite.from(lp(BKG_IMAGE_L, BKG_IMAGE_P));
        this.addChild(this.bkg);
    }

    private buildMessage(): void {
        const { width, height } = lp(BOUNDS.landscape, BOUNDS.portrait);
        this.message = Sprite.from(ERROR_TEXT_IMAGE);
        this.message.anchor.set(0.5);
        this.message.position.set(width / 2, height / 2);
        this.addChild(this.message);
    }

    private buildPoweredBy(): void {
        this.poweredBy = Sprite.from(POWERED_BY);
        this.poweredBy.anchor.set(0);
        this.poweredBy.position.set(10, 10);
        this.poweredBy.scale.set(0.5);

        this.addChild(this.poweredBy);
    }

    private updateBlockers(): void {
        const { width, height } = lp(BOUNDS.landscape, BOUNDS.portrait);

        if (this.blackBlocker) {
            this.blackBlocker.width = width;
            this.blackBlocker.height = height;
        }
    }

    private readdBlockers(): void {
        this.removeChild(this.blackBlocker);
        this.addChild(this.blackBlocker);
    }
}
