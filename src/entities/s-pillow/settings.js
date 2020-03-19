import { imgLoader, img } from '../../load';

const imgs = imgLoader('assets/enemies/sPillow');

export default {
    width: 0.4,
    height: 0.4,
    rendWidth: 0.9,
    rendHeight: 1.35,
    speed: 2.25,
    frames: imgs(['sPillow1.png', 'sPillow2.png', 'sPillow3.png', 'sPillow4.png', 'sPillow5.png', 'sPillow6.png', 'sPillow7.png', 'sPillow8.png']),
    deadFrames: imgs(['sPillow_dead1.png', 'sPillow_dead2.png', 'sPillow_dead3.png', 'sPillow_dead4.png', 'sPillow_dead5.png']),
    translateY: 0,
    shadow: img('assets/enemies/sPillow/shadow.png'),
    shadowWidth: 0.9,
    shadowHeight: 0.9,
    translateShadowY: 0.45,
};
