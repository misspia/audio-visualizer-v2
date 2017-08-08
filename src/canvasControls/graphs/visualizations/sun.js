import Utils from '../graphs.utils.js';

function Line( ctx, begin={}, end={}, lineWidth, color) {
	this.begin = begin;
	this.end = end;

	this.draw = () => {
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color === 0 ? '#000' : color;
		ctx.moveTo(this.begin.x , this.begin.y);
		ctx.lineTo(this.end.x, this.end.y);
		ctx.stroke();
	};
}

let barPortion = 0;

function animate(canvas, ctx, analyser, colorGenerator) {
	// console.log(canvas.style);
	if(!analyser.frequencyBinCount) return;

	analyser.smoothingTimeConstant = 0.65;

	const frequencyData = new Uint8Array(100);
	
	function renderLongLines(angle, minRadius, maxRadius, centerCoord, node, lineWidth) {
		const endRadius = minRadius + Utils.upTo(maxRadius, Utils.maxNode, node);
		const beginRadius = minRadius + (endRadius - minRadius) / 2;
		
		const begin = Utils.circleCoord(centerCoord, minRadius, angle);
		const end = Utils.circleCoord(centerCoord, endRadius, angle)
		const color = colorGenerator(node);
		
		const bar = new Line(ctx, begin, end, lineWidth, color);
		bar.draw();
	}

	function renderVoid(angle, minRadius, maxRadius, centerCoord, node, lineWidth) {
		const beginRadius = minRadius;
		const endRadius = Utils.withinRange(minRadius, maxRadius, Utils.maxNode, node);

		const begin = Utils.circleCoord(centerCoord, beginRadius, angle);
		const end = Utils.circleCoord(centerCoord, endRadius, angle);

		const dot = new Line(ctx, begin, end, lineWidth, 0);
		dot.draw();
	}
	
	
	let velocity = 0.1;

	function renderSun() {
		requestAnimationFrame(renderSun);

		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if(barPortion > frequencyData.length || barPortion < 0) {
			velocity = -velocity;
			canvas.style.backgroundColor = '#000';
		}
		barPortion += velocity;
		
		const allocatedCanvasSpace = 0.5;
		const minRadiusMultiplier = 0.2;
		const maxRadiusMultiplier = allocatedCanvasSpace - minRadiusMultiplier;
		const minRadius = canvas.height * minRadiusMultiplier;
		const maxRadius = canvas.height * maxRadiusMultiplier;
		const centerCoord = Utils.centerCoord(canvas);

		const lineWidth = 1;		
		const angleIncrement = 360 / frequencyData.length;
		const rotationOffset = 90;

		frequencyData.forEach((node, index) => {
			const angle = index * angleIncrement + rotationOffset;
			
			if(index <= barPortion) {
				renderLongLines(angle, minRadius, maxRadius, centerCoord, node, lineWidth);
			} else {
				renderVoid(angle, minRadius,maxRadius, centerCoord, node, lineWidth );
			} 
				
		});
	}
	renderSun();
};

module.exports = animate;










