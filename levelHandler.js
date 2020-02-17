
const createLevel = (level) => {
    return {
        
        map: level.tileMap,
        entities: [],

        update (dt) {
            for (entity of this.entities) {
                entity.update(dt);
            }

            if (entity.entityName === 'player') {
                entity.move(this.map);
            }
        },

        render () {
            for (let x = 0; x < 16; ++x) {
                for (let y = 0; y < 16; ++y) {
                    draw(this.map[x][y] === 1 ? i_wall : i_grass, x, y, 1, 1);
                }
            }

            for (entity of this.entities) {
                entity.render();
            }

        },

        addEntity (entity) {
            this.entities.push(entity);
        },
        
    }
}

let level = createLevel(level2);