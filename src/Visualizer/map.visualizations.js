import Bar from './visualizations/bar.js';
import Line from './visualizations/line.js';
import MultiCircle from './visualizations/multiCircle.js';
import SunBars from './visualizations/sunBars.js';

const Visualizations = (type, canvas, ctx, analyser) => {
	console.log('mapping...')
	switch(type) {
		case "bar":
			Bar(canvas, ctx, analyser);
			break;
		case "line":
			Line(canvas, ctx, analyser);
			break;
		case "multiCircle":
			MultiCircle(canvas, ctx, analyser);
			break;
		case "sunBars":
			SunBars(canvas, ctx, analyser);
			break;
		default:
			Bar(canvas, ctx, analyser);
	}
}

module.exports = Visualizations;