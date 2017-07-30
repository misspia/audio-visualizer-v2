const Utils = {
	maxNode: 255,
	upTo: (spaceSize, maxValue, value) => {
		return value * (spaceSize / maxValue);
	},
};

module.exports = Utils;