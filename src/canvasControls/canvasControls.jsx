import React, { Component } from 'react';
import './canvasControls.scss';

import Graphs from './graphs/graphs.smart.jsx';
import Colors from './colors/colors.smart.jsx';

class Controls extends Component {
	render() {
		return <div className='visualizer_controls'>
			<Graphs />
			<Colors />
		</div>;
	}
};

export default Controls;