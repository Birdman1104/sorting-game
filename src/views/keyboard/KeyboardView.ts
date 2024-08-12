import { lego } from '@armathai/lego';
import { Container } from 'pixi.js';
import { KEYBOARD_CONFIG, KEYS } from '../../configs/KeyboardViewConfig';
import { KeyboardEvents } from '../../events/MainEvents';
import { Key } from './Key';

export class KeyboardView extends Container {
    private emitEvent = false;
    private keys: Key[] = [];

    constructor() {
        super();

        this.build();
    }

    get viewName() {
        return 'KeyboardView';
    }

    public canType(value: boolean): void {
        this.emitEvent = value;
    }

    private build(): void {
        this.buildKeys();
    }

    private buildKeys(): void {
        KEYBOARD_CONFIG.forEach((row, i) => {
            row.forEach(({ value, x }) => {
                const key = new Key(value);
                key.position.set(x, i * 72 * 1.7);
                key.on('key_down', (value: KEYS) => this.onKeyClick(value));
                this.keys.push(key);
                this.addChild(key);
            });
        });
    }

    private onKeyClick(value: KEYS): void {
        if (this.emitEvent) {
            lego.event.emit(KeyboardEvents.KeyClicked, value);
        }
    }
}
