
const createBat = (level, x, y) => {
    return {
        level: level,
        x: x,
        y: y,
        nx: Math.round(x),
        ny: Math.round(y),
        dx: 0,
        dy: 0,
        dir: 'rand',
        time: 0,
        frameTimer: 0,
        frame: 0,
        frameCount: batSettings.frames.length,
        frames: batSettings.frames,
        deadFrames: batSettings.deadFrames,
        width: batSettings.width,
        height: batSettings.height,
        rendWidth: batSettings.rendWidth,
        rendHeight: batSettings.rendHeight,
        speed: batSettings.speed,
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

        findPlayer () {
            let pl = {x: 0, y: 0, dist: Infinity};
            for (entity of this.level.entities) {
                if (entity.entityName == 'player') {
                    let d = dist(this.x, this.y, entity.x, entity.y);
                    if (pl.dist >= d) {
                        pl.dist = d;
                        pl.x = entity.x;
                        pl.y = entity.y;
                    }
                }
            }
            if (pl.dist == Infinity) {
                return;
            }
            return {x: pl.x, y: pl.y};
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
            draw(this.frames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
        },


        kill () {
            this.level.addAnimation(createAnimation(this.x, this.y, this.rendWidth, this.rendHeight, this.deadFrames, 0.5));
            this.level.removeEntity(this.id);
        }

    }
}