import Utils from '../../graphs.utils.js';

function Bar (ctx, x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.draw = () => {
	ctx.fillStyle = color;
		ctx.fillRect(x, y, width, height);
	};
}
function Line( ctx, begin={}, end={}, color) {
	this.begin = begin;
	this.end = end;

	this.draw = () => {
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = color;
		ctx.moveTo(this.begin.x , this.begin.y);
		ctx.lineTo(this.end.x, this.end.y);
		ctx.stroke();
	};
}

function animate(canvas, ctx, analyser, colorGenerator) {
	if(!analyser.frequencyBinCount) return;

	const frequencyData = new Uint8Array(200);
	
	function renderBars(barWidth, maxHeight, node, index, color) {
		const x =  index * (1 + barWidth),
			barHeight = Utils.upTo(maxHeight, Utils.maxNode, node),
			y = (canvas.height - barHeight) / 2;

		const bar = new Bar(ctx, x, y, barWidth, barHeight, color);
		bar.draw();
	}
	function renderMirror() {
		requestAnimationFrame(renderMirror);

		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const barWidth = canvas.width / frequencyData.length;
		const maxHeight = canvas.height * 0.7;

		frequencyData.forEach((node, index) => {
			const color = colorGenerator(node);
			renderBars(barWidth, maxHeight, node, index, color);
		});
	}
	renderMirror();
}





module.exports = animate;