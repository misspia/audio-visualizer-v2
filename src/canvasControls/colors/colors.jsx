import React, { Component } from 'react';
import Actions from '../../actions.js';
import './colors.css';

import metadata from './colors.metadata.js';

class Colors extends Component {
	componentWillMount() {
		Actions.selectColor(metadata.pink.generator);
	}
	selectColor(color) {
		Actions.selectColor(color);
	}
	renderOptions() {
		return Object.keys(metadata).map((colorName) => {
			const color = metadata[colorName];
			return this.renderOption(color, colorName);
		})
	}
	renderOption(color, colorName) {
		return <button key={colorName}
				className='button secondary'
				onClick={()=>{this.selectColor(color.generator)}}
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