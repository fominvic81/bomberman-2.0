import { imgLoader } from '../../load';

const img = imgLoader('assets/enemies/tripod');

export default {
    width: 0.4,
    height: 0.4,
    rendWidth: 1,
    rendHeight: 1.5,
    speed: 2.5,
    frames: img(['tripod1.png', 'tripod2.png', 'tripod3.png', 'tripod4.png']),
    deadFrames: img(['tripod_dead1.png', 'tripod_dead2.png', 'tripod_dead3.png', 'tripod_dead4.png', 'tripod_dead5.png']),
};
