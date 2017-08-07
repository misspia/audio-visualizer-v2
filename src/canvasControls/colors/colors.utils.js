const Utils = {
	maxRGB: 255,
	withinRange: (minRange, maxRange, maxValue, variant) => {
		const range = maxRange - minRange;
		const variantPercent = variant / maxValue;

		return Math.round(variantPercent * range + minRange);
	},
	gradient: (colorGenerator) => {
		const startColor = colorGenerator(0);
		const endColor = colorGenerator(255);
		return { background: `linear-gradient(-45deg, ${startColor}, ${endColor})`};
	}
}

module.exports = Utils;