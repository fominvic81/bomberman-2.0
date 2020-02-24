
const createIceCream = (x, y) => {
    return {
        x: x,
        y: y,
        nx: Math.round(x),
        ny: Math.round(y),
        dx: 0,
        dy: 0,
        dir: 'up',
        time: 0,
        frameTimer: 0,
        frame: 0,
        frameCount: iceCreamSettings.frames.length,
        frames: iceCreamSettings.frames,
        width: iceCreamSettings.width,
        height: iceCreamSettings.height,
        rendWidth: iceCreamSettings.rendWidth,
        rendHeight: iceCreamSettings.rendHeight,
        speed: iceCreamSettings.speed,

        canMoveTo (x, y) {
            if (!tiles[level.map[x][y].tile].collide) {
                return true;
            }
            if (level.map[x][y].hasBomb != true) {
                return false;
            }
            return false;
        },

        update (dt) {
            this.time += dt;
            this.frameTimer += dt;

            if (this.frameTimer > 0.5) {
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
                    if (this.canMoveTo(this.x, this.y - 1)) {
                        this.dir = 'up';
                    } else if (this.canMoveTo(this.x, this.y + 1)) {
                        this.dir = 'down';
                    } else if (this.canMoveTo(this.x - 1, this.y)) {
                        this.dir = 'left';
                    } else if (this.canMoveTo(this.x + 1, this.y)) {
                        this.dir = 'right';
                    }
                }
                if (this.dir == 'up') {
                    if (!this.canMoveTo(this.x, this.y - 1)) {
                        this.dir = 'down';
                        if (this.canMoveTo(this.x - 1, this.y) && rand(8) == 0) {
                            this.dir = 'left';
                        }
                        if (this.canMoveTo(this.x + 1, this.y) && rand(8) == 0) {
                            this.dir = 'right';
                        }
                    }
                }
                if (this.dir == 'down') {
                    if (!this.canMoveTo(this.x, this.y + 1)) {
                        this.dir = 'up';
                        if (this.canMoveTo(this.x - 1, this.y) && rand(8) == 0) {
                            this.dir = 'left';
                        }
                        if (this.canMoveTo(this.x + 1, this.y) && rand(8) == 0) {
                            this.dir = 'right';
                        }
                    }
                }
                if (this.dir == 'left') {
                    if (!this.canMoveTo(this.x - 1, this.y)) {
                        this.dir = 'right';
                        if (this.canMoveTo(this.x, this.y - 1) && rand(8) == 0) {
                            this.dir = 'up';
                        }
                        if (this.canMoveTo(this.x, this.y + 1) && rand(8) == 0) {
                            this.dir = 'down';
                        }
                    }
                }
                if (this.dir == 'right') {
                    if (!this.canMoveTo(this.x + 1, this.y)) {
                        this.dir = 'left';
                        if (this.canMoveTo(this.x, this.y - 1) && rand(8) == 0) {
                            this.dir = 'up';
                        }
                        if (this.canMoveTo(this.x, this.y + 1) && rand(8) == 0) {
                            this.dir = 'down';
                        }
                    }
                }
                
                if (this.dir == 'up') {
                    this.ny -= 1;
                }
                if (this.dir == 'down') {
                    this.ny += 1;
                }
                if (this.dir == 'left') {
                    this.nx -= 1;
                }
                if (this.dir == 'right') {
                    this.nx += 1;
                }
            }
            this.dx = 0, this.dy = 0;
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
            draw(this.frames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
        },

    }
}


level.addEntity(createIceCream(3, 3));
level.addEntity(createIceCream(7, 4));
level.addEntity(createIceCream(5, 5));