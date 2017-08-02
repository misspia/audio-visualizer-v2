import React, { Component } from 'react';
import Actions from '../../actions.js';
import './graphs.scss';

import metadata from './graphs.metadata.js';

class Graphs extends Component {
	constructor() {
		super();
		this.state = { ctx: {} }
	}
	componentWillMount() {
		Actions.selectGraph(metadata.sun.generator);
	}
	componentWillReceiveProps(nextProps){
		// this.setState({ ctx: this.refs.canvas.getContext('webgl') });
		this.setState({ ctx: nextProps.canvas.getContext('2d') });
		this.renderGraph(nextProps.graph, nextProps.color);
	}
	selectGraph(graph) {
		Actions.selectGraph(graph);
	}
	renderGraph(graph, color) {
		graph(this.props.canvas, this.state.ctx, this.props.analyser, color);
	}
 	renderOptions() {
		return Object.keys(metadata).map((graphName) => {
			const graph = metadata[graphName];
			return this.renderOption(graph, graphName);
		})
	}
	renderOption(graph, graphName) {
		return <button key={graphName}
				className='button secondary'
				onClick={()=>{this.selectGraph(graph.generator)}}>
				{graph.label}
			</button>;
	}
	render() {
		return <div className='graphs'>
			{this.renderOptions()}
		</div>;
	}
};

export default Graphs;