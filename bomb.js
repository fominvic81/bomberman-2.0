
const createBomb = (x, y) => {
    return {
        x: x,
        y: y,
        nx: x,
        ny: y,
        dx: 0,
        dy: 0,
        time: 0,
        frameTimer: 0,
        frameCount: bombSettings.frames.length,
        frames: bombSettings.frames,
        frame: 0,
        width: bombSettings.width,
        height: bombSettings.height,
        rendWidth: bombSettings.rendWidth,
        rendHeight: bombSettings.rendHeight,
        life_time: bombSettings.life_time,
        entityName: 'bomb',

        update (dt) {
            this.time += dt;
            this.frameTimer += dt;

            if (this.frameTimer > 0.2) {
                this.frameTimer = 0;
                ++this.frame;
                this.frame = this.frame % this.frameCount;
            }



            



            if (this.time >= this.life_time) {
                level.addEntity(createExplos(this.x, this.y, 'center', 3));
                level.removeEntity(this.id);
            }
        },

        render () {
            draw(this.frames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
        },


    };
}

// level.addEntity(createBomb(4, 5));
// level.addEntity(createBomb(5, 4));
