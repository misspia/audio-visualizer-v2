import {icons} from '../../utils.js';

import Bar from './visualizations/bar.js';
import Line from './visualizations/line.js';
import SolidCircle from './visualizations/solidCircle.js';
import Sun from './visualizations/sun.js';
import Dripping from './visualizations/dripping.js';
import Chidori from './visualizations/chidori.js';

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
	sun: {
		label: 'sun',
		generator:Sun,
		icon: icons.sun
	},
	chidori: {
		label: 'chidori',
		generator: Chidori,
		icon: icons.circle
	},
};

module.exports = metadata;