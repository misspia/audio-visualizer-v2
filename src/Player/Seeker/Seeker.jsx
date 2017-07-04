import React, { Component } from 'react';
import Actions from '../../actions.js';

class Seeker extends Component {
	constructor() {
		super();
		this.updateAudioPosition = this.updateAudioPosition.bind(this);
		this.updateSeekPosition = this.updateSeekPosition.bind(this);
	}
	componentWillReceiveProps() {
		this.updateSeekPosition(this.props.progress);
	}
	updateAudioPosition() {
		console.log("updating from Seeker")
		Actions.updateTrackProgress(this.refs.seek.value);
	}
	updateSeekPosition(time) {
		this.refs.seek.value = time;
	}
	render() {
		console.log(this.props.duration);
		// const progressStyle = { width: this.state.progress + '%'};
		return (
			<input ref="seek" type="range" step="0.1" min="0"
					max={this.props.duration}
					onChange={this.updateAudioPosition} />
		);
	}
}
export default Seeker;

// this.setState({ progress: this.refs.seek.value / this.state.duration * 100});

// import React, { Component } from 'react';
// import Controls from './Controls/Controls.smart.jsx';
// import Seeker from './Seeker/Seeker.smart.jsx';
// import Actions from '../actions.js';
// import Utils from '../utils.js';
// import './Player.scss';

// //progress time
// // https://dribbble.com/shots/2769913-Web-Radio-Interface

// class Player extends Component {
// 	constructor() {
// 		super();
// 		this.state = { duration: 0, progress:0, frequencyData: [], analyser: null}
// 		this.updateAudioPosition = this.updateAudioPosition.bind(this);
// 		this.updateSeekPosition = this.updateSeekPosition.bind(this);
// 		this.handleAudioEnd = this.handleAudioEnd.bind(this);
// 		this.updateAudioDuration = this.updateAudioDuration.bind(this);
// 	}
// 	componentDidMount(){
// 		let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// 		let audioElement = this.refs.audio;
// 		let audioSrc = audioCtx.createMediaElementSource(audioElement);
// 		let analyser = audioCtx.createAnalyser();
// 		audioSrc.connect(analyser);
// 		audioSrc.connect(audioCtx.destination);

// 		this.setState({analyser: analyser, frequencyData: new Uint8Array(200)});
// 	}
// 	componentWillReceiveProps(nextProps) {
// 		const selected = this.getCurrent(nextProps.files);
		
// 		if(!selected) return;
// 		if(this.props.playlist.ended === true) {this.resetSeeker(); return;}
// 		this.replaceSource(selected.url);
// 		this.handlePlayState(selected);
// 		this.loopCurrent(selected.loop);
// 		this.updateAudioPosition();
// 	}
// 	getCurrent(files) {
// 		let selected;
// 		files.forEach((file)=>{ if(file.selected) { selected = file; } });
// 		return selected;
// 	}
// 	playAudio() { this.refs.audio.play(); }
// 	pauseAudio() { this.refs.audio.pause(); }
// 	updateAudioPosition() {
// 		// if(this.refs.seek) this.refs.audio.currentTime = this.refs.seek.value;
// 		// this.refs.audio.max = this.refs.audio.duration;
// 		console.log('updating position in Player', this.props.current.progress);
// 		if(this.refs.seek) this.refs.audio.currentTime = this.props.current.progress;
// 		this.refs.audio.max = this.refs.audio.duration;
// 	}
// 	updateSeekPosition() {
// 		if(this.refs.audio) Actions.updateTrackProgress(this.refs.audio.currentTime);
// 		// this.state.analyser.getByteFrequencyData(this.state.frequencyData) // decouple with new function
// 		// Actions.updateFrequencyData(this.state.frequencyData);
// 	}
// 	loopCurrent(loopState) {
// 		if(loopState) this.refs.audio.loop = true;
// 		this.refs.audio.loop = false;
// 	}
// 	replaceSource(selectedUrl) {
// 		if(selectedUrl !== this.refs.audio.src) this.refs.audio.src = selectedUrl;
// 	}
// 	handlePlayState(file) {
// 		if(file.playing) { this.playAudio(); return;}
// 		this.pauseAudio();
// 	}
// 	handleAudioEnd() { 
// 		if(this.refs.audio.loop === false) Actions.playNextTrack(this.refs.audio.src);
// 	}
// 	resetSeeker() {
// 		Actions.updateTrackProgress(0);
// 		Actions.updateTrackDuration(0);
// 	}
// 	updateAudioDuration() {
// 		Actions.updateTrackDuration(this.refs.audio.duration);
// 	}
// 	render() {
// 		const durationFormatted = Utils.secondsToHMS(this.state.duration);

// 		return <li className="player col space_around align_center">
// 			<span className="audio_title">
// 				{this.props.current.name  ? this.props.current.name : " --- "}
// 			</span>
// 			<div className="row center align_center full_width">
// 				<audio ref="audio" src="" onTimeUpdate={this.updateSeekPosition} 
// 					loop={this.props.loop} onEnded={this.handleAudioEnd}
// 					onCanPlayThrough={this.updateAudioDuration}/>
// 				<Seeker/>
// 				<span className="audio_time">{durationFormatted}</span>
// 			</div>
// 			<Controls/>
// 		</li>
// 	}
// }

// export default Player;
