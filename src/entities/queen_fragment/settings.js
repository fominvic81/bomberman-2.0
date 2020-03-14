import { imgLoader } from '../../load';

const img = imgLoader('assets/enemies/queen_fragment');

export default {
    width: 0.4,
    height: 0.4,
    rendWidth: 1,
    rendHeight: 1.5,
    speed: 2.25,
    frames: img(['queen_fragment1.png', 'queen_fragment2.png']),
    deadFrames: img(['queen_fragment_dead1.png', 'queen_fragment_dead2.png', 'queen_fragment_dead3.png', 'queen_fragment_dead4.png', 'queen_fragment_dead5.png']),
    bornFrames: img(['queen_fragment_born1.png', 'queen_fragment_born2.png', 'queen_fragment_born3.png','queen_fragment_born4.png']),
    born_time: 5,
};
