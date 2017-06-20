const flux = require('pico-flux');

let State = {
	files: []
};

const Store = flux.createStore({
	ADD_FILE: (files) => {
		for(let key in files) { 
			if(typeof files[key] === 'object') { 
				State.files.push( { name: files[key].name, url: URL.createObjectURL(files[key]), paused: true} )
			}	
		};
	},
	PLAY_TRACK: (playIndex) => {
		for (let i = 0; i < State.files.length; i ++) {
			if(playIndex === i) {
				State.files[i].paused = false;
			} else {
				State.files[i].paused = true;
			}
		}
	}
});

Store.getFiles = () => { return State.files; };

module.exports = Store;