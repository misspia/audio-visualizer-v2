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
function Circle( ctx, center={}, radius, innerGradient, outerGradient) {
	this.center = center;
	this.radius = radius;

	this.draw = () => {
		const gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius);
		gradient.addColorStop( 0.25, innerGradient);
		gradient.addColorStop( 0.95, outerGradient );
		gradient.addColorStop( 1, '#fff' );

		ctx.beginPath();
		ctx.fillStyle = gradient;
		ctx.arc( this.center.x, this.center.y, this.radius, 0 , 2 * Math.PI );
		ctx.fill();
	};
}

function animate(canvas, ctx, analyser, colorGenerator) {
	if(!analyser.frequencyBinCount) return;
	
	analyser.minDecibels = -110;
	analyser.smoothingTimeConstant = 0.9;

	const frequencyData = new Uint8Array(200);
	const innerCircleData = new Uint8Array(1);

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

	function renderSparks(angleOffset, centerCoord, maxRadius, sparkLength) {
		const angleIncrement = 360 / frequencyData.length;

		let sparks = [];
		
		frequencyData.forEach((node, index) => {
			const angle = index * angleIncrement + angleOffset;

			const beginRadius = Utils.upTo(maxRadius, Utils.maxNode, node);
			const begin = Utils.circleCoord(centerCoord, beginRadius, angle);

			const endRadius = beginRadius + sparkLength;
			const end = Utils.circleCoord(centerCoord, endRadius, angle);

			const color = colorGenerator(node);

			sparks.push( new Line(ctx, begin, end, color) )
		});
		sparks.forEach((spark) => { spark.draw(); });
	}

	function renderChidori() {
		requestAnimationFrame(renderChidori);

		analyser.getByteFrequencyData(frequencyData);
		analyser.getByteFrequencyData(innerCircleData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const sparkRadiusMultiplier = 1.3
		const allocatedCanvasSpace = 0.5;
		const minRadiusMultiplier = 0.2;
		const maxRadiusMultiplier = allocatedCanvasSpace - minRadiusMultiplier;
		const minRadius = canvas.height * minRadiusMultiplier;
		const maxRadius = canvas.height * maxRadiusMultiplier;
		const averageRadius = (minRadius + maxRadius) / 2;
		const centerCoord = Utils.centerCoord(canvas);

		const outerCircles = [
			{angleOffset: 0, minRadius: averageRadius, maxRadius: averageRadius, sparkLength: 0 },
			{angleOffset: 0, minRadius: minRadius, maxRadius: maxRadius, sparkLength: 3  },
			{angleOffset: 72, minRadius: minRadius - 1, maxRadius: maxRadius + 1, sparkLength: 4  },
			{angleOffset: 144, minRadius: minRadius - 2, maxRadius: maxRadius + 2, sparkLength: 2  },
			{angleOffset: 216, minRadius: minRadius - 3, maxRadius: maxRadius + 3, sparkLength: 3 },
			{angleOffset: 288, minRadius: minRadius - 4, maxRadius: maxRadius + 4, sparkLength: 4 }
		];

		outerCircles.forEach((circle) => {
			const sparkRadius = circle.maxRadius * sparkRadiusMultiplier;
			renderCircle(circle.angleOffset, centerCoord, circle.minRadius, circle.maxRadius);
			renderSparks(circle.angleOffset, centerCoord, sparkRadius, circle.sparkLength);
		});

		const innerCircleNode = innerCircleData[0]
		const innerRadius = Utils.upTo(minRadius, Utils.maxNode, innerCircleNode);
		const innerGradient = colorGenerator(innerCircleNode);
		const outerGradient = colorGenerator(innerCircleNode / 2, 0.75);
		const innerCircle = new Circle(ctx, centerCoord, innerRadius, innerGradient, outerGradient);
		innerCircle.draw();

	}
	renderChidori();
};

module.exports = animate;


