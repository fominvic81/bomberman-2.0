function draw (img, x, y, w, h) {
    ctx.save();

	ctx.scale(tileSize, tileSize);
	ctx.translate(-w / 2, -h / 2);
	ctx.drawImage(img, x, y, w, h);

    ctx.restore();
}
