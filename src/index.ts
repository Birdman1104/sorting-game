import App from './App';

// TODO - change to button event
// @ts-ignore
// window.addEventListener('load', () => {
window.addEventListener('startIntDevelsGame', () => {
    window.game = new App();
    window.game.init();

    window.addEventListener('resize', () => window.game.appResize());
    window.addEventListener('orientationchange', () => window.game.appResize());
    window.addEventListener('visibilitychange', (e) => window.game.onVisibilityChange(e));
    window.addEventListener('focus', () => window.game.onFocusChange(true));
    window.addEventListener('blur', () => window.game.onFocusChange(false));
});
