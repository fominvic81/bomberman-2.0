// export const imgLoader = prefix => images => images.map(path => app.img(`${prefix}/${path}`));
export const img = path => {
    const img = new Image();
	img.src = path;
	return img;
};

export const imgLoader = prefix => images => images.map(path => img(`${prefix}/${path}`));
