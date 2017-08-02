import Color from './colorShaders.js';

const gradient = (colorGenerator) => {
	const startColor = colorGenerator(0);
	const endColor = colorGenerator(255);
	return { background: `linear-gradient(-45deg, ${startColor}, ${endColor})`};
};

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