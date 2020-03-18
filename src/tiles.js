import { img, imgLoader } from './load';

const imgs = imgLoader('assets/tiles');

export default {
    0: {
        name: 'grass',
        image: img('assets/tiles/grass/grass.png'),
        collide: false,
        collideLevel: 0,
        unresponsive: true,
        maxSt: 1,
        canHasBonus: false,
    },
    
    1: {
        name: 'brick',
        image: img('assets/tiles/brick/brick.png'),
        shadow: img('assets/tiles/brick/shadow.png'),
        shadowWidth: 1,
        shadowHeight: 1,
        translateShadowY: 0.55,
        destroyFrames: imgs(['brick/brick_destroy1.png', 'brick/brick_destroy2.png', 'brick/brick_destroy3.png', 'brick/brick_destroy4.png']),
        destroyTime: 0.3,
        collide: true,
        collideLevel: 1,
        unresponsive: false,
        maxSt: 1,
        canHasBonus: true,
    },
    
    2: {
        name: 'hardWall',
        image: img('assets/tiles/hardWall/hardWall.png'),
        shadow: img('assets/tiles/hardWall/shadow.png'),
        shadowWidth: 1,
        shadowHeight: 1,
        translateShadowY: 0.55,
        collide: true,
        collideLevel: 2,
        unresponsive: false,
        maxSt: Infinity,
        canHasBonus: false,
    },
};
