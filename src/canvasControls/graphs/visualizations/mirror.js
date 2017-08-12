import Utils from '../graphs.utils.js';

function Line( ctx, begin={}, end={}, color, lineWidth = '2') {
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

	const frequencyData = new Uint8Array(150);
	
	function renderBars(barWidth, maxHeight, node, index, color) {
		const x = index * (1 + barWidth);
		const barHeight = Utils.upTo(maxHeight, Utils.maxNode, node);
		const begin = {
			x: x,
			y: canvas.height / 2
		};
		const end = {
			x: x,
			y: begin.y - barHeight
		};
		const bar = new Line(ctx, begin, end, color, barWidth);
		bar.draw();
	}
	function renderLine() {

	}
	function renderMirror() {
		requestAnimationFrame(renderMirror);

		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const barWidth = canvas.width / frequencyData.length;
		const maxHeight = canvas.height * 0.4;

		frequencyData.forEach((node, index) => {
			const color = colorGenerator(node);
			renderBars(barWidth, maxHeight, node, index, color);
		});
	}
	renderMirror();
}


module.exports = animate;