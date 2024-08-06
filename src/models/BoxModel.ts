import { ItemModel } from './ItemModel';
import { ObservableModel } from './ObservableModel';

export class BoxModel extends ObservableModel {
    private _i: number;
    private _j: number;
    private _elements: ItemModel[] = [];

    constructor(private config: BoxModelConfig) {
        super('BoxModel');

        this._i = config.i;
        this._j = config.j;

        this.makeObservable();
    }

    get i(): number {
        return this._i;
    }

    get j(): number {
        return this._j;
    }

    get elements(): ItemModel[] {
        return this._elements;
    }

    public initialize(): void {
        this._elements = this.config.elements.map((element) => new ItemModel(element));
    }
}
