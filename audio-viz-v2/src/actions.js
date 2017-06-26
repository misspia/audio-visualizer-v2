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
	}
}

module.exports = Actions;

// https://github.com/thalmic/opal/blob/master/tools/kona/exitPupil/pupil.store.js
// https://www.npmjs.com/package/pico-flux