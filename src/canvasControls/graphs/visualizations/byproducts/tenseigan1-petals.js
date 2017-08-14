import Utils from '../graphs.utils.js';

function Circle( ctx, center={}, radius, color) {
	this.center = center;
	this.radius = radius;

	this.draw = () => {
		ctx.beginPath();
		ctx.arc( this.center.x, this.center.y, this.radius, 0 , 2 * Math.PI );
		ctx.strokeStyle = color;
		ctx.stroke();
	};
}
function Petal(ctx, begin={}, end={}, curveLeft, curveRight, color, lineWidth="1") {
	this.begin = begin;
	this.end = end;
	this.draw = () => {
		ctx.save();
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color;
		ctx.fillStyle = '#fff';

		ctx.moveTo(this.begin.x, this.begin.y);
		ctx.quadraticCurveTo(curveLeft.x, curveLeft.y, this.end.x, this.end.y);
		ctx.quadraticCurveTo(curveRight.x, curveRight.y, this.begin.x, this.begin.y);

		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		ctx.restore();
	}
}
function Glow(ctx, begin={}, end={}, color, lineWidth="20") {
	this.begin = begin;
	this.end = end;
	this.color = color;

	this.draw = () => {
		ctx.save();
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.shadowBlur = 80;
		ctx.shadowColor = color;
		ctx.strokeStyle = Utils.newColorAlpha(color, 0.1);
		ctx.moveTo(this.begin.x, this.begin.y);
		ctx.lineTo(this.end.x, this.end.y);
		ctx.lineCap = "round";
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}
}

function animate(canvas, ctx, analyser, colorGenerator) {
	if(!analyser.frequencyBinCount) return;

	analyser.smoothingTimeConstant = 0.7;

	const petalData = new Uint8Array(6);
	const glowData = new Uint8Array(100);

	function renderGlow(centerCoord, radius, angle, node, color) {
		const endRadius = Utils.withinRange(radius.min, radius.max, Utils.maxNode, node);

		const begin = Utils.circleCoord(centerCoord, radius.min, angle);
		const end = Utils.circleCoord(centerCoord, endRadius, angle);

		const glow = new Glow(ctx, begin, end, color);
		glow.draw();
	}

	function renderPetal(centerCoord, radius, petalWidth, angle, node, color) {
		const beginRadius = radius.min;
		const endRadius = Utils.withinRange(radius.min, radius.max, Utils.maxNode, node);
		const curveRadius = beginRadius * 0.5 + endRadius * 0.5;

		const begin = Utils.circleCoord(centerCoord, beginRadius, angle);
		const end = Utils.circleCoord(centerCoord, endRadius, angle);
		
		const curveLeft = Utils.circleCoord(centerCoord, curveRadius, angle - petalWidth);
		const curveRight = Utils.circleCoord(centerCoord, curveRadius, angle + petalWidth);
		const petal = new Petal(ctx, begin, end, curveLeft, curveRight, color);
		petal.draw();
	}

	function renderSun() {
		requestAnimationFrame(renderSun);

		analyser.getByteFrequencyData(petalData);
		analyser.getByteFrequencyData(glowData);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const innerRadius = {
			min: canvas.height * 0.12,
			max: canvas.height * 0.15
		};
		const outerRadius = {
			min: innerRadius.min,
			max: canvas.width / 2
		}
		const petalRadius = innerRadius.min;
		const petalBaseCircumference = Utils.circumference(petalRadius);
		const petalShort = {
			radius: {
				min: petalRadius,
				max: canvas.height * 0.3
			},
			width: petalBaseCircumference / (petalData.length * 2 - 1),
			angleOffset: 0
		};
		const petalLong = {
			radius: {
				min: petalShort.radius.min,
				max: petalShort.radius.max * 1.2
			},
			width: petalShort.width * 1.2,
			angleOffset: 30
		};

		const glowRadius = innerRadius.max - innerRadius.min;
		const centerCoord = Utils.centerCoord(canvas);

		const petalAngle = 360 / petalData.length;
		const glowAngle = 360 / glowData.length;
		const rotationOffset = 90;

		petalData.forEach((node, index) => {
			const angle = index * petalAngle + rotationOffset;
			const color = colorGenerator(node);
			renderPetal(centerCoord, petalLong.radius, petalLong.width, angle + petalLong.angleOffset, node, color);

		});
		glowData.forEach((node, index) => {
			const angle = index * glowAngle;
			const color = colorGenerator(node);
			renderGlow(centerCoord, innerRadius, angle, node, color);
			renderGlow(centerCoord, outerRadius, angle, node, color);
		})
		petalData.forEach((node, index) => {
			const angle = index * petalAngle + rotationOffset;
			const color = colorGenerator(node);		
			renderPetal(centerCoord, petalShort.radius, petalShort.width, angle + petalShort.angleOffset, node, color);
		});
		
		
	}
	renderSun();
};

module.exports = animate;

