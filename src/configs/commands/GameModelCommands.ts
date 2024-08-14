import { lego } from '@armathai/lego';
import { GameState, IdleState } from '../../models/GameModel';
import Head from '../../models/HeadModel';

export const onGameStateUpdateCommand = (state: GameState) => {
    switch (state) {
        case GameState.Validation:
            lego.command.execute(initValidationCommand);
            break;
        case GameState.Game:
            lego.command.execute(initializeForGameCommand);
            break;
        case GameState.TimeOver:
            lego.command.execute(onTimerOverCommand);
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

const initValidationCommand = () => {
    Head.gameModel.initValidationModel();
};

const initializeForGameCommand = () => {
    Head.gameModel.initializeForGame();
};

const onTimerOverCommand = () => {
    Head.gameModel.destroyBoardModel();
    Head.gameModel.getPrize();
};
