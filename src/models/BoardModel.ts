import { getElementsData } from '../backend/LevelData';
import { BoxModel } from './BoxModel';
import { ObservableModel } from './ObservableModel';

export class BoardModel extends ObservableModel {
    private _boxes: BoxModel[] = [];
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

    public initialize(): void {
        const data = getElementsData();
        const temp: BoxModel[] = [];
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                const boxModel = new BoxModel({ i, j, elements: data[i][j] })
                boxModel.initialize();
                temp.push(boxModel);
            }
        }

        this._boxes = temp;
    }
}
