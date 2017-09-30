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
	tenseigan: {
		id: 'tenseigan',
		generator: Tenseigan,
		icon: icons.sun
	},
	star: {
		id: 'star',
		generator: Star,
		icon: icons.star
	},
	mirror: {
		id: 'Mirror',
		generator: Mirror,
		icon: icons.bars
	},
};

module.exports = metadata;