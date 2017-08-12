import {icons} from '../../utils.js';


import Sun from './visualizations/sun.js';
import Mirror from './visualizations/mirror.js'
import Chidori from './visualizations/chidori.js';

const metadata = {
	mirror: {
		label: 'Mirror',
		generator: Mirror,
		icon: icons.bars
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