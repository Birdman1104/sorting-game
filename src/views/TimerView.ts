import { Container, Sprite, Text } from 'pixi.js';
import { convertMilliseconds } from '../Utils';
import { TIMER_IMAGE } from '../base64/images/timer';
import { TIMER } from '../configs/constants';

export class TimerView extends Container {
    private bkg: Sprite
    private timeText: Text

    constructor() {
        super();
        this.build();
    }

    public updateTime(time: number): void {
        const text = convertMilliseconds(Math.max(0, time));

        if(time < 10000) {
            this.timeText.tint = '#ff6969';   
        }

        this.timeText.text = text;
    }

    private build(): void {
        this.bkg = Sprite.from(TIMER_IMAGE);
        this.bkg.anchor.set(0.5)
        this.bkg.scale.set(0.5)
        this.addChild(this.bkg);

        const text = convertMilliseconds(TIMER)
        this.timeText = new Text(text, { fill: 0xffffff, fontSize: 30 });
        this.timeText.anchor.set(0.5);
        this.timeText.position.set(24, 7);
        this.addChild(this.timeText);
    }
}
