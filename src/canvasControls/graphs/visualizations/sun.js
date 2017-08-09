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

	analyser.smoothingTimeConstant = 0.75;

	const frequencyData = new Uint8Array(100);
	const barPortion = frequencyData.length / 2;


	function renderShards(expand, angle, radius, centerCoord, node, color) {
		const tickerLength = 40, tickerWidth = 2;
		let beginRadius, endRadius, midRadius, begin, midLeft, midRight, end;

		beginRadius = radius.min * 0.95;
		endRadius = radius.min - Utils.upTo(radius.min * 0.95, Utils.maxNode, node);
		midRadius = beginRadius * 0.8 + endRadius * 0.2;

		begin = Utils.circleCoord(centerCoord, beginRadius, angle);
		midLeft = Utils.circleCoord(centerCoord, midRadius, angle - tickerWidth);
		midRight = Utils.circleCoord(centerCoord, midRadius, angle + tickerWidth);
		end = Utils.circleCoord(centerCoord, endRadius, angle);

		const shard = new Shard(ctx, begin, midLeft, midRight, end, color);
		shard.draw();
	}

	function renderVoid(angle, radius, centerCoord, node, color) {
		const beginRadius = radius.min;
		const endRadius = Utils.withinRange(radius.min, radius.max, Utils.maxNode, node);

		const begin = Utils.circleCoord(centerCoord, beginRadius, angle);
		const end = Utils.circleCoord(centerCoord, endRadius, angle);

		const dot = new Line(ctx, begin, end, color);
		dot.draw();
	}

	function setColor(reverseColors, voidBar, node) {
		const generatedColor = colorGenerator(node);
		let primary = generatedColor, background = 'rgba(255,255,255,1)', voidColor = 'rgba(0,0,0,1)';

		if(reverseColors) {
			primary = 'rgba(255,255,255,1)';
			background = generatedColor;
		}
		return {primary: primary , background: background, void: voidColor};
	}

	let voidBar = 0;
	let velocity = 0.5;
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

			const expand = reverseColors;

			renderShards(expand, angle, radius, centerCoord, node, color.primary);
			renderVoid(angle, radius, centerCoord, node, color.void);
			// renderVoid(angle, radius, centerCoord, node, color.primary, );

		});
	}
	renderSun();
};

module.exports = animate;










