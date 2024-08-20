import { CellScale } from '@armathai/pixi-grid';
import { lp } from '../../Utils';

export const getCannotPlayGridConfig = () => {
    return lp(getCannotPlayGridLandscapeConfig, getCannotPlayGridPortraitConfig).call(null);
};

const getCannotPlayGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'cannotPlay',
        // debug: { color: 0xd95027 },
        bounds,
        cells: [
            {
                name: 'text',
                scale: CellScale.fit,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};

const getCannotPlayGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'cannotPlay',
        // debug: { color: 0xd95027 },
        bounds,
        cells: [
            {
                name: 'text',
                scale: CellScale.fit,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};
