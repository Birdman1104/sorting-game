import { lego } from '@armathai/lego';
import { GameState } from '../../models/GameModel';
import { setGameStateCommand } from './GameModelCommands';

export const onRightAnimationCompleteCommand = () => {
    lego.command.payload(GameState.Game).execute(setGameStateCommand);
};

export const onBlackBlockerClickedCommand = () => {
    //
};
