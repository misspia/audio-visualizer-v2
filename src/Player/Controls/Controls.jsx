import React, { Component } from 'react';
import Actions from '../../actions.js';
import {icons} from '../../utils.js';

import './Controls.css';

class Controls extends Component {
	constructor() {
		super();
		this.state = { playStateIcon: icons.play }
		this.loopTrack = this.loopTrack.bind(this);
		this.togglePlayState = this.togglePlayState.bind(this);
		this.playNextTrack = this.playNextTrack.bind(this);
		this.playPrevTrack = this.playPrevTrack.bind(this);
		this.shufflePlaylist = this.shufflePlaylist.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.handlePlayStateIcon();
	}
	loopTrack() {
		Actions.loopTrack(this.props.track.url);
	}
	shufflePlaylist() {
		Actions.shufflePlaylist();
	}
 	playAudio() {
 		// if no src, play first / shuffle
		this.setState({playStateIcon: icons.pause});
	}
	pauseAudio() {
		 this.setState({playStateIcon: icons.play});
	}
	playNextTrack() {
		Actions.playNextTrack(this.props.track.url);
	}
	playPrevTrack() {
		Actions.playPrevTrack(this.props.track.url);
	}
	togglePlayState() {
		Actions.playTrack(this.props.track.url);
	}
	handlePlayStateIcon() {
		if(this.props.track.playing === true ) { // play
			this.playAudio();
		} else {
			this.pauseAudio();
		}
	}
	render() {
		return (
			<div className="player_controls">
				<button className={`button primary large ${this.props.shuffle ? 'active' : ''}`} onClick={this.shufflePlaylist}>
					<i className={icons.shuffle}></i>
				</button>

				<button className="button primary large" onClick={this.playPrevTrack}>
					<i className={icons.prev}></i>
				</button>
				<button className="button secondary large round" onClick={this.togglePlayState}>
					<i className={this.state.playStateIcon}></i>
				</button>
				<button className="button primary large" onClick={this.playNextTrack}>
					<i className={icons.next}></i>
				</button>
				<button className={`button primary large ${this.props.track.loop ? 'active' : ''}`}
				onClick={this.loopTrack}>
					<i className={icons.loop}></i>
				</button>
			</div>
		);
	}
}

export default Controls;