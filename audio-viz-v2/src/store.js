import flux from 'pico-flux';
import Actions from './actions.js';

let State = {
	playlist: {
		loop: false
	},
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
					loop: false,
					ended: false
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
	},
	LOOP_TRACK: (url) => {
		State.files.forEach((file)=>{
			if(url === file.url && file.loop === false) {
				file.loop = true;
			} else {
				file.loop = false;
			}
		})
	},
	PLAY_NEXT_TRACK: (url) => {
		for(let i = 0; i < State.files.length; i ++) {
			if(i === State.files.length - 1 && State.playlist.loop === false) { 
				Actions.stopAllTracks();
				break;
			}
			if(i === State.files.length - 1 && State.playlist.loop === true) {
				Actions.playTrack(State.files[0].url);
				break;
			}	
			if(url === State.files[i].url) {
				Actions.playTrack(State.files[i + 1].url);
				break;
			}
		}
	},
	LOOP_PLAYLIST: () => {
		State.playlist.loop = !State.playlist.loop;
	},
	STOP_ALL_TRACKS: () => {
		State.files.forEach((file)=>{
			file.selected = false;
			file.playing = false;
		})
	}
});

Store.getFiles = () => { return State.files; };

module.exports = Store;