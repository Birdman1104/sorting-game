export const WindowEvent = {
    Resize: 'WindowEventResize',
    FocusChange: 'WindowEventFocusChange',
};

export const MainGameEvents = {
    Resize: 'MainGameEventsResize',
    Mute: 'MainGameEventsMute',
    MainViewReady: 'MainGameEventsMainViewReady',
    Error: 'MainGameEventsError',
};

export const ForegroundEvents = {
    TimeOverTextHideComplete: 'ForegroundEventsTimeOverTextHideComplete',
    BlackBlockerClicked: 'ForegroundEventsBlackBlockerClicked',
    PrizeShown: 'ForegroundEventsPrizeShown',
    PrizeTextureLoaded: 'ForegroundEventsPrizeTextureLoaded',
};

export const BoardEvents = {
    Click: 'BoardEventsClick',
    Match: 'BoardEventsMatch',
    Move: 'BoardEventsMove',
    Drop: 'BoardEventsDrop',
};
