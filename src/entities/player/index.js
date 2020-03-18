import { dist } from '../../common';
import { draw, createAnimation } from '../../drawing';
import tiles from '../../tiles';
import { createBomb } from '../bomb';
import bonuses from '../bonus/bonuses';

import settings from './settings';

const f = (number, count) => {
    let l = 1;
    for (let i = 1; i <= count; ++i) {
        l *= 10;
    }
    number *= l;
    return Math.trunc(number % l);
};

// TODO:
export const createPlayer = (level, x, y, controls) => {
    return {
        level: level,
        x: x,
        y: y,
        nx: x,
        ny: y,
        dx: 0,
        dy: 0,
        translateY: settings.translateY,
        translateShadowY: settings.translateShadowY,
        translateShadowX: settings.translateShadowX,
        dir: 'down',
        time: 0,
        frameTimer: 0,
        frameCount: settings.upFrames.length,
        upFrames: settings.upFrames,
        downFrames: settings.downFrames,
        leftFrames: settings.leftFrames,
        rightFrames: settings.rightFrames,
        deadFrames: settings.deadFrames,
        shadowWidth: settings.shadowWidth,
        shadowHeight: settings.shadowHeight,
        shadow: settings.shadow,
        frame: 0,
        putBombTimer: 10,
        touchToBomb: false,
        power: bonuses.flame.startCount,
        maxBombCount: bonuses.extraBomb.startCount,
        bombCount: 0,        
        rollers: bonuses.rollers.startCount,
        protect: bonuses.protect.startCount,
        burnWall: bonuses.burnWall.startCount,
        doubleBomb: bonuses.doubleBomb.startCount,
        radioBomb: bonuses.radioBomb.startCount,
        canActivateRadioBomb: true,
        radioBombs: [],
        throughBomb: bonuses.throughBomb.startCount,
        throughWall: bonuses.throughWall.startCount,
        width: settings.width,
        height: settings.height,
        rendWidth: settings.rendWidth,
        rendHeight: settings.rendHeight,
        speed: settings.speed,
        entityName: 'player',
        controls: controls,
        touchToB: new Map(),

        canMoveTo (x, y) {
            if (this.level.map[x][y].hasBomb === true && this.throughBomb === 0) {
                return false;
            }
            if (tiles[this.level.map[x][y].tile].collide && (this.throughWall === 0 || (this.throughWall === 1 && tiles[this.level.map[x][y].tile].collideLevel > 1))) {
                return false;
            }
            return true;
        },

        update (dt) {
            this.time += dt;
            this.putBombTimer += dt;
            this.frameTimer += dt;

            if (this.frameTimer > 0.125) {
                this.frameTimer = 0;
                ++this.frame;
                this.frame = this.frame % this.frameCount;
            }

            for (const ttb of this.touchToB.keys()) {
                this.touchToB.set(ttb, this.touchToB.get(ttb) - dt);
            }
            this.speed = settings.speed;
            this.speed *= Math.log2(this.rollers)/3 + 1;
            this.dx = 0, this.dy = 0;
            if (app.key(this.controls.up)) {
                this.dy -= this.speed * dt;
                this.dir = 'up';
            }
            if (app.key(this.controls.down)) {
                this.dy += this.speed * dt;
                this.dir = 'down';
            }
        	if (app.key(this.controls.left)) {
                this.dx -= this.speed * dt;
                this.dir = 'left';
        	}
        	if (app.key(this.controls.right)) {
                this.dx += this.speed * dt;
                this.dir = 'right'; 
        	}
            if (app.key(this.controls.fire1)) {
                if (this.putBombTimer > 0.1) {
                    this.putBombTimer = 0;
                    if (this.bombCount < this.maxBombCount) {
                        if (!this.touchToBomb) {
                            const bomb = createBomb(this.level, Math.round(this.x), Math.round(this.y), this.power, this.doubleBomb, this.burnWall, this.radioBomb, this);
                            if (this.radioBomb) {
                                this.radioBombs.push(bomb);
                            }
                            this.level.addEntity(bomb);
                            ++this.bombCount;
                        }
                    }
                }
            }
            if (app.key(this.controls.fire2)) {
                if (this.canActivateRadioBomb) {
                    while (this.radioBombs.length > 0) {
                        const b = this.radioBombs.shift();
                        if (!b.activated) {
                            b.activate();
                            break;
                        }
                    }
                }
                this.canActivateRadioBomb = false;
            } else {
                this.canActivateRadioBomb = true;
            }

            if (this.dx === 0 && this.dy === 0) {
                this.dir = 'down';
                this.frame = 0;
            }
            
            // this.nx += this.dx;
            // this.ny += this.dy;

            this.x = this.nx;
            this.y = this.ny;

            this.touchToBomb = false;
            this.move(dt);
        },

        move (dt) {
            if ((this.dx === 0) && (this.dy === 0)) return;
            let w = this.width;
            let h = this.height;
            let speed = this.speed;
            let tlSize = 1;
            
            for (let u = 1; u <= speed; ++u) {
                const ox = this.nx;
                const oy = this.ny;
                this.nx += this.dx / speed;
                this.ny += this.dy / speed;

                for (let j = Math.round(oy + 0.001 - h/2); j <= Math.round(oy-0.001+h/2); ++j) {
                    for (let i = Math.round(this.nx - w/2); i <= Math.round(this.nx + w/2); ++i) {
                        if (dist(ox, oy, i, j) < w/2 + 0.49) {
                            this.touchToB.set(i*10000+j, 0.1);
                        }
                        if (!this.canMoveTo(i, j) && (this.touchToB.get(i*10000+j) <= 0 || this.touchToB.get(i*10000+j) === undefined)) {
                            if (this.dx>0) {
                                this.nx = Math.min(this.nx, i - w/2 - 0.5);
                            }
                            if (this.dx<0) {
                                this.nx = Math.max(this.nx, i + w/2 + 0.5);
                            };
                        }
                        
                    }
                }
               
                for (let i = Math.round(ox + 0.01 - w/2); i <= Math.round(ox-0.01 + w/2); ++i) {
                    for (let j = Math.round(this.ny - h/2); j <= Math.round(this.ny + h/2); ++j) {
                        if (dist(ox, oy, i, j) < h/2 + 0.49) {
                            this.touchToB.set(i*10000+j, 0.1);
                        }
                        if (!this.canMoveTo(i, j) && (this.touchToB.get(i*10000+j) <= 0 || this.touchToB.get(i*10000+j) === undefined)) {
                            if (this.dy>0) this.ny = Math.min(this.ny, j - h/2 - 0.5);
                            if (this.dy<0) this.ny = Math.max(this.ny, j + h/2 + 0.5);
                        }         
                    }
                }
            }  
        },

        render () {
            switch (this.dir) {
                case 'down':
                    draw(this.shadow, this.x, this.y + this.translateShadowY, this.shadowWidth, this.shadowHeight);
                    draw(this.downFrames[this.frame], this.x, this.y + this.translateY, this.rendWidth, this.rendHeight);
                    break;
                case 'up':
                    draw(this.shadow, this.x, this.y + this.translateShadowY, this.shadowWidth, this.shadowHeight);
                    draw(this.upFrames[this.frame], this.x, this.y + this.translateY, this.rendWidth, this.rendHeight);
                    break;
                case 'left':
                    draw(this.shadow, this.x - this.translateShadowX, this.y + this.translateShadowY, this.shadowWidth, this.shadowHeight);
                    draw(this.leftFrames[this.frame], this.x, this.y + this.translateY, this.rendWidth, this.rendHeight);
                    break;
                case 'right':
                    draw(this.shadow, this.x + this.translateShadowX, this.y + this.translateShadowY, this.shadowWidth, this.shadowHeight);
                    draw(this.rightFrames[this.frame], this.x, this.y + this.translateY, this.rendWidth, this.rendHeight);
                    break;
            }
        },

        kill () {
            this.level.addAnimation(createAnimation(this.level, this.x, this.y, this.rendWidth, this.rendHeight, this.deadFrames, 0.5))
            this.level.removeEntity(this.id);
        }
    }
}