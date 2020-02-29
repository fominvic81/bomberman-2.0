

const createSnake = (level, x, y, lenght) => {
    return {
        level: level,
        x: x,
        y: y,
        dc: 0,
        cords: [],
        time: 0,
        frameTimer: 0,
        frameCount: 4,
        frame: 0,
        width: snakeSettings.width,
        height: snakeSettings.height,
        rendWidth: snakeSettings.rendWidth,
        rendHeight: snakeSettings.rendHeight,
        speed: snakeSettings.speed,
        entityName: 'snake',
        lenght: lenght,
        isS: false,



        setup () {
            this.isS = true;
            for (let i = 1; i <= this.lenght; ++i) {
                this.cords.push({x: this.x, y: this.y-i, dir: 'down'});
            }
        },

        update (dt) {
            if (!this.isS) this.setup();

            this.time += dt;
            this.frameTimer += dt;

            if (this.frameTimer > 0.8) {
                this.frameTimer = 0;
                ++this.frame;
                this.frame = this.frame % this.frameCount;
            }

            if (this.dc >= 1) {
                for (let i = this.cords.length - 1; i >= 0; --i) {
                    if (this.cords[i].dir == 'up') {
                        this.cords[i].y -= 1;
                    } else if (this.cords[i].dir == 'down') {
                        this.cords[i].y += 1;
                    } else if (this.cords[i].dir == 'left') {
                        this.cords[i].x -= 1;
                    } else if (this.cords[i].dir == 'right') {
                        this.cords[i].x += 1;
                    }
                if (i > 0) {
                    this.cords[i].dir = this.cords[i - 1].dir;
                }
                }
                this.dc -= 1;
                if (app.key('u')) {
                    this.cords[0].dir = 'up';
                }
                if (app.key('j')) {
                    this.cords[0].dir = 'down';
                }
                if (app.key('h')) {
                    this.cords[0].dir = 'left';
                }
                if (app.key('k')) {
                    this.cords[0].dir = 'right';
                }
            }
            
            this.dc += this.speed * dt;
            
        },

        render () {
            for (let i = this.cords.length - 1; i >= 0; --i) {
                let cord = this.cords[i];
                let {x, y, dir} = cord;                
                switch (dir) {
                    case 'up':
                        y -= this.dc;
                        break
                    case 'down':
                        y += this.dc;
                        break;
                    case 'left':
                        x -= this.dc;
                        break;
                    case 'right':
                        x += this.dc;
                }
                let s;
                switch (i) {
                    case 0:
                        s = 'head';
                        break;
                    case this.cords.length - 1:
                        s = 'hvost';
                        break;
                    default:
                        s = 'seg';
                        break;
                }
                const tex = snakeSettings.frames[s + dir[0].toUpperCase() + dir.substr(1)];
                draw(tex[this.frame % tex.length], x, y, this.rendWidth, this.rendHeight);
            }
        },
    }
}