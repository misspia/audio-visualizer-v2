import React, { Component } from 'react';
import Controls from './Controls/Controls.smart.jsx';
import Actions from '../actions.js';
import Utils from '../utils.js';
import './Player.scss';

class Player extends Component {
	constructor() {
		super();
		this.state = { duration: 0, progress:0}
		this.updateSeekPosition = this.updateSeekPosition.bind(this);
		this.updateAudioPosition = this.updateAudioPosition.bind(this);
		this.handleAudioEnd = this.handleAudioEnd.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		const selected = this.getCurrent(nextProps.files);

		if(!selected) return;
		if(this.props.playlist.ended === true) {this.resetSeeker(); return;}
		this.replaceSource(selected.url);
		this.handlePlayState(selected);
		this.loopCurrent(selected.loop);
	}
	componentDidUpdate() { this.getAudioDuration();	}
	playAudio() { this.refs.audio.play(); }
	pauseAudio() { this.refs.audio.pause(); }
	updateAudioPosition() {
		if(this.refs.seek) this.refs.audio.currentTime = this.refs.seek.value;
		this.refs.audio.max = this.refs.audio.duration;
	}
	updateSeekPosition(e) {
		if(this.refs.audio) this.refs.seek.value = this.refs.audio.currentTime;
		this.setState({ progress: this.refs.seek.value / this.state.duration * 100});
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
	handlePlayState(file) {
		if(file.playing === true ) { // play
			this.playAudio();
		} else {
			this.pauseAudio();
		}
	}
	handleAudioEnd() { 
		if(this.refs.audio.loop === false) Actions.playNextTrack(this.refs.audio.src);
	}
	resetSeeker() {
		this.refs.seek.value = 0; //account for  cases when loop playlist
		this.refs.seek.max = 0;
	}
	getAudioDuration() {
		if(!this.refs.audio) return;
		this.refs.audio.oncanplaythrough = ()=>{ this.setState({duration: this.refs.audio.duration}) };
	}
	render() {
		const progressStyle = { width: this.state.progress + '%'};
		const durationFormatted = Utils.secondsToHMS(this.state.duration);

		return <li className="player col space_around align_center">
			<span className="audio_title">
				{this.props.playlist.current.name  ? this.props.playlist.current.name : "Select a song"}
			</span>
			<div className="row center align_center full_width">
				<audio ref="audio" src="" onTimeUpdate={this.updateSeekPosition} 
					loop={this.props.loop} onEnded={this.handleAudioEnd}/>
				<div id="seek_container">
					<div id="seek_progress" style={progressStyle} ></div>
					<input ref="seek" type="range" step="0.1" min="0" max={this.state.duration}
						onChange={this.updateAudioPosition} />
				</div>
				<span className="audio_duration">{durationFormatted}</span>
			</div>
			<Controls/>
		</li>
	}
}

export default Player;