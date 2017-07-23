import React, { Component } from 'react';
import Actions from '../actions.js';
import './Visualizer.scss';
// import Bar from './visualizations/bar.js';
import Line from './visualizations/line.js';
// import MultiCircle from './visualizations/multiCircle.js';
// import Visualizations from './map.visualizations.js';

class Visualizer extends Component {
	componentDidMount() {
		this.resize();
		// this.setState({ canvas: this.refs.canvas.getContext('webgl', {antialias: false}) });

		const canvas = this.refs.canvas;
		const ctx = this.refs.canvas.getContext('2d');
		const frequencyData = new Uint8Array(200);
		Actions.setCanvas(canvas, ctx, frequencyData);

	}
	componentWillReceiveProps(nextProps){
		if(nextProps.analyser === undefined) return;
		// Bar(this.props.canvas, this.props.ctx, this.props.analyser);
		Line(this.props.canvas, this.props.ctx, this.props.analyser);
		// MultiCircle(this.props.canvas, this.props.ctx, this.props.analyser);
		// Visualizations(this.props.canvas, this.props.ctx, this.props.analyser, "bar")
	}
	resize() {
		this.refs.canvas.width = this.refs.container.clientWidth;
		this.refs.canvas.height = this.refs.container.clientHeight;
	}
	render() {
		return <div ref="container" className="canvas_container">
			<canvas ref="canvas"></canvas>
		</div>;
		
	}

};

export default Visualizer;