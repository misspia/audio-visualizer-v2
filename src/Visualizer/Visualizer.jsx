import React, { Component } from 'react';
import './Visualizer.scss';

class Visualizer extends Component {
	constructor() {
		super();
		this.state = { frequencyData: []}
	}
	componentWillReceiveProps(nextProps){
		// console.log(nextProps.frequencyByte);
		if(nextProps.frequencyByte === undefined) return;
		this.state.frequencyData.push(nextProps.frequencyByte)
	}
	render() {
		// console.log(this.state.frequencyData);
		// return <li id="visualizer" ref="canvas"></li>
		return <li id="visualizer" className="row">
			<p>i is here</p>
			<p>{this.props.frequencyByte} </p>
			<p>{this.state.frequencyData}</p>
		</li>
	}

};

export default Visualizer;