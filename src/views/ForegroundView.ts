import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Assets, Sprite } from 'pixi.js';
import { delayRunnable, tweenToCell } from '../Utils';
import { IDLE_TEXT_IMAGE } from '../base64/images/idleText';
import { PRIZE_TEXT_IMAGE } from '../base64/images/prizeText';
import { TIME_OVER_TEXT_IMAGE } from '../base64/images/timeOverText';
import { DEFAULT_ERROR_MESSAGE, GAME_CONFIG } from '../configs/constants';
import { getForegroundGridConfig } from '../configs/gridConfigs/ForegroundViewGC';
import { ForegroundEvents, MainGameEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState, IdleState } from '../models/GameModel';
import { PrizeContainer } from './PrizeContainer';

export class ForegroundView extends PixiGrid {
    private idleText: Sprite;
    private timeOverText: Sprite;
    private prize: PrizeContainer;

    constructor() {
        super();

        lego.event
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
            .on(GameModelEvents.PrizeUpdate, this.onPrizeUpdate, this)
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
        if (!GAME_CONFIG.FREE) {
            this.buildIdleText();
            this.buildTimeOverText();
        }
    }

    private buildIdleText(): void {
        this.idleText = Sprite.from(IDLE_TEXT_IMAGE);
        this.setChild('text_left', this.idleText);
    }

    private buildTimeOverText(): void {
        this.timeOverText = Sprite.from(TIME_OVER_TEXT_IMAGE);
        this.setChild('text_left', this.timeOverText);
    }

    private onGameStateUpdate(state: GameState): void {
        switch (state) {
            case GameState.Game:
                // this.onGameStart();
                break;
            case GameState.TimeOver:
                this.onTimerOver();
                break;
            case GameState.GameResult:
                this.onGameResult();
                break;

            default:
                break;
        }
    }

    private onTimerOver(): void {
        tweenToCell(this, this.timeOverText, 'text_show');
    }

    private onGameResult(): void {
        this.prize = new PrizeContainer();
        // this.prize.visible = false;
        lego.event.emit(ForegroundEvents.PrizeShown);
        this.setChild('prize', this.prize);
    }

    private onGameIdleStateUpdate(state: IdleState): void {
        if (state === IdleState.Idle) {
            tweenToCell(this, this.idleText, 'text_show');
        } else {
            tweenToCell(this, this.idleText, 'text_right', () => {
                this.setChild('text_left', this.idleText);
            });
        }
    }

    private onPrizeUpdate(prize: { image: string; url: string }): void {
        this.loadPrizeTexture(prize.url);
    }

    private async loadPrizeTexture(url: string): Promise<void> {
        try {
            const prizeTexture = await Assets.load(url);
            delayRunnable(1, () => {
                lego.event.emit(ForegroundEvents.PrizeTextureLoaded, prizeTexture);
                tweenToCell(this, this.timeOverText, 'text_right', () => {
                    lego.event.emit(ForegroundEvents.TimeOverTextHideComplete);
                    this.setChild('text_left', this.timeOverText);
                    this.prize.setPrize(prizeTexture);

                    const prizeText = Sprite.from(PRIZE_TEXT_IMAGE);
                    prizeText.anchor.set(0.5);
                    delayRunnable(0.01, () => {
                        this.setChild('prize_text', prizeText);
                    })

                    this.rebuild();
                });
            });
        } catch (e) {
            lego.event.emit(MainGameEvents.Error, DEFAULT_ERROR_MESSAGE);
        }
    }
}
