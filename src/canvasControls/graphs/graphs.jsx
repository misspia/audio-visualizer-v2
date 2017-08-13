import React, { Component } from 'react';
import Actions from '../../actions.js';
import './graphs.scss';

import metadata from './graphs.metadata.js';

class Graphs extends Component {
	componentWillMount() {
		const graph = metadata.orichalcos;
		Actions.selectGraph(graph.generator, graph.context);
	}
	componentWillReceiveProps(nextProps){
		this.renderGraph(nextProps.canvas, nextProps.context, nextProps.graph, nextProps.color);
	}
	selectGraph(graph, context) {
		Actions.selectGraph(graph, context);
	}
	renderGraph(canvas, context, graph, color) {
		const ctx = canvas.getContext(context);
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
				className='button secondary'
				onClick={()=>{this.selectGraph(graph.generator, graph.context)}}>
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