import { getElementsData } from '../backend/LevelData';
import { BoxModel } from './BoxModel';
import { ItemType } from './ItemModel';
import { ObservableModel } from './ObservableModel';

export class BoardModel extends ObservableModel {
    private _boxes: BoxModel[] = [];
    private _matchedItems: ItemType[] = []

    constructor() {
        super('BoardModel');

        this.makeObservable();
    }

    get boxes(): BoxModel[] {
        return this._boxes;
    }

    set boxes(value: BoxModel[]) {
        this._boxes = value;
    }

    get matchedItems(): ItemType[] {
        return this._matchedItems;
    }

    set matchedItems(value: ItemType[]) {
        this._matchedItems = value;
    }

    public initialize(): void {
        const data = getElementsData();
        const temp: BoxModel[] = [];
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                const boxModel = new BoxModel({ i, j, elements: data[i][j] });
                boxModel.initialize();
                temp.push(boxModel);
            }
        }
        // const reserveData = getElementsData();
        // for (let i = 0; i < data.length; i++) {
        //     for (let j = 0; j < data[i].length; j++) {
        //         this._reserve.push(reserveData[i][j]);
        //     }
        // }

        // const reserveData = getElementsData();
        // for (let i = 0; i < data.length; i++) {
        //     for (let j = 0; j < data[i].length; j++) {
        //         temp[i * 3 + j].addReserveItems(reserveData[i][j]);
        //     }
        // }

        this._boxes = temp;

    }
}
