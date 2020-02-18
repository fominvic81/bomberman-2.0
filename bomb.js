
const createBomb = (x, y) => {
    return {
        x: x,
        y: y,
        nx: x,
        ny: y,
        dx: 0,
        dy: 0,
        time: 0,
        width: bombSettings.width,
        height: bombSettings.height,
        life_time: bombSettings.life_time,
        entityName: 'bomb',

        update (dt) {


            this.time += dt;

            



            if (this.time >= this.life_time) {
                level.addEntity(createExplos(this.x, this.y, 'center', 4));
                level.removeEntity(this.id);
            }
        },

        render () {
            draw(bombSettings.image, this.x, this.y, this.width, this.height);
        },


    };
}

level.addEntity(createBomb(4, 5));
level.addEntity(createBomb(4, 5));