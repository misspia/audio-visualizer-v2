import React, { Component } from 'react';

import './Track.scss';

class Track extends Component {
	constructor() {
		super();
		this.state = { 
			audio: null,
			playStateIcon: "fa-play"
		}
		this.togglePlayState = this.togglePlayState.bind(this);
		this.updateSeekPosition = this.updateSeekPosition.bind(this);
		this.updateAudioPosition = this.updateAudioPosition.bind(this);
	}
	componentDidMount() {
		this.refs.audio.src = this.props.src;
	}
	togglePlayState() {
		if(this.refs.audio.paused) { 
			this.refs.audio.play();
			this.setState({playStateIcon: "fa-pause"})
		}
		else { 
			this.refs.audio.pause(); 
			this.setState({playStateIcon: "fa-play"})
		}
	}
	updateAudioPosition() { if(this.refs.seek) this.refs.audio.currentTime = this.refs.seek.value; }
	updateSeekPosition(e) { if(this.refs.audio) this.refs.seek.value = this.refs.audio.currentTime; }
	render() {
		return (
			<li>
				<audio ref="audio" onTimeUpdate={this.updateSeekPosition} />
				<button id="play_state" onClick={this.togglePlayState}>
					<i className={"fa " + this.state.playStateIcon} aria-hidden="true"></i>
				</button>
				<span id="audio_name">{this.props.name}</span>	
				<input id="seek" ref="seek" type="range" step="0.1" min="0" 
					max={this.refs.audio ? this.refs.audio.duration : 0} onChange={this.updateAudioPosition} />			
			</li>	
		);
	}
}

export default Track;
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
