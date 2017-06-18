import React, { Component } from 'react';
// import Actions from '../actions.js';

import './PlaylistItem.scss';


class PlaylistItem extends Component {
	render() {
		console.log(this.props)
		return (
			<li>
				<span id="play_state">hi</span>
				<span id="audio_name">{this.props.name}</span>
				<audio src={this.props.src} controls autoPlay/>

			</li>	
		);
	}
}

export default PlaylistItem;