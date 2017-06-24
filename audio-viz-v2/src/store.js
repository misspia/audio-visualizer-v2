const flux = require('pico-flux');

let State = {
	files: []
};

const Store = flux.createStore({
	ADD_FILE: (files) => {
		for(let key in files) { 
			if(typeof files[key] === 'object') { 
				State.files.push({ 
					name: files[key].name,
					url: URL.createObjectURL(files[key]),
					playing: false,
					selected: false
				})
			}	
		};
	},
	PLAY_TRACK: (trackIndex) => {
		for (let i = 0; i < State.files.length; i ++) {

			let file = State.files[i];
			if(trackIndex === i && file.playing === true && file.selected === true) { // pause
				file.playing = false;
			} else if(trackIndex === i) { // play
				file.playing = true;
				file.selected = true;
			} else { // stop
				file.playing = false;
				file.selected = false;
			}
		}
	}
});

Store.getFiles = () => { return State.files; };

module.exports = Store;