import React, { Component } from 'react';
import Actions from '../../actions.js';

import './Track.scss';

class Track extends Component {
	constructor() {
		super();
		this.state = { playStateIcon: "fa-play" }
		this.togglePlayState = this.togglePlayState.bind(this);
	}	
	togglePlayState() {
		Actions.playTrack(this.props.index);
	}
	render() {
		return (
			<li>
				<button id="play_state" onClick={this.togglePlayState}>
					<i className={"fa " + this.state.playStateIcon} aria-hidden="true"></i>
				</button>
				<span id="audio_name">{this.props.name}</span>			
			</li>	
		);
	}
}

export default Track;