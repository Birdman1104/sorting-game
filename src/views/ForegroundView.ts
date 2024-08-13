import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import anime from 'animejs';
import { Graphics, SCALE_MODES, Sprite } from 'pixi.js';
import { delayRunnable, tweenToCell } from '../Utils';
import { getForegroundGridConfig } from '../configs/gridConfigs/ForegroundViewGC';
import { ForegroundEvents } from '../events/MainEvents';
import { GameModelEvents, ValidationModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { ValidationModel } from '../models/ValidationModel';
import { KeyboardView } from './keyboard/KeyboardView';
import { ValidationPopup } from './validation/ValidationPopup';

export class ForegroundView extends PixiGrid {
    private keyboardBkg: Sprite;
    private keyboard: KeyboardView;
    private validationPopup: ValidationPopup;
    private blocker: Graphics;

    constructor() {
        super();

        lego.event
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
            .on(ValidationModelEvents.TypedTextUpdate, this.onValidationTypedTextUpdate, this)
            .on(ValidationModelEvents.IsConfirmedUpdate, this.onConfirmationUpdate, this)
            .on(GameModelEvents.ValidationUpdate, this.onValidationStateUpdate, this);

        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getForegroundGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.buildBlocker();
        this.buildKeyboardBkg();
        this.buildKeyboard();
    }

    private buildBlocker(): void {
        this.blocker = new Graphics();
        this.blocker.beginFill(0xffffff, 1);
        this.blocker.drawRect(0, 0, 10, 10);
        this.blocker.endFill();
        // this.blocker.alpha = 0;
        this.setChild('blocker', this.blocker);
    }

    private buildKeyboardBkg(): void {
        const gr = new Graphics();
        gr.beginFill(0xd1d3d8, 1);
        gr.drawRect(0, 0, 16, 16);
        gr.endFill();
        const p1 = window.game.renderer.generateTexture(gr, SCALE_MODES.LINEAR, 72);
        gr.clear();

        this.keyboardBkg = new Sprite(p1);
        this.keyboardBkg.interactive = true;
        this.setChild('keyboard_bkg2', this.keyboardBkg);
    }

    private buildKeyboard(): void {
        this.keyboard = new KeyboardView();
        this.setChild('keyboard2', this.keyboard);
    }

    private onGameStateUpdate(state: GameState): void {
        switch (state) {
            case GameState.Validation:
                this.buildValidationPopup();
                break;
            case GameState.Game:
                this.onGameStart();
                break;
            case GameState.TimeOver:
                this.onTimerOver();
                break;

            default:
                break;
        }
    }

    private onValidationStateUpdate(validation: ValidationModel): void {
        if (validation) {
            tweenToCell(this, this.keyboard, 'keyboard', () => this.keyboard.canType(true));
            tweenToCell(this, this.keyboardBkg, 'keyboard_bkg');
            tweenToCell(this, this.validationPopup, 'validation_popup_show');
        }
    }

    private buildValidationPopup(): void {
        this.validationPopup = new ValidationPopup();
        // this.validationPopup.show();
        this.setChild('validation_popup_hide', this.validationPopup);
    }

    private onValidationTypedTextUpdate(text: string): void {
        this.validationPopup.setTypedText(text);
    }

    private onConfirmationUpdate(confirmed: boolean | ''): void {
        if (confirmed === '') return;
        if (confirmed) {
            const cb = () => {
                this.keyboard.canType(false);
                tweenToCell(this, this.keyboard, 'keyboard2');
                tweenToCell(this, this.keyboardBkg, 'keyboard_bkg2');
                tweenToCell(this, this.validationPopup, 'validation_popup_hide');
                lego.event.emit(ForegroundEvents.RightAnimationComplete);
            };
            this.validationPopup.rightCode(cb);
        } else {
            this.keyboard.canType(false);
            const cb = () => {
                this.keyboard.canType(true);
                this.validationPopup.enableButton();
            };
            this.validationPopup.wrongCode(cb);
        }
    }

    private onGameStart(): void {
        anime({
            targets: this.blocker,
            alpha: 0,
            duration: 200,
            easing: 'linear',
            complete: () => {
                this.blocker.eventMode = 'none';
                this.blocker.visible = false;
            },
        });
        delayRunnable(1, () => {
            this.validationPopup?.destroy();
        });
    }

    private onTimerOver(): void {
        this.blocker.visible = true;
        anime({
            targets: this.blocker,
            alpha: 1,
            duration: 200,
            easing: 'linear',
            complete: () => {
                this.blocker.eventMode = 'static';
            },
        });

        const img = Sprite.from('prize.png');
        img.anchor.set(0.5);
        this.setChild('prize', img);
    }
}
