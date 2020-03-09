import { imgLoader } from './load';

export default {
    flame: {
        frames: imgLoader('assets/animations/flame')(['flame1.png', 'flame2.png', 'flame3.png', 'flame4.png']),
    },
    pointer: {
        frames: imgLoader('assets/animations/pointer')(['pointer.png']),
    },
};
