const Utils = {
	maxNode: 255,
	upTo: (spaceSize, maxValue, value) => {
		return value * (spaceSize / maxValue);
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

	//color
	withinRange: (variant, min, max) => {
		return variant * ( min / max ) + max - min;
	},

};

module.exports = Utils;