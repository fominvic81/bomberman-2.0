const tileSize = 32;

const handleLoad = () => {
	i_grass = app.img('assets/grass.png');
	for (tile in tiles) {
		tiles[tile].image = app.img(tiles[tile].image);
	}
	// tiles.g.image = app.img(tiles.g.image);
	playerSettings.image = app.img(playerSettings.image);
	bombSettings.image = app.img(bombSettings.image);
	explosSettings.image = app.img(explosSettings.image);
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