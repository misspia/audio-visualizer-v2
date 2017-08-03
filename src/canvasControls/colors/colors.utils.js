const Utils = {
	withinRange: (variant, min, max) => {
		return Math.round(variant * ( min / max ) + max - min);
	},
	gradient: (colorGenerator) => {
		const startColor = colorGenerator(0);
		const endColor = colorGenerator(255);
		return { background: `linear-gradient(-45deg, ${startColor}, ${endColor})`};
	}
}

module.exports = Utils;