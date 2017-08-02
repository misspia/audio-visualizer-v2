import Color from './visualizations/color.js';

const metadata = {
	visualizations: {
		bar: {
			label: 'Bar',
		},
		line: {
			label: 'Line'
		},
		solidCircle: {
			label: 'beat'
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