const dispatch = require('pico-flux').dispatch;

const Actions = {
	addFile: (files) => {
		dispatch('ADD_FILE', files);
	},
	playTrack: (index) => {
		dispatch('PLAY_TRACK', index);
	}
}

module.exports = Actions;

// https://github.com/thalmic/opal/blob/master/tools/kona/exitPupil/pupil.store.js
// https://www.npmjs.com/package/pico-flux