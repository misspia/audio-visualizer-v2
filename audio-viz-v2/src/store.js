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
					selected: false,
					loop: false
				})
			}	
		};
	},
	PLAY_TRACK: (url) => {
		State.files.forEach((file)=>{
			if(url === file.url && file.playing === true && file.selected === true) { // pause
				file.playing = false;
			} else if(url === file.url) { // play
				file.playing = true;
				file.selected = true;
			} else { // stop
				file.playing = false
				file.selected = false;
			}
		})
	}
});

Store.getFiles = () => { return State.files; };

module.exports = Store;