import { imgLoader } from '../../load';

const img = imgLoader('assets/enemies/bat');

export default {
    width: 0.4,
    height: 0.4,
    rendWidth: 1,
    rendHeight: 1.5,
    speed: 4,
    frames: img(['bat1.png', 'bat2.png']),
    deadFrames: img(['bat_dead1.png', 'bat_dead2.png', 'bat_dead3.png', 'bat_dead4.png', 'bat_dead5.png']),
};
