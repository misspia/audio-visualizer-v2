import {icons} from '../../utils.js';

import Star from './visualizations/byproducts/chidori7-star.js';
import Mirror from './visualizations/mirror.js'
import Chidori from './visualizations/chidori.js';
import Tenseigan from './visualizations/tenseigan.js';

const metadata = {
	chidori: {
		id: 'chidori',
		generator: Chidori,
		icon: icons.circle
	},
	mirror: {
		id: 'Mirror',
		generator: Mirror,
		icon: icons.bars
	},
	star: {
		id: 'star',
		generator: Star,
		icon: icons.star
	},
	tenseigan: {
		id: 'tenseigan',
		generator: Tenseigan,
		icon: icons.leaf
	},
	
};

module.exports = metadata;