import Utils from '../graphs.utils.js';

function Ray(ctx, begin={}, end={}, color={}, lineWidth="1") {
	this.begin = begin;
	this.end = end;
	this.draw = () => {
		ctx.save();
		ctx.beginPath();
		
		ctx.lineWidth = lineWidth;
		ctx.moveTo(this.begin.x, this.begin.y);

		ctx.strokeStyle = color.end;
		ctx.lineTo(this.end.x, this.end.y);
		ctx.stroke();
		
		ctx.closePath();
		ctx.restore();
	}
}
function Circle( ctx, center={}, radius, color) {
	this.center = center;
	this.radius = radius;

	this.draw = () => {
		const gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius);
		gradient.addColorStop( 0.25, Utils.newColorAlpha(color, 0.8));
		gradient.addColorStop( 0.4, Utils.newColorAlpha(color, 0.5));
		gradient.addColorStop( 0.5, Utils.newColorAlpha(color, 0.3));
		gradient.addColorStop( 1, Utils.newColorAlpha(color, 0.1));

		ctx.beginPath();
		ctx.arc( this.center.x, this.center.y, this.radius, 0 , 2 * Math.PI );
		ctx.fillStyle = gradient;
		ctx.fill();
	};
}

function animate(canvas, ctx, analyser, colorGenerator) {
	if(!analyser.frequencyBinCount) return;
	
	analyser.minDecibels = -80;
	analyser.smoothingTimeConstant = 0.9;

	const frequencyData = new Uint8Array(180);

	function renderGlowCircle(centerCoord, baseRadiusMin, baseRadiusMax, glowRadius, angleIncrement, beatNode) {
		frequencyData.forEach((node, index) => {
			const angle = index * angleIncrement;
			const color = colorGenerator(node);
			const circleRadius = {
				min: Utils.withinRange(baseRadiusMin.min, baseRadiusMax.min, Utils.maxNode, beatNode),
				max: Utils.withinRange(baseRadiusMin.max, baseRadiusMax.max, Utils.maxNode, beatNode)
			}
			renderGlow(centerCoord, circleRadius, glowRadius, angle, node, color);
		})
	}
	function renderGlow(centerCoord, positionRadius, glowRadiusMax, angle, node, color) {
		const glowCenterCoord = Utils.circleCoord(centerCoord, positionRadius.min, angle);
		const glowRadius = Utils.upTo(glowRadiusMax, Utils.maxNode, node);
		const glow = new Circle(ctx, glowCenterCoord, glowRadius, color);
		glow.draw();
	}
	function renderRays(centerCoord, radius, angleIncrement, lineWidth) {
		frequencyData.forEach((node, index) => {
			const angle = index * angleIncrement;
			const color = {
				begin: colorGenerator(node),
				end: colorGenerator(node)
			}
			
			renderRay(centerCoord, radius, angle, lineWidth, node, color);
		});
	}
	function renderRay(centerCoord, radius, angle, lineWidth, node, color) {
		const begin = Utils.circleCoord(centerCoord, radius.min, angle);
		const radiusEnd = Utils.withinRange(radius.min, radius.max, Utils.maxNode, node);
		const end = Utils.circleCoord(centerCoord, radiusEnd, angle);

		const ray = new Ray(ctx, begin, end, color, lineWidth);
		ray.draw();
	}
	
	const centerCoord = Utils.centerCoord(canvas);
	const innerRadiusMin = {
		min: canvas.height * 0.12,
		max: canvas.height * 0.15
	};
	const innerRadiusMax = {
		min: innerRadiusMin.min * 1.1,
		max: innerRadiusMin.max * 1.1,
	}
	const rayRadius = {
		min: innerRadiusMax.max * 1.01,
		max: canvas.height * 0.4	
	}
	const lineWidth = Utils.circumference(rayRadius.min) / frequencyData.length;
	const glowRadius = innerRadiusMin.max - innerRadiusMin.min;
	const angleIncrement = 360 / frequencyData.length;

	function renderTenseigan() {
		requestAnimationFrame(renderTenseigan);
		const beatNode = frequencyData[0];

		analyser.getByteFrequencyData(frequencyData);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		renderRays(centerCoord, rayRadius, angleIncrement, lineWidth);
		renderGlowCircle(centerCoord, innerRadiusMin, innerRadiusMax, glowRadius, angleIncrement, beatNode);
		
	}
	renderTenseigan();
};

module.exports = animate;