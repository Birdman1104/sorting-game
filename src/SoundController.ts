import { lego } from '@armathai/lego';
import { Howl } from 'howler';
import { delayRunnable } from './Utils';
import { audioAssets } from './assets/assetsNames/audio';
import { BoardEvents, ForegroundEvents } from './events/MainEvents';
import { GameModelEvents } from './events/ModelEvents';
import { GameState } from './models/GameModel';

class SoundControl {
    private sounds: any;
    private canPlayTick: boolean = true;

    public constructor() {
        this.sounds = {};

        lego.event
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
            .on(GameModelEvents.GameTimeUpdate, this.onTimerUpdate, this)
            .on(ForegroundEvents.PrizeShown, this.onPrizeShown, this)
            .on(BoardEvents.Match, this.onMatch, this)
            .on(BoardEvents.Drop, this.onWrongDrop, this)
            .on(BoardEvents.Click, this.onClick, this);
    }

    public loadSounds(): void {
        audioAssets.forEach(({ name, path }) => {
            const volume = name === 'wrongDrop' ? 0.5 : name === 'theme' ? 0.2 : 1;
            this.sounds[name] = new Howl({ src: path, volume });
        });
    }

    private onTimerUpdate(time: number): void {
        if (time > 10000) return;
        if (this.canPlayTick) {
            this.sounds.timer.play();
            this.canPlayTick = false;
            delayRunnable(1, () => {
                this.canPlayTick = true;
            });
        }
    }

    private onMatch(): void {
        this.sounds.match.play();
    }

    private onPrizeShown(): void {
        this.sounds.prize.play();
    }

    private onClick(): void {
        this.sounds.tap.play();
    }

    private onWrongDrop(): void {
        this.sounds.wrongDrop.play();
    }

    private onGameStateUpdate(state): void {
        if(state === GameState.Game) {
            this.sounds.theme.play();
        } else {
            this.sounds.theme.stop();
        }
    }
}

const SoundController = new SoundControl();
export default SoundController;
