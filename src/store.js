import flux from 'pico-flux';
import jsmediatags from 'jsmediatags';
import Actions from './actions.js';

let State = {
	playlist: {
		loop: false,
		ended: false
	},
	files: []
};

const Store = flux.createStore({
	ADD_FILE: (files) => {
		for(let key in files) {
			if(typeof files[key] === 'object') {
				const url = URL.createObjectURL(files[key]);
				jsmediatags.read(url, {
				  onSuccess: function(tag) {
				    console.log(tag);
				  },
				  onError: function(error) {
				    console.log(error);
				  }
				});
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
				console.log("last track");
				// Actions.stopAllTracks();
				State.playlist.ended = true;
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
Store.getPlaylistSettings = () => { return State.playlist; }

module.exports = Store;