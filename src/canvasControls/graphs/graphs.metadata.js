import {icons} from '../../utils.js';

import Mirror from './visualizations/mirror.js'
import Chidori from './visualizations/chidori.js';
import Tenseigan from './visualizations/tenseigan.js';

const metadata = {
	mirror: {
		label: 'Mirror',
		generator: Mirror,
		icon: icons.bars
	},
	tenseigan: {
		label: 'tenseigan',
		generator: Tenseigan,
		icon: icons.leaf
	},
	chidori: {
		label: 'chidori',
		generator: Chidori,
		icon: icons.circle
	},
};

module.exports = metadata;