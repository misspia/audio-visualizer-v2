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
	newColorAlpha: (rgba, alpha) => {
		const newColor = rgba.replace(/[^,]+(?=\))/, alpha);
		return newColor;
	},
	distance: (begin={}, end={}) => {
		const deltaX = begin.x - end.x;
		const deltaY = end.x - end.y;

		return Math.sqrt( deltaX + deltaY );
	},
	// circles
	circumference: (radius) => {
		return 2 * Math.PI * radius;
	},
	circleCoord: (centerCoord, radius, angle) => {
		const radians = Utils.degreesToRadians(angle);

		return {
			x: centerCoord.x + radius *  Math.cos(-radians),
			y: centerCoord.y + radius * Math.sin(-radians),
		}
	},
};

module.exports = Utils;