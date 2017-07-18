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

function viz(canvas, ctx, analyser) {
	if(!analyser.frequencyBinCount) return;
	
	const frequencyData = new Uint8Array(analyser.frequencyBinCount);

	function renderBars() {
		requestAnimationFrame(renderBars);

		analyser.getByteFrequencyData(frequencyData);
		// analyser.getByteTimeDomainData(frequencyData);

		console.log(analyser, frequencyData) 

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const barWidth = canvas.width / frequencyData.length;
		let bars = [];
		frequencyData.forEach((node, index) => {
			const x =  2 * Math.pow(barWidth, 2) + barWidth * index,
				barHeight = node * 2,
				y = (canvas.height - barHeight) / 2,
				color = generateColor(node);

			bars.push(new Bar(ctx, x, y, barWidth, barHeight, color))
		});

		bars.forEach((bar) => { bar.draw(); })

	}
	renderBars();
}

function generateColor(variant) {
	return `rgba(218, 70, ${variant}, 0.6)`
}



module.exports = viz;