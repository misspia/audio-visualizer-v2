import React, { Component } from 'react';
import './App.css';

import AudioMenu from './audioMenu/audioMenu.jsx';
import Player from './Player/Player.smart.jsx';
import Canvas from './canvas/canvas.smart.jsx';
import CanvasControls from './canvasControls/canvasControls.smart.jsx';

// sass --watch src
class App extends Component {
	render() {
		return <div className="col content_container">
			<div id='nav'>
				<CanvasControls />
				<AudioMenu />

			</div>
			<div id="primary_content" className="row">
				<Canvas />
			</div>
			<Player />
		</div>;
	}
}

export default App;