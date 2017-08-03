import Utils from '../graphs.utils.js';

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

}

module.exports = animate;