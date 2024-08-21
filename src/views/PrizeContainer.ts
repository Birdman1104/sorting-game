import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Rectangle, Sprite } from 'pixi.js';
import { GLOBAL_DATA } from '../App';
import { PRIZE_IMAGE } from '../base64/images/prize';
import { GameModelEvents } from '../events/ModelEvents';

export class PrizeContainer extends Container {
    constructor() {
        super();

        lego.event.on(GameModelEvents.PrizeUpdate, this.onPrizeUpdate, this)
        this.build();
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, 380, 420);
    }

    private build(): void {
        const texture = GLOBAL_DATA.TEXTURES.find((item) => item.name === 'prizeContainer');
        const prize = Sprite.from(PRIZE_IMAGE);
        prize.anchor.set(0.5);
        prize.position.set(this.width / 2, this.height / 2);
        this.addChild(prize);

        anime({
            targets: prize,
            angle: [10, 0, -10, 0],
            duration: 300,
            loop: true,
            easing: 'linear',
        });
    }

    private onPrizeUpdate(prize: string): void {
        const texture = GLOBAL_DATA.TEXTURES.find((item) => item.name === prize);
        console.warn(texture);
        
    }
}
