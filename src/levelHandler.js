import { createBat } from './entities/bat';
import { createBomb } from './entities/bomb';
import { createBonus } from './entities/bonus';
import { createExplos } from './entities/explos';
import { createHead } from './entities/head';
import { createIceCream } from './entities/ice-cream';
import { createPillow } from './entities/pillow';
import { createPlayer } from './entities/player';
import { createSPillow } from './entities/s-pillow';
import { createTripod } from './entities/tripod';
import { createWorm } from './entities/worm';
import { createSnake } from './entities/snake';
import { createQueen } from './entities/queen';
import { createQueenFragment } from './entities/queen_fragment';
import { rand, isCollide } from './common';
import { draw, draw_tiles } from './drawing';
import tiles from './tiles';
import bonuses from './entities/bonus/bonuses';


export const createLevel = level => {
    return {
        map: level.tileMap,
        startEntities: level.startEntities,
        bonuses: level.bonuses,
        entities: new Map(),
        animations: new Map(),
        isS: false,

        setup () {
            this.isS = true;
            let twchb = [];
            for (let x = 0; x < this.map.length; ++x) {
                for (let y = 0; y < this.map[x].length; ++y) {
                    if (this.map[x][y].tile === undefined) {
                        this.map[x][y] = {tile: this.map[x][y]};
                    }
                    this.map[x][y].st = tiles[this.map[x][y].tile].maxSt;
                    if (tiles[this.map[x][y].tile].canHasBonus) {
                        twchb.push({x: x, y: y});
                    }
                }
            }
            for (const bonus in this.bonuses) {
                if (twchb.length === 0) break;
                for (let i = 1; i <= this.bonuses[bonus]; ++i) {
                    if (twchb.length === 0) break;
                    let j = rand(twchb.length);
                    let cord = twchb[j];
                    this.map[cord.x][cord.y].bonus = bonus;
                    twchb.splice(j, 1);
                }
            }
            for (const entity of this.startEntities) {
                switch (entity.name) {
                    case 'player':
                        this.addEntity(createPlayer(this, entity.x, entity.y, entity.controls));
                        break;
                    case 'bomb':
                        this.addEntity(createBomb(this, entity.x, entity.y, entity.power));
                        break;
                    case 'bonus':
                        this.addEntity(createBonus(this, entity.x, entity.y, entity.bonusName));
                        break;
                    case 'explos':
                        this.addEntity(createExplos(this, entity.x, entity.y, entity.dir, entity.power));
                        break;
                    case 'iceCream':
                        this.addEntity(createIceCream(this, entity.x, entity.y));
                        break;
                    case 'pillow':
                        this.addEntity(createPillow(this, entity.x, entity.y));
                        break;
                    case 'sPillow':
                        this.addEntity(createSPillow(this, entity.x, entity.y));
                        break;
                    case 'worm':
                        this.addEntity(createWorm(this, entity.x, entity.y));
                        break;
                    case 'head':
                        this.addEntity(createHead(this, entity.x, entity.y));
                        break;
                    case 'tripod':
                        this.addEntity(createTripod(this, entity.x, entity.y));
                        break;
                    case 'bat':
                        this.addEntity(createBat(this, entity.x, entity.y));
                        break;
                    case 'snake':
                        this.addEntity(createSnake(this, entity.x, entity.y, entity.length));
                        break;
                    case 'queen':
                        this.addEntity(createQueen(this, entity.x, entity.y));
                        break;
                    case 'queen_fragment':
                        this.addEntity(createQueenFragment(this, entity.x, entity.y));
                        break;
                }
            }


            for (let x = 0; x < this.map.length; ++x) {
                for (let y = 0; y < this.map[x].length; ++y) {
                    draw_tiles(tiles[this.map[x][y].tile].image, x, y, 1, 1);
                }
            }


        },

        update (dt) {
            if (!this.isS) this.setup();

            const entities = [...this.entities.values()];

            for (const entity1 of entities) {
                entity1.update(dt);

                for (const entity2 of entities) {
                    if (entity1.id === entity2.id) continue;
                    if (isCollide(entity1, entity2)) {
                        if (entity1.entityName === 'bomb' && entity2.entityName === 'explos') {
                            entity1.activate();
                        }
                        if (entity1.entityName === 'bomb' && entity2.entityName === 'player') {
                            if (Math.round(entity2.x) === entity1.x
                             && Math.round(entity2.y) === entity1.y) {
                                entity2.touchToBomb = true;
                            }
                        }  
                        if (entity1.entityName === 'player' && entity2.entityName === 'explos') {
                            if (entity1.protect === 1) continue;
                            if (entity2.time >= entity2.kill_time) continue;
                            entity1.kill();
                        }
                        if (entity1.entityName === 'player' && entity2.entityName === 'bonus') {
                            if (entity1[entity2.varName] >= entity2.maxCount) continue;
                            entity1[entity2.varName] += 1;

                            entity2.kill();
                        }
                        if (entity1.entityName === 'bonus' && entity2.entityName === 'explos') {
                            if (entity2.time >= entity2.kill_time) continue;
                            if (entity1.time > entity2.life_time + 0.05) {
                                entity1.kill(true);
                            }
                        }
                        if (entity1.entityName === 'enemy' && entity2.entityName === 'explos') {
                            if (entity2.time >= entity2.kill_time) continue;
                            entity1.kill();
                        }
                        if (entity1.entityName === 'enemy' && entity2.entityName === 'player') {
                            entity2.kill();
                        }
                        if (entity1.entityName === 'queen' && entity2.entityName === 'explos') {
                            entity1.damage();
                        }
                        if (entity1.entityName === 'queen' && entity2.entityName === 'player') {
                            entity2.kill();
                        }
                    }
                    if (entity2.entityName === 'snake') {
                        for (const seg of entity2.segments) {
                            let s = {x: seg.x, y: seg.y};
                            switch (seg.dir) {
                                case 'up':
                                    s.y -= entity2.dc;
                                    break;
                                    case 'down':
                                        s.y += entity2.dc;
                                        break;
                                    case 'left':
                                        s.x -= entity2.dc;
                                    break;
                                case 'right':
                                    s.x += entity2.dc;
                                    break;
                            }
                            if (isCollide({x: entity1.x, y: entity1.y, width: entity1.width, height: entity1.height},
                                {x: s.x, y: s.y, width: entity2.width, height: entity2.height})) {
                                switch (entity1.entityName) {
                                    case 'player':
                                        entity1.kill();
                                        break;
                                    case 'explos':
                                        if (!(entity2.time >= entity2.kill_time)) {
                                            entity2.damage();
                                        }
                                }
                            }
                        }
                    }
                }
                // if (entity1.entityName === 'player') {
                //     entity1.move(this.map);
                // }
            }
            
            for (const anim of [...this.animations.values()]) {
                anim.update(dt);
            }
        },

        render () {

            for (const entity of this.entities.values()) {
                try {
                    entity.render();
                } catch (e) {
                    console.error(e);
                }
            }

            for (const anim of this.animations.values()) {
                anim.render();
            }
        },

        damageTile(x, y, damage) {
            this.map[x][y].st -= damage;

            if (this.map[x][y].st <= 0) {
                this.map[x][y].tile = 0;
                this.map[x][y].st = 1;
                draw_tiles(tiles[this.map[x][y].tile].image, x, y, 1, 1)
                if (this.map[x][y].bonus !== undefined) {
                    this.addEntity(createBonus(this, x, y, this.map[x][y].bonus));
                    this.map[x][y].bonus = undefined;
                }
            }
        },

        addEntity (entity) {
            entity.id = Symbol('id');
            this.entities.set(entity.id, entity);
            if (entity.init) entity.init();
        },

        removeEntity(id) {
            this.entities.delete(id);
        },

        addAnimation (anim) {
            anim.id = Symbol('id');
            this.animations.set(anim.id, anim);
        },

        removeAnimation (id) {
            this.animations.delete(id);
        },

        
    }
};
