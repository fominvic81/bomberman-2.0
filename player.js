function f(number, count) {
    let l = 1;
    for (let i = 1; i <= count; ++i) {
        l *= 10;
    }
    number *= l;
    return Math.trunc(number % l);
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 2);
}


// TODO: додати можливість настроювати кнопки керування гравцем
const createPlayer = (x, y, controls) => {
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

        update (dt) {
            this.time += dt;
            this.putBombTimer += dt;
            this.frameTimer += dt;

            if (this.frameTimer > 0.2) {
                this.frameTimer = 0;
                ++this.frame;
                this.frame = this.frame % this.frameCount;
            }

            if (this.putBombTimer >= 0.1) {
                this.canPutBomb = true;
            } else {
                this.canPutBomb = false;
            }
            this.speed = playerSettings.speed;
            // this.speed *= ((this.rollers - 1) / 4) + 1;
            this.speed *= Math.log2(this.rollers)/2 + 1;
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
                        level.addEntity(createBomb(Math.round(this.x), Math.round(this.y), this.power, this));
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
            
	            const disablex = map[Math.floor(ox + 0.1)][Math.round(oy)].hasBomb
			    || map[Math.ceil(ox - 0.1)][Math.round(oy)].hasBomb;
                for (let j = Math.round(oy + 0.15 - h/2); j <= Math.round(oy-0.15+h/2); ++j) {
                    for (let i = Math.round(this.nx - w/2); i <= Math.round(this.nx + w/2); ++i) {
                        if ((tiles[map[i][j].tile].collide || (!disablex && map[i][j].hasBomb))/* && this.touchToW.get(i*10000 + j) === undefined*/) {
                            if (this.dx>0) this.nx = Math.min(this.nx, i - w/2 - 0.5);
                            if (this.dx<0) this.nx = Math.max(this.nx, i + w/2 + 0.5);
                        }
                        
                    }
                }
               
                const disabley = map[Math.round(ox)][Math.floor(oy + 0.1)].hasBomb
                || map[Math.round(ox)][Math.ceil(oy - 0.1)].hasBomb;
                for (let i = Math.round(ox + 0.15 - w/2); i <= Math.round(ox-0.15 + w/2); ++i) {
                    for (let j = Math.round(this.ny - h/2); j <= Math.round(this.ny + h/2); ++j) {
                        if ((tiles[map[i][j].tile].collide || (!disabley && map[i][j].hasBomb))) {
                            if (this.dy>0) this.ny = Math.min(this.ny, j - h/2 - 0.5);
                            if (this.dy<0) this.ny = Math.max(this.ny, j + h/2 + 0.5);
                        }
                        
                    }
                }
            }  

            // this.nx = x;
            // this.ny = y;
        
            // for (let i = 1; i <= speed; ++i) {
            //     x += this.dx / speed;
            //     y += this.dy / speed;
        
            //     this.nx = x;
            //     this.ny = y;
        
            //     step = h / count - 0.01;
        
            //     for (let i = 0 - count / 2; i <= count / 2; ++i) {
            //         let cord = [(x - w/2) / tlSize + 0.5, (y - h/2 + i * step - (tlSize - h) / 2) / tlSize + 1];
            //         if (tiles[map[Math.floor(cord[0])][Math.floor(cord[1])].tile].collide) {
            //             if (tiles[map[Math.floor(cord[0]) + 1][Math.floor(cord[1])].tile].collide == 0) { 
            //                 if (f(cord[0], 2) > 100 - ice) {
            //                     this.nx = Math.ceil(cord[0]) * tlSize - (tlSize - w) / 2;
            //                 }
            //             } else if (f(cord[0], 2) > 94) {
            //                 this.nx = Math.ceil(cord[0]) * tlSize  - (tlSize - w) / 2;
            //             }
            //         }
            //     }
        
            //     for (let i = 0 - count / 2; i <= count / 2; ++i) {
            //         let cord = [(x - w/2 - (tlSize - w)) / tlSize + 0.5, (y - h/2 + i * step - (tlSize - h) / 2) / tlSize + 1];
            //         if (tiles[map[Math.ceil(cord[0])][Math.floor(cord[1])].tile].collide != 0) {
            //             if (tiles[map[Math.ceil(cord[0]) - 1][Math.floor(cord[1])].tile].collide == 0) { 
            //                 if (f(cord[0], 2) < ice) {
            //                     this.nx = Math.floor(cord[0]) * tlSize + (tlSize - w) / 2;
            //                 }
            //             } else if (f(cord[0], 2) < 6) {
            //                 this.nx = Math.floor(cord[0]) * tlSize  + (tlSize - w) / 2;
            //             }
            //         }
            //     }
        
            //     step = w / count - 0.01;
        
            //     for (let i = 0 - count / 2; i <= count / 2; ++i) {
            //         let cord = [(x - w/2 + i * step - (tlSize - w) / 2 - 0) / tlSize + 1, (y - h/2) / tlSize + 0.5];
            //         if ((tiles[map[Math.floor(cord[0])][Math.floor(cord[1])].tile].collide != 0)) {
            //             if (tiles[map[Math.floor(cord[0])][Math.floor(cord[1]) + 1].tile].collide == 0) {
            //                 if (f(cord[1], 2) > 100 - ice) {
            //                     this.ny = (Math.ceil(cord[1])) * tlSize - (tlSize - h) / 2;     
            //                 }    
            //             } else if (f(cord[1], 2) > 94) {
            //                 this.ny = (Math.ceil(cord[1])) * tlSize - (tlSize - h) / 2;
            //             }
            //         } 
            //     }
                
            //     for (let i = 0 - count / 2; i <= count / 2; ++i) {
            //         let cord = [(x - w/2 + i * step - (tlSize - w) / 2 - 0) / tlSize + 1, (y - h/2 - (tlSize - h)) / tlSize + 0.5];
            //         if ((tiles[map[Math.floor(cord[0])][Math.ceil(cord[1])].tile].collide != 0)) {
            //             if (tiles[map[Math.floor(cord[0])][Math.ceil(cord[1]) - 1].tile].collide == 0) {
            //                 if (f(cord[1], 2) < ice) {
            //                     this.ny = (Math.floor(cord[1])) * tlSize + (tlSize - h) / 2;     
            //                 }    
            //             } else if (f(cord[1], 2) < 6) {
            //                 this.ny = (Math.floor(cord[1])) * tlSize + (tlSize - h) / 2;
            //             }
            //         } 
            //     }
        
            //     x = this.nx;
            //     y = this.ny;     
            // }
            // return {x: this.nx, y: this.ny};
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

        kill () {
            level.removeEntity(this.id);
        }
    }
}

const player = createPlayer(1, 1);
// level.addEntity(player);
