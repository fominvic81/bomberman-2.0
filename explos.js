


const createExplos = (x, y, dir, power) => {
    return {
        x: x,
        y: y,
        time: 0,
        frameTimer: 0,
        frameCount: explosSettings.centerFrames.length,
        centerFrames: explosSettings.centerFrames,
        upFrames: explosSettings.upFrames,
        upEndFrames: explosSettings.upEndFrames,
        downFrames: explosSettings.downFrames,
        downEndFrames: explosSettings.downEndFrames,
        leftFrames: explosSettings.leftFrames,
        leftEndFrames: explosSettings.leftEndFrames,
        rightFrames: explosSettings.rightFrames,
        rightEndFrames: explosSettings.rightEndFrames,
        frame: 0,
        width: explosSettings.width,
        height: explosSettings.height,
        rendWidth: explosSettings.rendWidth,
        rendHeight: explosSettings.rendHeight,
        life_time: explosSettings.life_time,
        entityName: 'explos',
        dir: dir,
        spread: false,
        power: power,

        update (dt) {
            this.time += dt;
            this.time = Math.min(this.time, this.life_time); 

            
            this.frame = Math.floor(this.time / (this.life_time / this.frameCount));

            if (!tiles[level.map[this.x][this.y].tile].explosResist) {
                level.map[this.x][this.y].st -= 1;
                // level.removeEntity(this.id);
                this.power = 0;
                // return;
            }

            if (this.power == 0) this.spread = true;

            if (!this.spread) {
                this.spread = true;
                if (this.dir == 'center') {
                    level.addEntity(createExplos(this.x, this.y - 1, 'up', this.power - 1))
                    level.addEntity(createExplos(this.x, this.y + 1, 'down', this.power - 1))
                    level.addEntity(createExplos(this.x - 1, this.y, 'left', this.power - 1))
                    level.addEntity(createExplos(this.x + 1, this.y, 'right', this.power - 1))
                } else if (this.dir == 'up') {
                    level.addEntity(createExplos(this.x, this.y - 1, this.dir, this.power - 1))
                } else if (this.dir == 'down') {
                    level.addEntity(createExplos(this.x, this.y + 1, this.dir, this.power - 1))
                } else if (this.dir == 'left') {
                    level.addEntity(createExplos(this.x - 1, this.y, this.dir, this.power - 1))
                } else if (this.dir == 'right') {
                    level.addEntity(createExplos(this.x + 1, this.y, this.dir, this.power - 1))
                }
            }

            if (this.time >= this.life_time) {
                level.removeEntity(this.id);
            }
        },

        render () {
            // draw(explosSettings.image, this.x, this.y, this.width, this.height);
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