import React, { Component } from 'react';

import './App.scss';

import AudioUpload from './AudioUpload/AudioUpload.smart.jsx';
import Playlist from './Playlist/Playlist.smart.jsx';
import Player from './Player/Player.smart.jsx';
// import Visualizer from './Visualizer/Visualizer.smart.jsx';


class App extends Component {
	componentDidMount() {

	}
	render() {
		return <div className="col content_container">
			<div id="primary_content" className="row">
				<div id="playlist_container" className="col align-center">
					<AudioUpload id="playlist_uploader"/>
					<Playlist />
				</div>

			</div>
			<Player />
		</div>;
	}
}

export default App;

// research: dj mixer
// https://you.dj/
// http://monstergodj.com/
// https://www.youtube.com/watch?v=7eZXsXjxq5g
// https://www.youtube.com/watch?v=VbWTtvLZ2XE
// https://www.youtube.com/watch?v=DqTT57Hc7xM
// https://www.youtube.com/watch?v=ceY_crXdTJU
// http://tascam.com/content/images/universal/misc/us-20x20_w_app-ai_mixer.jpg
// https://adn.harmanpro.com/product_attachments/product_attachments/3168_1468014555/ui-control_original.jpg
// http://www.pcdj.com/wp-content/uploads/2014/03/mainscreen1.png
