import { imgLoader } from '../../load';

const img = imgLoader('assets/enemies/pillow');

export default {
    width: 0.4,
    height: 0.4,
    rendWidth: 1,
    rendHeight: 1.5,
    speed: 2,
    frames: img(['pillow1.png', 'pillow2.png', 'pillow3.png', 'pillow4.png']),
    deadFrames: img(['pillow_dead1.png', 'pillow_dead2.png', 'pillow_dead3.png', 'pillow_dead4.png', 'pillow_dead5.png']),
};
