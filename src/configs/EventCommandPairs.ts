import { lego } from '@armathai/lego';
import { BoardEvents, ForegroundEvents, KeyboardEvents, MainGameEvents, ValidationPopupEvents } from '../events/MainEvents';
import { GameModelEvents, ValidationModelEvents } from '../events/ModelEvents';
import Head from '../models/HeadModel';
import { onBoardClickCommand, onMatchCommand } from './commands/BoardCommands';
import { onBlackBlockerClickedCommand, onRightAnimationCompleteCommand } from './commands/ForegroundCommands';
import { onGameStateUpdateCommand, onIdleStateUpdateCommand } from './commands/GameModelCommands';
import { onKeyClickedCommand } from './commands/KeyboardCommands';
import { isConfirmedUpdateCommand, onSubmitButtonClickedCommand } from './commands/ValidationPopupCommands';

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
        event: KeyboardEvents.KeyClicked,
        command: onKeyClickedCommand,
    },
    {
        event: ValidationPopupEvents.SubmitButtonClicked,
        command: onSubmitButtonClickedCommand,
    },
    {
        event: ValidationModelEvents.IsConfirmedUpdate,
        command: isConfirmedUpdateCommand,
    },
    {
        event: ForegroundEvents.RightAnimationComplete,
        command: onRightAnimationCompleteCommand,
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
        event: BoardEvents.Match,
        command: onMatchCommand,
    },
]);
