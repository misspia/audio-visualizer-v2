import React, { Component } from 'react';
import Actions from '../actions.js';
import './canvas.scss';

class Visualizer extends Component {
	componentDidMount() {
		Actions.setCanvas(this.refs.canvas);
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.analyser === undefined) return;
		this.resize();
	}
	resize() {
		this.refs.canvas.width = this.refs.container.clientWidth;
		this.refs.canvas.height = this.refs.container.clientHeight;
	}
	render() {
		return <div  className='canvas_outer'>
			<div ref='container' className='canvas_inner'>
				<canvas ref='canvas'></canvas>
			</div>
		</div>;
	}

};

export default Visualizer;
