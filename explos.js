


const createExplos = (x, y, dir, power) => {
    return {
        x: x,
        y: y,
        time: 0,
        width: explosSettings.width,
        height: explosSettings.height,
        life_time: explosSettings.life_time,
        entityName: 'explos',
        dir: dir,
        spread: false,
        power: power,

        update (dt) {
            this.time += dt;
            // console.log(this.x, this.y);

            if (!tiles[level.map[this.x][this.y].tile].explosResist) {
                level.map[this.x][this.y].st -= 1;
                level.removeEntity(this.id);
                return;
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
            draw(explosSettings.image, this.x, this.y, this.width, this.height);
        },


    };
}