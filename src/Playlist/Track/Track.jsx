import React, { Component } from 'react';
import Actions from '../../actions.js';

import './Track.scss';

class Track extends Component {
	constructor() {
		super();
		this.state = { playStateIcon: "fa-play" }
		this.togglePlayState = this.togglePlayState.bind(this);
		this.loopTrack = this.loopTrack.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.playing === true) {
			this.playTrack();
		} else {
			this.pauseTrack();
		}
	}
	togglePlayState() {
		Actions.playTrack(this.props.url);
	}
	playTrack() {
		this.setState({playStateIcon: "fa-pause"});
	}
	pauseTrack() {
		 this.setState({playStateIcon: "fa-play"});
	}
	loopTrack() {
		Actions.loopTrack(this.props.url);
	}
	render() {
		return (
			<li>
				<button id="play_state" onClick={this.togglePlayState}>
					<i className={"fa " + this.state.playStateIcon} aria-hidden="true"></i>
				</button>
				<button>
					<i className="fa fa-repeat" aria-hidden="true" onClick={this.loopTrack}></i>
				</button>
				<span id="audio_name">{this.props.name}</span>
			</li>
		);
	}
}

export default Track;