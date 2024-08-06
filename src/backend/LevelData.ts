import { shuffle } from '../Utils';
import { ItemType } from '../models/ItemModel';

const ITEMS = [ItemType.A, ItemType.B, ItemType.C, ItemType.D, ItemType.E];

const boxes: any[][] = [
    [[], [], []],
    [[], [], []],
    [[], [], []],
];

export function getElementsData(): string[][][] {
    const elements: any[] = [];
    const amount = 27;

    for (let i = 0; i < amount; i++) {
        const item = Math.floor(Math.random() * ITEMS.length);
        elements.push(ITEMS[item]);
    }

    shuffle(elements);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const itemsAmount = getItemsAmount();
            const box = boxes[i][j];
            for (let k = 0; k < itemsAmount; k++) {
                box.push(elements.pop());
            }
        }
    }

    return boxes;
}

function getItemsAmount(): number {
    // 10% chance for 1 items
    // 65% chance for 2 items
    // 25% chance for 3 items
    const rnd = Math.random();
    return rnd < 0.1 ? 1 : rnd < 0.75 ? 2 : 3;
}
