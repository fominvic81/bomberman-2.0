import { dist, rand } from '../../common';
import { draw, createAnimation } from '../../drawing';
import tiles from '../../tiles';
import { createQueenFragment } from '../queen_fragment/index';

import settings from './settings';

export const createQueen = (level, x, y) => {
    return {
        level: level,
        x: x,
        y: y,
        nx: Math.round(x),
        ny: Math.round(y),
        dx: 0,
        dy: 0,
        dir: 'rand',
        time: 0,
        resistTimer: 0,
        resistTime: 2,
        isRend: true,
        frameTimer: 0,
        frame: 0,
        frameCount: settings.frames1.length,
        frames1: settings.frames1,
        frames2: settings.frames2,
        frames3: settings.frames3,
        state: 1,
        deadFrames: settings.deadFrames,
        width: settings.width,
        height: settings.height,
        rendWidth: settings.rendWidth,
        rendHeight: settings.rendHeight,
        speed1: settings.speed1,
        speed2: settings.speed2,
        speed3: settings.speed3,
        entityName: 'queen',

        canMoveTo (x, y) {
            if (this.level.map[x][y].hasBomb == true) {
                return false;
            }
            if (!tiles[this.level.map[x][y].tile].collide) {
                return true;
            }
            return false;
        },

        findPlayers () {
            let pl = [];
            for (const entity of this.level.entities) {
                if (entity.entityName === 'player') {
                    let d = dist(this.x, this.y, entity.x, entity.y);
                    pl.push({x: entity.x, y: entity.y, dist: d});
                }
            }
            // if (pl.length === 0) {
            //     return;
            // }
            pl.sort((a, b) => a.dist > b.dist ? 1 : -1)

            return pl;
        },

        update (dt) {
            this.time += dt;
            this.frameTimer += dt;
            this.resistTimer += dt;
            
            if (this.frameTimer > 0.3) {
                this.frameTimer = 0;
                ++this.frame;
                this.frame = this.frame % this.frameCount;
            }

            if (this.resistTimer <= this.resistTime) {
                this.isRend = Math.floor(this.resistTimer / (this.resistTime / 16)) % 2;
            } else {
                this.isRend = true;
            }
            
            this.x += this.dx;
            this.y += this.dy;
            
            if (Math.abs(this.nx - this.x) < this.dx) {
                this.x = this.nx;
            }
            if (Math.abs(this.ny - this.y) < this.dy) {
                this.y = this.ny;
            }
            
            if (this.x == this.nx && this.y == this.ny) {
                if (this.dx !== 0 || this.dy !== 0) {
                    this.level.addEntity(createQueenFragment(this.level, this.x, this.y));
                }
                
                let p = new Map();
                p.set(this.x * 10000 + this.y, 0);
                let s = [{x: this.x, y: this.y}];

                let addS = (sx, sy, nsx, nsy) => {
                    let t = p.get(sx * 10000 + sy) + 1;
                    if (p.get(nsx * 10000 + nsy) === undefined || t <= p.get(nsx * 10000 + nsy)) {
                        if (this.canMoveTo(nsx, nsy)) {
                            s.push({x: nsx, y: nsy});
                            p.set(nsx * 10000 + nsy, t);
                        }
                    }
                };
                
                while (s.length != 0) {
                    
                    let {x: sx, y: sy} = s.shift();
                    
                    addS(sx, sy, sx, sy - 1);
                    addS(sx, sy, sx, sy + 1);
                    addS(sx, sy, sx - 1, sy);
                    addS(sx, sy, sx + 1, sy);
                    
                }
                
                let players = this.findPlayers();
                let d = 'rand';
                if (players.length !== 0) {
                    for (const player of  players) {
                        if (p.get(Math.round(player.x) * 10000 + Math.round(player.y)) !== undefined) {
                            for (let sx = Math.round(player.x), sy = Math.round(player.y); sx !== this.x || sy !== this.y;) {
                                if (p.get(sx * 10000 + sy - 1) === p.get(sx * 10000 + sy) - 1) {
                                    d = 'down';
                                    sy -= 1;
                                } else if (p.get(sx * 10000 + sy + 1) === p.get(sx * 10000 + sy) - 1) {
                                    d = 'up';
                                    sy += 1;
                                } else if (p.get((sx - 1) * 10000 + sy) === p.get(sx * 10000 + sy) - 1) {
                                    d = 'right';
                                    sx -= 1;
                                } else if (p.get((sx + 1) * 10000 + sy) === p.get(sx * 10000 + sy) - 1) {
                                    d = 'left';
                                    sx += 1;
                                }
                            }
                            break;
                        }
                    }
                }

                this.dir = d;
                
                if (this.dir == 'up') {
                    this.ny -= 1;
                }
                if (this.dir == 'down') {
                    this.ny += 1;
                }
                if (this.dir == 'left') {
                    this.nx -= 1;
                }
                if (this.dir == 'right') {
                    this.nx += 1;
                }
            }
            this.dx = 0, this.dy = 0;
            if (this.ny < this.y) {
                this.dy = -dt * this[`speed${this.state}`];
            }
            if (this.ny > this.y) {
                this.dy = dt * this[`speed${this.state}`];
            }
            if (this.nx < this.x) {
                this.dx = -dt * this[`speed${this.state}`];
            }
            if (this.nx > this.x) {
                this.dx = dt * this[`speed${this.state}`];
            }

        },

        render () {
            if (this.isRend) {
                draw(this[`frames${this.state}`][this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
            }
        },


        kill () {
            this.level.addAnimation(createAnimation(this.level, this.x, this.y, this.rendWidth, this.rendHeight, this.deadFrames, 0.5));
            this.level.removeEntity(this.id);
        },

        damage () {
            if (this.resistTimer > this.resistTime) {
                this.resistTimer = 0;
                this.state += 1;
                if (this.state > 3) {
                    this.kill();
                }
            }
        }

    }
}