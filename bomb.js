
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
        entityName: 'bomb',

        update (dt) {

            this.nx += this.dx;
            this.ny += this.dy;

            this.x = this.nx;
            this.y = this.ny;

            this.time += dt;
        },

        render () {
            draw(bombSettings.image, this.x, this.y, this.width, this.height);
        },


    };
}

level.addEntity(createBomb(2, 2));