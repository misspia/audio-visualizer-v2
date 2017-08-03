import {icons} from '../../utils.js';

import Bar from './visualizations/bar.js';
import Line from './visualizations/line.js';
import SolidCircle from './visualizations/solidCircle.js';
import Sun from './visualizations/sun.js';
import Dripping from './visualizations/dripping.js';

const metadata = {
	bar: {
		label: 'Bar',
		generator: Bar,
		icon: icons.bars
	},
	line: {
		label: 'Line',
		generator: Line,
		icon: icons.pulse
	},
	solidCircle: {
		label: 'beat',
		generator: SolidCircle,
		icon: icons.circle
	},
	sun: {
		label: 'sun',
		generator:Sun,
		icon: icons.sun
	},
	dripping: {
		label: 'dripping',
		generator: Dripping,
		icon: icons.rain
	}
};

module.exports = metadata;