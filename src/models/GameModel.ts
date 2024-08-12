import { BoardModel } from './BoardModel';
import { ObservableModel } from './ObservableModel';
import { ValidationModel } from './ValidationModel';

export enum GameState {
    Unknown = 'Unknown',
    Validation = 'Validation',
    Game = 'Game',
    GameOver = 'GameOver',
    GameResult = 'GameResult',
}

export class GameModel extends ObservableModel {
    private _state: GameState;
    private _board: BoardModel | null = null;
    private _validation: ValidationModel | null = null;

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

    public init(): void {
        this._state = GameState.Validation;
    }

    public initializeForGame(): void {
        this.initBoardModel();
    }

    public initBoardModel(): void {
        this.board = new BoardModel();
        this.board.initialize();
    }

    public initValidationModel(): void {
        this.validation = new ValidationModel();
        this.validation.initialize();
    }
}
