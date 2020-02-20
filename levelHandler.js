
const createLevel = (level) => {
    return {
        
        map: level.tileMap,
        entities: [],

        setup () {
            for (let x = 0; x < this.map.length; ++x) {
                for (let y = 0; y < this.map[x].length; ++y) {
                    this.map[x][y].st = tiles[this.map[x][y].tile].maxSt;
                }
            }
        },

        update (dt) {
            for (entity of this.entities) {
                entity.update(dt);
                if (entity.entityName === 'player') {
                    entity.move(this.map);
                }
            }

            for (let x = 0; x < this.map.length; ++x) {
                for (let y = 0; y < this.map[x].length; ++y) {
                    if (this.map[x][y].st <= 0) {
                        this.map[x][y].tile = 0;
                        this.map[x][y].st = 1;
                    }
                }
            }

        },

        render () {
            for (let x = 0; x < this.map.length; ++x) {
                for (let y = 0; y < this.map[x].length; ++y) {
                    draw(tiles[this.map[x][y].tile].image, x, y, 1, 1);
                }
            }

            for (entity of this.entities) {
                entity.render();
            }

        },

        addEntity (entity) {
            entity.id = Symbol('id');
            this.entities.push(entity);
        },

        removeEntity(id) {
            for (let i = 0; i < this.entities.length; ++i) {
                let entity = this.entities[i];
                if (entity.id === id) {
                    this.entities.splice(i, 1);
                    break;
                }
            }
        }
        
    }
}

let level = createLevel(level3);
level.setup();