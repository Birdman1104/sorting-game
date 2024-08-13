export const BoardModelEvents = {
    BoxesUpdate: 'BoardModelBoxesUpdate',
    MatchedItemsUpdate: 'BoardModelMatchedItemsUpdate',
};

export const GameModelEvents = {
    BoardUpdate: 'GameModelBoardUpdate',
    ValidationUpdate: 'GameModelValidationUpdate',
    StateUpdate: 'GameModelStateUpdate',
    TimerRunnableUpdate: 'GameModelTimerRunnableUpdate',
    GameTimeUpdate: 'GameModelGameTimeUpdate',
};

export const HeadModelEvents = { GameModelUpdate: 'HeadModelGameModelUpdate' };

export const ItemModelEvents = { TypeUpdate: 'ItemModelTypeUpdate' };

export const ValidationModelEvents = {
    TypedTextUpdate: 'ValidationModelTypedTextUpdate',
    IsConfirmedUpdate: 'ValidationModelIsConfirmedUpdate',
};
