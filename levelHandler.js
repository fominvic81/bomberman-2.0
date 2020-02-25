
const createLevel = (level) => {
    return {
        
        map: level.tileMap,
        startEntities: level.startEntities,
        bonuses: level.bonuses,
        entities: [],
        isS: false,

        setup () {
            this.isS = true;
            let twchb = [];
            for (let x = 0; x < this.map.length; ++x) {
                for (let y = 0; y < this.map[x].length; ++y) {
                    this.map[x][y] = {tile: this.map[x][y]};
                    this.map[x][y].st = tiles[this.map[x][y].tile].maxSt;
                    if (tiles[this.map[x][y].tile].canHasBonus) {
                        twchb.push({x: x, y: y});
                    }
                }
            }
            for (bonus in this.bonuses) {
                if (twchb.length == 0) break;
                for (let i = 1; i <= this.bonuses[bonus]; ++i) {
                    if (twchb.length == 0) break;
                    console.log(bonus);
                    let j = rand(twchb.length);
                    let cord = twchb[j];
                    this.map[cord.x][cord.y].bonus = bonus;
                    twchb.splice(j, 1);
                }
            }
            for (entity of this.startEntities) {
                if (entity.name == 'player') {
                    this.addEntity(createPlayer(entity.x, entity.y, entity.controls));
                }
                if (entity.name == 'bomb') {
                    this.addEntity(createBomb(entity.x, entity.y, entity.power));
                }
                if (entity.name == 'bonus') {
                    this.addEntity(createBonus(entity.x, entity.y, entity.bonusName));
                }
                if (entity.name == 'explos') {
                    this.addEntity(createExplos(entity.x, entity.y, entity.dir, entity.power));
                    console.log('+');
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
                        // if (rand(25) == 0) {
                        //     this.addEntity(createBonus(x, y, 'flame'));
                        // } else if (rand(30) == 0) {
                        //     this.addEntity(createBonus(x, y, 'rollers'));
                        // } else if (rand(25) == 0) {
                        //     this.addEntity(createBonus(x, y, 'extraBomb'));
                        // } else if (rand(80) == 0) {
                        //     this.addEntity(createBonus(x, y, 'protect'));
                        // }
                        if (this.map[x][y].bonus !== undefined) {
                            this.addEntity(createBonus(x, y, this.map[x][y].bonus));
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

let level = createLevel(level2);
// level.setup();