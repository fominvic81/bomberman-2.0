function isCollide(e1, e2) {
    if (e1.x < e2.x + e2.width/2 + e2.width/2 &&
        e1.x + e1.width/2 + e2.width/2 > e2.x &&
        e1.y < e2.y + e2.height/2 + e2.height/2 &&
        e1.y + e1.height/2 + e2.height/2 > e2.y) {
        return true;
     }
}

function rand(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const createLevel = (level) => {
    return {
        
        map: level.tileMap,
        entities: [],
        isS: false,

        setup () {
            isS = true;
            for (let x = 0; x < this.map.length; ++x) {
                for (let y = 0; y < this.map[x].length; ++y) {
                    this.map[x][y].st = tiles[this.map[x][y].tile].maxSt;
                }
            }
        },

        update (dt) {
            if (!this.isS) this.setup();
            for (entity1 of [...this.entities]) {
                entity1.update(dt);
                for (entity2 of [...this.entities]) {
                    if (entity1.id == entity2.id) continue;
                    if (isCollide(entity1, entity2)) {
                        if (entity1.entityName == 'bomb' && entity2.entityName == 'explos') {
                            entity1.activate();
                        }
                        if (entity1.entityName == 'bomb' && entity2.entityName == 'player') {
                            if (Math.round(entity2.x) == entity1.x
                             && Math.round(entity2.y) == entity1.y) {
                                entity2.touchToBomb = true;
                            }
                        }  
                        if (entity1.entityName == 'player' && entity2.entityName == 'explos') {
                            if (entity1.protect == 1) continue;
                            entity1.kill();
                        }
                        if (entity1.entityName == 'player' && entity2.entityName == 'bonus') {
                            if (entity1[entity2.varName] >= entity2.maxCount) continue;
                            entity1[entity2.varName] += 1;

                            entity2.kill();
                        }
                        if (entity1.entityName == 'bonus' && entity2.entityName == 'explos') {
                            if (entity1.time > entity2.life_time) {
                                entity1.kill();
                            }
                        }
                    }
                }
                if (entity1.entityName === 'player') {
                    entity1.move(this.map);
                }
            }

            for (let x = 0; x < this.map.length; ++x) {
                for (let y = 0; y < this.map[x].length; ++y) {
                    if (this.map[x][y].st <= 0) {
                        this.map[x][y].tile = 0;
                        this.map[x][y].st = 1;
                        if (rand(25) == 0) {
                            this.addEntity(createBonus(x, y, 'flame'));
                        } else if (rand(30) == 0) {
                            this.addEntity(createBonus(x, y, 'rollers'));
                        } else if (rand(25) == 0) {
                            this.addEntity(createBonus(x, y, 'extraBomb'));
                        } else if (rand(80) == 0) {
                            this.addEntity(createBonus(x, y, 'protect'));
                        }
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

        damageTile(x, y, damage) {
            this.map[x][y].st -= damage;
        },

        addEntity (entity) {
            entity.id = Symbol('id');
            this.entities.push(entity);
            if (entity.init) entity.init();
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
// level.setup();