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

function animate(canvas, ctx, analyser, colorGenerator) {
	if(!analyser.frequencyBinCount) return;

	const frequencyData = new Uint8Array(analyser.frequencyBinCount);

	function renderLine() {
		requestAnimationFrame(renderLine);

		analyser.getByteFrequencyData(frequencyData);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const maxRadius = canvas.height / 2 * 0.5;
		const minRadius = maxRadius * 0.6;

		const centerCoord = Utils.centerCoord(canvas);
		const angleIncrement = 360 / frequencyData.length;

		let prevEnd = {};

		let lines = [];
		let firstCoord = {};

		for( let index = 0; index < frequencyData.length; index ++ ) {
			const node = frequencyData[index];
			const nextNode = frequencyData[index + 1];
			let begin = {};
			let end = {};

			const startRadius = Utils.withinRange(minRadius, maxRadius, Utils.maxNode, node);
			const startAngle = index * angleIncrement;

			if( index === 0 || index === frequencyData.length - 1 ) {
				begin = {
					x: centerCoord.x + (startRadius * Math.cos(startAngle)),
					y: centerCoord.y + (startRadius * Math.sin(startAngle))
				};
				firstCoord = Object.assign({}, begin);

			} else {
				begin = prevEnd;
			}


			// const endRadius = startRadius + Utils.upTo(maxRadius, Utils.maxNode, nextNode);
			const endRadius = Utils.withinRange(minRadius, maxRadius, Utils.maxNode, nextNode);
			const endAngle = startAngle + angleIncrement;

			if(index === frequencyData.length - 1) {
				end = firstCoord;
			} else {
				end = {
					x: centerCoord.x + (endRadius * Math.cos(endAngle)),
					y: centerCoord.y + (endRadius * Math.sin(endAngle)),
				}
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