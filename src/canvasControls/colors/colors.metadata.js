import Color from './colorShaders.js';
import {gradient} from './colors.utils.js';

const metadata = {
	bluePink: {
		id: 'bluePink',
		generator: Color.bluePink,
		optionStyle: gradient(Color.bluePink)
	},
	pink: {
		id: 'pink',
		generator: Color.pink,
		optionStyle: gradient(Color.pink)
	},
	pinkOrange: {
		id: 'pink orange',
		generator: Color.pinkOrange,
		optionStyle: gradient(Color.pinkOrange)
	},
	heaven: {
		id: 'heaven',
		generator: Color.heaven,
		optionStyle: gradient(Color.heaven)
	},
	
};

module.exports = metadata;