import anime from 'animejs';
import { Container, Rectangle, Sprite } from 'pixi.js';
import { delayRunnable, lp } from '../Utils';
import { CALL_TEXT_IMAGE } from '../base64/images/callText';
import { PRIZE_TEXT_IMAGE } from '../base64/images/prizeText';

const TEXT_HEIGHT = 100

const BOUNDS = {
    landscape: { width: 1280, height: 660 },
    portrait: { width: 800, height: 1280 },
};

export class PrizeView extends Container {
    private youWonText: Sprite;
    private callText: Sprite;
    private prize: Sprite;

    constructor() {
        super();

        this.build()
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        return new Rectangle(0, 0, 570, 660);
    }

    public rebuild(): void {
        const { width, height } = lp(BOUNDS.landscape, BOUNDS.portrait);
        this.youWonText.position.set(width / 2, TEXT_HEIGHT);
        this.prize.position.set(width / 2, height / 2);
        this.callText.position.set(width / 2, height - 100);
    }

    public setPrize(texture): void {
        this.prize = Sprite.from(texture);
        this.prize.anchor.set(0.5);
        const { width, height } = this.prize;
        let scale = 1;
        if (width > height) {
            scale = 400 / width;
        } else {
            scale = 330 / height;
        }
        this.prize.scale.set(scale);
        this.prize.position.set(this.width / 2, this.height / 2);
        this.addChild(this.prize);
        
        anime({
            targets: this.prize,
            angle: [5, 0, -5, 0],
            duration: 300,
            loop: true,
            easing: 'linear',
        });
    }

    private build(): void {
        this.buildYouWonText();
        this.buildCallText();
    }

    private buildYouWonText(): void {
        this.youWonText = Sprite.from(PRIZE_TEXT_IMAGE);
        this.youWonText.anchor.set(0.5);
        this.youWonText.position.set(this.width / 2, TEXT_HEIGHT);
        
        delayRunnable(0.01, () => {
            this.addChild(this.youWonText);
            
            this.youWonText.scale.set(123 / this.youWonText.height)
            console.warn('you won', this.youWonText.width, this.youWonText.height);
            
        })
    }
    
    private buildCallText(): void {
        this.callText = Sprite.from(CALL_TEXT_IMAGE);
        this.callText.anchor.set(0.5);
        this.callText.position.set(this.width / 2, this.height - TEXT_HEIGHT);
        
        delayRunnable(0.01, () => {
            this.callText.scale.set(100 / this.callText.height)
            console.warn('call text', this.callText.width, this.callText.height);
            this.addChild(this.callText);
        })
    }
}
