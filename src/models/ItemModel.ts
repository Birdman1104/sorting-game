import { ObservableModel } from './ObservableModel';

export enum ITEM_TYPE {
    A = '1',
    B = '2',
    C = '3',
    D = '4',
    E = '5',
}

export class ItemModel extends ObservableModel {
    constructor(private _type: ITEM_TYPE) {
        super('ItemModel');
        this.makeObservable();
    }

    get type(): ITEM_TYPE {
        return this._type;
    }

    set type(value: ITEM_TYPE) {
        this._type = value;
    }
}
