

const tiles = {

    0: {
        name: 'grass',
        image: 'assets/grass.png',
        collide: false,
        explosResist: true,
        maxSt: 1,
        canHasBonus: false,
    },

    1: {
        name: 'brick',
        image: 'assets/brick.png',
        collide: true,
        explosResist: false,
        maxSt: 1,
        canHasBonus: true,
    },

    2: {
        name: 'superWall',
        image: 'assets/superWall.png',
        collide: true,
        explosResist: false,
        maxSt: Infinity,
        canHasBonus: false,
    }

}