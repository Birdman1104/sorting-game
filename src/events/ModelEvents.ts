export const BoardModelEvents = {
    BoxesUpdate: 'BoardModelBoxesUpdate',
    MatchedItemsUpdate: 'BoardModelMatchedItemsUpdate',
};

export const BoxModelEvents = { ElementsUpdate: 'BoxModelElementsUpdate' };

export const GameModelEvents = {
    BoardUpdate: 'GameModelBoardUpdate',
    ValidationUpdate: 'GameModelValidationUpdate',
    StateUpdate: 'GameModelStateUpdate',
    IdleStateUpdate: 'GameModelIdleStateUpdate',
    TimerRunnableUpdate: 'GameModelTimerRunnableUpdate',
    PrizeUpdate: 'GameModelPrizeUpdate',
    GameTimeUpdate: 'GameModelGameTimeUpdate',
};

export const HeadModelEvents = { GameModelUpdate: 'HeadModelGameModelUpdate' };

export const ItemModelEvents = { TypeUpdate: 'ItemModelTypeUpdate' };

export const ValidationModelEvents = {
    TypedTextUpdate: 'ValidationModelTypedTextUpdate',
    IsConfirmedUpdate: 'ValidationModelIsConfirmedUpdate',
};
