import Utils from '../../graphs.utils.js';

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

function Circle( ctx, center={}, radius, color) {
	this.center = center;
	this.radius = radius;

	this.draw = () => {
		const gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius);
		gradient.addColorStop( 0.25, Utils.newColorAlpha(color, 0.9));
		gradient.addColorStop( 0.5, Utils.newColorAlpha(color, 0.7));
		gradient.addColorStop( 0.75, Utils.newColorAlpha(color, 0.5));
		gradient.addColorStop( 1, Utils.newColorAlpha(color, 0.2));

		ctx.beginPath();
		
		ctx.arc( this.center.x, this.center.y, this.radius, 0 , 2 * Math.PI );
		ctx.stroke();
		// ctx.fillStyle = gradient;
		// ctx.fill();
	};
}

function animate(canvas, ctx, analyser, colorGenerator) {
	if(!analyser.frequencyBinCount) return;

	analyser.smoothingTimeConstant = 0.75;

	const frequencyData = new Uint8Array(100);



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

			const glowCenterCoord = Utils.circleCoord(centerCoord, radius.max, angle);
			const glowRadius = Utils.withinRange(10, 50, Utils.maxNode, node);
			const glow = new Circle(ctx, glowCenterCoord, glowRadius, color.primary);
			glow.draw();



		});
	}
	renderSun();
};

module.exports = animate;
