module.exports = {
	icons: {
		play: 'ion-ios-play',
		pause:'ion-ios-pause',
		next:'ion-ios-skipforward',
		prev:'ion-ios-skipbackward',
		loop:'ion-ios-loop-strong',
		shuffle: 'ion-ios-shuffle-strong',
		plus: 'ion-plus-round'
	},
	secondsToHMS: (seconds) => {
		const h = Math.floor(seconds / 3600);
	    const m = Math.floor(seconds % 3600 / 60);
	    const s = Math.floor(seconds % 3600 % 60);

		if(h === 0) { return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2); }
	    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
     }
};