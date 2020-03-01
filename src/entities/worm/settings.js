import { imgLoader } from '../../load';

const img = imgLoader('assets/enemies/worm');

export default {
    width: 0.4,
    height: 0.4,
    rendWidth: 1,
    rendHeight: 1.5,
    speed: 1.2,
    frames: img(['worm1.png', 'worm2.png', 'worm3.png', 'worm4.png']),
    deadFrames: img(['worm_dead1.png', 'worm_dead2.png', 'worm_dead3.png', 'worm_dead4.png', 'worm_dead5.png']),
};
