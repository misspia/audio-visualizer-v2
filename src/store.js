import flux from 'pico-flux';
import Actions from './actions.js';

let State = {
	playlist: {
		loop: true,
		ended: false,
		shuffle: false,
		current: {
			file: {},
			// not being used anymore -- keep for now in case
			progress: 0,
			duration: 0
		},
	},
	files: [],
	audioContext: {}
};

const StoreUtils = {
	shuffle: {
		getRandomIndex: () => {
			const min = 0, max = State.files.length - 1;
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		pickRandUrl: () => {
			const rand = StoreUtils.shuffle.getRandomIndex();
			if(State.files[rand].url === State.playlist.current.file.url) {
				Actions.playNextTrack();
				return;
			}
			Actions.playTrack(State.files[rand].url);
			return;
		}
	}
};

const Store = flux.createStore({
	ADD_FILE: (files) => {
		for(let key in files) {
			if(typeof files[key] === 'object') {
				State.files.push({
					raw: files[key],
					name: files[key].name,
					url: URL.createObjectURL(files[key]),
					playing: false,
					selected: false,
					loop: false
				})
			}
		};
	},
	UPDATE_FREQUENCY_DATA: (data) => {
		State.audioContext.frequencyData = data;
	},
	PLAY_TRACK: (url) => {
		State.playlist.ended = false;
		State.files.forEach((file)=>{
			if(url === file.url && file.playing === true && file.selected === true) { // pause
				file.playing = false;
			} else if(url === file.url) { // play
				file.playing = true;
				file.selected = true;
				State.playlist.current.file = file;
			} else { // stop
				file.playing = false
				file.selected = false;
			}
		})
	},
	PLAY_NEXT_TRACK: (url) => {
		if(State.playlist.shuffle === true) return StoreUtils.shuffle.pickRandUrl();

		for(let i = 0; i < State.files.length; i ++) {
			if(i === State.files.length - 1 && State.playlist.loop === false) {
				State.playlist.ended = true;
				break;
			}
			if(url === State.files[i].url) {
				Actions.playTrack(State.files[(i + 1) % State.files.length].url);
				break;
			}
		}
	},
	PLAY_PREV_TRACK: (url) => {
		if(State.playlist.shuffle === true) {
			Actions.playTrack(State.files[StoreUtils.shuffle.getRandomIndex()].url);
			return;
		}
		for(let i = 0; i < State.files.length; i ++) {
			if(url === State.files[i].url && i === 0 && State.playlist.loop === true) {
				Actions.playTrack(State.files[State.files.length - 1].url);
				break;
			}
			if(url === State.files[i].url) {
				Actions.playTrack(State.files[i - 1].url);
				break;
			}
		}
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
	LOOP_PLAYLIST: () => {
		State.playlist.loop = !State.playlist.loop;
	},
	SHUFFLE_PLAYLIST: () => {
		State.playlist.shuffle = !State.playlist.shuffle;
	},
	// not being used anymore -- keep for now in case
	UPDATE_TRACK_PROGRESS: (time) => {
		State.playlist.current.progress = time;
	},
	UPDATE_TRACK_DURATION: (time) => {
		State.playlist.current.duration = time;
	}
});

Store.getTracks = () => { return State.files; };
Store.getPlaylist = () => { return State.playlist; };
Store.getAudioContext = () => { return State.audioContext; }

module.exports = Store;