const dispatch = require('pico-flux').dispatch;

const Actions = {

	// audio handling
	addFile: (files) => {
		dispatch('ADD_FILE', files);
	},
	updateAnalyser: (data) => {
		dispatch('UPDATE_ANALYSER', data);
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
	},	

	//visualizer
	setCanvas: (canvas) => {
		dispatch('SET_CANVAS', canvas);
	},
	selectGraph: (graph) => {
		dispatch('SELECT_GRAPH', graph);
	},
	selectColor: (color) => {
		dispatch('SELECT_COLOR', color);
	},
	

}

module.exports = Actions;