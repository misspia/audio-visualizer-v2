import React, { Component } from 'react';
import Actions from '../actions.js';
import './Player.scss';

class Player extends Component {
	constructor() {
		super();
		this.state = { playStateIcon: "fa-play", duration: 0, progress:0 }
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
	componentDidUpdate() {
		this.getAudioDuration();	
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
		this.refs.audio.max = this.refs.audio.duration;
	}
	updateSeekPosition(e) {
		if(this.refs.audio) this.refs.seek.value = this.refs.audio.currentTime;
		this.setState({ progress: this.refs.seek.value / this.refs.audio.duration * 100});
		// this.setState({ progress: this.refs.seek.value / this.refs.audio.max * 100});
		// this.setState({ progress: this.refs.seek.value});
		console.log(this.refs.seek.value, this.refs.audio.duration, this.refs.audio.max);
	}
	getCurrent(files) {
		let selected;
		files.forEach((file)=>{ if(file.selected) { selected = file; } });
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
	handleInternalPlayState() { Actions.playTrack(this.refs.audio.src); }
	handleAudioEnd() { if(this.refs.audio.loop === false) Actions.playNextTrack(this.refs.audio.src); }
	resetSeeker() {
		//account for  cases when loop playlist
		this.refs.seek.value = 0;
		this.refs.seek.max = 0;
	}
	getAudioDuration() {
		if(!this.refs.audio) return;
		this.refs.audio.oncanplaythrough = ()=>{ this.setState({duration: this.refs.audio.duration}) };
	}
	render() {
		const progressStyle = { width: this.state.progress + '%'}
		// console.log(this.state.progress)

		return <li className="player col space_around align_center">
			<div className="row center align_center full_width">
				<button className="button primary" onClick={this.handleInternalPlayState}>
					<i className={"fa " + this.state.playStateIcon} aria-hidden="true"></i>
				</button>
				<audio ref="audio" src="" onTimeUpdate={this.updateSeekPosition} loop={this.props.loop} onEnded={this.handleAudioEnd}/>
				<div id="seek_container">
					<div id="seek_progress" style={progressStyle} ></div>
					<input ref="seek" type="range" step="0.1" min="0" max={this.state.duration}
						onChange={this.updateAudioPosition} />
				</div>
				
				<span>{Math.round(this.state.duration / 60)}</span>
			</div>
			<span id="current_song_title">{this.props.playlist.current.name}</span>
		</li>
	}
}

export default Player;