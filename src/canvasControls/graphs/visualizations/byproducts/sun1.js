import Utils from '../../graphs.utils.js';

function Line( ctx, begin={}, end={}, lineWidth, color) {
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


function animate(canvas, ctx, analyser, colorGenerator) {
	if(!analyser.frequencyBinCount) return;

	analyser.smoothingTimeConstant = 0.7;

	const frequencyData = new Uint8Array(60);

	function renderSun() {
		requestAnimationFrame(renderSun);

		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const allocatedCanvasSpace = 0.6;
		const startRadiusMultiplier = 0.4;
		const maxLineHeightMultiplier = allocatedCanvasSpace - startRadiusMultiplier;
		const maxLineHeight = canvas.height * maxLineHeightMultiplier;
	
		const centerCoord = Utils.centerCoord(canvas);
		
		const minRadius = canvas.height / 2 * startRadiusMultiplier;
		// const startRadius = minRadius / 2;

		const barPaddingMultiplier = 0.1;
		const lineWidth = Utils.circumference(minRadius) / frequencyData.length * barPaddingMultiplier;
		
		const angleIncrement = 360 / frequencyData.length;
		const rotationOffset = 90;


		let lines = [];

		frequencyData.forEach((node, index) => {
			const angle = index * angleIncrement + rotationOffset;
			

			const endRadius =( minRadius + Utils.upTo(maxLineHeight, Utils.maxNode, node)) / 2;
			const startRadius = (endRadius + minRadius) / 2;
			
			const begin = Utils.circleCoord(centerCoord, startRadius, angle);
			

			const end = Utils.circleCoord(centerCoord, endRadius, angle)
			const color = colorGenerator(node);

			lines.push(new Line(ctx, begin, end, lineWidth, color));
		});
		lines.forEach((line) => { line.draw(); });
	}
	renderSun();
};

module.exports = animate;












