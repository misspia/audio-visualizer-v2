import React, { Component } from 'react';
import AudioUpload from './AudioUpload/AudioUpload.smart.jsx';
import Playlist from './Playlist/Playlist.smart.jsx';

import './App.scss';


class App extends Component {
	render() {
		return (
			<div>
				<AudioUpload/>
				<Playlist />
			</div>			
		);
	}
}

export default App;