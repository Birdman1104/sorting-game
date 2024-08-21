import anime from 'animejs';
import { Container, Rectangle, Sprite } from 'pixi.js';

export class PrizeContainer extends Container {
    constructor() {
        super();
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, 410, 410);
    }

    public setPrize(texture): void {
        const prize = Sprite.from(texture);
        prize.anchor.set(0.5);
        const { width, height } = prize;
        let scale = 1;
        if (width > height) {
            scale = 400 / width;
        } else {
            scale = 400 / height;
        }
        prize.scale.set(scale);
        prize.position.set(205, 205);
        this.addChild(prize);
        
        anime({
            targets: prize,
            angle: [5, 0, -5, 0],
            duration: 300,
            loop: true,
            easing: 'linear',
        });
    }
}
