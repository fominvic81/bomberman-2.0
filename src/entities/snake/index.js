import { dist, rand } from '../../common';
import { draw, createAnimation } from '../../drawing';
import tiles from '../../tiles';

import settings from './settings';


export const createSnake = (level, x, y, length) => {
    return {
        level: level,
        x: x,
        y: y,
        dc: 1,
        segments: [],
        segSt: 1,
        time: 0,
        resistTimer: 0,
        resistTime: 2,
        isRend: true,
        frameTimer: 0,
        frameCount: 4,
        frame: 0,
        width: settings.width,
        height: settings.height,
        rendWidth: settings.rendWidth,
        rendHeight: settings.rendHeight,
        speed: settings.speed,
        canMove: true,
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

        findPlayers () {
            let pl = [];
            for (const entity of this.level.entities) {
                if (entity.entityName === 'player') {
                    let d = dist(this.segments[0].x, this.segments[0].y, entity.x, entity.y);
                    pl.push({x: entity.x, y: entity.y, dist: d});
                }
            }
            // if (pl.length === 0) {
            //     return;
            // }
            pl.sort((a, b) => a.dist > b.dist ? 1 : -1)

            return pl;
        },

        setup () {
            this.isS = true;
            for (let i = 1; i <= this.length; ++i) {
                this.segments.push({x: this.x, y: this.y + 1, dir: 'up', move: i - 1});
            }
        },

        update (dt) {
            if (!this.isS) this.setup();

            this.time += dt;
            this.frameTimer += dt;
            this.resistTimer += dt;

            if (this.frameTimer > 0.8) {
                this.frameTimer = 0;
                ++this.frame;
                this.frame = this.frame % this.frameCount;
            }

            if (this.resistTimer <= this.resistTime) {
                this.isRend = Math.floor(this.resistTimer / (this.resistTime / 16)) % 2;
            } else {
                this.isRend = true;
            }

            if (this.dc >= 1) {
                for (let i = this.segments.length - 1; i >= 0; --i) {
                    if (this.segments[i].move >= 1) {
                        this.segments[i].move -= 1;
                        continue;
                    }
                    if (this.segments[i].dir == 'up') {
                        this.segments[i].y -= 1;
                    } else if (this.segments[i].dir == 'down') {
                        this.segments[i].y += 1;
                    } else if (this.segments[i].dir == 'left') {
                        this.segments[i].x -= 1;
                    } else if (this.segments[i].dir == 'right') {
                        this.segments[i].x += 1;
                    }
                    if (i > 0) {
                        this.segments[i].dir = this.segments[i - 1].dir;
                    }
                }
                this.dc -= 1;
                
                let p = new Map();
                p.set(this.segments[0].x * 10000 + this.segments[0].y, 0);
                let s = [{x: this.segments[0].x, y: this.segments[0].y}];

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
                    
                    addS(i, j, i, j - 1);
                    addS(i, j, i, j + 1);
                    addS(i, j, i - 1, j);
                    addS(i, j, i + 1, j);
                    
                }
                
                let players = this.findPlayers();
                let d = 'rand';

                if (players.length !== 0) {
                    for (const player of players) {
                        if (p.get(Math.round(player.x) * 10000 + Math.round(player.y)) !== undefined) {
                            for (let i = Math.round(player.x), j = Math.round(player.y); i !== this.segments[0].x || j !== this.segments[0].y;) {
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
                            break;
                        }
                    }
                } else {
                    // d = 'rand';
                }
                
                this.segments[0].dir = d;
                
                if (this.segments[0].dir === 'up' && !this.canMoveTo(this.segments[0].x, this.segments[0].y - 1)) {
                    this.segments[0].dir = 'rand';
                } else if (this.segments[0].dir === 'down' && !this.canMoveTo(this.segments[0].x, this.segments[0].y + 1)) {
                    this.segments[0].dir = 'rand';
                } else if (this.segments[0].dir === 'left' && !this.canMoveTo(this.segments[0].x - 1, this.segments[0].y)) {
                    this.segments[0].dir = 'rand';
                } else if (this.segments[0].dir === 'right' && !this.canMoveTo(this.segments[0].x + 1, this.segments[0].y)) {
                    this.segments[0].dir = 'rand';
                }
                
                
                if (this.segments[0].dir === 'rand') {
                    if (this.canMoveTo(this.segments[0].x, this.segments[0].y - 1)) {
                        this.segments[0].dir = 'up';
                    } else if (this.canMoveTo(this.segments[0].x, this.segments[0].y + 1)) {
                        this.segments[0].dir = 'down';
                    } else if (this.canMoveTo(this.segments[0].x - 1, this.segments[0].y)) {
                        this.segments[0].dir = 'left';
                    } else if (this.canMoveTo(this.segments[0].x + 1, this.segments[0].y)) {
                        this.segments[0].dir = 'right';
                    }
                }
            }
                    
            if (!this.canMoveTo(this.segments[0].x, this.segments[0].y - 1)
             && !this.canMoveTo(this.segments[0].x, this.segments[0].y + 1)
             && !this.canMoveTo(this.segments[0].x - 1, this.segments[0].y)
             && !this.canMoveTo(this.segments[0].x + 1, this.segments[0].y)) {
            this.canMove = false;
            this.segments[0].dir = 'down';
            } else {
                this.canMove = true;
            }
            
            if (this.canMove) {
                this.dc += this.speed * dt;
            }
            
        },

        render () {
            if (this.isRend) {
                for (let i = this.segments.length - 1; i >= 0; --i) {
                    let cord = this.segments[i];
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
                            break;
                    }
                    let s;
                    switch (i) {
                        case 0:
                            s = 'head';
                            break;
                        case this.segments.length - 1:
                            s = 'hvost';
                            break;
                        default:
                            s = 'seg';
                            break;
                    }
                    const tex = settings.frames[s + dir[0].toUpperCase() + dir.substr(1)];
                    draw(tex[this.frame % tex.length], x, y, this.rendWidth, this.rendHeight);
                }
            }
        },

        kill () {
            this.level.removeEntity(this.id);
        },

        damage () {
            if (this.resistTimer > this.resistTime) {
                this.resistTimer = 0;
                this.segSt -= 1;
                if (this.segSt <= 0) {
                    this.segments.pop();
                    this.segSt += 1;
                }
                if (this.segments.length == 0) {
                    this.kill();
                }
            }
        },

    }
}