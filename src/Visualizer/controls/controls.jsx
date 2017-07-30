import React, { Component } from 'react';
import './controls.scss';

import Visualizations from '../map.visualizations.js';
import Metadata from './controls.metadata.js';

class Controls extends Component {
	constructor() {
		super();
		this.state = { ctx: {} }
		this.selectVisualization = this.selectVisualization.bind(this);
	}
	componentDidMount() {
		
	}
	componentWillReceiveProps(nextProps){
		// this.setState({ ctx: this.refs.canvas.getContext('webgl') });
		this.setState({ ctx: nextProps.canvas.getContext('2d') })	
	}
	selectVisualization(name) {
		Visualizations(name, this.props.canvas, this.state.ctx, this.props.analyser);
	}
	renderVisualizationOptions() {
		return Object.keys(Metadata.visualizations).map((type) => {
			const viz = Metadata.visualizations[type];
			return this.renderVisualizationOption(viz, type);
		})
	}
	renderVisualizationOption(viz, type) {
		return <button key={type}
				className='button secondary'
				onClick={()=>{this.selectVisualization(type)}}>
				{viz.label}
			</button>
	}
	render() {
		return <div className='visualizer_controls'>
			<div className='visualizations'>
				{this.renderVisualizationOptions()}
			</div>
			<div className='colors'>
				
			</div>	
		</div>;
		
	}

};

export default Controls;