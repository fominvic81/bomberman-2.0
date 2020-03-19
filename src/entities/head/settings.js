import { imgLoader, img } from '../../load';

const imgs = imgLoader('assets/enemies/head');

export default {
    width: 0.4,
    height: 0.4,
    rendWidth: 1,
    rendHeight: 1.5,
    speed: 3,
    frames: imgs(['head1.png', 'head2.png', 'head3.png', 'head4.png']),
    deadFrames: imgs(['head_dead1.png', 'head_dead2.png', 'head_dead3.png', 'head_dead4.png', 'head_dead5.png']),
    translateY: 0,
    shadow: img('assets/enemies/head/shadow.png'),
    shadowWidth: 1,
    shadowHeight: 1,
    translateShadowY: 0.55,
};
