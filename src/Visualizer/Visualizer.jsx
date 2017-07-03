import React, { Component } from 'react';

class Visualizer extends Component {
	componentWillReceiveProps(nextProps){
		if(nextProps.audioElement === null) return;
		console.log('visualizer', nextProps.audioContext.frequencyData);
	}
	render() {
		return <li ref="canvas"></li>
	}

};

export default Visualizer;