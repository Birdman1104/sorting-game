import { lego } from '@armathai/lego';
import { GameState, IdleState } from '../../models/GameModel';
import Head from '../../models/HeadModel';

export const onGameStateUpdateCommand = (state: GameState) => {
    switch (state) {
        case GameState.Game:
            lego.command.execute(initializeForGameCommand);
            break;
        case GameState.TimeOver:
            // lego.command.execute(onTimerOverCommand);
            break;
        case GameState.GameResult:
            lego.command.execute(onGameResultCommand);
            break;

        default:
            break;
    }
};

export const setGameStateCommand = (state: GameState) => {
    Head.gameModel.state = state;
};

export const onIdleStateUpdateCommand = (state: IdleState) => {
    // if (state === IdleState.Idle) {
    // Head.gameModel.stopTimer();
    // }
};

const initializeForGameCommand = () => {
    Head.gameModel.initializeForGame();
};

const onGameResultCommand = () => {
    Head.gameModel.destroyBoardModel();
    Head.gameModel.getPrize();
};
