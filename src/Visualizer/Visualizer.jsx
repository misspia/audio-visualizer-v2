import React, { Component } from 'react';
import './Visualizer.scss';
import Bar from './visualizations/bar.js';

class Visualizer extends Component {
	constructor() {
		super();
		this.state = { canvas: null, ctx: null, frequencyData: []}
	}
	componentDidMount() {
		this.resize();
		// this.setState({ canvas: this.refs.canvas.getContext('webgl', {antialias: false}) });
		const canvas = this.refs.canvas;
		this.setState({ 
			canvas: canvas,
			ctx: canvas.getContext('2d')
		});

	}
	componentWillReceiveProps(nextProps){
		if(nextProps.frequencyByte === undefined) return;
		this.state.frequencyData.push(nextProps.frequencyByte);
		Bar(this.state.canvas, this.state.ctx, this.props.frequencyByte);
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