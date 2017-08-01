import Bar from './visualizations/bar.js';
import Line from './visualizations/line.js';
import SolidCircle from './visualizations/solidCircle.js';
import Sun from './visualizations/sun.js';
import Dripping from './visualizations/dripping.js';

const Visualizations = (graph, canvas, ctx, analyser, color) => {
	console.log('mapping...', graph,"color...", color);
	switch(graph) {
		case 'bar':
			Bar(canvas, ctx, analyser, color);
			break;
		case 'line':
			Line(canvas, ctx, analyser, color);
			break;
		case 'solidCircle':
			SolidCircle(canvas, ctx, analyser, color);
			break;
		case 'sun':
			Sun(canvas, ctx, analyser, color);
			break;
		case 'dripping':
			Dripping(canvas, ctx, analyser, color);
			break;
		default:
			Bar(canvas, ctx, analyser, color);
	}
}

module.exports = Visualizations;