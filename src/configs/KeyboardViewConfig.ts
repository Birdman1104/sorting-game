export enum KEYS {
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    V,
    W,
    X,
    Y,
    Z,

    SPACE,
    ENTER,
    BACKSPACE,

    CLOSE,
}

export const KEYBOARD_CONFIG = [
    // FIRST ROW
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

    // SECOND ROW
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

    // THIRD ROW
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
        { value: KEYS.SPACE, x: 255 },
        { value: KEYS.ENTER, x: 755 },
    ],
];
