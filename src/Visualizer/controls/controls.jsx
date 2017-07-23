import React, { Component } from 'react';
import './controls.scss';

import Visualizations from '../map.visualizations.js';

class Controls extends Component {
	constructor() {
		super();
		this.state = { }
	}
	componentDidMount() {


	}
	componentWillReceiveProps(nextProps){
		console.log('viz controls', nextProps);
		if(nextProps.analyser === undefined) return;
		
	}
	render() {
		return <div className="visualizer_controls">
			<button className="button secondary">bar</button>
			<button className="button secondary">line</button>
		</div>;
		
	}

};

export default Controls;