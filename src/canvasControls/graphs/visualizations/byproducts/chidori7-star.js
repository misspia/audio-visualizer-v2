import Utils from '../graphs.utils.js';

function Line( ctx, begin={}, end={}, color) {
	this.begin = begin;
	this.end = end;

	this.draw = () => {
		ctx.beginPath();
		ctx.lineWidth = "1";
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

		const allocatedCanvasSpace = 0.4;
		const minRadiusMultiplier = 0.2;
		const maxRadiusMultiplier = allocatedCanvasSpace - minRadiusMultiplier;
		const minRadius = canvas.height * minRadiusMultiplier;
		const maxRadius = minRadius + canvas.height * maxRadiusMultiplier

		const centerCoord = Utils.centerCoord(canvas);
		const angleIncrement = 360 / frequencyData.length;

		let prevEnd = {};
		let begin = {};
		let lines = [];

		frequencyData.forEach((node, index) => {
			const startAngle = index * angleIncrement;
			const startRadius = Utils.withinRange(minRadius, maxRadius, Utils.maxNode, node);
			
			if(index === 0) {
				begin = {
					x: centerCoord.x + (startRadius * Math.cos(startAngle)),
					y: centerCoord.y + (startRadius * Math.sin(startAngle)),
				};
			} else {
				begin = prevEnd;
			}
				

			const endRadius = Utils.withinRange(minRadius, maxRadius, Utils.maxNode, node);
			const endAngle = startAngle + angleIncrement;

			const end = {
				x: centerCoord.x + (endRadius * Math.cos(endAngle)),
				y: centerCoord.y + (endRadius * Math.sin(endAngle)),
			};
			const color = colorGenerator(node);

			lines.push(new Line(ctx, begin, end, color));

			prevEnd = end;
		});
		lines.forEach((line) => { line.draw(); });
	}
	renderChidori();
};

module.exports = animate;
