import { lego } from '@armathai/lego';
import { Howl } from 'howler';
import { delayRunnable } from './Utils';
import { MATCH_SOUND } from './base64/sounds/match';
import { PRIZE_SOUND } from './base64/sounds/prize';
import { TAP_SOUND } from './base64/sounds/tap';
import { THEME_SOUND } from './base64/sounds/theme';
import { TIMER_SOUND } from './base64/sounds/timer';
import { DROP_SOUND } from './base64/sounds/wrongDrop';
import { BoardEvents, ForegroundEvents, MainGameEvents } from './events/MainEvents';
import { GameModelEvents } from './events/ModelEvents';

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
            .on(MainGameEvents.Mute, this.onMute, this)
            .on(BoardEvents.Click, this.onClick, this);
    }

    public loadSounds(): void {
        this.sounds.timer = new Howl({ src: TIMER_SOUND, volume: 0.8 });
        this.sounds.match = new Howl({ src: MATCH_SOUND });
        this.sounds.prize = new Howl({ src: PRIZE_SOUND });
        this.sounds.tap = new Howl({ src: TAP_SOUND });
        this.sounds.theme = new Howl({ src: THEME_SOUND, loop: true, volume: 0.2 });
        this.sounds.wrongDrop = new Howl({ src: DROP_SOUND, volume: 0.5 });  
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
        // if(state === GameState.Game) {
        //     this.sounds.theme.play();
        // } else {
        //     this.sounds.theme.stop();
        // }
    }

    private onMute(muted: boolean): void {
        for (const [key, value] of Object.entries(this.sounds)) {
            // @ts-ignore
            value.volume(muted ? 0 : this.getVolume(key));
        }
    }

    private getVolume(name: string): number {
        return name === 'wrongDrop' ? 0.5 : name === 'theme' ? 0.2 : 1;
    }
}

const SoundController = new SoundControl();
export default SoundController;
