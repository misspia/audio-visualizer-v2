import Utils from '../visualizer.utils.js';

const Color = {
	pink: (variant) => {
		const max = 210, min = 160;
		const gVariant = Utils.withinRange(variant, min, max);

		return `rgba(255, ${gVariant}, 220, 1.0)`;
	},
	pinkOrange: (variant) => {
		const max = 175, min = 100;
		const gVariant = Utils.withinRange(variant, min, max);

		return `rgba(255, ${gVariant}, 150, 1.0)`;
	},
	bluePink: (variant) => {
		const max = 255, min = 150;
		const rVariant = Utils.withinRange(variant, min, max);

		return `rgba(${rVariant}, 185, 255, 1.0)`;
	},
};

module.exports = Color;