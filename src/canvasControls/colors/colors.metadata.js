import Color from './colorShaders.js';
import {gradient} from './colors.utils.js';

const metadata = {
	pink: {
		label: 'pink',
		generator: Color.pink,
		optionStyle: gradient(Color.pink)
	},
	pinkOrange: {
		label: 'pink orange',
		generator: Color.pinkOrange,
		optionStyle: gradient(Color.pinkOrange)
	},
	bluePink: {
		label: 'bluePink',
		generator: Color.bluePink,
		optionStyle: gradient(Color.bluePink)
	}
};

module.exports = metadata;