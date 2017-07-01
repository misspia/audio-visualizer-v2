import React, { Component } from 'react';

class Visualizer extends Component {
	componentWillReceiveProps(nextProps){
		// console.log('visualizer', nextProps);
		// let audioContext =  new (window.AudioContext || window.webkitAudioContext)();
		// let analyser = audioContext.createAnalyser();
		// https://github.com/misspia/d3-audio-visualizer/blob/master/js/visualizations/components.js
	}
	render() {
		return <li ref="canvas"></li>
	}

};

export default Visualizer;