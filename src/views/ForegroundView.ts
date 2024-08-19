import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import anime from 'animejs';
import { Graphics, Sprite } from 'pixi.js';
import { delayRunnable, tweenToCell } from '../Utils';
import { getForegroundGridConfig } from '../configs/gridConfigs/ForegroundViewGC';
import { ForegroundEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState, IdleState } from '../models/GameModel';

export class ForegroundView extends PixiGrid {
    private whiteBlocker: Graphics;
    private blackBlocker: Graphics;
    private idleText: Sprite;
    private timeOverText: Sprite;

    constructor() {
        super();

        lego.event
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
            .on(GameModelEvents.IdleStateUpdate, this.onGameIdleStateUpdate, this);

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
        this.buildIdleText();
        this.buildTimeOverText();
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
        this.setChild('text_left', this.idleText);
    }

    private buildTimeOverText(): void {
        this.timeOverText = Sprite.from('time_over_text.png');
        this.setChild('text_left', this.timeOverText);
    }

    private onGameStateUpdate(state: GameState): void {
        switch (state) {
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
    private onGameStart(): void {
        this.hideWhiteBlocker();
    }

    private onTimerOver(): void {
        this.showBlackBlocker(false);
        tweenToCell(this, this.timeOverText, 'text_show');

        delayRunnable(3, () => {
            this.hideBlackBlocker();
            tweenToCell(this, this.timeOverText, 'text_right', () => {
                lego.event.emit(ForegroundEvents.TimeOverTextHideComplete);
                this.setChild('text_left', this.timeOverText);
            });
        })

        // const prize = new PrizeContainer()
        // lego.event.emit(ForegroundEvents.PrizeShown);
        // this.setChild('prize', prize);
        // const img = Sprite.from('prize.png');
        // img.anchor.set(0.5);
        // this.setChild('prize', img);
    }

    private onGameIdleStateUpdate(state: IdleState): void {
        if (state === IdleState.Idle) {
            this.showBlackBlocker();
            tweenToCell(this, this.idleText, 'text_show');
        } else {
            this.hideBlackBlocker();
            tweenToCell(this, this.idleText, 'text_right', () => {
                this.setChild('text_left', this.idleText);
            });
        }
    }

    private showBlackBlocker(emitEvent = true): void {
        this.blackBlocker.visible = true;
        anime({
            targets: this.blackBlocker,
            alpha: 0.7,
            duration: 200,
            easing: 'linear',
            complete: () => {
                this.blackBlocker.eventMode = 'static';
                if (emitEvent) {
                    this.blackBlocker.on('pointerdown', () => {
                        lego.event.emit(ForegroundEvents.BlackBlockerClicked);
                    });
                }
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

    private showWhiteBlocker(alpha = 0.4): void {
        this.whiteBlocker.visible = true;
        anime({
            targets: this.whiteBlocker,
            alpha,
            duration: 200,
            easing: 'linear',
            complete: () => {
                this.whiteBlocker.eventMode = 'static';
            },
        });
    }
}
