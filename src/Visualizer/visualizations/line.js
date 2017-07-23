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

function animate(canvas, ctx, analyser) {
	if(!analyser.frequencyBinCount) return;
	
	const frequencyData = new Uint8Array(analyser.frequencyBinCount);

	function renderLine() {
		requestAnimationFrame(renderLine);

		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		
		const canvasMidHeight = canvas.height / 2;
		const xDistance = canvas.width / frequencyData.length;
		let lines = [];
		let xStart = 0, xEnd = 0;

		for( let i = 0; i < frequencyData.length; i ++) {
			
			xEnd = i * ( 1 + xDistance );

			const begin = {x: xStart, y: canvasMidHeight - frequencyData[i] },
				end = { x: xEnd, y: canvasMidHeight - frequencyData[i + 1]},
				color = generateColor(frequencyData[i]);

			lines.push( new Line(ctx, begin, end, color) );

			xStart = xEnd;
		};
		lines.forEach((line) => { line.draw(); })
	}
	renderLine();
}

function generateColor(variant) {
	return `rgba(218, 70, ${variant}, 0.6)`
}



module.exports = animate;