function Line( ctx, begin={}, end={}, color) {
	this.begin = begin;
	this.end = end;

	this.draw = () => {
		ctx.beginPath(); 
		ctx.lineWidth = "1";
		ctx.strokeStyle = color;
		ctx.moveTo(this.begin.x , this.begin.y);
		ctx.lineTo(this.end.x, this.end.y);
		ctx.stroke();
	};
}

function animate(canvas, ctx, analyser) {
	if(!analyser.frequencyBinCount) return;
	
	const frequencyData = new Uint8Array(analyser.frequencyBinCount);

	function renderLine() {
		requestAnimationFrame(renderLine);

		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		let lines = [];
		const canvasMidHeight = canvas.height / 2;

		for( let i = 0; i < frequencyData.length; i ++) {
			const begin = {x: i, y: canvasMidHeight - frequencyData[i] },
				end = { x: i + 1, y: canvasMidHeight - frequencyData[i + 1]},
				color = generateColor(frequencyData[i]);

			lines.push( new Line(ctx, begin, end, color) );
		};
		lines.forEach((line) => { line.draw(); })
	}
	renderLine();
}

function generateColor(variant) {
	return `rgba(218, 70, ${variant}, 0.6)`
}



module.exports = animate;