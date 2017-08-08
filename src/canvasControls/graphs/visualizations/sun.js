import Utils from '../graphs.utils.js';

function Line( ctx, begin={}, end={}, color) {
	this.begin = begin;
	this.end = end;

	this.draw = () => {
		ctx.beginPath();
		ctx.lineWidth = "1.2";
		ctx.strokeStyle = color;
		ctx.moveTo(this.begin.x , this.begin.y);
		ctx.lineTo(this.end.x, this.end.y);
		ctx.stroke();
	};
}

// let voidBar = 0;

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

	function setColor(reverseColors, voidBar, node) {
		const generatedColor = colorGenerator(node);
		let primary = generatedColor, background = '#fff', voidColor = '#000';

		if(voidBar) {
			primary = '#000';
			voidColor = generatedColor;
		}
		if(reverseColors) {
			primary = '#fff';
			background = generatedColor;
		}
		if(reverseColors && voidBar) {
			primary = '#000';
			background = generatedColor;
			voidColor = '#fff';
		}
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

		});
	}
	renderSun();
};

module.exports = animate;










