import { ctx } from './app';

export const TILE_SIZE = 44;

export const draw = (img, x, y, w, h) => {
    ctx.save();

    ctx.scale(TILE_SIZE, TILE_SIZE);
    ctx.translate(-w / 2, -h / 2);
    ctx.drawImage(img, x, y, w, h);

    ctx.restore();
};

export const createAnimation = (level, x, y, width, height, frames, life_time) => ({
    level,
    x,
    y,
    width,
    height,
    frames,
    frameCount: frames.length,
    life_time,
    time: 0,
    frame: 0,

    update (dt) {
        this.time += dt;
        this.time = Math.min(this.time, this.life_time); 
        
        this.frame = Math.min(Math.floor(this.time / (this.life_time / this.frameCount)), this.frameCount - 1);

        if (this.time >= this.life_time) {
            this.level.removeAnimation(this.id);
        }
    },

    render () {
        draw(this.frames[this.frame], this.x, this.y, this.width, this.height);
    },
});
