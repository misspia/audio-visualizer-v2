import Bar from './visualizations/bar.js';
import Line from './visualizations/line.js';
import SolidCircle from './visualizations/solidCircle.js';
import Sun from './visualizations/sun.js';
import Dripping from './visualizations/dripping.js';

const metadata = {
	bar: {
		label: 'Bar',
		generator: Bar
	},
	line: {
		label: 'Line',
		generator: Line
	},
	solidCircle: {
		label: 'beat',
		generator: SolidCircle
	},
	sun: {
		label: 'sun',
		generator:Sun
	},
	dripping: {
		label: 'dripping',
		generator: Dripping
	}
};

module.exports = metadata;