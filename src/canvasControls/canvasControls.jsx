import React, { Component } from 'react';
import './canvasControls.css';

import Graphs from './graphs/graphs.smart.jsx';
import Colors from './colors/colors.smart.jsx';
import {icons} from '../utils.js';

class Controls extends Component {
	constructor() {
		super();
		this.state = { open: true }
		this.toggleControls = this.toggleControls.bind(this);
	}
	toggleControls() {
		this.setState({ open: !this.state.open });
	}
	isOpen() {
		return this.state.open ? 'opened' : 'closed';
	}
	render() {
		return <div className='canvas_controls row'>
			<button className={`${icons.brush} button large secondary ${this.state.open ? 'active' : ''}`}
				onClick={this.toggleControls}
			></button>
			<div className={`container ${this.isOpen()}`}>
				<Graphs />
				<Colors />
			</div>
		</div>;
	}
};

export default Controls;