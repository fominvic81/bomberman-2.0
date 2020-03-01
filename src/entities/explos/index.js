import { draw } from '../../drawing';
import tiles from '../../tiles';

import settings from './settings';

export const createExplos = (level, x, y, dir, power) => {
    return {
        level: level,
        x: x,
        y: y,
        time: 0,
        frameTimer: 0,
        frameCount: settings.centerFrames.length,
        centerFrames: settings.centerFrames,
        upFrames: settings.upFrames,
        upEndFrames: settings.upEndFrames,
        downFrames: settings.downFrames,
        downEndFrames: settings.downEndFrames,
        leftFrames: settings.leftFrames,
        leftEndFrames: settings.leftEndFrames,
        rightFrames: settings.rightFrames,
        rightEndFrames: settings.rightEndFrames,
        frame: 0,
        width: settings.width,
        height: settings.height,
        rendWidth: settings.rendWidth,
        rendHeight: settings.rendHeight,
        life_time: settings.life_time,
        entityName: 'explos',
        dir: dir,
        spread: false,
        power: power,

        spreadExplos() {
            for (let i = 1; i <= this.power; ++i) {
                let nx = this.x;
                let ny = this.y - i;
                let npower = this.power - i;
                if (!tiles[this.level.map[nx][ny].tile].explosResist) {
                    // this.level.map[nx][ny].st -= 1;
                    this.level.damageTile(nx, ny, 1);
                    npower = 0;
                    this.level.addEntity(createExplos(this.level, nx, ny, 'up', npower));
                    break;
                }
                this.level.addEntity(createExplos(this.level, nx, ny, 'up', npower));
            }
            for (let i = 1; i <= this.power; ++i) {
                let nx = this.x;
                let ny = this.y + i;
                let npower = this.power - i;
                if (!tiles[this.level.map[nx][ny].tile].explosResist) {
                    // this.level.map[nx][ny].st -= 1;
                    this.level.damageTile(nx, ny, 1);
                    npower = 0;
                    this.level.addEntity(createExplos(this.level, nx, ny, 'down', npower));
                    break;
                }
                this.level.addEntity(createExplos(this.level, nx, ny, 'down', npower));
            }
            for (let i = 1; i <= this.power; ++i) {
                let nx = this.x - i;
                let ny = this.y;
                let npower = this.power - i;
                if (!tiles[this.level.map[nx][ny].tile].explosResist) {
                    // this.level.map[nx][ny].st -= 1;
                    this.level.damageTile(nx, ny, 1);
                    npower = 0;
                    this.level.addEntity(createExplos(this.level, nx, ny, 'left', npower));
                    break;
                }
                this.level.addEntity(createExplos(this.level, nx, ny, 'left', npower));
            }
            for (let i = 1; i <= this.power; ++i) {
                let nx = this.x + i;
                let ny = this.y;
                let npower = this.power - i;
                if (!tiles[this.level.map[nx][ny].tile].explosResist) {
                    // this.level.map[nx][ny].st -= 1;
                    this.level.damageTile(nx, ny, 1);
                    npower = 0;
                    this.level.addEntity(createExplos(this.level, nx, ny, 'right', npower));
                    break;
                }
                this.level.addEntity(createExplos(this.level, nx, ny, 'right', npower));
            }
        },

        init () {
            if (this.power == 0) this.spread = true;

            if (!this.spread) {
                this.spread = true;
                if (this.dir == 'center') {
                    this.spreadExplos();
                }
            }

        },

        update (dt) {
            this.time += dt;
            this.time = Math.min(this.time, this.life_time); 

            
            this.frame = Math.min(Math.floor(this.time / (this.life_time / this.frameCount)), this.frameCount - 1);

            if (this.time >= this.life_time) {
                this.level.removeEntity(this.id);
            }

        },

        render () {
            if (this.dir == 'center') {
                draw(this.centerFrames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
            } else if (this.dir == 'up') {
                if (this.power != 0) {
                    draw(this.upFrames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
                } else {
                    draw(this.upEndFrames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
                }
            } else if (this.dir == 'down') {
                if (this.power != 0) {
                    draw(this.downFrames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
                } else {
                    draw(this.downEndFrames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
                }
            } else if (this.dir == 'left') {
                if (this.power != 0) {
                    draw(this.leftFrames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
                } else {
                    draw(this.leftEndFrames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
                }
            } else if (this.dir == 'right') {
                if (this.power != 0) {
                    draw(this.rightFrames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
                } else {
                    draw(this.rightEndFrames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
                }
            }
        },


    };
}