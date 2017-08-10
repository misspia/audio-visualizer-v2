import Utils from '../graphs.utils.js';

function Line( ctx, begin={}, end={}, color, lineWidth="1.2") {
	this.begin = begin;
	this.end = end;

	this.draw = () => {
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color;
		ctx.moveTo(this.begin.x , this.begin.y);
		ctx.lineTo(this.end.x, this.end.y);
		ctx.stroke();
	};
}

function Ticker(ctx, begin={}, midLeft, midRight, end, color, lineWidth="1") {
	this.begin = begin;
	this.end = end;
	this.midLeft = midLeft;
	this.midRight = midRight;

	this.draw = () => {
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color;
		ctx.moveTo(this.begin.x, this.begin.y);
		ctx.lineTo(this.midLeft.x, this.midLeft.y);
		ctx.lineTo(this.end.x, this.end.y);
		ctx.lineTo(this.midRight.x, this.midRight.y);
		// ctx.lineTo(this.end.x, this.end.y);
		ctx.lineTo(this.begin.x, this.begin.y);

		ctx.closePath();
		ctx.stroke();

	};
}

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

function animate(canvas, ctx, analyser, colorGenerator) {
	if(!analyser.frequencyBinCount) return;

	analyser.smoothingTimeConstant = 0.65;

	const frequencyData = new Uint8Array(100);
	const barPortion = frequencyData.length / 2;


	function renderLongLines(angle, radius, centerCoord, node, color) {
		const endRadius = radius.min + Utils.upTo(radius.max, Utils.maxNode, node);
		const beginRadius = radius.min + (endRadius - radius.min) / 2;

		const begin = Utils.circleCoord(centerCoord, beginRadius, angle);
		const end = Utils.circleCoord(centerCoord, endRadius, angle)

		const bar = new Line(ctx, begin, end, color);
		bar.draw();
	}

	function renderVoid(angle, radius, centerCoord, node, color) {
		const beginRadius = radius.min;
		const endRadius = Utils.withinRange(radius.min, radius.max, Utils.maxNode, node);

		const begin = Utils.circleCoord(centerCoord, beginRadius, angle);
		const end = Utils.circleCoord(centerCoord, endRadius, angle);

		const dot = new Line(ctx, begin, end, color);
		dot.draw();
	}
	function renderTicker(angle, radius, centerCoord, node) {
		const tickerLength = 50;
		const beginRadius = Utils.upTo(radius.min, Utils.maxNode, node) - tickerLength;
		const endRadius = beginRadius + tickerLength;
		const midRadius = beginRadius * 0.8 + endRadius * 0.2;

		const begin = Utils.circleCoord(centerCoord, beginRadius, angle);
		const midLeft = Utils.circleCoord(centerCoord, midRadius, angle - 5);
		const midRight = Utils.circleCoord(centerCoord, midRadius, angle + 5);
		const end = Utils.circleCoord(centerCoord, endRadius, angle);

		const ticker = new Ticker(ctx, begin, midLeft, midRight, end, '#000');
		ticker.draw();
	}

	function setColor(reverseColors, voidBar, node) {
		const generatedColor = colorGenerator(node);
		let primary = generatedColor, background = '#fff', voidColor = '#000';

		// if(voidBar) {
		// 	primary = '#000';
		// 	voidColor = generatedColor;
		// }
		if(reverseColors) {
			primary = '#fff';
			background = generatedColor;
		}
		// if(reverseColors && voidBar) {
		// 	primary = '#000';
		// 	background = generatedColor;
		// 	voidColor = '#fff';
		// }
		return {primary: primary , background: background, void: voidColor};
	}

	let voidBar = 0;
	let velocity = 0.1;
	let reverseColors = false;

	function renderSun() {
		requestAnimationFrame(renderSun);

		analyser.getByteFrequencyData(frequencyData);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		voidBar = voidBar % frequencyData.length + velocity;
		if(voidBar.toFixed(1) == frequencyData.length) {
			reverseColors = !reverseColors;
		}

		const allocatedCanvasSpace = 0.5;
		const minRadiusMultiplier = 0.2;
		const maxRadiusMultiplier = allocatedCanvasSpace - minRadiusMultiplier;
		const radius = {
			min: canvas.height * minRadiusMultiplier,
			max: canvas.height * maxRadiusMultiplier
		};
		const centerCoord = Utils.centerCoord(canvas);

		const angleIncrement = 360 / frequencyData.length;
		const rotationOffset = 90;

		frequencyData.forEach((node, index) => {
			const angle = index * angleIncrement + rotationOffset;
			const color = setColor(reverseColors, index === Math.round(voidBar), node);

			canvas.style.backgroundColor = color.background;

			if(index <= barPortion) {
				renderLongLines(angle, radius, centerCoord, node, color.primary);
			} else {
				renderVoid(angle, radius, centerCoord, node, color.void);
			}
			if(index == Math.round(voidBar)) {
				renderTicker(angle, radius, centerCoord, node);
			}

		});
	}
	renderSun();
};

module.exports = animate;

// import Utils from '../graphs.utils.js';

// function Line( ctx, begin={}, end={}, color, lineWidth="1.2") {
// 	this.begin = begin;
// 	this.end = end;

// 	this.draw = () => {
// 		ctx.beginPath();
// 		ctx.lineWidth = lineWidth;
// 		ctx.strokeStyle = color;
// 		ctx.moveTo(this.begin.x , this.begin.y);
// 		ctx.lineTo(this.end.x, this.end.y);
// 		ctx.stroke();
// 	};
// }

// function Shard(ctx, begin={}, midLeft, midRight, end, color, lineWidth="0.5") {
// 	this.begin = begin;
// 	this.end = end;
// 	this.midLeft = midLeft;
// 	this.midRight = midRight;

// 	this.draw = () => {
// 		const gradient = ctx.createLinearGradient(this.begin.x, this.begin.y, this.end.x, this.end.y);
// 		const startColor = Utils.newColorAlpha(color, 0.3);
// 		const endColor = Utils.newColorAlpha(color, 0.1);
// 		gradient.addColorStop(0.2, startColor);
// 		gradient.addColorStop(0.5, endColor);

// 		ctx.beginPath();
// 		ctx.lineWidth = lineWidth;
// 		ctx.strokeStyle = color;
// 		ctx.moveTo(this.begin.x, this.begin.y);
// 		ctx.lineTo(this.midLeft.x, this.midLeft.y);
// 		ctx.lineTo(this.end.x, this.end.y);
// 		ctx.lineTo(this.midRight.x, this.midRight.y);
// 		ctx.lineTo(this.begin.x, this.begin.y);
// 		ctx.fillStyle = gradient;
// 		ctx.fill();

// 		ctx.closePath();
// 		ctx.stroke();
// 	};
// }

// function animate(canvas, ctx, analyser, colorGenerator) {
// 	if(!analyser.frequencyBinCount) return;

// 	analyser.smoothingTimeConstant = 0.75;

// 	const frequencyData = new Uint8Array(100);
// 	const barPortion = frequencyData.length / 2;


// 	function renderShards(expand, angle, radius, centerCoord, node, color) {
// 		const shardWidth = 2;

// 		// const beginRadius = radius.min;
// 		const beginRadius = radius.min - Utils.withinRange(radius.min*0.6, radius.min, Utils.maxNode, node);
// 		const endRadius = Utils.withinRange(radius.min, radius.max, Utils.maxNode, node);
// 		// const midRadius = beginRadius * 0.2 + endRadius * 0.8;
// 		const midRadius = radius.min;

// 		const begin = Utils.circleCoord(centerCoord, beginRadius, angle);
// 		const midLeft = Utils.circleCoord(centerCoord, midRadius, angle - shardWidth);
// 		const midRight = Utils.circleCoord(centerCoord, midRadius, angle + shardWidth);
// 		const end = Utils.circleCoord(centerCoord, endRadius, angle);

// 		const shard = new Shard(ctx, begin, midLeft, midRight, end, color);
// 		shard.draw();
// 	}

// 	function renderVoid(angle, radius, centerCoord, node, color) {
// 		const beginRadius = radius.min;
// 		const endRadius = Utils.withinRange(radius.min, radius.max, Utils.maxNode, node);

// 		const begin = Utils.circleCoord(centerCoord, beginRadius, angle);
// 		const end = Utils.circleCoord(centerCoord, endRadius, angle);

// 		const dot = new Line(ctx, begin, end, color);
// 		dot.draw();
// 	}

// 	function setColor(reverseColors, voidBar, node) {
// 		const generatedColor = colorGenerator(node);
// 		let primary = generatedColor, background = 'rgba(255,255,255,1)', voidColor = 'rgba(0,0,0,1)';

// 		if(reverseColors) {
// 			primary = 'rgba(255,255,255,1)';
// 			background = generatedColor;
// 		}
// 		return {primary: primary , background: background, void: voidColor};
// 	}

// 	let voidBar = 0;
// 	let velocity = 0.5;
// 	let reverseColors = false;

// 	function renderSun() {
// 		requestAnimationFrame(renderSun);

// 		analyser.getByteFrequencyData(frequencyData);
// 		ctx.clearRect(0, 0, canvas.width, canvas.height);

// 		voidBar = voidBar % frequencyData.length + velocity;
// 		if(voidBar.toFixed(1) == frequencyData.length) {
// 			reverseColors = !reverseColors;
// 		}

// 		const allocatedCanvasSpace = 0.5;
// 		const minRadiusMultiplier = 0.2;
// 		const maxRadiusMultiplier = allocatedCanvasSpace - minRadiusMultiplier;
// 		const radius = {
// 			min: canvas.height * minRadiusMultiplier,
// 			max: canvas.height * maxRadiusMultiplier
// 		};
// 		// const radius2 = {
// 		// 	min: canvas.height * minRadiusMultiplier * 0.9,
// 		// 	max: canvas.height * maxRadiusMultiplier
// 		// };
// 		// const radius3 = {
// 		// 	min: canvas.height * minRadiusMultiplier * 0.8,
// 		// 	max: canvas.height * maxRadiusMultiplier
// 		// };
// 		// const radius4 = {
// 		// 	// min: canvas.height * minRadiusMultiplier * 0.1,
// 		// 	min: 0,
// 		// 	// max: canvas.height * maxRadiusMultiplier
// 		// 	max: radius3.min * 0.9
// 		// };
// 		const centerCoord = Utils.centerCoord(canvas);

// 		const angleIncrement = 360 / frequencyData.length;
// 		const rotationOffset = 90;

// 		frequencyData.forEach((node, index) => {
// 			const angle = index * angleIncrement + rotationOffset;
// 			const color = setColor(reverseColors, index === Math.round(voidBar), node);

// 			canvas.style.backgroundColor = color.background;

// 			const expand = reverseColors;
			
// 			// renderVoid(angle, radius4, centerCoord, node, color.void);
// 			renderShards(expand, angle, radius, centerCoord, node, color.primary);
// 			// renderShards(expand, angle, radius2, centerCoord, node, color.primary);
// 			// renderShards(expand, angle, radius3, centerCoord, node, color.primary);

// 		});
// 	}
// 	renderSun();
// };

// module.exports = animate;










