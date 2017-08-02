import React, { Component } from 'react';
import Actions from '../actions.js';
import './colors.scss';

// import Metadata from './controls.metadata.js';

class Colors extends Component {
	componentWillMount() {

	}
	componentWillReceiveProps(nextProps){
		// this.setState({ ctx: this.refs.canvas.getContext('webgl') });
		// this.setState({ ctx: nextProps.canvas.getContext('2d') });
		// this.renderVisualization(nextProps.graph, nextProps.color);
	}

	render() {
		return <div className='colors'>
			color options
		</div>;
	}
};

export default Colors;