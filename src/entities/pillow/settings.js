import { imgLoader, img } from '../../load';

const imgs = imgLoader('assets/enemies/pillow');

export default {
    width: 0.4,
    height: 0.4,
    rendWidth: 1,
    rendHeight: 1.5,
    speed: 2,
    frames: imgs(['pillow1.png', 'pillow2.png', 'pillow3.png', 'pillow4.png']),
    deadFrames: imgs(['pillow_dead1.png', 'pillow_dead2.png', 'pillow_dead3.png', 'pillow_dead4.png', 'pillow_dead5.png']),
    translateY: 0,
    shadow: img('assets/enemies/pillow/shadow.png'),
    shadowWidth: 1,
    shadowHeight: 1,
    translateShadowY: 0.45,
};
