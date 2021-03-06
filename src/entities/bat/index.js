import { dist } from '../../common';
import { draw, createAnimation } from '../../drawing';
import tiles from '../../tiles';

import settings from './settings';

export const createBat = (level, x, y) => {
    return {
        level: level,
        x: x,
        y: y,
        nx: Math.round(x),
        ny: Math.round(y),
        dx: 0,
        dy: 0,
        dir: 'rand',
        translateY: settings.translateY,
        translateShadowY: settings.translateShadowY,
        shadowWidth: settings.shadowWidth,
        shadowHeight: settings.shadowHeight,
        shadow: settings.shadow,
        time: 0,
        frameTimer: 0,
        frame: 0,
        frameCount: settings.frames.length,
        frames: settings.frames,
        deadFrames: settings.deadFrames,
        width: settings.width,
        height: settings.height,
        rendWidth: settings.rendWidth,
        rendHeight: settings.rendHeight,
        speed: settings.speed,
        entityName: 'enemy',

        canMoveTo (x, y) {
            if (x > 0 && x < this.level.map.length - 1 && y > 0 && y < this.level.map[x].length - 1) {
                return true;
            } else {
                return false;
            }
        },

        canMoveToX (x, y) {
            if (x > 0 && x < this.level.map.length - 1) {
                return true;
            } else {
                return false;
            }
        },
        canMoveToY (x, y) {
            if (y > 0 && y < this.level.map[x].length - 1) {
                return true;
            } else {
                return false;
            }
        },

        update (dt) {
            this.time += dt;
            this.frameTimer += dt;
            
            if (this.frameTimer > 0.2) {
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
                if (this.dir == 'rand') {
                    if (this.canMoveTo(this.x - 1, this.y - 1)) {
                        this.dir = 'leup';
                    } else if (this.canMoveTo(this.x - 1, this.y + 1)) {
                        this.dir = 'ledo';
                    } else if (this.canMoveTo(this.x + 1, this.y - 1)) {
                        this.dir = 'riup';
                    } else if (this.canMoveTo(this.x + 1, this.y + 1)) {
                        this.dir = 'rido';
                    }
                }
                if (this.dir == 'leup') {
                    if (!this.canMoveToX(this.x - 1, this.y - 1)) {
                        this.dir = 'riup';
                    } else if (!this.canMoveToY(this.x - 1, this.y - 1)) {
                        this.dir = 'ledo';
                    }
                } else if (this.dir == 'ledo') {
                    if (!this.canMoveToX(this.x - 1, this.y + 1)) {
                        this.dir = 'rido';
                    } else if (!this.canMoveToY(this.x - 1, this.y + 1)) {
                        this.dir = 'leup';
                    }
                } else if (this.dir == 'riup') {
                    if (!this.canMoveToX(this.x + 1, this.y - 1)) {
                        this.dir = 'leup';
                    } else if (!this.canMoveToY(this.x + 1, this.y - 1)) {
                        this.dir = 'rido';
                    }
                } else
                if (this.dir == 'rido') {
                    if (!this.canMoveToX(this.x + 1, this.y + 1)) {
                        this.dir = 'ledo';
                    } else if (!this.canMoveToY(this.x + 1, this.y + 1)) {
                        this.dir = 'riup';
                    }
                }
                
                if (this.dir == 'leup') {
                    this.nx -= 1;
                    this.ny -= 1;
                }
                if (this.dir == 'ledo') {
                    this.nx -= 1;
                    this.ny += 1;
                }
                if (this.dir == 'riup') {
                    this.nx += 1;
                    this.ny -= 1;
                }
                if (this.dir == 'rido') {
                    this.nx += 1;
                    this.ny += 1;
                }
            }
            this.dx = 0;
            this.dy = 0;
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
            draw(this.shadow, this.x, this.y + this.translateShadowY, this.shadowWidth, this.shadowHeight);
            draw(this.frames[this.frame], this.x, this.y + this.translateY, this.rendWidth, this.rendHeight);
        },


        kill () {
            this.level.addAnimation(createAnimation(this.level, this.x, this.y, this.rendWidth, this.rendHeight, this.deadFrames, 0.5));
            this.level.removeEntity(this.id);
        }

    }
}