import { CellScale } from '@armathai/pixi-grid';
import { isSquareLikeScreen, lp } from '../../Utils';

export const getForegroundGridConfig = () => {
    return lp(getForegroundGridLandscapeConfig, getForegroundGridPortraitConfig).call(null);
};

const getForegroundGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    const prizeTextBounds = isSquareLikeScreen() ?  { x: 0.2, y: 0.25, width: 0.6, height: 0.2 } : { x: 0.2, y: 0.15, width: 0.6, height: 0.25 };
    const prizeBounds = isSquareLikeScreen() ?  { x: 0.2, y: 0.45, width: 0.6, height: 0.25 }: { x: 0.2, y: 0.4, width: 0.6, height: 0.35 };
    return {
        name: 'foreground',
        // debug: { color: 0xff5027 },
        bounds,
        cells: [
            {
                name: 'prize_text',
                scale: CellScale.fit,
                bounds: prizeTextBounds,
            },
            {
                name: 'prize',
                bounds: prizeBounds,
            },
            {
                name: 'text_left',
                scale: CellScale.fill,
                bounds: { x: -2, y: 0.1, width: 0.3, height: 0.8 },
            },
            {
                name: 'text_show',
                bounds: { x: 0.2, y: 0.1, width: 0.6, height: 0.8 },
            },
            {
                name: 'text_right',
                bounds: { x: 1, y: 0.1, width: 0.6, height: 0.8 },
            },
        ],
    };
};

const getForegroundGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'foreground',
        // debug: { color: 0xff5027 },
        bounds,
        cells: [
            {
                name: 'prize_text',
                scale: CellScale.fit,
                bounds: { x: 0.2, y: 0.1, width: 0.6, height: 0.25 },
            },
            {
                name: 'prize',
                bounds: { x: 0.2, y: 0.4, width: 0.6, height: 0.4 },
            },
            {
                name: 'text_left',
                scale: CellScale.fill,
                bounds: { x: -2, y: 0.2, width: 0.3, height: 0.6 },
            },
            {
                name: 'text_show',
                bounds: { x: 0.2, y: 0.2, width: 0.6, height: 0.6 },
            },
            {
                name: 'text_right',
                bounds: { x: 1, y: 0.2, width: 0.8, height: 0.6 },
            },
        ],
    };
};
