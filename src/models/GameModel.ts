import { BoardModel } from './BoardModel';
import { ObservableModel } from './ObservableModel';

export enum GameState {
    Unknown,
}

export class GameModel extends ObservableModel {
    private _state: GameState;
    private _board: BoardModel;

    constructor() {
        super('GameModel');

        this._state = GameState.Unknown;
        this.makeObservable();
    }

    get board(): BoardModel {
        return this._board;
    }

    set board(value: BoardModel) {
        this._board = value;
    }

    get state(): GameState {
        return this._state;
    }

    set state(value: GameState) {
        this._state = value;
    }

    public init(): void {
        this._state = GameState.Unknown;
        this.board = new BoardModel();
        this.board.initialize();
    }
}
