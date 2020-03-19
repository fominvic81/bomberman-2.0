import { imgLoader, img } from '../../load';

const imgs = imgLoader('assets/enemies/iceCream');

export default {
    width: 0.4,
    height: 0.4,
    rendWidth: 1,
    rendHeight: 1.5,
    speed: 2,
    frames: imgs(['iceCream1.png', 'iceCream2.png', 'iceCream3.png', 'iceCream4.png']),
    deadFrames: imgs(['iceCream_dead1.png', 'iceCream_dead2.png', 'iceCream_dead3.png', 'iceCream_dead4.png', 'iceCream_dead5.png']),
    translateY: 0,
    shadow: img('assets/enemies/iceCream/shadow.png'),
    shadowWidth: 1,
    shadowHeight: 1,
    translateShadowY: 0.5,
};
