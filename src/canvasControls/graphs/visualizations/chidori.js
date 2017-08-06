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

	function createCircle(angleOffset, centerCoord, minRadius, maxRadius) {
		const angleIncrement = 360 / frequencyData.length;
		
		let lines = [];

		const firstNode = frequencyData[0];
		const lastNode = frequencyData[frequencyData.length - 1];

		let node, nextNode, begin, end, color, beginRadius, beginAngle, endRadius, endAngle;

		for(let index = 0; index < frequencyData.length; index ++) {
			beginAngle = index * angleIncrement + angleOffset;
			endAngle = beginAngle + angleIncrement;

			if(index === frequencyData.length - 1) {
				beginRadius = Utils.withinRange(minRadius, maxRadius, Utils.maxNode, lastNode);
				begin = Utils.circleCoord(centerCoord, beginRadius, beginAngle);

				endRadius = Utils.withinRange(minRadius, maxRadius, Utils.maxNode, firstNode); 
				end = Utils.circleCoord(centerCoord, endRadius, endAngle);
			} else {
				node = frequencyData[index];
				nextNode = frequencyData[index + 1];

				beginRadius = Utils.withinRange(minRadius, maxRadius, Utils.maxNode, node);
				begin = Utils.circleCoord(centerCoord, beginRadius, beginAngle);

				endRadius = Utils.withinRange(minRadius, maxRadius, Utils.maxNode, nextNode);
				end = Utils.circleCoord(centerCoord, endRadius, endAngle);
			}
			color = colorGenerator(node);

			lines.push(new Line(ctx, begin, end, color));
		};
		lines.forEach((line) => { line.draw(); });
	};

	function renderChidori() {
		requestAnimationFrame(renderChidori);

		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const allocatedCanvasSpace = 0.6;
		const minRadiusMultiplier = 0.2;
		const maxRadiusMultiplier = allocatedCanvasSpace - minRadiusMultiplier;
		const minRadius = canvas.height * minRadiusMultiplier;
		const maxRadius = canvas.height * maxRadiusMultiplier;

		const centerCoord = Utils.centerCoord(canvas);
		
		createCircle(0, centerCoord, minRadius, maxRadius);
		createCircle(90, centerCoord, minRadius, maxRadius);

	}
	renderChidori();
};

module.exports = animate;


