import React, { Component } from 'react';
import Actions from '../../actions.js';
import './colors.css';

import metadata from './colors.metadata.js';

class Colors extends Component {
	constructor() {
		super();
		this.state = { selected: ''};
	}
	componentWillMount() {
		this.selectColor(metadata.heaven);
	}
	selectColor(color) {
		Actions.selectColor(color.generator);
		this.setState({ selected: color.id})
	}
	renderOptions() {
		return Object.keys(metadata).map((colorName) => {
			const color = metadata[colorName];
			return this.renderOption(color, colorName);
		})
	}
	renderOption(color, colorName) {
		return <button key={colorName}
				className={`button secondary ${color.id === this.state.selected ? 'active' : ''}`}
				onClick={()=>{this.selectColor(color)}}
				style={color.optionStyle}>
			</button>;
	}
	render() {
		return <div className='colors'>
			{this.renderOptions()}
		</div>;
	}
};

export default Colors;