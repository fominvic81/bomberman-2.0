

const tiles = {

    0: {
        name: 'grass',
        image: 'assets/grass.png',
        collide: false,
        explosResist: true,
        maxSt: 1,
    },

    1: {
        name: 'brick',
        image: 'assets/brick.png',
        collide: true,
        explosResist: false,
        maxSt: 2,
    },

    2: {
        name: 'superWall',
        image: 'assets/superWall.png',
        collide: true,
        explosResist: false,
        maxSt: Infinity,
    }

}