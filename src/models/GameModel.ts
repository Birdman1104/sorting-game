import { loopRunnable, removeRunnable } from '../Utils';
import { TIMER } from '../configs/constants';
import { BoardModel } from './BoardModel';
import { ObservableModel } from './ObservableModel';
import { ValidationModel } from './ValidationModel';

export enum GameState {
    Unknown = 'Unknown',
    Validation = 'Validation',
    Game = 'Game',
    TimeOver = 'TimeOver',
    GameResult = 'GameResult',
}

export class GameModel extends ObservableModel {
    private _state: GameState;
    private _board: BoardModel | null = null;
    private _validation: ValidationModel | null = null;

    private _timerRunnable: any;
    private _prize = '';
    private _gameTime = TIMER; // ms

    constructor() {
        super('GameModel');

        this._state = GameState.Unknown;
        this.makeObservable();
    }

    get board(): BoardModel | null {
        return this._board;
    }

    set board(value: BoardModel) {
        this._board = value;
    }

    get validation(): ValidationModel | null {
        return this._validation;
    }

    set validation(value: ValidationModel) {
        this._validation = value;
    }

    get state(): GameState {
        return this._state;
    }

    set state(value: GameState) {
        this._state = value;
    }

    get timerRunnable(): any {
        return this._timerRunnable;
    }

    set timerRunnable(value: any) {
        this._timerRunnable = value;
    }

    get prize(): string {
        return this._prize;
    }

    set prize(value: string) {
        this._prize = value;
    }

    get gameTime(): number {
        return this._gameTime;
    }

    set gameTime(value: number) {
        this._gameTime = value;
    }

    public init(): void {
        this._state = GameState.Validation;
    }

    public initializeForGame(): void {
        this.initBoardModel();
        this.startTimer();
    }

    public initBoardModel(): void {
        this.board = new BoardModel();
        this.board.initialize();
    }

    public destroyBoardModel(): void {
        this._board?.destroy();
        this._board = null;
    }

    public initValidationModel(): void {
        this.validation = new ValidationModel();
        this.validation.initialize();
    }

    public startTimer(): void {
        this._timerRunnable = loopRunnable(this.updateGameTime, this);
    }

    private updateGameTime(ms: number): void {
        if (this._gameTime > 0) {
            this._gameTime -= window.game.ticker.elapsedMS;
        }

        if (this.gameTime <= 0) {
            this._state = GameState.TimeOver;
            this.stopTimer();
        }
    }

    public stopTimer(): void {
        removeRunnable(this._timerRunnable);
        this._timerRunnable = null;
    }

    public async getPrize(): Promise<void> {
        this._prize = await getPrize()
    }
}


const getPrize = (): Promise<string> => {
    return new Promise((resolve) => {
        const rnd = Math.random();
        setTimeout(() => {
            resolve('prize');
        }, 1000);
    });
};
