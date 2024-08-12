import { KEYS } from '../configs/KeyboardViewConfig';
import { ObservableModel } from './ObservableModel';

export class ValidationModel extends ObservableModel {
    private _typedText = '';
    private _isConfirmed = false;

    constructor() {
        super('ValidationModel');

        this.makeObservable();
    }

    get typedText(): string {
        return this._typedText;
    }

    set typedText(value: string) {
        this._typedText = value;
    }

    get isConfirmed(): boolean {
        return this._isConfirmed;
    }

    set isConfirmed(value: boolean) {
        this._isConfirmed = value;
    }
    public updateTypedText(keyCode: string): void {
        if (this._typedText.length === 16) return;
        const char = keyCode === ' ' ? keyCode : KEYS[keyCode];
        this._typedText = `${this._typedText}${char}`;
    }

    public clearTypedText(): void {
        this._typedText = '';
    }

    public clearLastChar(): void {
        if (this._typedText.length === 0) return;
        this._typedText = this._typedText.slice(0, this._typedText.length - 1);
    }

    public init(): void {
        //
    }

    public async checkCode(code: string): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(code === '1234');
            }, 1000);
        });
    }
}

const codeCheckingImitation = (code: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const rnd = Math.random();
        setTimeout(() => {
            rnd > 0.7 ? resolve(true) : reject(false);
        }, 1000);
    });
};
