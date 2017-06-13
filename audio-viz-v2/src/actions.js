const dispatch = require('pico-flux').dispatch;

const Actions = {
	addFile: (files) => {
		dispatch('ADD_FILE', files);
	}
}

module.exports = Actions;