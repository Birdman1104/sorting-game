import { ObservableModel } from './ObservableModel';

export enum ItemType {
    A = '1',
    B = '2',
    C = '3',
    D = '4',
    E = '5',
}

export class ItemModel extends ObservableModel {
    constructor(private _type: ItemType) {
        super('ItemModel');
        this.makeObservable();
    }

    get type(): ItemType {
        return this._type;
    }

    set type(value: ItemType) {
        this._type = value;
    }
}
