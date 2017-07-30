import React, { Component } from 'react';
import './Visualizer.scss';
// import Bar from './visualizations/bar.js';
// import Line from './visualizations/line.js';
// import MultiCircle from './visualizations/multiCircle.js';
import SunBars from './visualizations/sunBars.js'; 
// import GL from './webgl.js';

class Visualizer extends Component {
	constructor() {
		super();
		this.state = { ctx: {} }
	}
	componentDidMount() {
		this.resize();
		// this.setState({ ctx: this.refs.canvas.getContext('webgl') });
		this.setState({ ctx: this.refs.canvas.getContext('2d') });

		// GL(ctx);

	}
	componentWillReceiveProps(nextProps){
		if(nextProps.analyser === undefined) return;
		// Bar(this.refs.canvas, this.state.ctx, this.props.analyser);
		// Line(this.refs.canvas, this.state.ctx, this.props.analyser);
		// MultiCircle(this.refs.canvas, this.state.ctx, this.props.analyser);
		SunBars(this.refs.canvas, this.state.ctx, this.props.analyser);

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
