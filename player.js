function f(number, count) {
    let l = 1;
    for (let i = 1; i <= count; ++i) {
        l *= 10;
    }
    number *= l;
    return Math.trunc(number % l);
}


// TODO: додати можливість настроювати кнопки керування гравцем
const createPlayer = (level, x, y, controls) => {
    return {
        level: level,
        x: x,
        y: y,
        nx: x,
        ny: y,
        dx: 0,
        dy: 0,
        dir: 'down',
        time: 0,
        frameTimer: 0,
        frameCount: playerSettings.upFrames.length,
        upFrames: playerSettings.upFrames,
        downFrames: playerSettings.downFrames,
        leftFrames: playerSettings.leftFrames,
        rightFrames: playerSettings.rightFrames,
        deadFrames: playerSettings.deadFrames,
        frame: 0,
        putBombTimer: 10,
        canPutBomb: false,
        touchToBomb: false,
        power: bonuses.flame.startCount,
        maxBombCount: bonuses.extraBomb.startCount,
        bombCount: 0,        
        rollers: bonuses.rollers.startCount,
        protect: bonuses.protect.startCount,
        width: playerSettings.width,
        height: playerSettings.height,
        rendWidth: playerSettings.rendWidth,
        rendHeight: playerSettings.rendHeight,
        speed: playerSettings.speed,
        entityName: 'player',
        controls: controls,
        touchToB: new Map(),

        update (dt) {
            this.time += dt;
            this.putBombTimer += dt;
            this.frameTimer += dt;

            if (this.frameTimer > 0.2) {
                this.frameTimer = 0;
                ++this.frame;
                this.frame = this.frame % this.frameCount;
            }

            for (ttb of this.touchToB.keys()) {
                this.touchToB.set(ttb, this.touchToB.get(ttb) - dt);
            }

            if (this.putBombTimer >= 0.1) {
                this.canPutBomb = true;
            } else {
                this.canPutBomb = false;
            }
            this.speed = playerSettings.speed;
            this.speed *= Math.log2(this.rollers)/3 + 1;
            this.dx = 0, this.dy = 0;
            if (app.key(this.controls.up)) {
                this.dy -= this.speed * dt;
                this.dir = 'up';
            }
            if (app.key(this.controls.down)) {
                this.dy += this.speed * dt;
                this.dir = 'down';
            }
        	if (app.key(this.controls.left)) {
                this.dx -= this.speed * dt;
                this.dir = 'left';
        	}
        	if (app.key(this.controls.right)) {
                this.dx += this.speed * dt;
                this.dir = 'right'; 
        	}
            if (app.key(this.controls.putBomb)) {
                if (this.bombCount < this.maxBombCount) {
                    if (this.canPutBomb && !this.touchToBomb) {
                        this.level.addEntity(createBomb(this.level, Math.round(this.x), Math.round(this.y), this.power, this));
                        this.putBombTimer = 0;
                        ++this.bombCount;
                    }
                }
            }

            if (this.dx == 0 && this.dy == 0) {
                this.dir = 'down';
                this.frame = 0;
            }
            
            // this.nx += this.dx;
            // this.ny += this.dy;

            this.x = this.nx;
            this.y = this.ny;

            this.touchToBomb = false;
        },

        move (map) {
            if ((this.dx == 0) && (this.dy == 0)) return;
            let w = this.width;
            let h = this.height;
            let speed = this.speed;
            let tlSize = 1;
            

            for (let u = 1; u <= speed; ++u) {
                const ox = this.nx;
                const oy = this.ny;
                this.nx += this.dx / speed;
                this.ny += this.dy / speed;
            
                for (let j = Math.round(oy + 0.01 - h/2); j <= Math.round(oy-0.01+h/2); ++j) {
                    for (let i = Math.round(this.nx - w/2); i <= Math.round(this.nx + w/2); ++i) {
                        if (dist(ox, oy, i, j) < w/2 + 0.5) {
                            this.touchToB.set(i*10000+j, 0.1);
                        }
                        if ((tiles[map[i][j].tile].collide || (map[i][j].hasBomb && this.touchToB.get(i*10000+j) <= 0))) {
                            if (this.dx>0) this.nx = Math.min(this.nx, i - w/2 - 0.5);
                            if (this.dx<0) this.nx = Math.max(this.nx, i + w/2 + 0.5);
                        }
                        
                    }
                }
               
                for (let i = Math.round(ox + 0.01 - w/2); i <= Math.round(ox-0.01 + w/2); ++i) {
                    for (let j = Math.round(this.ny - h/2); j <= Math.round(this.ny + h/2); ++j) {
                        if (dist(ox, oy, i, j) < h/2 + 0.5) {
                            this.touchToB.set(i*10000+j, 0.1);
                        }
                        if ((tiles[map[i][j].tile].collide || (map[i][j].hasBomb && this.touchToB.get(i*10000+j) <= 0))) {
                            if (this.dy>0) this.ny = Math.min(this.ny, j - h/2 - 0.5);
                            if (this.dy<0) this.ny = Math.max(this.ny, j + h/2 + 0.5);
                        }         
                    }
                }
            }  
        },

        render () {
            if (this.dir == 'down') {
                draw(this.downFrames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
            } else if (this.dir == 'up') {
                draw(this.upFrames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
            } else if (this.dir == 'left') {
                draw(this.leftFrames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
            } else if (this.dir == 'right') {
                draw(this.rightFrames[this.frame], this.x, this.y, this.rendWidth, this.rendHeight);
            }
        },

        kill () {
            this.level.addAnimation(createAnimation(this.x, this.y, this.rendWidth, this.rendHeight, this.deadFrames, 0.5))
            this.level.removeEntity(this.id);
        }
    }
}