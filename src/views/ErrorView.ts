import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getErrorViewGridConfig } from '../configs/gridConfigs/ErrorViewGC';
import { MainGameEvents } from '../events/MainEvents';
import { ErrorMessage } from './ErrorMessage';

export class ErrorView extends PixiGrid {
    private errorMessage: ErrorMessage;

    constructor() {
        super();

        lego.event.on(MainGameEvents.Error, this.onError, this);
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getErrorViewGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
        this.errorMessage?.rebuild();
    }

    private build(): void {
        this.buildErrorMessageView()
    }

    private buildErrorMessageView(): void {
        this.errorMessage = new ErrorMessage();
        this.errorMessage.alpha = 0;
        this.errorMessage.visible = false;
        this.setChild('message', this.errorMessage);
    }

    private onError(message: string): void {
        this.errorMessage.alpha = 1;
        this.errorMessage.visible = true;
        this.errorMessage.setMessage(message)
    }
}
