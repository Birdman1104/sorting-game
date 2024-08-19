import { loopRunnable, removeRunnable } from '../Utils';
import { IDLE_TIME, TIMER } from '../configs/constants';
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

export enum IdleState {
    Idle = 'Idle',
    Play = 'Play',
}

export class GameModel extends ObservableModel {
    private _state: GameState = GameState.Unknown;
    private _board: BoardModel | null = null;
    private _validation: ValidationModel | null = null;

    private _timerRunnable: any;
    private _prize = '';
    private _gameTime = TIMER; // ms

    private _idleTime = IDLE_TIME;
    private _idleState: IdleState;

    constructor() {
        super('GameModel');

        this._state = GameState.Game;
        this._idleState = IdleState.Play;
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

    get idleState(): IdleState {
        return this._idleState;
    }

    set idleState(value: IdleState) {
        this._idleState = value;
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

    get idleTime(): number {
        return this._idleTime;
    }

    set idleTime(value: number) {
        this._idleTime = value;
    }

    public init(): void {
        this.initializeForGame()
        // this._state = GameState.Validation;
    }

    public initializeForGame(): void {
        this.initBoardModel();
        this.startTimer();
        this._idleState = IdleState.Play;
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

    private updateGameTime(): void {
        if (this._idleState === IdleState.Idle) return;

        if (this._idleState === IdleState.Play && this._idleTime > 0 && this._state === GameState.Game) {
            this._idleTime -= window.game.ticker.elapsedMS;
        }

        if (this._idleTime <= 0) {
            this.setToIdleState();
        }

        if (this._gameTime > 0 && this._state === GameState.Game) {
            this._gameTime -= window.game.ticker.elapsedMS;
        }

        if (this.gameTime <= 0 && this._state !== GameState.TimeOver) {
            this._state = GameState.TimeOver;
            this.stopTimer();
        }
    }

    public stopTimer(): void {
        removeRunnable(this._timerRunnable, this);
        this._timerRunnable = null;
    }

    public async getPrize(): Promise<void> {
        this._prize = await getPrize();
    }

    private setToIdleState(): void {
        if (this._state === GameState.Game) {
            this._idleState = IdleState.Idle;
        }
    }

    public resetIdleTime(): void {
        this._idleState = IdleState.Play;
        this._idleTime = IDLE_TIME;
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
