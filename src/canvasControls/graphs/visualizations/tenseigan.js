import Utils from '../graphs.utils.js';

function Ray(ctx, begin={}, mid={}, end={}, color={}, lineWidth="10") {
	this.begin = begin;
	this.mid = mid;
	this.end = end;
	this.draw = () => {
		ctx.save();
		ctx.beginPath();

		ctx.shadowBlur = 90
		ctx.shadowColor = color;
		
		ctx.lineWidth = lineWidth;
		ctx.moveTo(this.begin.x, this.begin.y);

		ctx.strokeStyle = color.begin;
		ctx.lineTo(this.mid.x, this.mid.y);
		ctx.stroke();

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
function Petal(ctx, begin={}, end={}, curveLeft={}, curveRight={}, gradient={}, color, lineWidth="1") {
	this.begin = begin;
	this.end = end;
	this.gradCoord = gradient.coord;
	this.gradRadius = gradient.radius;
	this.draw = () => {
		const gradient = ctx.createRadialGradient(this.gradCoord.x, this.gradCoord.y, 0, 
												this.gradCoord.x, this.gradCoord.y,
												this.gradRadius);
		gradient.addColorStop(0.2, Utils.newColorAlpha(color, 0.1));
		gradient.addColorStop(0.3, Utils.newColorAlpha(color, 0.2));
		gradient.addColorStop(0.5, Utils.newColorAlpha(color, 0.3));
		gradient.addColorStop(0.7, Utils.newColorAlpha(color, 0.4));
		gradient.addColorStop(0.9, Utils.newColorAlpha(color, 0.5));
		gradient.addColorStop(1, Utils.newColorAlpha(color, 0.3));

		ctx.save();

		ctx.shadowBlur = 30
		ctx.shadowColor = '#fff';

		ctx.beginPath();
		ctx.fillStyle = gradient;

		ctx.moveTo(this.begin.x, this.begin.y);
		ctx.quadraticCurveTo(curveLeft.x, curveLeft.y, this.end.x, this.end.y);
		ctx.quadraticCurveTo(curveRight.x, curveRight.y, this.begin.x, this.begin.y);

		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}
}

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

	analyser.smoothingTimeConstant = 0.6;

	const frequencyData = new Uint8Array(100);
	const petalData = new Uint8Array(12);

	// canvas.style.backgroundColor = colorGenerator(0);

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
	function renderRays(centerCoord, ray, angleIncrement) {
		frequencyData.forEach((node, index) => {
			const angle = index * angleIncrement;
			const color = {
				begin: colorGenerator(node, ray.opacity.begin),
				end: colorGenerator(node, ray.opacity.end)
			};
			
			renderRay(centerCoord, ray.radius, angle, node, color);
		});
	}
	function renderRay(centerCoord, radius, angle, node, color) {
		const begin = Utils.circleCoord(centerCoord, radius.min, angle);
		const end = Utils.circleCoord(centerCoord, radius.max, angle);
		const radiusMid = Utils.withinRange(radius.min, radius.mid, Utils.maxNode, node);
		const mid = Utils.circleCoord(centerCoord, radiusMid, angle);

		const ray = new Ray(ctx, begin, mid, end, color);
		ray.draw();
	}
	function renderPetals(centerCoord, radiusMin, radiusMax, gradientRadius, beatNode) {
		const angleIncrement = 360 / petalData.length;
		const minCircumference = Utils.circumference(radiusMin.min);
		const baseWidth = minCircumference / (petalData.length - 1);

		const petalRadius = {
			min: Utils.withinRange(radiusMin.min, radiusMax.min, Utils.maxNode, beatNode),
			max: Utils.withinRange(radiusMin.max, radiusMax.max, Utils.maxNode, beatNode)
		}
		petalData.forEach((node, index) => {
			const width = index % 2 === 0 ? baseWidth : baseWidth * 0.5;
			const angle = angleIncrement * index;
			const color = colorGenerator(node);

			renderPetal(centerCoord, petalRadius, width, angle, node, color, gradientRadius);
		});		
	}
	function renderPetal(centerCoord, radius, width, angle, node, color, gradientRadius) {
		const curveRadius = radius.min * 0.5 + radius.max * 0.5;

		const begin = Utils.circleCoord(centerCoord, radius.min, angle);
		const end = Utils.circleCoord(centerCoord, radius.max, angle);
		
		const curveLeft = Utils.circleCoord(centerCoord, curveRadius, angle - width);
		const curveRight = Utils.circleCoord(centerCoord, curveRadius, angle + width);

		const gradient = {
			radius: gradientRadius,
			coord: Utils.circleCoord(centerCoord, curveRadius, angle)
		}
		const petal = new Petal(ctx, begin, end, curveLeft, curveRight, gradient, color);
		petal.draw();	
	}
	function renderCircle(angleOffset, centerCoord, minRadius, maxRadius) {
		const angleIncrement = 360 / frequencyData.length;

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
			color = colorGenerator(node, 0.5);

			const line = new Line(ctx, begin, end, color);
			line.draw();
		};
	};
	
	const centerCoord = Utils.centerCoord(canvas);
	const innerRadiusMin = {
		min: canvas.height * 0.12,
		max: canvas.height * 0.15
	};
	const innerRadiusMax = {
		min: innerRadiusMin.min * 1.1,
		max: innerRadiusMin.max * 1.1,
	}
	const ray = {
		radius: {
			min: innerRadiusMin.min,
			mid: canvas.height * 0.7,
			max: canvas.width	
		},
		opacity: {
			begin: 0.05,
			end: 0.01
		}
	}
	const glowRadius = innerRadiusMin.max - innerRadiusMin.min;
	const petalRadiusMin = {
		min: innerRadiusMin.max,
		max: canvas.height * 0.4
	};
	const petalRadiusMax = {
		min: petalRadiusMin.min * 1.1,
		max: petalRadiusMin.max * 1.1
	}
	const petalGradientRadius =  petalRadiusMin.max - petalRadiusMin.min;
	const irisRadius = {
		min: innerRadiusMin.min * 0.3,
		max: innerRadiusMin.min * 0.8
	}
	const angleIncrement = 360 / frequencyData.length;
	function renderTenseigan() {
		requestAnimationFrame(renderTenseigan);
		const beatNode = frequencyData[0];

		analyser.getByteFrequencyData(frequencyData);
		analyser.getByteFrequencyData(petalData);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		renderCircle(0, centerCoord, irisRadius.min, irisRadius.max)
		renderCircle(120, centerCoord, irisRadius.min, irisRadius.max)
		renderCircle(240, centerCoord, irisRadius.min, irisRadius.max)
		renderPetals(centerCoord, petalRadiusMin, petalRadiusMax, petalGradientRadius, beatNode);
		renderRays(centerCoord, ray, angleIncrement);
		
		renderGlowCircle(centerCoord, innerRadiusMin, innerRadiusMax, glowRadius, angleIncrement, beatNode);
		
	}
	renderTenseigan();
};

module.exports = animate;