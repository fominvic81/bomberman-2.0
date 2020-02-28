const tileSize = 44;

const handleLoad = () => {
	i_grass = app.img('assets/grass.png');
	for (tile in tiles) {
		tiles[tile].image = app.img(tiles[tile].image);
	}
	// bombSettings.image = app.img(bombSettings.image);
	for (let i = 0; i < bombSettings.frames.length; ++i) {
		let road = bombSettings.road + bombSettings.frames[i];
		bombSettings.frames[i] = app.img(road);
	}
	// playerSettings.image = app.img(playerSettings.image);
	for (let i = 0; i < playerSettings.upFrames.length; ++i) {
		let road = playerSettings.road + playerSettings.upFrames[i];
		playerSettings.upFrames[i] = app.img(road);
	}
	for (let i = 0; i < playerSettings.downFrames.length; ++i) {
		let road = playerSettings.road + playerSettings.downFrames[i];
		playerSettings.downFrames[i] = app.img(road);
	}
	for (let i = 0; i < playerSettings.leftFrames.length; ++i) {
		let road = playerSettings.road + playerSettings.leftFrames[i];
		playerSettings.leftFrames[i] = app.img(road);
	}
	for (let i = 0; i < playerSettings.rightFrames.length; ++i) {
		let road = playerSettings.road + playerSettings.rightFrames[i];
		playerSettings.rightFrames[i] = app.img(road);
	}
	for (let i = 0; i < playerSettings.deadFrames.length; ++i) {
		let road = playerSettings.road + playerSettings.deadFrames[i];
		playerSettings.deadFrames[i] = app.img(road);
	}
	// explosSettings.image = app.img(explosSettings.image);
	for (let i = 0; i < explosSettings.centerFrames.length; ++i) {
		let road = explosSettings.road + explosSettings.centerFrames[i];
		explosSettings.centerFrames[i] = app.img(road);
	}
	for (let i = 0; i < explosSettings.upFrames.length; ++i) {
		let road = explosSettings.road + explosSettings.upFrames[i];
		explosSettings.upFrames[i] = app.img(road);
	}
	for (let i = 0; i < explosSettings.upEndFrames.length; ++i) {
		let road = explosSettings.road + explosSettings.upEndFrames[i];
		explosSettings.upEndFrames[i] = app.img(road);
	}
	for (let i = 0; i < explosSettings.downFrames.length; ++i) {
		let road = explosSettings.road + explosSettings.downFrames[i];
		explosSettings.downFrames[i] = app.img(road);
	}
	for (let i = 0; i < explosSettings.downEndFrames.length; ++i) {
		let road = explosSettings.road + explosSettings.downEndFrames[i];
		explosSettings.downEndFrames[i] = app.img(road);
	}
	for (let i = 0; i < explosSettings.leftFrames.length; ++i) {
		let road = explosSettings.road + explosSettings.leftFrames[i];
		explosSettings.leftFrames[i] = app.img(road);
	}
	for (let i = 0; i < explosSettings.leftEndFrames.length; ++i) {
		let road = explosSettings.road + explosSettings.leftEndFrames[i];
		explosSettings.leftEndFrames[i] = app.img(road);
	}
	for (let i = 0; i < explosSettings.rightFrames.length; ++i) {
		let road = explosSettings.road + explosSettings.rightFrames[i];
		explosSettings.rightFrames[i] = app.img(road);
	}
	for (let i = 0; i < explosSettings.rightEndFrames.length; ++i) {
		let road = explosSettings.road + explosSettings.rightEndFrames[i];
		explosSettings.rightEndFrames[i] = app.img(road);
	}
	/////////////////////////////////////////////////////

	for (bonus in bonuses) {
		let road = bonuses[bonus].path + bonuses[bonus].sFrame;
		bonuses[bonus].sFrame = app.img(road);
	}
	/////////////////////////////////////////////////////

	for (let i = 0; i < iceCreamSettings.frames.length; ++i) {
		let road = iceCreamSettings.road + iceCreamSettings.frames[i];
		iceCreamSettings.frames[i] = app.img(road);
	}
	for (let i = 0; i < iceCreamSettings.deadFrames.length; ++i) {
		let road = iceCreamSettings.road + iceCreamSettings.deadFrames[i];
		iceCreamSettings.deadFrames[i] = app.img(road);
	}
	//////////////////////////////////////////////////////

	for (let i = 0; i < pillowSettings.frames.length; ++i) {
		let road = pillowSettings.road + pillowSettings.frames[i];
		pillowSettings.frames[i] = app.img(road);
	}
	for (let i = 0; i < pillowSettings.deadFrames.length; ++i) {
		let road = pillowSettings.road + pillowSettings.deadFrames[i];
		pillowSettings.deadFrames[i] = app.img(road);
	}
	//////////////////////////////////////////////////////

	for (let i = 0; i < sPillowSettings.frames.length; ++i) {
		let road = sPillowSettings.road + sPillowSettings.frames[i];
		sPillowSettings.frames[i] = app.img(road);
	}
	for (let i = 0; i < sPillowSettings.deadFrames.length; ++i) {
		let road = sPillowSettings.road + sPillowSettings.deadFrames[i];
		sPillowSettings.deadFrames[i] = app.img(road);
	}
	//////////////////////////////////////////////////////

	for (let i = 0; i < wormSettings.frames.length; ++i) {
		let road = wormSettings.road + wormSettings.frames[i];
		wormSettings.frames[i] = app.img(road);
	}
	for (let i = 0; i < wormSettings.deadFrames.length; ++i) {
		let road = wormSettings.road + wormSettings.deadFrames[i];
		wormSettings.deadFrames[i] = app.img(road);
	}
	//////////////////////////////////////////////////////

	for (let i = 0; i < headSettings.frames.length; ++i) {
		let road = headSettings.road + headSettings.frames[i];
		headSettings.frames[i] = app.img(road);
	}
	for (let i = 0; i < headSettings.deadFrames.length; ++i) {
		let road = headSettings.road + headSettings.deadFrames[i];
		headSettings.deadFrames[i] = app.img(road);
	}
	//////////////////////////////////////////////////////

	for (let i = 0; i < tripodSettings.frames.length; ++i) {
		let road = tripodSettings.road + tripodSettings.frames[i];
		tripodSettings.frames[i] = app.img(road);
	}
	for (let i = 0; i < tripodSettings.deadFrames.length; ++i) {
		let road = tripodSettings.road + tripodSettings.deadFrames[i];
		tripodSettings.deadFrames[i] = app.img(road);
	}
	//////////////////////////////////////////////////////

	for (let i = 0; i < batSettings.frames.length; ++i) {
		let road = batSettings.road + batSettings.frames[i];
		batSettings.frames[i] = app.img(road);
	}
	for (let i = 0; i < batSettings.deadFrames.length; ++i) {
		let road = batSettings.road + batSettings.deadFrames[i];
		batSettings.deadFrames[i] = app.img(road);
	}
	//////////////////////////////////////////////////////

	for (anim in animations) {
		for (let i = 0; i < animations[anim].frames.length; ++i) {
			let road = animations[anim].road + animations[anim].frames[i];
			animations[anim].frames[i] = app.img(road);
		}
	}

};

const handleStart = () => {
	//
};

const handleResize = () => {
	w = app.data.width;
	h = app.data.height;
};

const handleUpdate = dt => {
	level.update(dt);
};

const handleRender = () => {
    ctx.fillStyle = '#966';
	ctx.beginPath();
	ctx.rect(0, 0, app.data.width, app.data.height);
	ctx.fill();
    
    
    level.render();
    
	dbg.fillText(`tps: ${app.data.tps}`, 20, 20);
	dbg.fillText(`fps: ${app.data.fps}`, 20, 35);
};

app = initApp({
	root: document.getElementById('root'),
	handleLoad,
	handleStart,
	handleResize,
	handleUpdate,
	handleRender,
});

ctx = app.layer().ctx;
dbg = app.layer({ global: true }).ctx;

app.start();
app.setCustomTps(30);