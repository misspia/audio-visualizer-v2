import Utils from '../graphs.utils.js';

function Circle( ctx, center={}, radius, color) {
	this.center = center;
	this.radius = radius;

	this.draw = () => {
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.lineWidth = "1";
		ctx.arc( this.center.x, this.center.y, this.radius, 0 , 2 * Math.PI );
		ctx.fill();
	};
}

function animate(canvas, ctx, analyser, colorGenerator) {
	if(!analyser.frequencyBinCount) return;

	const frequencyData = new Uint8Array(2);

	function renderCircle() {
		requestAnimationFrame(renderCircle);

		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		let circles = [];
		const maxRadius = canvas.height / 2 * 0.5;
		const minRadius = maxRadius * 0.6;
		const centerCoord = Utils.centerCoord(canvas);

		frequencyData.forEach((node, index) => {
			const radius = Utils.withinRange(minRadius, maxRadius, Utils.maxNode, node),
				color = colorGenerator(node);

			circles.push( new Circle(ctx, centerCoord, radius, color) );
		});

		circles.forEach((circle) => { circle.draw(); })
	}
	renderCircle();
}


module.exports = animate;