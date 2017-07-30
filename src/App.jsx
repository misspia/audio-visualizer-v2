import React, { Component } from 'react';

import './App.scss';

import AudioUpload from './AudioUpload/AudioUpload.smart.jsx';
import Playlist from './Playlist/Playlist.smart.jsx';
import Player from './Player/Player.smart.jsx';
import Visualizer from './Visualizer/Visualizer.smart.jsx';


class App extends Component {
	componentDidMount() {

	}
	render() {
		return <div className="col content_container">
			<div id="primary_content" className="row">
				<div className="playlist_container col">
					<AudioUpload id="playlist_uploader"/>
					<Playlist />
				</div>
				<Visualizer />

			</div>
			<Player />
		</div>;
	}
}

export default App;