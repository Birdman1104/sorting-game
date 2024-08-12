import { Container, Sprite } from 'pixi.js';
import { InputArea } from './InputArea';

export class ValidationPopup extends Container {
    private bkg: Sprite;
    private submitButton: Sprite;
    private inputArea: InputArea;

    constructor() {
        super();

        this.build();
    }

    public setTypedText(text: string): void {
        this.inputArea.setTypedText(text);
    }

    private build(): void {
        this.buildBkg();
        this.buildSubmitButton();
        this.buildInputArea();
    }

    private buildBkg(): void {
        this.bkg = Sprite.from('validation_bkg.png');
        this.bkg.anchor.set(0.5);
        this.addChild(this.bkg);
    }

    private buildSubmitButton(): void {
        this.submitButton = Sprite.from('submit_btn.png');
        this.submitButton.anchor.set(0.5);
        this.submitButton.interactive = true;
        this.submitButton.on('pointerdown', () => {
            // this.emit('submit')
            console.warn('click');
        });
        this.submitButton.position.set(0, 80);
        this.addChild(this.submitButton);
    }

    private buildInputArea(): void {
        this.inputArea = new InputArea();
        this.addChild(this.inputArea);
    }
}
