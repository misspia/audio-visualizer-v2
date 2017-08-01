import Color from '../visualizations/color.js';

const metadata = {
	visualizations: {
		bar: {
			label: 'Bar',
		},
		line: {
			label: 'Line'
		},
		multiCircle: {
			label: 'circles'
		},
		sun: {
			label: 'sun'
		},
		dripping: {
			label: 'dripping'
		}
	},
	colors: {
		pink: {
			label: 'pink',
			generator: Color.pink
		},
		pinkOrange: {
			label: 'pink orange',
			generator: Color.pinkOrange
		},
		bluePink: {
			label: 'bluePink',
			generator: Color.bluePink
		}
	}
};

module.exports = metadata;