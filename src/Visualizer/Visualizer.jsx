import React, { Component } from 'react';
import './Visualizer.scss';

class Visualizer extends Component {
	constructor() {
		super();
		this.state = { GL: null, frequencyData: []}
	}
	componentDidMount() {
		this.resize();
		this.setState({ GL: this.refs.canvas.getContext('webgl', {antialias: false}) });
		// this.setState({ GL: this.refs.canvas.getContext('2d') });

	}
	componentWillReceiveProps(nextProps){
		// console.log(nextProps.frequencyByte);
		if(nextProps.frequencyByte === undefined) return;
		this.state.frequencyData.push(nextProps.frequencyByte);

	}
	resize() {
		this.refs.canvas.width = this.refs.container.clientWidth;
		this.refs.canvas.height = this.refs.container.clientHeight;
	}
	render() {
		if(this.state.GL) {
			console.log(this.state.GL);
			// this.state.GL.beginPath();
			// this.state.GL.moveTo(0,0);
			// this.state.GL.lineTo(300,150);
			// this.state.GL.stroke();
		}
		

		return <div ref="container" className="canvas_container">
			<canvas ref="canvas"></canvas>
		</div>;
		
	}

};

export default Visualizer;