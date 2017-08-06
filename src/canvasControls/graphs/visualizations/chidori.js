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

	function renderCircle(angleOffset, centerCoord, minRadius, maxRadius) {
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
		const averageRadius = (minRadius + maxRadius) / 2;

		const centerCoord = Utils.centerCoord(canvas);
		const circles = [
			{angleOffset: 0, minRadius: averageRadius, maxRadius: averageRadius },
			{angleOffset: 0, minRadius: minRadius, maxRadius: maxRadius },
			{angleOffset: 72, minRadius: minRadius - 1, maxRadius: maxRadius + 1 },
			{angleOffset: 144, minRadius: minRadius - 2, maxRadius: maxRadius + 2 },
			{angleOffset: 216, minRadius: minRadius - 3, maxRadius: maxRadius + 3},
			{angleOffset: 288, minRadius: minRadius - 4, maxRadius: maxRadius + 4}
		];
		
		circles.forEach((circle) => {
			renderCircle(circle.angleOffset, centerCoord, circle.minRadius, circle.maxRadius)
		});
	}
	renderChidori();
};

module.exports = animate;


