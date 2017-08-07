import Color from './colorShaders.js';
import {gradient} from './colors.utils.js';

const metadata = {
	bluePink: {
		label: 'bluePink',
		generator: Color.bluePink,
		optionStyle: gradient(Color.bluePink)
	},
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
	green: {
		label: 'green',
		generator: Color.green,
		optionStyle: gradient(Color.green)
	},
	
};

module.exports = metadata;