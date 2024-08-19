import { lego } from '@armathai/lego';
import { BoardEvents, ForegroundEvents, MainGameEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';
import Head from '../models/HeadModel';
import { onBoardClickCommand, onMatchCommand } from './commands/BoardCommands';
import { onBlackBlockerClickedCommand } from './commands/ForegroundCommands';
import { onGameStateUpdateCommand, onIdleStateUpdateCommand } from './commands/GameModelCommands';

export const mapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.on(event, command);
    });
};

export const unMapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.off(event, command);
    });
};

const onMainViewReadyCommand = () => {
    Head.init();
    Head.initGameModel();
};

const eventCommandPairs = Object.freeze([
    {
        event: MainGameEvents.MainViewReady,
        command: onMainViewReadyCommand,
    },
    {
        event: GameModelEvents.StateUpdate,
        command: onGameStateUpdateCommand,
    },
    {
        event: GameModelEvents.IdleStateUpdate,
        command: onIdleStateUpdateCommand,
    },
    {
        event: ForegroundEvents.BlackBlockerClicked,
        command: onBlackBlockerClickedCommand,
    },
    {
        event: BoardEvents.Click,
        command: onBoardClickCommand,
    },
    {
        event: BoardEvents.Move,
        command: onBoardClickCommand,
    },
    {
        event: BoardEvents.Match,
        command: onMatchCommand,
    },
]);
