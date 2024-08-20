import { lego } from '@armathai/lego';
import { GameState, IdleState } from '../../models/GameModel';
import Head from '../../models/HeadModel';
import { setGameStateCommand } from './GameModelCommands';

export const onRightAnimationCompleteCommand = () => {
    lego.command.payload(GameState.Game).execute(setGameStateCommand);
};

export const onTimeOverTextHideCompleteCommand = () => {
    lego.command.payload(GameState.GameResult).execute(setGameStateCommand);
};

export const onBlackBlockerClickedCommand = () => {
    Head.gameModel.idleState = IdleState.Play;
    Head.gameModel.resetIdleTime();
};
