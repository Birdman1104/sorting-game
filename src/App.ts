import { lego, legoLogger } from '@armathai/lego';
import { PixiStatsPlugin } from '@armathai/pixi-stats';
import { Application, Assets } from 'pixi.js';
import PixiStage from './MainStage';
import SoundController from './SoundController';
import { fitDimension } from './Utils';
import { assets } from './assets/assetsNames/assets';
import { check, fetchProductsData } from './backend/fetch';
import { mapCommands } from './configs/EventCommandPairs';
import { ScreenSizeConfig } from './configs/ScreenSizeConfig';
import { GAME_CONFIG } from './configs/constants';
import { MainGameEvents, WindowEvent } from './events/MainEvents';

export const GLOBAL_DATA: GlobalData = {
    ASSETS: [],
    TEXTURES: [],
};
class App extends Application {
    public stage: PixiStage;

    public constructor() {
        super({
            backgroundColor: 0xffffff,
            backgroundAlpha: 0,
            powerPreference: 'high-performance',
            antialias: true,
            resolution: Math.max(window.devicePixelRatio || 1, 2),
            sharedTicker: true,
        });
    }

    public async init(): Promise<void> {
        alert('init')
        this.stage = new PixiStage();
        // @ts-ignore
        this.view.classList.add('gameCss');

        // @ts-ignore
        const div = document.getElementsByClassName('canvas-game')[0];
        // @ts-ignore
        div.appendChild(this.view);

        this.renderer.plugins.interaction.autoPreventDefault = false;

        globalThis.__PIXI_APP__ = this;
        if (process.env.NODE_ENV !== 'production') {
            this.initStats();
            // this.initLego();
        }
        const { start, free } = await check();

        GAME_CONFIG.CAN_PLAY = start;
        GAME_CONFIG.FREE = free;

        if (!GAME_CONFIG.CAN_PLAY) {
            this.showCannotPlay();
        } else {
            const { data } = await fetchProductsData();
            GLOBAL_DATA.ASSETS = data;
            await this.loadAssets();
            this.startGame();
        }
    }

    private async loadAssets(): Promise<void> {
        for (const key in GLOBAL_DATA.ASSETS) {
            const texture = await Assets.load(GLOBAL_DATA.ASSETS[key].url);
            GLOBAL_DATA.TEXTURES[key] = {
                key: `${parseInt(key) + 1}`,
                texture,
            };
        }

        for (const asset of assets) {
            const { name, path } = asset;
            Assets.add(name, path);
            await Assets.load(name);
        }
        // for (const atlas of atlases) {
        //     const { name, json } = atlas;
        //     Assets.add(name, json);
        //     await Assets.load(name);
        // }
        SoundController.setupSounds();
    }

    public appResize(): void {
        const { clientWidth: w, clientHeight: h } = document.body;
        if (w === 0 || h === 0) return;

        const { min, max } = ScreenSizeConfig.size.ratio;
        const { width, height } = fitDimension({ width: w, height: h }, min, max);

        this.resizeCanvas(width, height);
        this.resizeRenderer(width, height);

        this.stage.resize();

        lego.event.emit(MainGameEvents.Resize);
    }

    public onFocusChange(focus: boolean): void {
        lego.event.emit(WindowEvent.FocusChange, focus);
        this.muteSound(!focus);
    }

    public onVisibilityChange(): void {
        this.muteSound(document.visibilityState !== 'visible');
    }

    public muteSound(value: boolean): void {
        lego.event.emit(MainGameEvents.Mute, value);
    }

    private showCannotPlay(): void {
        this.appResize();
        this.stage.showCannotPlay();
    }

    private startGame(): void {
        this.muteSound(document.visibilityState !== 'visible');
        this.appResize();
        this.stage.startGame();
        lego.command.execute(mapCommands);
        lego.event.emit(MainGameEvents.MainViewReady);
    }

    private resizeCanvas(width: number, height: number): void {
        const { style } = this.renderer.view;
        if (!style) return;
        style.width = `${width}px`;
        style.height = `${height}px`;
    }

    private resizeRenderer(width: number, height: number): void {
        this.renderer.resize(width, height);
    }

    private initLego(): void {
        legoLogger.start(lego, Object.freeze({}));
        // lego.command.execute(onGameInitCommand);
        // lego.event.emit(MainGameEvents.Init);
    }

    private initStats(): void {
        //@ts-ignore
        const stats = new PixiStatsPlugin(this);
        document.body.appendChild(stats.stats.dom);
        this.ticker.add(() => stats.stats.update());
    }
}

export default App;
