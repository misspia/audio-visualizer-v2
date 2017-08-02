import React, { Component } from 'react';
import './canvasControls.scss';

import Graphs from './graphs/graphs.smart.jsx';
import Colors from './colors/colors.smart.jsx';
import {icons} from '../utils.js';

class Controls extends Component {
	constructor() {
		super();
		this.state = { reveal: true }
	}
	toggleControle() {
		this.setState({ reveal: !this.state.reveal });
	}
	isRevealed() {
		return this.state.reveal ? '' : 'hidden';
	}
	render() {
		return <div className='canvas_controls'>
			<button className={`${icons.brush} button large secondary`}
				onClick={this.toggleControls}
			></button>
			<div className='container'>
				<Graphs />
				<Colors />
			</div>
		</div>;
	}
};

export default Controls;