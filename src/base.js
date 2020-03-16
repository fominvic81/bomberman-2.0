export const initApp = ({
	root,
	handleLoad,
	handleStart,
	handleRender,
	handleUpdate,
	handleResize,
}) => {
	const keys = {};

	const data = {
		width: 0,
		height: 0,

		dt: 0,
		time: 0,
		tps: 0,
		fps: 0,

		loading: 0,
		started: false,
	};

	let customTps = undefined;

	const layers = [];

	const createLayer = (opts = {}) => {
		const canvas = document.createElement('canvas');
		canvas.style.position = 'fixed';
		canvas.style.left = 0;
		canvas.style.top = 0;
		canvas.style.right = 0;
		canvas.style.bottom = 0;

		const layer = {
			opts,
			canvas,
			ctx: canvas.getContext('2d'),
		};

		layers.push(layer);
		root.appendChild(canvas);

		return layer;
	};

	const resize = () => {
		let w = window.innerWidth;
		let h = window.innerHeight;

		if (data.width === w && data.height === h) {
			return;
		}

		data.width = w;
		data.height = h;

		for (const layer of layers) {
			layer.canvas.width = w;
			layer.canvas.height = h;
		}

		handleResize(w, h);
	};

	const startTime = Date.now();
	let lastUpdate = Date.now();
	let lastFrame = Date.now();

	const update = () => {
		const now = Date.now();
		const dt = (now - lastUpdate) / 1000;
		lastUpdate = now;

		data.dt = dt;
		data.time = now - startTime;
		data.tps = Math.round(1 / dt);

		for (const layer of layers) {
			if (!layer.opts.global) continue;

			layer.ctx.clearRect(0, 0, data.width, data.height);
		}

		try {
			handleUpdate(dt);
		} catch (e) {
			console.error(e);
		}

		if (customTps !== undefined) {
			setTimeout(update, 1000 / customTps);
		}
	};

	const frame = () => {
		const now = Date.now();
		const dt = (now - lastFrame) / 1000;
		lastFrame = now;

		data.fps = Math.round(1 / dt);

		if (customTps === undefined) {
			update();
		}

		for (const layer of layers) {
			if (layer.opts.global) continue;

            if (layer.opts.clear !== false) {
                layer.ctx.clearRect(0, 0, data.width, data.height);
            }
		}

		try {
			handleRender();
		} catch (e) {
			console.error(e);
		}

		requestAnimationFrame(frame);
	};

	window.addEventListener('resize', resize);

	window.addEventListener('keydown', event => {
		keys[event.key] = true;
	});

	window.addEventListener('keyup', event => {
		keys[event.key] = false;
	});

	const start = () => {
		data.started = true;
		resize();
		handleStart();
		requestAnimationFrame(frame);
	};

	return {
		keys,
		data,

		start: () => {
			if (data.started) {
				return;
			}

			handleLoad();

			if (data.loading !== 0) {
				return;
			}

			start();
		},

		img: src => {
			const image = new Image();
			image.src = src;

			++data.loading;

			image.onload = () => {
				if (!data.started && --data.loading === 0) {
					start();
				}
			};

			image.onerror = () => {
				if (!data.started && --data.loading === 0) {
					start();
				}
			};

			return image;
		},

		layer: opts => createLayer(opts),

		key: name => keys[name] || false,

		setCustomTps: value => {
			if (customTps === undefined && value !== undefined) {
				setTimeout(update, 1000 / value);
			}

			customTps = value;
		},
	};
};
