import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import anime from 'animejs';
import { Graphics, SCALE_MODES, Sprite } from 'pixi.js';
import { delayRunnable, tweenToCell } from '../Utils';
import { getForegroundGridConfig } from '../configs/gridConfigs/ForegroundViewGC';
import { ForegroundEvents, ValidationPopupEvents } from '../events/MainEvents';
import { GameModelEvents, ValidationModelEvents } from '../events/ModelEvents';
import { GameState, IdleState } from '../models/GameModel';
import { ValidationModel } from '../models/ValidationModel';
import { KeyboardView } from './keyboard/KeyboardView';
import { ValidationPopup } from './validation/ValidationPopup';

export class ForegroundView extends PixiGrid {
    private keyboardBkg: Sprite;
    private keyboard: KeyboardView;
    private validationPopup: ValidationPopup;
    private whiteBlocker: Graphics;
    private blackBlocker: Graphics;
    private idleText: Sprite;

    constructor() {
        super();

        lego.event
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
            .on(GameModelEvents.IdleStateUpdate, this.onGameIdleStateUpdate, this)
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
        this.buildWhiteBlocker();
        this.buildBlackBlocker();
        this.buildKeyboardBkg();
        this.buildKeyboard();
        this.buildIdleText();
    }

    private buildWhiteBlocker(): void {
        this.whiteBlocker = new Graphics();
        this.whiteBlocker.beginFill(0xaeaeae, 1);
        this.whiteBlocker.drawRect(0, 0, 10, 10);
        this.whiteBlocker.endFill();
        this.whiteBlocker.alpha = 0;
        this.setChild('blocker', this.whiteBlocker);
    }

    private buildBlackBlocker(): void {
        this.blackBlocker = new Graphics();
        this.blackBlocker.beginFill(0x000000, 1);
        this.blackBlocker.drawRect(0, 0, 10, 10);
        this.blackBlocker.endFill();
        this.blackBlocker.alpha = 0;
        this.setChild('blocker', this.blackBlocker);
    }

    private buildIdleText(): void {
        this.idleText = Sprite.from('idle_text.png');
        this.setChild('idle_text_left', this.idleText);
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
        this.keyboard.on('enter_clicked', () => {
            this.validationPopup?.disableButton();
            lego.event.emit(ValidationPopupEvents.SubmitButtonClicked);
        })
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
            this.showWhiteBlocker()
            tweenToCell(this, this.keyboard, 'keyboard', () => this.keyboard.canType(true));
            tweenToCell(this, this.keyboardBkg, 'keyboard_bkg');
            tweenToCell(this, this.validationPopup, 'validation_popup_show');
        }
    }

    private buildValidationPopup(): void {
        this.validationPopup = new ValidationPopup();
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
        this.hideWhiteBlocker();
        delayRunnable(1, () => {
            this.validationPopup?.destroy();
        });
    }

    private onTimerOver(): void {
        this.showBlackBlocker(0.3);

        const img = Sprite.from('prize.png');
        img.anchor.set(0.5);
        this.setChild('prize', img);
    }

    private onGameIdleStateUpdate(state: IdleState): void {
        if (state === IdleState.Idle) {
            this.showBlackBlocker();
            tweenToCell(this, this.idleText, 'idle_text');
        } else {
            this.hideBlackBlocker();
            tweenToCell(this, this.idleText, 'idle_text_right', () => {
                this.setChild('idle_text_left', this.idleText);
            });
        }
    }

    private showBlackBlocker(alpha = 0.7): void {
        this.blackBlocker.visible = true;
        anime({
            targets: this.blackBlocker,
            alpha,
            duration: 200,
            easing: 'linear',
            complete: () => {
                this.blackBlocker.eventMode = 'static';
                this.blackBlocker.on('pointerdown', () => {
                    lego.event.emit(ForegroundEvents.BlackBlockerClicked);
                });
            },
        });
    }

    private hideBlackBlocker(): void {
        anime({
            targets: this.blackBlocker,
            alpha: 0,
            duration: 200,
            easing: 'linear',
            complete: () => {
                this.blackBlocker.eventMode = 'none';
                this.blackBlocker.visible = false;
            },
        });
    }

    private hideWhiteBlocker(): void {
        anime({
            targets: this.whiteBlocker,
            alpha: 0,
            duration: 200,
            easing: 'linear',
            complete: () => {
                this.whiteBlocker.eventMode = 'none';
                this.whiteBlocker.visible = false;
            },
        });
    }

    private showWhiteBlocker(): void {
        this.whiteBlocker.visible = true;
        anime({
            targets: this.whiteBlocker,
            alpha: 0.4,
            duration: 200,
            easing: 'linear',
            complete: () => {
                this.whiteBlocker.eventMode = 'static';
            },
        });
    }
}
