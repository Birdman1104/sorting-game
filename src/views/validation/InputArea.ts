import anime from 'animejs';
import { Container, Sprite, Text } from 'pixi.js';
import { callIfExists, delayRunnable, fitText } from '../../Utils';

const DEFAULT_FONT_SIZE = 32;

export const INPUT_WIDTH = 375;
export const INPUT_HEIGHT = 55;

export class InputArea extends Container {
    private bkg: Sprite;
    private bkgCopy: Sprite;
    private typedText: Text;
    private typedTextCopy: Text;
    private indicator: Text;

    private animationInProcess = false

    constructor() {
        super();

        this.build();
    }

    get lettersTypes(): number {
        return this.typedText.text.length;
    }

    public setTypedText(text: string): void {
        if (!this.animationInProcess) {
            this.typedText.text = text;
            fitText(this.typedText, INPUT_WIDTH * 0.925, INPUT_HEIGHT);
            this.indicator.x = this.typedText.x + this.typedText.width / 2 + (text.length === 0 ? 0 : 5);
        }
    }

    public show(): void {
        anime({
            targets: this.scale,
            x: 1,
            y: 1,
            duration: 300,
            easing: 'easeInOutSine',
            complete: () => {
                this.indicator.visible = true;
                anime({
                    targets: this.indicator,
                    alpha: 0,
                    direction: 'alternate',
                    easing: 'linear',
                    duration: 300,
                    loop: true,
                });
            },
        });
    }

    public hide(): void {
        anime.remove(this.indicator);
        this.indicator.visible = false;
        anime({
            targets: this.scale,
            x: 0,
            y: 0,
            duration: 300,
            easing: 'easeInOutSine',
        });
    }

    public rightCodeAnimation(cb?): void {
        this.copyTypedText(0x00ff00);
        this.animationInProcess = true
        anime({
            targets: this.typedTextCopy,
            alpha: 1,
            easing: 'linear',
            duration: 200,
            complete: () => {
                delayRunnable(0.5, () => {
                    this.typedTextCopy.text = '';
                    this.typedTextCopy.alpha = 0;
                    this.typedText.text = '';
                    this.typedText.style.fontSize = DEFAULT_FONT_SIZE;
                    this.typedTextCopy.style.fontSize = DEFAULT_FONT_SIZE;
                    this.indicator.position.set(0, 0);
                    callIfExists(cb);
                    this.animationInProcess = false
                });
            },
        });
    }

    public wrongCodeAnimation(cb?): void {
        this.copyTypedText(0xffffff);
        this.animationInProcess = true
        anime({
            targets: [this.typedTextCopy, this.bkgCopy],
            alpha: 1,
            easing: 'linear',
            direction: 'alternate',
            loop: 4,
            duration: 300,
            complete: () => {
                delayRunnable(0.5, () => {
                    this.typedTextCopy.text = '';
                    this.typedTextCopy.alpha = 0;
                    this.typedText.text = '';
                    this.indicator.position.set(0, 0);
                    callIfExists(cb);
                    this.animationInProcess = false
                });
            },
        });
    }

    private copyTypedText(color: number): void {
        this.typedTextCopy.text = this.typedText.text;
        this.typedTextCopy.style.fill = color;
        this.typedTextCopy.style.fontSize = this.typedText.style.fontSize;
        this.typedTextCopy.position.copyFrom(this.typedText);
        this.typedTextCopy.alpha = 0;
    }

    private build(): void {
        this.buildBkg();
        this.buildBkgCopy();
        this.buildTypedText();
        this.buildTypedTextCopy();
        this.buildIndicator();
        // this.scale.set(0);
    }

    private buildBkg(): void {
        this.bkg = Sprite.from('input_area.png');
        this.bkg.anchor.set(0.5);
        this.addChild(this.bkg);
    }

    private buildBkgCopy(): void {
        this.bkgCopy = Sprite.from('input_area.png');
        this.bkgCopy.anchor.set(0.5);
        this.bkgCopy.tint = 0xff0000;
        this.bkgCopy.alpha = 0;
        this.addChild(this.bkgCopy);
    }

    private buildTypedText(): void {
        this.typedText = new Text('', { fontSize: DEFAULT_FONT_SIZE, fontWeight: 'bold' });
        this.typedText.anchor.set(0.5);
        this.typedText.position.set(0, 0);
        this.addChild(this.typedText);
    }

    private buildTypedTextCopy(): void {
        this.typedTextCopy = new Text('', { fontSize: DEFAULT_FONT_SIZE, fontWeight: 'bold' });
        this.typedTextCopy.alpha = 0;
        this.typedTextCopy.anchor.set(0.5);
        this.typedTextCopy.position.set(0, 0);
        this.addChild(this.typedTextCopy);
    }

    private buildIndicator(): void {
        this.indicator = new Text('I', { fontSize: 48, fontWeight: 'bold', fill: '#999999' });
        this.indicator.anchor.set(0.5);
        this.indicator.position.set(0, 0);
        // this.indicator.visible = false;
        this.addChild(this.indicator);
    }
}
