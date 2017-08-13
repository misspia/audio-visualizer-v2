import {icons} from '../../utils.js';

import Mirror from './visualizations/mirror.js'
import Chidori from './visualizations/chidori.js';
import Tenseigan from './visualizations/tenseigan.js';
import Orichalcos from './visualizations/orichalcos.js';

const metadata = {
	mirror: {
		label: 'Mirror',
		generator: Mirror,
		context: '2d',
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
		context: '2d',
		icon: icons.circle
	},
	orichalcos: {
		label: 'orichalcos',
		generator: Orichalcos,
		context: 'webgl',
		icon: icons.circle
	}
	
};

module.exports = metadata;