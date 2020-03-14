import { img } from '../../load';

export default {
    flame: {
        sFrame: img('assets/bonuses/flame/flame.png'),
        varName: 'power',
        maxCount: 7,
        startCount: 1,
        width: 0.8,
        height: 0.8,
        rendWidth: 1,
        rendHeight: 1,
        // probably:
    },
    extraBomb: {
        sFrame: img('assets/bonuses/extra_bomb/extra_bomb.png'),
        varName: 'maxBombCount',
        maxCount: 8,
        startCount: 1,
        width: 0.8,
        height: 0.8,
        rendWidth: 1,
        rendHeight: 1,
    },
    rollers: {
        sFrame: img('assets/bonuses/rollers/rollers.png'),
        varName: 'rollers',
        maxCount: 4,
        startCount: 1,
        width: 0.8,
        height: 0.8,
        rendWidth: 1,
        rendHeight: 1,
    },
    protect: {
        sFrame: img('assets/bonuses/protect/protect.png'),
        varName: 'protect',
        maxCount: 1,
        startCount: 0,
        width: 0.8,
        height: 0.8,
        rendWidth: 1,
        rendHeight: 1,
    },
};
