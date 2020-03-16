import { initApp } from './base';
import { createLevel } from '.';

let level;

export const setLevel = newLevel => {
    level = newLevel;
};

const handleLoad = () => {
    //
};

const handleStart = () => {
    setLevel(createLevel(levels.level1));
};

const handleResize = () => {
    // w = app.data.width;
    // h = app.data.height;
};

const handleUpdate = dt => {
    level.update(dt);
};

const handleRender = () => {
    ctx.fillStyle = '#966';
    ctx.beginPath();
    ctx.rect(0, 0, app.data.width, app.data.height);
    ctx.fill();


    level.render();

    dbg.fillText(`tps: ${app.data.tps}`, 20, 20);
    dbg.fillText(`fps: ${app.data.fps}`, 20, 35);
};

export const app = initApp({
    root: document.getElementById('root'),
    handleLoad,
    handleStart,
    handleResize,
    handleUpdate,
    handleRender,
});

export const ctx = app.layer().ctx;
export const ctx_tiles = app.layer({ clear: false }).ctx;
export const dbg = app.layer({ global: true }).ctx;
