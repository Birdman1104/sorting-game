export const BoardModelEvents = {
    BoxesUpdate: 'BoardModelBoxesUpdate',
    MatchedItemsUpdate: 'BoardModelMatchedItemsUpdate',
};

export const BoxModelEvents = { ElementsUpdate: 'BoxModelElementsUpdate' };

export const GameModelEvents = {
    ScoreUpdate: 'GameModelScoreUpdate',
    BoardUpdate: 'GameModelBoardUpdate',
    StateUpdate: 'GameModelStateUpdate',
    IdleStateUpdate: 'GameModelIdleStateUpdate',
    TimerRunnableUpdate: 'GameModelTimerRunnableUpdate',
    PrizeUpdate: 'GameModelPrizeUpdate',
    GameTimeUpdate: 'GameModelGameTimeUpdate',
    IdleTimeUpdate: 'GameModelIdleTimeUpdate',
};

export const HeadModelEvents = { GameModelUpdate: 'HeadModelGameModelUpdate' };

export const ItemModelEvents = { TypeUpdate: 'ItemModelTypeUpdate' };
