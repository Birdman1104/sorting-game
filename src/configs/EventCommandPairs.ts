import { lego } from '@armathai/lego';
import { KeyboardEvents, MainGameEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';
import Head from '../models/HeadModel';
import { onGameStateUpdateCommand } from './commands/GameModelCommands';
import { onKeyClickedCommand } from './commands/KeyboardCommands';

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
]);
