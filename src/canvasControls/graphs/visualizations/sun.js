import Utils from '../../visualizer.utils.js';

function Line( ctx, begin={}, end={}, lineWidth, color) {
	this.begin = begin;
	this.end = end;

	this.draw = () => {
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color;
		ctx.moveTo(this.begin.x , this.begin.y);
		ctx.lineTo(this.end.x, this.end.y);
		ctx.stroke();
	};
}


function animate(canvas, ctx, analyser, colorGenerator) {
	if(!analyser.frequencyBinCount) return;

	const frequencyData = new Uint8Array(200);

	function renderSun() {
		requestAnimationFrame(renderSun);

		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const allocatedCanvasSpace = 0.6;
		const startRadiusMultiplier = 0.4;
		const maxLineHeightMultiplier = allocatedCanvasSpace - startRadiusMultiplier;
		const startRadius = canvas.height / 2 * startRadiusMultiplier;
		const maxLineHeight = canvas.height * maxLineHeightMultiplier;

		const lineWidth = Utils.circumference(startRadius) / frequencyData.length;
		const centerCoord = Utils.centerCoord(canvas);
		const angleIncrement = 360 / frequencyData.length;

		let lines = [];

		frequencyData.forEach((node, index) => {
			const angle = index * angleIncrement;
			const begin = {
				x: centerCoord.x + (startRadius * Math.cos(angle)),
				y: centerCoord.y + (startRadius * Math.sin(angle)),
			};
			const endRadius = startRadius + Utils.upTo(maxLineHeight, Utils.maxNode, node);
			const end = {
				x: centerCoord.x + (endRadius * Math.cos(angle)),
				y: centerCoord.y + (endRadius * Math.sin(angle)),
			};
			const color = colorGenerator(node);

			lines.push(new Line(ctx, begin, end, lineWidth, color));
		});
		lines.forEach((line) => { line.draw(); });
	}
	renderSun();
};

module.exports = animate;












