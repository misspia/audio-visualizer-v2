import React, { Component } from 'react';
import Actions from '../actions.js';
import './Visualizer.scss';
// import GL from './webgl.js';
import Controls from './controls/controls.smart.jsx';

class Visualizer extends Component {
	componentDidMount() {
		Actions.setCanvas(this.refs.canvas);
		// GL(ctx);
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
			<Controls />
			<div ref='container' className='canvas_inner'>
				<canvas ref='canvas'></canvas>
			</div>
		</div>;
	}

};

export default Visualizer;
