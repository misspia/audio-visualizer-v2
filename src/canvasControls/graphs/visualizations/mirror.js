import Utils from '../graphs.utils.js';

function Line( ctx, begin={}, end={}, color, lineWidth = '2', lineCap='butt') {
	this.begin = begin;
	this.end = end;

	this.draw = () => {
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color;
		ctx.lineCap = lineCap;
		ctx.moveTo(this.begin.x , this.begin.y);
		ctx.lineTo(this.end.x, this.end.y);
		ctx.stroke();
	};
}

function animate(canvas, ctx, analyser, colorGenerator) {
	if(!analyser.frequencyBinCount) return;
	
	const frequencyData = new Uint8Array(110);
	
	function renderBars(xSpread, barWidth, maxHeight, node, index, color) {
		const x = index * (1 + xSpread);
		const barHeight = Utils.upTo(maxHeight, Utils.maxNode, node);
		const begin = {
			x: x,
			y: canvas.height / 2
		};
		const end = {
			x: x,
			y: begin.y - barHeight
		};
		const bar = new Line(ctx, begin, end, color, barWidth, 'round');
		bar.draw();
	}
	function renderLine(xStart, xEnd, maxHeight, node, nextNode, color) {
		const begin = { x: xStart, y: canvas.height / 2 + Utils.upTo(maxHeight, Utils.maxNode, node) };
		const end = { x: xEnd, y: canvas.height / 2 + Utils.upTo(maxHeight, Utils.maxNode, nextNode) };

		const line = new Line(ctx, begin, end, color);
		line.draw();
	}
	function renderMirror() {
		requestAnimationFrame(renderMirror);

		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const xSpread = canvas.width / frequencyData.length;
		const barWidth = xSpread * 0.3;
		const maxHeight = canvas.height * 0.25;
		let xStart = 0, xEnd = 0;

		frequencyData.forEach((node, index) => {
			const nextNode = index === frequencyData.length - 1 ? node : frequencyData[index + 1];
			const color = colorGenerator(node);
			xEnd = index * ( 1 + xSpread );

			renderBars(xSpread, barWidth, maxHeight, node, index, color);
			renderLine(xStart, xEnd, maxHeight, node, nextNode, color);

			xStart = xEnd;
		});
	}
	renderMirror();
}


module.exports = animate;