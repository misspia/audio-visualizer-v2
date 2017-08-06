import Utils from '../graphs.utils.js';

function Line( ctx, begin={}, end={}, color) {
	this.begin = begin;
	this.end = end;

	this.draw = () => {
		ctx.beginPath();
		ctx.lineWidth = "1.5";
		ctx.strokeStyle = color;
		ctx.moveTo(this.begin.x , this.begin.y);
		ctx.lineTo(this.end.x, this.end.y);
		ctx.stroke();
	};
}

function animate(canvas, ctx, analyser, colorGenerator) {
	if(!analyser.frequencyBinCount) return;

	const frequencyData = new Uint8Array(200);

	function renderChidori() {
		requestAnimationFrame(renderChidori);

		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const allocatedCanvasSpace = 0.5;
		const minRadiusMultiplier = 0.2;
		const maxRadiusMultiplier = allocatedCanvasSpace - minRadiusMultiplier;
		const minRadius = canvas.height * minRadiusMultiplier;
		const maxRadius = canvas.height * maxRadiusMultiplier;

		const centerCoord = Utils.centerCoord(canvas);
		const angleIncrement = 360 / frequencyData.length;

		let lines = [];

		for(let index = 0; index < frequencyData.length - 1; index ++) {
			const node = frequencyData[index];
			const nextNode = frequencyData[index + 1];

			const beginRadius = Utils.withinRange(minRadius, maxRadius, Utils.maxNode, node);
			const beginAngle = index * angleIncrement;
			const begin = Utils.circleCoord(centerCoord, beginRadius, beginAngle);

			const endRadius = Utils.withinRange(minRadius, maxRadius, Utils.maxNode, nextNode);
			const endAngle = beginAngle + angleIncrement;
			const end = Utils.circleCoord(centerCoord, endRadius, endAngle);

			const color = colorGenerator(node);

			lines.push(new Line(ctx, begin, end, color));
		};
		lines.forEach((line) => { line.draw(); });
	}
	renderChidori();
};

module.exports = animate;


