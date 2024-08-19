import { lego } from '@armathai/lego';
import { Howl } from 'howler';
import { delayRunnable } from './Utils';
import { audioAssets } from './assets/assetsNames/audio';
import { GameModelEvents } from './events/ModelEvents';

class SoundControl {
    private sounds: any;
    private canPlayTick: boolean = true;

    public constructor() {
        this.sounds = {};

        lego.event.on(GameModelEvents.GameTimeUpdate, this.onTimerUpdate, this);
    }

    public loadSounds(): void {
        audioAssets.forEach(({ name, path }) => {
            this.sounds[name] = new Howl({ src: path });
        });
    }

    private onTimerUpdate(time: number): void {
        if(time > 10000) return;
        if(this.canPlayTick) {
            this.sounds.timer.play();
            this.canPlayTick = false;
            delayRunnable(1, () => {
                this.canPlayTick = true;
            })
        }
    }
}

const SoundController = new SoundControl();
export default SoundController;
