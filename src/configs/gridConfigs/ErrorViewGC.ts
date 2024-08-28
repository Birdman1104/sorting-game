import { CellScale } from '@armathai/pixi-grid';
import { getModalSize, lp } from '../../Utils';

export const getErrorViewGridConfig = () => {
    return lp(getErrorViewGridLandscapeConfig, getErrorViewGridPortraitConfig).call(null);
};

const getErrorViewGridLandscapeConfig = () => {
    const {width, height} = getModalSize();
    const bounds = { x: 0, y: 0, width, height };

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
    const {width, height} = getModalSize();
    const bounds = { x: 0, y: 0, width, height };
    
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
