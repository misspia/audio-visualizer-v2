function Circle( ctx, center={}, radius, color) {
	this.center = center;
	this.radius = radius;

	this.draw = () => {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.arc( this.center.x, this.center.y, this.radius, 0 , 2 * Math.PI );
		ctx.stroke();
	};
}

function animate(canvas, ctx, analyser) {
	if(!analyser.frequencyBinCount) return;
	
	const frequencyData = new Uint8Array(analyser.frequencyBinCount);

	function renderCircle() {
		requestAnimationFrame(renderCircle);

		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		let circles = [];
		const centerCoord = {
			x: canvas.width / 2,
			y: canvas.height / 2
		};
		
		frequencyData.forEach((node, index) => {
			const color = generateColor(node);		
	
			circles.push( new Circle(ctx, centerCoord, node, color) );
		});

		circles.forEach((circle) => { circle.draw(); })
	}
	renderCircle();
}

function generateColor(variant) {
	return `rgba(218, 70, ${variant}, 0.6)`
}



module.exports = animate;