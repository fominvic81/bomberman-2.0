import { dist, rand } from '../../common';
import { draw, createAnimation } from '../../drawing';
import tiles from '../../tiles';

import settings from './settings';
import { ctx } from '../..';

export const createQueen = (level, x, y) => {
    return {
        level: level,
        x: x,
        y: y,
        nx: Math.round(x),
        ny: Math.round(y),
        dx: 0,
        dy: 0,
        dir: '0',
        time: 0,
        frameTimer: 0,
        frame: 0,
        frameCount: settings.frames1.length,
        frames1: settings.frames1,
        frames2: settings.frames2,
        frames3: settings.frames3,
        deadFrames: settings.deadFrames,
        width: settings.width,
        height: settings.height,
        rendWidth: settings.rendWidth,
        rendHeight: settings.rendHeight,
        speed: settings.speed,
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

        findPlayer () {
            let pl = {x: 0, y: 0, dist: Infinity};
            for (const entity of this.level.entities) {
                if (entity.entityName == 'player') {
                    let d = dist(this.x, this.y, entity.x, entity.y);
                    if (pl.dist >= d) {
                        pl.dist = d;
                        pl.x = entity.x;
                        pl.y = entity.y;
                    }
                }
            }
            if (pl.dist == Infinity) {
                return;
            }
            return {x: pl.x, y: pl.y};
        },

        update (dt) {
            this.time += dt;
            this.frameTimer += dt;
            
            if (this.frameTimer > 0.3) {
                this.frameTimer = 0;
                ++this.frame;
                this.frame = this.frame % this.frameCount;
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
                
                let t = this.findPlayer();
                let d = '0';
                if (p.get(Math.round(t.x) * 10000 + Math.round(t.y)) !== undefined) {
                    // console.log(p.get(Math.round(t.x) * 10000 + Math.round(t.y)));
                    for (let sx = Math.round(t.x), sy = Math.round(t.y); sx !== this.x || sy !== this.y;) {
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
                        // console.log(`${d} = ${sx}, ${sy}`);
                    }
                    // console.log(`${this.x}, ${this.y}`);
                    // this.level.removeEntity(this.id);
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
                this.dy = -dt * this.speed;
            }
            if (this.ny > this.y) {
                this.dy = dt * this.speed;
            }
            if (this.nx < this.x) {
                this.dx = -dt * this.speed;
            }
            if (this.nx > this.x) {
                this.dx = dt * this.speed;
            }

        },

        render () {
            draw(this.frames1[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
        },


        kill () {
            this.level.addAnimation(createAnimation(this.level, this.x, this.y, this.rendWidth, this.rendHeight, this.deadFrames, 0.5));
            this.level.removeEntity(this.id);
        }

    }
}