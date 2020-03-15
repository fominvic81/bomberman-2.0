import { app, setLevel } from './app';
import { createLevel } from './levelHandler';
import * as levels from './levels';

export {
    createLevel
};

window.app = app;
window.setLevel = setLevel;
window.levels = levels;
window.createLevel = createLevel;

window.onload = () => {
    // app.setCustomTps(300);
    app.start();
};
