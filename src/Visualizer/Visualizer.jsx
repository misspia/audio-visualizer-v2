import React, { Component } from 'react';
import './Visualizer.scss';
// import Bar from './visualizations/bar.js';
import Line from './visualizations/line.js';

class Visualizer extends Component {
	constructor() {
		super();
		this.state = { canvas: null, ctx: null, frequencyData: null}
	}
	componentDidMount() {
		this.resize();
		// this.setState({ canvas: this.refs.canvas.getContext('webgl', {antialias: false}) });
		this.setState({ 
			canvas: this.refs.canvas,
			ctx: this.refs.canvas.getContext('2d'),
			frequencyData: new Uint8Array(200)
		});

	}
	componentWillReceiveProps(nextProps){
		if(nextProps.analyser === undefined) return;
		// Bar(this.state.canvas, this.state.ctx, this.props.analyser);
		Line(this.state.canvas, this.state.ctx, this.props.analyser);
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