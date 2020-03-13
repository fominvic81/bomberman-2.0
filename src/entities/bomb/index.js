import { draw } from '../../drawing';
import { createExplos } from '../explos';

import settings from './settings';

export const createBomb = (level, x, y, power, owner = false) => {
    return {
        level: level,
        x: x,
        y: y,
        nx: x,
        ny: y,
        dx: 0,
        dy: 0,
        time: 0,
        power: power,
        frameTimer: 0,
        frameCount: settings.frames.length,
        frames: settings.frames,
        frame: 0,
        width: settings.width,
        height: settings.height,
        rendWidth: settings.rendWidth,
        rendHeight: settings.rendHeight,
        life_time: settings.life_time,
        entityName: 'bomb',
        owner: owner,
        isS: false,

        setup() {
            this.isS = true;
            this.level.map[this.x][this.y].hasBomb = true;
        },

        update (dt) {
            if (!this.isS) this.setup();
            this.time += dt;
            this.frameTimer += dt;

            if (this.frameTimer > 0.2) {
                this.frameTimer = 0;
                ++this.frame;
                this.frame = this.frame % this.frameCount;
            }

            if (this.time >= this.life_time) {
                if (this.owner !== false) {
                    --this.owner.bombCount;
                }
                this.level.map[this.x][this.y].hasBomb = false;
                this.level.addEntity(createExplos(this.level, this.x, this.y, 'center', this.power));
                this.level.removeEntity(this.id);
            }
        },

        render () {
            draw(this.frames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
        },


        activate () {
            this.time = this.life_time + 5;
        },


    };
};