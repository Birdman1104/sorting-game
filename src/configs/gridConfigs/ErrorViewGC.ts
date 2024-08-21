import { CellScale } from '@armathai/pixi-grid';
import { lp } from '../../Utils';

export const getErrorViewGridConfig = () => {
    return lp(getErrorViewGridLandscapeConfig, getErrorViewGridPortraitConfig).call(null);
};

const getErrorViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'error',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'message',
                scale: CellScale.showAll,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};

const getErrorViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'error',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'message',
                scale: CellScale.showAll,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};
