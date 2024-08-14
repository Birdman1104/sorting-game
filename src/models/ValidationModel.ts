import { KEYS } from '../configs/KeyboardViewConfig';
import { isNumberKey } from '../configs/commands/KeyboardCommands';
import { ObservableModel } from './ObservableModel';

export class ValidationModel extends ObservableModel {
    private _typedText = '';
    private _isConfirmed: boolean | '' = '';

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

    get isConfirmed(): boolean | '' {
        return this._isConfirmed;
    }

    set isConfirmed(value: boolean) {
        this._isConfirmed = value;
    }

    public updateTypedText(keyCode: string): void {
        if (this._typedText.length === 16) return;
        const char = keyCode === ' ' ? keyCode : isNumberKey(keyCode) ? keyCode : KEYS[keyCode];
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

    public async checkCode(): Promise<boolean> {
        const res = await codeCheckingImitation(this._typedText);
        this._isConfirmed = res;
        return res;
    }
}

const codeCheckingImitation = (code: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const rnd = Math.random();
        setTimeout(() => {
            resolve(code === '' || code.toUpperCase() === 'BIRDMAN' || code.toUpperCase() === 'SORT' || code === '1W2');
        }, 500);
    });
};
