import Utils from '../visualizer.utils.js';

function Bar (ctx, x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.draw = () => {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, width, height);
	};
}

function animate(canvas, ctx, analyser, colorGenerator) {
	if(!analyser.frequencyBinCount) return;

	const frequencyData = new Uint8Array(200);

	function renderBars() {
		requestAnimationFrame(renderBars);

		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const barWidth = canvas.width / frequencyData.length;
		const maxHeight = canvas.height * 0.7;
		let bars = [];

		frequencyData.forEach((node, index) => {
			const x =  index * (1 + barWidth),
				barHeight = Utils.upTo(maxHeight, Utils.maxNode, node),
				y = (canvas.height - barHeight) / 2,
				color = colorGenerator(node);
			bars.push(new Bar(ctx, x, y, barWidth, barHeight, color))
		});
		bars.forEach((bar) => { bar.draw(); })

	}
	renderBars();
}





module.exports = animate;