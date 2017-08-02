import React, { Component } from 'react';

import './App.scss';

import AudioMenu from './audioMenu/audioMenu.jsx';
import Player from './Player/Player.smart.jsx';
import Visualizer from './Visualizer/Visualizer.smart.jsx';

class App extends Component {
	componentDidMount() {

	}
	render() {
		return <div className="col content_container">
			<div id="primary_content" className="row">
				<AudioMenu />
				<Visualizer />

			</div>
			<Player />
		</div>;
	}
}

export default App;
// <Playlist />