import { imgLoader, img } from '../../load';

const imgs = imgLoader('assets/enemies/tripod');

export default {
    width: 0.4,
    height: 0.4,
    rendWidth: 1,
    rendHeight: 1.5,
    speed: 2.5,
    frames: imgs(['tripod1.png', 'tripod2.png', 'tripod3.png', 'tripod4.png']),
    deadFrames: imgs(['tripod_dead1.png', 'tripod_dead2.png', 'tripod_dead3.png', 'tripod_dead4.png', 'tripod_dead5.png']),
    translateY: 0,
    shadow: img('assets/enemies/tripod/shadow.png'),
    shadowWidth: 1,
    shadowHeight: 1,
    translateShadowY: 0.6,
};
