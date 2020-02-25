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
        {name: 'iceCream', x: 3, y: 3},
        {name: 'iceCream', x: 7, y: 1},
        {name: 'iceCream', x: 5, y: 5},
        {name: 'iceCream', x: 13, y: 3},
        {name: 'bonus', x: 2, y: 1, bonusName: 'protect'}
    ],
    bonuses: {
        flame: 3,
        extraBomb: 3,
        rollers: 2,
        protect: 1,
    },
}