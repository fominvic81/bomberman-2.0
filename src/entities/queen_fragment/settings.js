import { imgLoader, img } from '../../load';

const imgs = imgLoader('assets/enemies/queen_fragment');

export default {
    width: 0.4,
    height: 0.4,
    rendWidth: 1,
    rendHeight: 1.5,
    speed: 2.25,
    frames: imgs(['queen_fragment1.png', 'queen_fragment2.png']),
    deadFrames: imgs(['queen_fragment_dead1.png', 'queen_fragment_dead2.png', 'queen_fragment_dead3.png', 'queen_fragment_dead4.png', 'queen_fragment_dead5.png']),
    bornFrames: imgs(['queen_fragment_born1.png', 'queen_fragment_born2.png', 'queen_fragment_born3.png','queen_fragment_born4.png']),
    born_time: 5,
    translateY: 0,
    shadow: img('assets/enemies/queen_fragment/shadow.png'),
    shadowWidth: 0.9,
    shadowHeight: 0.9,
    translateShadowY: 0.45,
};
