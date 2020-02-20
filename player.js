function f(number, count) {
    let l = 1;
    for (let i = 1; i <= count; ++i) {
        l *= 10;
    }
    number *= l;
    return Math.trunc(number % l);
}


//// додати можливість настроювати кнопки керування гравцем
const createPlayer = (x, y) => {
    return {
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
        frame: 0,
        putBombTimer: 10,
        width: playerSettings.width,
        height: playerSettings.height,
        rendWidth: playerSettings.rendWidth,
        rendHeight: playerSettings.rendHeight,
        speed: playerSettings.speed,
        entityName: 'player',

        update (dt) {
            this.time += dt;
            this.putBombTimer += dt;
            this.frameTimer += dt;

            if (this.frameTimer > 0.2) {
                this.frameTimer = 0;
                ++this.frame;
                this.frame = this.frame % this.frameCount;
            }

            this.dx = 0, this.dy = 0;
            if (app.key('ArrowUp')) {
                this.dy -= this.speed * dt;
                this.dir = 'up';
            }
            if (app.key('ArrowDown')) {
                this.dy += this.speed * dt;
                this.dir = 'down';
            }
        	if (app.key('ArrowLeft')) {
                this.dx -= this.speed * dt;
                this.dir = 'left';
        	}
        	if (app.key('ArrowRight')) {
                this.dx += this.speed * dt;
                this.dir = 'right'; 
        	}
            if (app.key(' ')) {
                if (this.putBombTimer >= 0.2) {
                    level.addEntity(createBomb(Math.round(this.x), Math.round(this.y)));
                    this.putBombTimer = 0;
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
        },

        move (map) {
            if ((this.dx == 0) && (this.dy == 0)) return;
            let w = this.width;
            let h = this.height;
            let x = this.x;
            let y = this.y;
            let count = 2;
            let step = h / count;
            let ice = 10;
            let speed = this.speed;
            let tlSize = 1;


        
            for (let i = 1; i <= speed; ++i) {
                x += this.dx / speed;
                y += this.dy / speed;
        
                this.nx = x;
                this.ny = y;
        
                step = h / count - 0.01;
        
                for (let i = 0 - count / 2; i <= count / 2; ++i) {
                    let cord = [(x - w/2) / tlSize + 0.5, (y - h/2 + i * step - (tlSize - h) / 2) / tlSize + 1];
                    if (tiles[map[Math.floor(cord[0])][Math.floor(cord[1])].tile].collide) {
                        if (tiles[map[Math.floor(cord[0]) + 1][Math.floor(cord[1])].tile].collide == 0) { 
                            if (f(cord[0], 2) > 100 - ice) {
                                this.nx = Math.ceil(cord[0]) * tlSize - (tlSize - w) / 2;
                            }
                        } else if (f(cord[0], 2) > 94) {
                            this.nx = Math.ceil(cord[0]) * tlSize  - (tlSize - w) / 2;
                        }
                    }
                }
        
                for (let i = 0 - count / 2; i <= count / 2; ++i) {
                    let cord = [(x - w/2 - (tlSize - w)) / tlSize + 0.5, (y - h/2 + i * step - (tlSize - h) / 2) / tlSize + 1];
                    if (tiles[map[Math.ceil(cord[0])][Math.floor(cord[1])].tile].collide != 0) {
                        if (tiles[map[Math.ceil(cord[0]) - 1][Math.floor(cord[1])].tile].collide == 0) { 
                            if (f(cord[0], 2) < ice) {
                                this.nx = Math.floor(cord[0]) * tlSize + (tlSize - w) / 2;
                            }
                        } else if (f(cord[0], 2) < 6) {
                            this.nx = Math.floor(cord[0]) * tlSize  + (tlSize - w) / 2;
                        }
                    }
                }
        
                step = w / count - 0.01;
        
                for (let i = 0 - count / 2; i <= count / 2; ++i) {
                    let cord = [(x - w/2 + i * step - (tlSize - w) / 2 - 0) / tlSize + 1, (y - h/2) / tlSize + 0.5];
                    if ((tiles[map[Math.floor(cord[0])][Math.floor(cord[1])].tile].collide != 0)) {
                        if (tiles[map[Math.floor(cord[0])][Math.floor(cord[1]) + 1].tile].collide == 0) {
                            if (f(cord[1], 2) > 100 - ice) {
                                this.ny = (Math.ceil(cord[1])) * tlSize - (tlSize - h) / 2;     
                            }    
                        } else if (f(cord[1], 2) > 94) {
                            this.ny = (Math.ceil(cord[1])) * tlSize - (tlSize - h) / 2;
                        }
                    } 
                }
                
                for (let i = 0 - count / 2; i <= count / 2; ++i) {
                    let cord = [(x - w/2 + i * step - (tlSize - w) / 2 - 0) / tlSize + 1, (y - h/2 - (tlSize - h)) / tlSize + 0.5];
                    if ((tiles[map[Math.floor(cord[0])][Math.ceil(cord[1])].tile].collide != 0)) {
                        if (tiles[map[Math.floor(cord[0])][Math.ceil(cord[1]) - 1].tile].collide == 0) {
                            if (f(cord[1], 2) < ice) {
                                this.ny = (Math.floor(cord[1])) * tlSize + (tlSize - h) / 2;     
                            }    
                        } else if (f(cord[1], 2) < 6) {
                            this.ny = (Math.floor(cord[1])) * tlSize + (tlSize - h) / 2;
                        }
                    } 
                }
        
                x = this.nx;
                y = this.ny;     
            }
            return {x: this.nx, y: this.ny};
        },
        

        render () {
            // draw(playerSettings.image, this.x, this.y, this.width, this.height);
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
    }
}

const player = createPlayer(1, 1);
level.addEntity(player);
