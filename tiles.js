

const tiles = {

    0: {
        name: 'grass',
        image: 'assets/grass.png',
        collide: false,
        collideLevel: 0,
        explosResist: true,
        maxSt: 1,
        canHasBonus: false,
    },

    1: {
        name: 'brick',
        image: 'assets/brick.png',
        collide: true,
        collideLevel: 1,
        explosResist: false,
        maxSt: 1,
        canHasBonus: true,
    },

    2: {
        name: 'superWall',
        image: 'assets/superWall.png',
        collide: true,
        collideLevel: 2,
        explosResist: false,
        maxSt: Infinity,
        canHasBonus: false,
    }

}