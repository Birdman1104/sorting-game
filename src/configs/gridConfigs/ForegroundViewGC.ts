import { getWindowSize, lp } from '../../Utils';

export const getForegroundGridConfig = () => {
    return lp(getForegroundGridLandscapeConfig, getForegroundGridPortraitConfig).call(null);
};

const getForegroundGridLandscapeConfig = () => {
    const { width, height } = getWindowSize();
    const bounds = { x: 0, y: 0, width, height };
    return {
        name: 'foreground',
        // debug: { color: 0xff5027 },
        bounds,
        cells: [
            //
        ],
    };
};

const getForegroundGridPortraitConfig = () => {
    const { width, height } = getWindowSize();
    const bounds = { x: 0, y: 0, width, height };

    return {
        name: 'foreground',
        // debug: { color: 0xff5027 },
        bounds,
        cells: [
            //
        ],
    };
};
