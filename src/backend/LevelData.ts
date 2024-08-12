import { shuffle } from '../Utils';
import { ItemType } from '../models/ItemModel';

const ITEMS = [ItemType.A, ItemType.B, ItemType.C, ItemType.D, ItemType.E];

function isValid(array) {
    for (let i = 0; i < array.length - 2; i++) {
        if (array[i] === array[i + 1] && array[i + 1] === array[i + 2]) {
            return false;
        }
    }
    return true;
}

function shuffleWithValidation(array) {
    let shuffledArray = [...array];
    do {
        shuffle(shuffledArray);
    } while (!isValid(shuffledArray));

    return shuffledArray;
}

export function getElementsData(): string[][][] {
    let elements: any[] = [];
    const amount = 27;
    const boxes: any[][] = [
        [[], [], []],
        [[], [], []],
        [[], [], []],
    ];

    for (let i = 0; i < amount; i++) {
        elements.push(ITEMS[Math.floor(Math.random() * ITEMS.length)]);
    }

    elements = shuffleWithValidation(elements);

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
    // 5% chance for 1 items
    // 60% chance for 2 items
    // 35% chance for 3 items
    const rnd = Math.random();
    return rnd < 0.05 ? 1 : rnd < 0.65 ? 2 : 3;
}
