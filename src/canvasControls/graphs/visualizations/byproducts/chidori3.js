import Utils from '../../graphs.utils.js';

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

	const frequencyData = new Uint8Array(analyser.frequencyBinCount);

	function renderLine() {
		requestAnimationFrame(renderLine);

		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const maxRadius = canvas.height / 2 * 0.5;
		const startRadius = maxRadius * 0.8;

		const centerCoord = Utils.centerCoord(canvas);
		const angleIncrement = 360 / frequencyData.length;

		let prevEnd = {};

		let lines = [];

		for( let index = 0; index < frequencyData.length; index ++ ) {
			const node = frequencyData[index];
			const nextNode = frequencyData[index + 1];
			let begin = {};

			const startAngle = index * angleIncrement;

			if( prevEnd == {} ) {
				begin = {
					x: centerCoord.x + (startRadius * Math.cos(startAngle)),
					y: centerCoord.y + (startRadius * Math.sin(startAngle))
				};
			} else {
				begin = prevEnd;
			}


			const endRadius = startRadius + Utils.upTo(maxRadius, Utils.maxNode, nextNode);
			const endAngle = startAngle + angleIncrement;

			const end = {
				x: centerCoord.x + (endRadius * Math.cos(endAngle)),
				y: centerCoord.y + (endRadius * Math.sin(endAngle)),
			}
			const color = colorGenerator(node);

			lines.push( new Line(ctx, begin, end, color) );

			prevEnd = end;
		}
		lines.forEach((line) => { line.draw(); });
	}
	renderLine();
}

module.exports = animate;