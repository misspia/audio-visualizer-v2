import React, { Component } from 'react';
import Controls from './Controls/Controls.smart.jsx';
import DurationTime from './TimeDisplay/Duration.jsx';
import ProgressTime from './TimeDisplay/Progress.jsx';
import ProgressBar from './Seeker/ProgressBar.jsx';
import Actions from '../actions.js';
import './Player.scss';

// https://dribbble.com/shots/2769913-Web-Radio-Interface
// break apart component

class Player extends Component {
	constructor() {
		super();
		this.state = { duration: 0, progress:0, frequencyData: [], analyser: null, currentTime: 0}
		this.updateSeekPosition = this.updateSeekPosition.bind(this);
		this.updateAudioPosition = this.updateAudioPosition.bind(this);
		this.handleAudioEnd = this.handleAudioEnd.bind(this);
	}
	componentDidMount(){
		const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		const audioElement = this.refs.audio;
		const audioSrc = audioCtx.createMediaElementSource(audioElement);
		const analyser = audioCtx.createAnalyser();
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
	getCurrent(files) {
		let selected;
		files.forEach((file)=>{ if(file.selected) { selected = file; } });
		return selected;
	}
	playAudio() { 
		this.refs.audio.oncanplay = () => {
			this.refs.audio.play();
		};	
	}
	pauseAudio() { this.refs.audio.pause(); }
	updateAudioPosition() {
		if(this.refs.seek) this.refs.audio.currentTime = this.refs.seek.value;
		this.refs.audio.max = this.refs.audio.duration;
	}
	updateSeekPosition(e) {
		if(this.refs.audio) this.refs.seek.value = this.refs.audio.currentTime;

		this.setState({
			progress: this.refs.seek.value / this.state.duration * 100,
			currentTime: this.refs.audio.currentTime
		});
		this.state.analyser.getByteFrequencyData(this.state.frequencyData) // decouple with new function
		Actions.updateFrequencyData(this.state.frequencyData);
	}
	loopCurrent(loopState) {
		if(loopState) { this.refs.audio.loop = true; return;}
		this.refs.audio.loop = false;
	}
	replaceSource(selectedUrl) {
		if(selectedUrl !== this.refs.audio.src) this.refs.audio.src = selectedUrl;
	}
	handlePlayState(file) {
		if(file.playing) {this.playAudio(); return;}
		this.pauseAudio();
	}
	handleAudioEnd() {
		if(this.refs.audio.loop === false) {Actions.playNextTrack(this.refs.audio.src)};
	}
	resetSeeker() {
		this.refs.seek.value = 0;
		this.refs.seek.max = 0;
	}
	getAudioDuration() {
		if(!this.refs.audio) return;
		this.refs.audio.oncanplaythrough = ()=>{ this.setState({duration: this.refs.audio.duration}) };
	}
	getCurrentTime() {
		if(this.refs.audio) return this.refs.audio.currentTime;
		return 0;
	}
	render() {
		return <li className="player col space_around align_center">
			<span className="audio_title">
				{this.props.playlist.current  ? this.props.playlist.current.name : " --- "}
			</span>
			<div className="row center align_center full_width">
				<audio ref="audio" src="" onTimeUpdate={this.updateSeekPosition}
					loop={this.props.loop} onEnded={this.handleAudioEnd}/>
				<ProgressTime progress={this.state.currentTime}/>
				<div id="seek_container">
					<ProgressBar progress={this.state.progress}/>
					<input ref="seek" type="range" step="0.1" min="0" max={this.state.duration}
						onChange={this.updateAudioPosition} />
				</div>
				<DurationTime duration={this.state.duration} 
					progress={this.state.currentTime}
					ended={this.refs.audio ? this.refs.audio.ended : false} />
			</div>
			<Controls/>
		</li>
	}
}

export default Player;