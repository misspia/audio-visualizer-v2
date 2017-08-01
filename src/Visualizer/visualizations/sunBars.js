import Utils from '../visualizer.utils.js';

function Bar (ctx, x, y, width, height, angle, color) {
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

	function renderSun() {
		requestAnimationFrame(renderSun);

		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		const radius = canvas.height / 2 * 0.6;
		const maxBarHeight = canvas.height * 0.2;
		const barWidth = Utils.circumference(radius) / frequencyData.length;
		const centerCoord = Utils.centerCoord(canvas);
		const angleIncrement = 360 / frequencyData.length;

		let bars = [];

		frequencyData.forEach((node, index) => {
			const angle = index * angleIncrement,
				x = centerCoord.x + (radius * Math.cos(angle)),
				y = centerCoord.y + (radius * Math.sin(angle)),
				barHeight = Utils.upTo(maxBarHeight, Utils.maxNode, node),
				color = colorGenerator(node);

			bars.push(new Bar(ctx, x, y, barWidth, barHeight, angle, color));
		});
		bars.forEach((bar) => { bar.draw(); });
	}
	renderSun();
};

module.exports = animate;