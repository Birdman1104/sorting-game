import anime from 'animejs';
import { Container, Rectangle, Sprite } from 'pixi.js';
import { PRIZE_IMAGE } from '../base64/images/prize';

export class PrizeContainer extends Container {
    constructor() {
        super();

        this.build();
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, 380, 420);
    }

    private build(): void {
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
}
