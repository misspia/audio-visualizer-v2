import React, { Component } from 'react';
import Actions from '../actions.js';
import './canvasControls.scss';

import Visualizations from './map.visualizations.js';
import Metadata from './controls.metadata.js';
import Colors from './colors/colors.smart.jsx';

class Controls extends Component {
	constructor() {
		super();
		this.state = { ctx: {} }
		this.selectVisualization = this.selectVisualization.bind(this);
	}
	componentWillMount() {
		Actions.selectGraph('sun');
	}
	componentWillReceiveProps(nextProps){
		// this.setState({ ctx: this.refs.canvas.getContext('webgl') });
		this.setState({ ctx: nextProps.canvas.getContext('2d') });
		this.renderVisualization(nextProps.graph, nextProps.color);
	}
	selectVisualization(graph) {
		Actions.selectGraph(graph);
	}
	renderVisualization(graph, color) {
		Visualizations(graph, this.props.canvas, this.state.ctx, this.props.analyser, color);
	}
	renderVisualizationOptions() {
		return Object.keys(Metadata.visualizations).map((graphName) => {
			const graph = Metadata.visualizations[graphName];
			return this.renderVisualizationOption(graph, graphName);
		})
	}
	renderVisualizationOption(graph, graphName) {
		return <button key={graphName}
				className='button secondary'
				onClick={()=>{this.selectVisualization(graphName)}}>
				{graph.label}
			</button>;
	}
	render() {
		return <div className='visualizer_controls'>
			<div className='visualizations'>
				{this.renderVisualizationOptions()}
			</div>
			<Colors />
		</div>;
	}
};

export default Controls;