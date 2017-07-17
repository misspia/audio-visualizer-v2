function Bar (ctx, x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.draw = () => {
		ctx.fillStyle = '#832d51';
		ctx.fillRect(x, y, width, height);	
	};
	this.update = () => {
		
	}
}

function viz(canvas, ctx, analyser) {
	if(!analyser.frequencyBinCount) return;

	const frequencyData = new Uint8Array(analyser.frequencyBinCount);

	function renderBars() {
		requestAnimationFrame(renderBars);
		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const barWidth = canvas.width / frequencyData.length;
		let bars = [];
		frequencyData.forEach((node, index) => {
			bars.push(new Bar(ctx, barWidth * index, 0, barWidth, node))
		});

		bars.forEach((bar) => { bar.draw(); })

	}
	renderBars();
}


module.exports = viz;