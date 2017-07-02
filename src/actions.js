const dispatch = require('pico-flux').dispatch;

const Actions = {
	addFile: (files) => {
		dispatch('ADD_FILE', files);
	},
	playTrack: (url) => {
		dispatch('PLAY_TRACK', url);
	},
	loopTrack: (url) => {
		dispatch('LOOP_TRACK', url);
	},
	playNextTrack: (url) => {
		dispatch('PLAY_NEXT_TRACK', url);
	}, 
	playPrevTrack: (url) => {
		dispatch('PLAY_PREV_TRACK', url);
	},
	loopPlaylist: () => {
		dispatch('LOOP_PLAYLIST');
	},
	shufflePlaylist: () => {
		dispatch('SHUFFLE_PLAYLIST');
	}
}

module.exports = Actions;

// https://github.com/thalmic/opal/blob/master/tools/kona/exitPupil/pupil.store.js
// https://www.npmjs.com/package/pico-flux