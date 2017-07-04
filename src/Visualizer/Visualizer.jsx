import React, { Component } from 'react';
import './Visualizer.scss';

class Visualizer extends Component {
	constructor() {
		super();
		this.state = { frequencyData: []}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.audioElement === null) return;
		this.state.frequencyData.push(nextProps.audioContext.frequencyData)
		// console.log('visualizer', nextProps.audioContext.frequencyData);
	}
	render() {
		return <li id="visualizer" ref="canvas"></li>
		// return <li>
		// 	<p>{this.props.audioContext.frequencyData} </p>
		// 	<p>{this.state.frequencyData}</p>
		// </li>
	}

};

export default Visualizer;