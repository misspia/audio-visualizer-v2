import Utils from '../graphs.utils.js';

function Ray(ctx, begin={}, end={}, color, opacity, lineWidth="20") {
	this.begin = begin;
	this.end = end;
	this.draw = () => {
		ctx.save();
		ctx.beginPath();

		ctx.shadowBlur = 80
		ctx.shadowColor = color;

		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = Utils.newColorAlpha(color, opacity);

		ctx.moveTo(this.begin.x, this.begin.y);
		ctx.lineTo(this.end.x, this.end.y);
		ctx.closePath();
		ctx.stroke();
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

	analyser.smoothingTimeConstant = 0.6;

	const frequencyData = new Uint8Array(100);

	function renderGlow(centerCoord, positionRadius, glowRadiusMax, angle, node, color) {
		const glowCenterCoord = Utils.circleCoord(centerCoord, positionRadius.min, angle);
		const glowRadius = Utils.upTo(glowRadiusMax, Utils.maxNode, node);
		const glow = new Circle(ctx, glowCenterCoord, glowRadius, color);
		glow.draw();
	}

	function renderRay(centerCoord, radius, angle, shardWidth, node, color, opacity) {
		const beginRadius = radius.min;
		const endRadius = Utils.withinRange(radius.min, radius.max, Utils.maxNode, node);

		const begin = Utils.circleCoord(centerCoord, beginRadius, angle);
		const end = Utils.circleCoord(centerCoord, endRadius, angle);

		const shard = new Ray(ctx, begin, end, color, opacity);
		shard.draw();
	}
	function renderBackRay(centerCoord, radius, angle, node, color, opacity) {
		const begin = Utils.circleCoord(centerCoord, radius.min, angle);
		const end = Utils.circleCoord(centerCoord, radius.max, angle);

		const ray = new Ray(ctx, begin, end, color, opacity);
		ray.draw();
	}

	function renderSun() {
		requestAnimationFrame(renderSun);

		analyser.getByteFrequencyData(frequencyData);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const innerRadius = {
			min: canvas.height * 0.12,
			max: canvas.height * 0.15
		};
		const rayLong = {
			radius: {
				min: innerRadius.max * 1.01,
				max: canvas.height * 0.7
			},
			opacity: 0.03,
		};
		const rayMid = {
			radius: {
				min: rayLong.radius.min,
				max: rayLong.radius.max * 0.8
			},
			opacity: 0.01,
		};
		const rayShort = {
			radius: {
				min: rayLong.min,
				max: rayLong.max * 0.9
			},
			opacity: 0.01		
		};
		const backRay = {
			radius: {
				min: rayLong.radius.min,
				max: canvas.width	
			},
			opacity: 0.01
		}
		const glowRadius = innerRadius.max - innerRadius.min;
		const shardWidth = 2.5; 

		const centerCoord = Utils.centerCoord(canvas);

		const angleIncrement = 360 / frequencyData.length;
		const rotationOffset = 90;
		
		frequencyData.forEach((node, index) => {
			const angle = index * angleIncrement + rotationOffset;
			const color = colorGenerator(node);
			
			renderBackRay(centerCoord, backRay.radius, angle, node, color, backRay.opacity);
			renderGlow(centerCoord, innerRadius, glowRadius, angle, node, color);
			renderRay(centerCoord, rayLong.radius, angle, shardWidth, node, color, rayLong.opacity);
			renderRay(centerCoord, rayMid.radius, angle, shardWidth, node, color, rayMid.opacity);
			renderRay(centerCoord, rayShort, angle, shardWidth, node, color, 0.01);

		});
	}
	renderSun();
};

module.exports = animate;

