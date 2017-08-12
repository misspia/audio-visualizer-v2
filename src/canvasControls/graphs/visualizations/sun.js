import Utils from '../graphs.utils.js';

function Shard(ctx, begin={}, midLeft, midRight, end, color, lineWidth="0.5") {
	this.begin = begin;
	this.end = end;
	this.midLeft = midLeft;
	this.midRight = midRight;

	this.draw = () => {
		const gradient = ctx.createLinearGradient(this.begin.x, this.begin.y, this.end.x, this.end.y);
		const startColor = Utils.newColorAlpha(color, 0.3);
		const endColor = Utils.newColorAlpha(color, 0.1);
		gradient.addColorStop(0.2, startColor);
		gradient.addColorStop(0.5, endColor);

		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color;
		ctx.moveTo(this.begin.x, this.begin.y);
		ctx.lineTo(this.midLeft.x, this.midLeft.y);
		ctx.lineTo(this.end.x, this.end.y);
		ctx.lineTo(this.midRight.x, this.midRight.y);
		ctx.lineTo(this.begin.x, this.begin.y);
		ctx.fillStyle = gradient;
		ctx.fill();

		ctx.closePath();
		ctx.stroke();
	};
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

	analyser.smoothingTimeConstant = 0.6;

	const frequencyData = new Uint8Array(100);

	function renderGlow(centerCoord, positionRadius, glowRadiusMax, angle, node, color) {
		const glowCenterCoord = Utils.circleCoord(centerCoord, positionRadius.min, angle);
		const glowRadius = Utils.upTo(glowRadiusMax, Utils.maxNode, node);
		const glow = new Circle(ctx, glowCenterCoord, glowRadius, color);
		glow.draw();
	}
	function renderShard(centerCoord, radius, angle, shardWidth, node, color) {
		const beginRadius = radius.min;
		const endRadius = Utils.withinRange(radius.min, radius.max, Utils.maxNode, node);
		const midRadius = endRadius * 0.2 + beginRadius * 0.8;

		const begin = Utils.circleCoord(centerCoord, beginRadius, angle);
		const end = Utils.circleCoord(centerCoord, endRadius, angle);
		const midLeft = Utils.circleCoord(centerCoord, midRadius, angle - shardWidth);
		const midRight = Utils.circleCoord(centerCoord, midRadius, angle + shardWidth);

		const shard = new Shard(ctx, begin, midLeft, midRight, end, color);
		shard.draw();
	}

	function renderSun() {
		requestAnimationFrame(renderSun);

		analyser.getByteFrequencyData(frequencyData);
		ctx.clearRect(0, 0, canvas.width, canvas.height);


		const innerRadius = {
			min: canvas.height * 0.12,
			max: canvas.height * 0.15
		};
		const outerRadius1 = {
			min: innerRadius.max * 1.01,
			max: canvas.height * 0.35
		};
		const outerRadius2 = {
			min: outerRadius1.min,
			max: outerRadius1.max * 0.5
		};
		const outerRadius3 = {
			min: outerRadius1.min,
			max: outerRadius1.max * 0.7
		};
		const glowRadius = innerRadius.max - innerRadius.min;
		const shardWidth = 2.5; 

		const centerCoord = Utils.centerCoord(canvas);

		const angleIncrement = 360 / frequencyData.length;
		const rotationOffset = 90;
		
		frequencyData.forEach((node, index) => {
			const angle = index * angleIncrement + rotationOffset;
			const color = colorGenerator(node);

			renderGlow(centerCoord, innerRadius, glowRadius, angle, node, color);
			renderShard(centerCoord, outerRadius1, angle, shardWidth, node, color);
			renderShard(centerCoord, outerRadius2, angle, shardWidth, node, color);
			renderShard(centerCoord, outerRadius3, angle, shardWidth, node, color);

		});
	}
	renderSun();
};

module.exports = animate;










