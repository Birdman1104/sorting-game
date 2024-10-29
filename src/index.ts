import App from './App';

window.addEventListener('startIntDevelsGameStandalone', () => {
    window.game = new App();
    window.game.init();
    // some random comment

    window.addEventListener('resize', () => window.game.appResize());
    window.addEventListener('orientationchange', () => window.game.appResize());
    window.addEventListener('visibilitychange', (e) => window.game.onVisibilityChange(e));
    window.addEventListener('focus', () => window.game.onFocusChange(true));
    window.addEventListener('blur', () => window.game.onFocusChange(false));
});
