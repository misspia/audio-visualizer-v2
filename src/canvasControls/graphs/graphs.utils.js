const Utils = {
	maxNode: 255,
	upTo: (spaceSize, maxValue, value) => {
		return value * (spaceSize / maxValue);
	},
	withinRange: (minRange, maxRange, maxValue, value) => {
		const range = maxRange - minRange;
		const valuePercent = value / maxValue;

		return valuePercent * range + minRange;
	},
	centerCoord: (canvas) => {
		return {
			x: canvas.width / 2,
			y: canvas.height / 2
		}
	},
	degreesToRadians: (degrees) => {
		return degrees * Math.PI / 180;
	},
	// circles
	circumference: (radius) => {
		return 2 * Math.PI * radius;
	},
};

module.exports = Utils;