import React, { Component } from 'react';
import Actions from '../../actions.js';
import './controls.scss';

import Visualizations from '../map.visualizations.js';
import Metadata from './controls.metadata.js';

class Controls extends Component {
	constructor() {
		super();
		this.state = { ctx: {} }
		this.selectVisualization = this.selectVisualization.bind(this);
	}
	componentWillMount() {
		Actions.selectGraph('bar')
		Actions.selectColor(Metadata.colors.pink.generator);
	}
	componentWillReceiveProps(nextProps){
		// this.setState({ ctx: this.refs.canvas.getContext('webgl') });
		this.setState({ ctx: nextProps.canvas.getContext('2d') });
		this.renderVisualization(nextProps.graph, nextProps.color);
	}
	selectVisualization(graph) {
		Actions.selectGraph(graph);
	}
	selectColor(color) {
		Actions.selectColor(color);
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
	renderColorOptions(metadata) {
		return Object.keys(Metadata.colors).map((colorName) => {
			const color = Metadata.colors[colorName];
			return this.renderColorOption(color, colorName);
		})
	}
	renderColorOption(color, colorName) {
		return <button key={colorName}
				className='button secondary'
				onClick={()=>{this.selectColor(color.generator)}}>
				{color.label}
			</button>;
	}
	render() {
		return <div className='visualizer_controls'>
			<div className='visualizations'>
				{this.renderVisualizationOptions()}
			</div>
			<div className='colors'>
				{this.renderColorOptions()}
			</div>	
		</div>;
	}
};

export default Controls;