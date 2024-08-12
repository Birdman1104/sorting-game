import { lego } from '@armathai/lego';
import { Container, Sprite } from 'pixi.js';
import { ValidationPopupEvents } from '../../events/MainEvents';
import { InputArea } from './InputArea';

export class ValidationPopup extends Container {
    private bkg: Sprite;
    private submitButton: Sprite;
    private inputArea: InputArea;

    public canSubmit: boolean = true;

    constructor() {
        super();

        this.build();
    }

    public setTypedText(text: string): void {
        this.inputArea.setTypedText(text);
    }

    public rightCode(cb?): void {
        this.inputArea.rightCodeAnimation(cb);
    }

    public wrongCode(cb?): void {
        this.inputArea.wrongCodeAnimation(cb);
    }

    public disableButton(): void {
        this.canSubmit = false;
        this.submitButton.alpha = 0.5;
    }

    public enableButton(): void {
        this.canSubmit = true;
        this.submitButton.alpha = 1;
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
            if (!this.canSubmit) return;
            this.disableButton();
            lego.event.emit(ValidationPopupEvents.SubmitButtonClicked);
        });
        this.submitButton.position.set(0, 80);
        this.addChild(this.submitButton);
    }

    private buildInputArea(): void {
        this.inputArea = new InputArea();
        this.addChild(this.inputArea);
    }
}
