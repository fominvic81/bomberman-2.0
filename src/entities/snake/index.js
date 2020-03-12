import { dist, rand } from '../../common';
import { draw, createAnimation } from '../../drawing';
import tiles from '../../tiles';

import settings from './settings';


export const createSnake = (level, x, y, length) => {
    return {
        level: level,
        x: x,
        y: y,
        dc: 0,
        cords: [],
        time: 0,
        frameTimer: 0,
        frameCount: 4,
        frame: 0,
        width: settings.width,
        height: settings.height,
        rendWidth: settings.rendWidth,
        rendHeight: settings.rendHeight,
        speed: settings.speed,
        entityName: 'snake',
        length: length,
        isS: false,

        canMoveTo (x, y) {
            if (this.level.map[x][y].hasBomb === true) {
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
                    let d = dist(this.cords[0].x, this.cords[0].y, entity.x, entity.y);
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

        setup () {
            this.isS = true;
            for (let i = 1; i <= this.length; ++i) {
                this.cords.push({x: this.x, y: this.y+i, dir: 'up'});
            }
        },

        update (dt) {
            if (!this.isS) this.setup();

            this.time += dt;
            this.frameTimer += dt;

            if (this.frameTimer > 0.8) {
                this.frameTimer = 0;
                ++this.frame;
                this.frame = this.frame % this.frameCount;
            }
            
            if (this.dc >= 1) {
                for (let i = this.cords.length - 1; i >= 0; --i) {
                    if (this.cords[i].dir == 'up') {
                        this.cords[i].y -= 1;
                    } else if (this.cords[i].dir == 'down') {
                        this.cords[i].y += 1;
                    } else if (this.cords[i].dir == 'left') {
                        this.cords[i].x -= 1;
                    } else if (this.cords[i].dir == 'right') {
                        this.cords[i].x += 1;
                    }
                    if (i > 0) {
                        this.cords[i].dir = this.cords[i - 1].dir;
                    }
                }
                this.dc -= 1;
                
                let p = new Map();
                p.set(this.cords[0].x * 10000 + this.cords[0].y, 0);
                let s = [{x: this.cords[0].x, y: this.cords[0].y}];

                let addS = (i, j, ni, nj) => {
                    let t = p.get(i * 10000 + j) + 1;
                    if (p.get(ni * 10000 + nj) === undefined || t <= p.get(ni * 10000 + nj)) {
                        if (this.canMoveTo(ni, nj)) {
                            s.push({x: ni, y: nj});
                            p.set(ni * 10000 + nj, t);
                        }
                    }
                };
                
                while (s.length != 0) {
                    
                    let {x: i, y: j} = s.shift();
                    // this.level.addAnimation(createAnimation(this.level, i, j, 1, 1, animations.pointer.frames, 1));
                    
                    addS(i, j, i, j - 1);
                    addS(i, j, i, j + 1);
                    addS(i, j, i - 1, j);
                    addS(i, j, i + 1, j);
                    
                    //console.log(`x: ${i}, y: ${j} = ${p.get(i * 10000 + i)}`);
                }
                
                let t = this.findPlayer();
                let d = 'up';

                if (p.get(Math.round(t.x) * 10000 + Math.round(t.y)) !== undefined) {
                    for (let i = Math.round(t.x), j = Math.round(t.y); i !== this.cords[0].x || j !== this.cords[0].y;) {
                        if (p.get(i * 10000 + j - 1) === p.get(i * 10000 + j) - 1) {
                            d = 'down';
                            j -= 1;
                        } else if (p.get(i * 10000 + j + 1) === p.get(i * 10000 + j) - 1) {
                            d = 'up';
                            j += 1;
                        } else if (p.get((i - 1) * 10000 + j) === p.get(i * 10000 + j) - 1) {
                            d = 'right';
                            i -= 1;
                        } else if (p.get((i + 1) * 10000 + j) === p.get(i * 10000 + j) - 1) {
                            d = 'left';
                            i += 1;
                        }
                    }
                }

                this.cords[0].dir = d;
                
            }
            
            this.dc += this.speed * dt;
            
        },

        render () {
            for (let i = this.cords.length - 1; i >= 0; --i) {
                let cord = this.cords[i];
                let {x, y, dir} = cord;                
                switch (dir) {
                    case 'up':
                        y -= this.dc;
                        break
                    case 'down':
                        y += this.dc;
                        break;
                    case 'left':
                        x -= this.dc;
                        break;
                    case 'right':
                        x += this.dc;
                }
                let s;
                switch (i) {
                    case 0:
                        s = 'head';
                        break;
                    case this.cords.length - 1:
                        s = 'hvost';
                        break;
                    default:
                        s = 'seg';
                        break;
                }
                const tex = settings.frames[s + dir[0].toUpperCase() + dir.substr(1)];
                draw(tex[this.frame % tex.length], x, y, this.rendWidth, this.rendHeight);
            }
        },
    }
}