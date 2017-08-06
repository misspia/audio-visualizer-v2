import Utils from './colors.utils.js';

const Color = {
	pink: (variant, alpha = 1.0) => {
		const max = 210, min = 160;
		const gVariant = Utils.withinRange(variant, min, max);

		return `rgba(255, ${gVariant}, 220, ${alpha})`;
	},
	pinkOrange: (variant, alpha = 1.0) => {
		const max = 175, min = 100;
		const gVariant = Utils.withinRange(variant, min, max);

		return `rgba(255, ${gVariant}, 150, ${alpha})`;
	},
	bluePink: (variant, alpha = 1.0) => {
		const max = 255, min = 150;
		const rVariant = Utils.withinRange(variant, min, max);

		return `rgba(${rVariant}, 185, 255, ${alpha})`;
	},
	green: (variant, alpha=1.0) => {
		const max = 210, min = 100;
		const rVariant = Utils.withinRange(variant, min, max);

		return `rgba(${rVariant}, 245, 170, ${alpha})`
	}
};

module.exports = Color;