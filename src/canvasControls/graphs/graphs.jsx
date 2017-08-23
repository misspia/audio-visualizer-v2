import React, { Component } from 'react';
import Actions from '../../actions.js';
import './graphs.css';

import metadata from './graphs.metadata.js';

class Graphs extends Component {
	constructor() {
		super();
		this.state = { selected: ''};
	}
	componentWillMount() {
		this.selectGraph(metadata.tenseigan);
	}
	componentWillReceiveProps(nextProps){
		this.renderGraph(nextProps.canvas, nextProps.graph, nextProps.color);
	}
	selectGraph(graph) {
		Actions.selectGraph(graph.generator);
		this.setState({selected: graph.label})
	}
	renderGraph(canvas, graph, color) {
		// const ctx = canvas.getContext('webgl');
		const ctx = canvas.getContext('2d');
		graph(this.props.canvas, ctx, this.props.analyser, color);
	}
 	renderOptions() {
		return Object.keys(metadata).map((graphName) => {
			const graph = metadata[graphName];
			return this.renderOption(graph, graphName);
		})
	}
	renderOption(graph, graphName) {
		return <button key={graphName}
				className={`button secondary ${graph.label == this.state.selected ? 'active' : ''}`}
				onClick={()=>{this.selectGraph(graph)}}>
				<i className={graph.icon}></i>

			</button>;
	}
	render() {
		return <div className='graphs'>
			{this.renderOptions()}
		</div>;
	}
};

export default Graphs;