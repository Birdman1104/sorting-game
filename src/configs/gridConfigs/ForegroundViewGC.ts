import { CellScale } from '@armathai/pixi-grid';
import { lp } from '../../Utils';

export const getForegroundGridConfig = () => {
    return lp(getForegroundGridLandscapeConfig, getForegroundGridPortraitConfig).call(null);
};

const getForegroundGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'foreground',
        // debug: { color: 0xff5027 },
        bounds,
        cells: [
            {
                name: 'prize',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            {
                name: 'blocker',
                scale: CellScale.fill,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            {
                name: 'text_left',
                bounds: { x: -1.2, y: 0.1, width: 0.3, height: 0.8 },
            },
            {
                name: 'text_show',
                bounds: { x: 0.2, y: 0.1, width: 0.6, height: 0.8 },
            },
            {
                name: 'text_right',
                bounds: { x: 1, y: 0.1, width: 0.6, height: 0.8 },
            }
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
                name: 'prize',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            {
                name: 'blocker',
                scale: CellScale.fill,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            {
                name: 'text_left',
                bounds: { x: -2, y: 0.2, width: 0.3, height: 0.6 },
            },
            {
                name: 'text_show',
                bounds: { x: 0.1, y: 0.2, width: 0.8, height: 0.6 },
            },
            {
                name: 'text_right',
                bounds: { x: 1, y: 0.2, width: 0.8, height: 0.6 },
            }
        ],
    };
};
