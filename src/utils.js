module.exports = {
	secondsToHMS: (seconds) => { 
		const h = Math.floor(seconds / 3600);
	    const m = Math.floor(seconds % 3600 / 60);
	    const s = Math.floor(seconds % 3600 % 60);
		
		if(h === 0) { return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2); }
	    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
     }
};
