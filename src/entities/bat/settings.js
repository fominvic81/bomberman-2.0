import { imgLoader, img } from '../../load';

const imgs = imgLoader('assets/enemies/bat');

export default {
    width: 0.4,
    height: 0.4,
    rendWidth: 1,
    rendHeight: 1.5,
    speed: 4,
    frames: imgs(['bat1.png', 'bat2.png']),
    deadFrames: imgs(['bat_dead1.png', 'bat_dead2.png', 'bat_dead3.png', 'bat_dead4.png', 'bat_dead5.png']),
    translateY: 0,
    shadow: img('assets/enemies/bat/shadow.png'),
    shadowWidth: 1,
    shadowHeight: 1,
    translateShadowY: 0.5,
};
