export enum KEYS {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    E = 'E',
    F = 'F',
    G = 'G',
    H = 'H',
    I = 'I',
    J = 'J',
    K = 'K',
    L = 'L',
    M = 'M',
    N = 'N',
    O = 'O',
    P = 'P',
    Q = 'Q',
    R = 'R',
    S = 'S',
    T = 'T',
    U = 'U',
    V = 'V',
    W = 'W',
    X = 'X',
    Y = 'Y',
    Z = 'Z',

    ONE = '1',
    TWO = '2',
    THREE = '3',
    FOUR = '4',
    FIVE = '5',
    SIX = '6',
    SEVEN = '7',
    EIGHT = '8',
    NINE = '9',
    ZERO = '0',

    SPACE = ' ',
    ENTER = 'ENTER',
    BACKSPACE = 'BACKSPACE',
}

export const KEYBOARD_CONFIG = [
    // FIRST ROW
    [
        { value: KEYS.ONE, x: 0 },
        { value: KEYS.TWO, x: 100 },
        { value: KEYS.THREE, x: 200 },
        { value: KEYS.FOUR, x: 300 },
        { value: KEYS.FIVE, x: 400 },
        { value: KEYS.SIX, x: 500 },
        { value: KEYS.SEVEN, x: 600 },
        { value: KEYS.EIGHT, x: 700 },
        { value: KEYS.NINE, x: 800 },
        { value: KEYS.ZERO, x: 900 },

        // { value: KEYS.CLOSE, x: 1050 },
    ],
    // SECOND ROW
    [
        { value: KEYS.Q, x: 0 },
        { value: KEYS.W, x: 100 },
        { value: KEYS.E, x: 200 },
        { value: KEYS.R, x: 300 },
        { value: KEYS.T, x: 400 },
        { value: KEYS.Y, x: 500 },
        { value: KEYS.U, x: 600 },
        { value: KEYS.I, x: 700 },
        { value: KEYS.O, x: 800 },
        { value: KEYS.P, x: 900 },

        // { value: KEYS.CLOSE, x: 1050 },
    ],

    // THIRD ROW
    [
        { value: KEYS.A, x: 50 },
        { value: KEYS.S, x: 150 },
        { value: KEYS.D, x: 250 },
        { value: KEYS.F, x: 350 },
        { value: KEYS.G, x: 450 },
        { value: KEYS.H, x: 550 },
        { value: KEYS.J, x: 650 },
        { value: KEYS.K, x: 750 },
        { value: KEYS.L, x: 850 },
    ],

    // FORTH ROW
    [
        { value: KEYS.Z, x: 150 },
        { value: KEYS.X, x: 250 },
        { value: KEYS.C, x: 350 },
        { value: KEYS.V, x: 450 },
        { value: KEYS.B, x: 550 },
        { value: KEYS.N, x: 650 },
        { value: KEYS.M, x: 750 },
        { value: KEYS.BACKSPACE, x: 875 },
    ],

    // BOTTOM ROW
    [
        { value: KEYS.SPACE, x: 375 },
        { value: KEYS.ENTER, x: 755 },
    ],
];
