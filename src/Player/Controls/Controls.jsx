import React, { Component } from 'react';
import Actions from '../../actions.js';
import {icons} from '../../utils.js';

import './Controls.scss';

class Controls extends Component {
	constructor() {
		super();
		this.state = { playStateIcon: icons.play }
		this.loopTrack = this.loopTrack.bind(this);
		this.togglePlayState = this.togglePlayState.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		// console.log(nextProps);
		this.handlePlayStateIcon();
	}
	loopTrack() {
		Actions.loopTrack(this.props.track.url);
	}
	playAudio() {
		this.setState({playStateIcon: icons.pause});
	}
	pauseAudio() {
		 this.setState({playStateIcon: icons.play});
	}
	handlePlayStateIcon() {
		if(this.props.track.playing === true ) { // play
			this.playAudio();
		} else {
			this.pauseAudio();
		}
	}
	togglePlayState() { 
		Actions.playTrack(this.props.track.url);
	}
	render() {
		return (
			<div className="player_controls">
				<button className={`button primary large ${this.props.shuffle ? 'active' : ''}`}>
					<i className={icons.shuffle}></i>
				</button>
				
				<button className="button primary large">
					<i className={icons.prev}></i>
				</button>
				<button className="button secondary large round" onClick={this.togglePlayState}>
					<i className={this.state.playStateIcon}></i>
				</button>
				<button className="button primary large">
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