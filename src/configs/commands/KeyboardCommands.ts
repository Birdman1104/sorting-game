import { lego } from '@armathai/lego';
import Head from '../../models/HeadModel';
import { KEYS } from '../KeyboardViewConfig';

export const onKeyClickedCommand = (key: KEYS) => {
    switch (key) {
        case KEYS.SPACE:
            lego.command
                //
                .payload(' ')
                .execute(updateTypedTextCommand);
            break;
        case KEYS.BACKSPACE:
            lego.command
                //
                .execute(clearLastChar);
            break;
        case KEYS.ENTER:
        //

            break;
        default:
            lego.command
                //
                .payload(key)
                .execute(updateTypedTextCommand);
            break;
    }
};

const updateTypedTextCommand = (char: string): void => Head.gameModel?.validation?.updateTypedText(char);
const clearLastChar = (): void => Head.gameModel?.validation?.clearLastChar();

export const isNumberKey = (value: KEYS | string): boolean => {
    return (
        value === KEYS.ONE ||
        value === KEYS.TWO ||
        value === KEYS.THREE ||
        value === KEYS.FOUR ||
        value === KEYS.FIVE ||
        value === KEYS.SIX ||
        value === KEYS.SEVEN ||
        value === KEYS.EIGHT ||
        value === KEYS.NINE ||
        value === KEYS.ZERO
    );
};
