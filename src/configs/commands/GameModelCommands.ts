import { lego } from '@armathai/lego';
import { GameState } from '../../models/GameModel';
import Head from '../../models/HeadModel';

export const onGameStateUpdateCommand = (state: GameState) => {
    switch (state) {
        case GameState.Validation:
            lego.command.execute(initValidationCommand);
            break;
        case GameState.Game:
            lego.command.execute(initializeForGameCommand);
            break;

        default:
            break;
    }
};

export const setGameStateCommand = (state: GameState) => {
    Head.gameModel.state = state;
};

const initValidationCommand = () => {
    Head.gameModel.initValidationModel();
};

const initializeForGameCommand = () => {
    Head.gameModel.initializeForGame();
};
