import React, { Component } from 'react';
// import Seeker from './Seeker/Seeker.jsx';
import Actions from '../actions.js';

import './Player.scss';

class Player extends Component {
	constructor() {
		super();
		this.state = { playStateIcon: "fa-play" }
		this.handleInternalPlayState = this.handleInternalPlayState.bind(this);
		this.updateSeekPosition = this.updateSeekPosition.bind(this);
		this.updateAudioPosition = this.updateAudioPosition.bind(this);
		this.handleAudioEnd = this.handleAudioEnd.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		const selected = this.getCurrent(nextProps.files);

		if(!selected) return;
		if(this.props.playlist.ended === true) {this.resetSeeker(); return;}
		this.replaceSource(selected.url);
		this.handleExternalPlayState(selected);
		this.loopCurrent(selected.loop);
	}
	playAudio() {
		this.refs.audio.play();
		this.setState({playStateIcon: "fa-pause"});
	}
	pauseAudio() {
		 this.refs.audio.pause();
		 this.setState({playStateIcon: "fa-play"});
	}
	updateAudioPosition() {
		if(this.refs.seek) this.refs.audio.currentTime = this.refs.seek.value;
	}
	updateSeekPosition(e) {
		if(this.refs.audio) this.refs.seek.value = this.refs.audio.currentTime;
		if(this.refs.audio) this.refs.seekTest.test = this.refs.audio.currentTime;
	}
	getCurrent(files) {
		let selected;

		files.forEach((file)=>{
			if(file.selected) { selected = file; }
		});
		return selected;
	}
	loopCurrent(loopState) {
		if(loopState) {
			this.refs.audio.loop = true;
		} else {
			this.refs.audio.loop = false;
		}
	}
	replaceSource(selectedUrl) {
		if(selectedUrl !== this.refs.audio.src) this.refs.audio.src = selectedUrl;
	}
	handleExternalPlayState(file) {
		if(file.playing === true ) { // play
			this.playAudio();
		} else {
			this.pauseAudio();
		}
	}
	handleInternalPlayState() {
		Actions.playTrack(this.refs.audio.src);
	}
	handleAudioEnd() {
		if(this.refs.audio.loop === false) Actions.playNextTrack(this.refs.audio.src);
	}
	resetSeeker() {
		//account for  cases when loop playlist
		this.refs.seek.value = 0;
		this.refs.seek.max = 0;
	}
	render() {
		return (
			<li>
				<button id="play_state" onClick={this.handleInternalPlayState}>
					<i className={"fa " + this.state.playStateIcon} aria-hidden="true"></i>
				</button>
				<audio ref="audio" src="" onTimeUpdate={this.updateSeekPosition} loop={this.props.loop} onEnded={this.handleAudioEnd}/>
				<input id="seek" ref="seek" type="range" step="0.1" min="0"
					max={this.refs.audio ? this.refs.audio.duration : 0}
					onChange={this.updateAudioPosition} />
			</li>

		);
	}
}

export default Player;
// <Seeker ref="seekTest" max={this.refs.audio ? this.refs.audio.duration : 0}/>