import React, { Component } from 'react';
import Actions from '../../../actions.js';
import Utils from '../../../utils.js';

import './track.css';

class Track extends Component {
	constructor() {
		super();
		this.state = { playStateIcon: Utils.icons.play , duration: "" }
		this.togglePlayState = this.togglePlayState.bind(this);
	}
	componentDidMount() {
		this.refs.audio.src = this.props.url;
		this.getTrackDuration();
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.playlistEnded === true) { this.pauseTrack(); return; }
		if(nextProps.playing === true) {
			this.playTrack();
		} else {
			this.pauseTrack();
		}
	}
	togglePlayState(e) {
		e.stopPropagation();
		Actions.playTrack(this.props.url); }
	playTrack() { this.setState({playStateIcon: Utils.icons.pause}); }
	pauseTrack() { this.setState({playStateIcon: Utils.icons.play}); }
	getTrackDuration() {
		if(!this.refs.audio) return;
		this.refs.audio.oncanplaythrough = ()=>{ this.setState({duration: Utils.secondsToHMS(this.refs.audio.duration)}) };
	}
	render() {
		return <div className={`track ${this.props.selected ? 'active': ''} row align_center`} onClick={this.togglePlayState}>
			<audio ref="audio" src=''/>
			<button className={`button primary ${this.props.playing ? 'active' : ''}`} onClick={this.togglePlayState}>
				<i className={`fa ${this.state.playStateIcon}`}></i>
			</button>
			<div className="audio_name">{this.props.name}</div>
			<span className="audio_time">{this.state.duration}</span>
		</div>;
	}
}

export default Track;