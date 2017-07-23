import Bar from './visualizations/bar.js';
import Line from './visualizations/line.js';
import MultiCircle from './visualizations/multiCircle.js';

// weatherbot DarkSky API => pass arguments to parent
const Visualizations = {
	bar: () => {
		return Bar;
	},
	line: () => {
		return Line;
	},
	multiCircle: () => {
		return MultiCircle;
	}
}

module.exports = visualizations;