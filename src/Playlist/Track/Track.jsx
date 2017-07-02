import React, { Component } from 'react';
import Actions from '../../actions.js';
import Utils from '../../utils.js';

import './Track.scss';

class Track extends Component {
	constructor() {
		super();
		this.state = { playStateIcon: "fa-play", duration: "" }
		this.togglePlayState = this.togglePlayState.bind(this);
		this.loopTrack = this.loopTrack.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.playlistEnded === true) { this.pauseTrack(); return; }
		if(nextProps.playing === true) {
			this.playTrack();
		} else {
			this.pauseTrack();
		}
		this.refs.audio.src = nextProps.url;
		this.getTrackDuration();
	}
	togglePlayState(e) { 
		e.stopPropagation();
		Actions.playTrack(this.props.url); }
	playTrack() { this.setState({playStateIcon: "fa-pause"}); }
	pauseTrack() { this.setState({playStateIcon: "fa-play"}); }
	loopTrack() { Actions.loopTrack(this.props.url); }
	getTrackDuration() {
		if(!this.refs.audio) return;
		this.refs.audio.oncanplaythrough = ()=>{ this.setState({duration: Utils.secondsToHMS(this.refs.audio.duration)}) };
	}
	render() {
		return <li className={`track ${this.props.selected ? 'active': ''} row align_center`} onClick={this.togglePlayState}>
			<audio ref="audio" />
			<button className={`button primary ${this.props.playing ? 'active' : ''}`} onClick={this.togglePlayState}>
				<i className={`fa ${this.state.playStateIcon}`} aria-hidden="true"></i>
			</button>
			<button className={`button primary ${this.props.loop ? 'active' : ''}`}>
				<i className="fa fa-repeat" aria-hidden="true" onClick={this.loopTrack}></i>
			</button>
			<span className="audio_name">{this.props.name}</span>
			<span className="audio_time">{this.state.duration}</span>
		</li>;
	}
}

export default Track;