import Utils from './colors.utils.js';

const Color = {
	pink: (variant, alpha = 1.0) => {
		const rMin = 230, rMax = 255;
		const gMin = 95, gMax = 225;
		const bMin = 110, bMax = 215;
		const rVariant = Utils.withinRange(rMin, rMax, Utils.maxRGB, variant);
		const gVariant = Utils.withinRange(gMin, gMax, Utils.maxRGB, variant);
		const bVariant = Utils.withinRange(bMin, bMax, Utils.maxRGB, variant);

		return `rgba(${rVariant}, ${gVariant}, ${bVariant}, ${alpha})`;
	},
	pinkOrange: (variant, alpha = 1.0) => {
		const gMin = 100, gMax = 230;
		const bMin = 100, bMax = 150;
		const gVariant = Utils.withinRange(gMin, gMax, Utils.maxRGB, variant);
		const bVariant = Utils.withinRange(bMin, bMax, Utils.maxRGB, variant);

		return `rgba(255, ${gVariant}, 130, ${alpha})`;
	},
	bluePink: (variant, alpha = 1.0) => {
		const rMin = 140, rMax = 255;
		const gMin = 160, gMax = 210;
		const rVariant = Utils.withinRange(rMin, rMax, Utils.maxRGB, variant);
		const gVariant = Utils.withinRange(gMin, gMax, Utils.maxRGB, variant);

		return `rgba(${rVariant}, 185, 255, ${alpha})`;
	},
	green: (variant, alpha=1.0) => {
		const rMin = 150, rMax = 255;
		const gMin = 230, gMax = 235;
		const rVariant = Utils.withinRange(rMin, rMax, Utils.maxRGB, variant);
		const gVariant = Utils.withinRange(gMin, gMax, Utils.maxRGB, variant);

		return `rgba(${rVariant}, ${gVariant}, 180, ${alpha})`;
	},
};

module.exports = Color;