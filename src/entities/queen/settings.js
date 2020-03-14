import { imgLoader } from '../../load';

const img = imgLoader('assets/bosses/queen');

export default {
    width: 0.4,
    height: 0.4,
    rendWidth: 1,
    rendHeight: 1.5,
    speed1: 1,
    speed2: 2,
    speed3: 1,
    frames1: img(['queen1_1.png', 'queen1_2.png', 'queen1_3.png', 'queen1_4.png']),
    frames2: img(['queen2_1.png', 'queen2_2.png', 'queen2_3.png', 'queen2_4.png']),
    frames3: img(['queen3_1.png', 'queen3_2.png', 'queen3_3.png', 'queen3_4.png']),
    deadFrames: img(['queen_dead1.png', 'queen_dead2.png', 'queen_dead3.png', 'queen_dead4.png', 'queen_dead5.png']),
};
