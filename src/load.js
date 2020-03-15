import { app } from './app';

export const img = path => app.img(path);

export const imgLoader = prefix => images => images.map(path => img(`${prefix}/${path}`));
