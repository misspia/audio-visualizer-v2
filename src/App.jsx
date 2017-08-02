import React, { Component } from 'react';

import './App.scss';

import AudioMenu from './audioMenu/audioMenu.jsx';
import Player from './Player/Player.smart.jsx';
import Canvas from './canvas/canvas.smart.jsx';
import CanvasControls from './canvasControls/canvasControls.smart.jsx';

class App extends Component {
	componentDidMount() {

	}
	render() {
		return <div className="col content_container">
			<div id="primary_content" className="row">
				<AudioMenu />
				<CanvasControls />
				<Canvas />
			</div>
			<Player />
		</div>;
	}
}

export default App;