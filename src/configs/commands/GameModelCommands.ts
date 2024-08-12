import { lego } from '@armathai/lego';
import { GameState } from '../../models/GameModel';
import Head from '../../models/HeadModel';

export const onGameStateUpdateCommand = (state: GameState) => {
    switch (state) {
        case GameState.Validation:
            lego.command.execute(initValidationCommand);
            break;

        default:
            break;
    }
};

const initValidationCommand = () => {
    Head.gameModel.initValidationModel();
};
