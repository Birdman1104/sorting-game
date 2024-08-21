import { Container } from 'pixi.js';
import { BackgroundView } from './views/BackgroundView';
import { ErrorView } from './views/ErrorView';
import { ForegroundView } from './views/ForegroundView';
import { GameView } from './views/GameView';
import { UIView } from './views/UIView';

class PixiStage extends Container {
    private bgView: BackgroundView;
    private gameView: GameView;
    private uiView: UIView;
    private foregroundView: ForegroundView;
    private errorView: ErrorView;

    constructor() {
        super();
    }

    public resize(): void {
        this.bgView?.rebuild();
        this.gameView?.rebuild();
        this.uiView?.rebuild();
        this.foregroundView?.rebuild();
        this.errorView?.rebuild();
    }

    public setupErrorView(): void {
        this.errorView = new ErrorView();
        this.addChild(this.errorView);
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
        this.errorView = new ErrorView();
        this.addChild(this.errorView);

        this.resize();
    }
}

export default PixiStage;
