import React, { Component } from 'react';
import Actions from '../../actions.js';
import './colors.scss';

import metadata from './colors.metadata.js';

class Colors extends Component {
	componentWillMount() {
		Actions.selectColor(metadata.pink.generator);
	}
	selectColor(color) {
		Actions.selectColor(color);
	}
	renderColorOptions() {
		return Object.keys(metadata).map((colorName) => {
			const color = metadata[colorName];
			return this.renderColorOption(color, colorName);
		})
	}
	renderColorOption(color, colorName) {
		return <button key={colorName}
				className='button secondary'
				onClick={()=>{this.selectColor(color.generator)}}>
				{color.label}
			</button>;
	}
	render() {
		return <div className='colors'>
			{this.renderColorOptions()}
		</div>;
	}
};

export default Colors;