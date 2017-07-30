import React, { Component } from 'react';
import './Visualizer.scss';
// import GL from './webgl.js';
import Visualizations from './map.visualizations.js';

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
		Visualizations('bar', this.refs.canvas, this.state.ctx, this.props.analyser);
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
