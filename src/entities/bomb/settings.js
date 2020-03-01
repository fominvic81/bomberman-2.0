import { imgLoader } from '../../load';

const img = imgLoader('assets/bomb');

export default {
    width: 1,
    height: 1,
    rendWidth: 1,
    rendHeight: 1.5,
    life_time: 3,
    frames: img(['bomb1.png', 'bomb2.png', 'bomb3.png', 'bomb4.png']),
};
