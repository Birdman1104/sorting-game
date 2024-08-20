import { Container } from 'pixi.js';
import { BackgroundView } from './views/BackgroundView';
import { CannotPlayView } from './views/CannotPlayView';
import { ForegroundView } from './views/ForegroundView';
import { GameView } from './views/GameView';
import { UIView } from './views/UIView';

class PixiStage extends Container {
    private bgView: BackgroundView;
    private gameView: GameView;
    private uiView: UIView;
    private foregroundView: ForegroundView;
    private cannotPlay: CannotPlayView;

    constructor() {
        super();
    }

    public resize(): void {
        this.bgView?.rebuild();
        this.gameView?.rebuild();
        this.uiView?.rebuild();
        this.foregroundView?.rebuild();
        this.cannotPlay?.rebuild();
    }

    public showCannotPlay(): void {
        this.cannotPlay = new CannotPlayView();
        this.addChild(this.cannotPlay);
    }

    public startGame(): void {
        this.bgView = new BackgroundView();
        this.addChild(this.bgView);
        this.gameView = new GameView();
        this.addChild(this.gameView);
        this.uiView = new UIView();
        this.addChild(this.uiView);
        this.foregroundView = new ForegroundView();
        this.addChild(this.foregroundView);
    }
}

export default PixiStage;
