import { Container, Sprite, Text } from 'pixi.js';
import { KEYS } from '../../configs/KeyboardViewConfig';

export class Key extends Container {
    private bkg: Sprite;

    constructor(private _value: KEYS) {
        super();

        this.buildBkg();
        this.buildLetter();
    }

    get value() {
        return KEYS[this._value];
    }

    private buildBkg(): void {
        this.bkg = Sprite.from(this.getBkgImage());
        // makeSprite({ texture: Images[this.getBkgImage()], anchor: new Point(0, 0) });
        this.bkg.interactive = true;
        this.bkg.anchor.set(0.5);
        this.bkg.scale.set(1.5);
        this.bkg.on('pointerdown', () => {
            this.scale.set(0.9);
            this.emit('key_down', this._value);
        });
        this.bkg.on('pointerup', () => {
            this.scale.set(1);
        });
        this.bkg.on('pointerupoutside', () => {
            this.scale.set(1);
        });
        this.addChild(this.bkg);
    }

    private buildLetter(): void {
        if (this._value === KEYS.SPACE) return;

        let icon;
        if (this._value === KEYS.BACKSPACE || this._value === KEYS.ENTER) {
            icon = Sprite.from(`${KEYS[this._value].toLowerCase()}.png`);
            icon.scale.set(1.4);
        } else  if(this.isNumberKey(this._value)) {
            icon = new Text(this._value, { fontSize: 56 });
        } else {
            icon = new Text(KEYS[this._value], { fontSize: 56 });
        }

        icon.anchor.set(0.5);
        icon.position.set(0, 0);
        this.addChild(icon);
    }

    private getBkgImage(): string {
        switch (this._value) {
            case KEYS.ENTER:
                return 'enter_bkg.png';
            case KEYS.BACKSPACE:
                return 'backspace_bkg.png';
            case KEYS.SPACE:
                return 'space_bkg.png';
            default:
                return 'key_bkg.png';
        }
    }

    private isNumberKey(value: KEYS): boolean {
        return value === KEYS.ONE || value === KEYS.TWO || value === KEYS.THREE || value === KEYS.FOUR || value === KEYS.FIVE || value === KEYS.SIX || value === KEYS.SEVEN || value === KEYS.EIGHT || value === KEYS.NINE || value === KEYS.ZERO;
    }
}
