const level1  = {
    tileMap: [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,1,0,0,1,1,1,0,1,0,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,1,1,1,0],
        [1,0,1,1,1,0,0,0,0,0,1,1,1,0,0],
        [1,0,0,1,1,1,0,0,0,1,1,1,0,0,0],
        [1,0,0,0,1,1,1,0,1,1,1,0,0,0,0],
        [1,0,0,0,0,1,1,0,0,0,0,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    startEntities: [
        {name: 'player', x: 1, y: 1, controls: controls.player1},
    ],
}

const level2 = {
    tileMap: [
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,1,1,1,0,0,0,0,0,0,0,0,2],
        [2,0,0,1,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,1,0,1,1,1,1,0,1,1,1,1,2],
        [2,0,0,1,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,1,1,1,1,0,1,1,1,1,1,1,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    ],
    startEntities: [
        {name: 'player', x: 1, y: 1, controls: controls.player1},
        {name: 'worm', x: 12, y: 10},
    ],
}

const level3 = {
    tileMap: [
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,0,0,1,0,1,0,0,0,1,0,1,0,0,2],
        [2,0,2,0,2,1,2,1,2,1,2,1,2,0,2],
        [2,1,1,0,0,1,1,0,0,1,1,0,0,1,2],
        [2,0,2,1,2,0,2,1,2,0,2,0,2,0,2],
        [2,1,0,1,1,0,0,0,0,0,0,0,1,0,2],
        [2,1,2,0,2,0,2,1,2,0,2,1,2,1,2],
        [2,0,1,1,0,0,1,0,0,0,0,0,1,0,2],
        [2,1,2,0,2,1,2,1,2,1,2,0,2,1,2],
        [2,0,1,0,0,1,0,0,0,1,0,1,1,1,2],
        [2,1,2,0,2,1,2,0,2,1,2,1,2,0,2],
        [2,0,0,0,1,0,1,0,1,0,0,0,0,0,2],
        [2,0,2,1,2,1,2,1,2,1,2,1,2,0,2],
        [2,1,1,1,1,0,0,1,1,0,0,0,0,1,2],
        [2,0,2,1,2,1,2,1,2,1,2,1,2,0,2],
        [2,1,1,1,1,0,0,1,1,0,0,0,0,1,2],
        [2,0,2,1,2,1,2,1,2,1,2,1,2,0,2],
        [2,1,1,1,1,0,0,1,1,0,0,0,0,1,2],
        [2,0,2,1,2,1,2,1,2,1,2,1,2,0,2],
        [2,1,0,1,1,0,0,0,0,0,0,0,1,1,2],
        [2,0,2,1,2,1,2,1,2,1,2,1,2,0,2],
        [2,0,0,1,0,0,1,0,0,0,0,1,0,0,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    ],
    startEntities: [
        {name: 'player', x: 21, y: 13, controls: controls.player2},
        {name: 'player', x: 1, y: 1, controls: controls.player1},
        {name: 'iceCream', x: 7, y: 1},
        {name: 'iceCream', x: 5, y: 5},
        {name: 'iceCream', x: 13, y: 3},
        {name: 'pillow', x: 5, y: 5},
        {name: 'pillow', x: 15, y: 1},
        {name: 'pillow', x: 14, y: 3},
        {name: 'sPillow', x: 13, y: 1},
        {name: 'sPillow', x: 15, y: 3},
        {name: 'sPillow', x: 5, y: 8},
        {name: 'worm', x: 16, y: 3},
        {name: 'worm', x: 5, y: 5},
        {name: 'worm', x: 3, y: 3},
        // {name: 'bonus', x: 2, y: 1, bonusName: 'protect'}
    ],
    bonuses: {
        flame: 3,
        extraBomb: 3,
        rollers: 2,
        protect: 1,
    },
}