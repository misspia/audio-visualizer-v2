import React, { Component } from 'react';
// import Actions from '../../actions.js';

import './Track.scss';

class Track extends Component {
	constructor() {
		super();
		this.state = { 
			//define play state && send to store so it can be controlled in Playlist.jsx
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
	// componentWillReceiveProps(nextProps) {
	// 	console.log(this.props)
	// 	if(this.props.paused) { 
	// 		this.refs.audio.play();
	// 		this.setState({playStateIcon: "fa-pause"});
	// 	} else {
	// 		this.refs.audio.pause(); 
	// 		this.setState({playStateIcon: "fa-play"})	
	// 	}
	// 	// if(this.props.paused) { this.togglePlayState(); }
	// }
	togglePlayState() {
		// if(this.props.paused) { 
		if(this.refs.audio.paused) { this.playAudio(); /*Actions.playTrack(this.props.index);*/ }
		else { this.pauseAudio();}
	}
	playAudio() { this.refs.audio.play(); this.setState({playStateIcon: "fa-pause"})}
	pauseAudio() { this.refs.audio.pause(); this.setState({playStateIcon: "fa-play"})}
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
