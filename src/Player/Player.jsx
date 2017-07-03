import React, { Component } from 'react';
import Controls from './Controls/Controls.smart.jsx';
import Actions from '../actions.js';
import Utils from '../utils.js';
import './Player.scss';

//progress time
// https://dribbble.com/shots/2769913-Web-Radio-Interface
//shuffle bug when same song url consecutively
// break apart component

class Player extends Component {
	constructor() {
		super();
		this.state = { duration: 0, progress:0, frequencyData: [], analyser: null}
		this.updateSeekPosition = this.updateSeekPosition.bind(this);
		this.updateAudioPosition = this.updateAudioPosition.bind(this);
		this.handleAudioEnd = this.handleAudioEnd.bind(this);
	}
	componentDidMount(){
		let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		let audioElement = this.refs.audio;
		let audioSrc = audioCtx.createMediaElementSource(audioElement);
		let analyser = audioCtx.createAnalyser();
		audioSrc.connect(analyser);
		audioSrc.connect(audioCtx.destination);

		this.setState({analyser: analyser, frequencyData: new Uint8Array(200)});
	}
	componentWillReceiveProps(nextProps) {
		const selected = this.getCurrent(nextProps.files);
		
		if(!selected) return;
		if(this.props.playlist.ended === true) {this.resetSeeker(); return;}
		this.replaceSource(selected.url);
		this.handlePlayState(selected);
		this.loopCurrent(selected.loop);
	}
	componentDidUpdate() { 
		this.getAudioDuration();
	}
	playAudio() { this.refs.audio.play(); }
	pauseAudio() { this.refs.audio.pause(); }
	updateAudioPosition() {
		if(this.refs.seek) this.refs.audio.currentTime = this.refs.seek.value;
		this.refs.audio.max = this.refs.audio.duration;
	}
	updateSeekPosition(e) {
		if(this.refs.audio) this.refs.seek.value = this.refs.audio.currentTime;
		this.setState({ progress: this.refs.seek.value / this.state.duration * 100});

		this.state.analyser.getByteFrequencyData(this.state.frequencyData) // decouple with new function
		Actions.updateFrequencyData(this.state.frequencyData);
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
				{this.props.playlist.current.name  ? this.props.playlist.current.name : " --- "}
			</span>
			<div className="row center align_center full_width">
				<audio ref="audio" src="" onTimeUpdate={this.updateSeekPosition} 
					loop={this.props.loop} onEnded={this.handleAudioEnd}/>
				<div id="seek_container">
					<div id="seek_progress" style={progressStyle} ></div>
					<input ref="seek" type="range" step="0.1" min="0" max={this.state.duration}
						onChange={this.updateAudioPosition} />
				</div>
				<span className="audio_time">{durationFormatted}</span>
			</div>
			<Controls/>
		</li>
	}
}

export default Player;