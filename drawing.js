function draw (img, x, y, w, h) {
    ctx.save();

	ctx.scale(tileSize, tileSize);
	ctx.translate(-w / 2, -h / 2);
	ctx.drawImage(img, x, y, w, h);

    ctx.restore();
}

let createAnimation = (x, y, width, height, frames, life_time) => {
	return {
		x: x,
		y: y,
		width: width,
		height: height,
		frames: frames,
		frameCount: frames.length,
		life_time: life_time,
		time: 0,
		frame: 0,

		update (dt) {
			this.time += dt;
			this.time = Math.min(this.time, this.life_time); 
			
            this.frame = Math.min(Math.floor(this.time / (this.life_time / this.frameCount)), this.frameCount - 1);

            if (this.time >= this.life_time) {
                level.removeAnimation(this.id);
            }
		},

		render () {
			draw(this.frames[this.frame], this.x, this.y, this.width, this.height);
		},

	}
}
