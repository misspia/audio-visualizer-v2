// updateAudioPosition() { if(this.refs.seek) this.refs.audio.currentTime = this.refs.seek.value; }
// 	updateSeekPosition(e) { if(this.refs.audio) this.refs.seek.value = this.refs.audio.currentTime; }
// <input id="seek" ref="seek" type="range" step="0.1" min="0" 
// 					max={this.refs.audio ? this.refs.audio.duration : 0} onChange={this.updateAudioPosition} />	

import React, { Component } from 'react';
import Actions from '../../actions.js';

import './Player.scss';

class Track extends Component {
	playAudio() { this.refs.audio.play(); this.setState({playStateIcon: "fa-pause"})}
	pauseAudio() { this.refs.audio.pause(); this.setState({playStateIcon: "fa-play"})}
	stopAudio() { this.refs.audio.stop(); this.setState({ playStateIcon: "fa-play"})}
	// componentDidMount() {
	// 	this.refs.audio.src = this.props.src;
	// }
	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		this.refs.audio.src = this.getCurrent(nextProps.files);
		
		// if(this.props.playing) { this.playAudio();} 
		// if(!this.props.playing && this.props.selected ) { this.pauseAudio(); }
		// if(!this.props.playing && !this.props.selected ) { this.stopAudio(); }

	}
	getCurrent(files) {
		let selected;

		files.forEach((file)=>{
			if(file.selected) { selected = file.url }
		});
		return selected;
	}
	render() {
		return (
			<audio ref="audio" src="" autoPlay controls/>
		);
		
	}


}

export default Track;

// this.updateSeekPosition = this.updateSeekPosition.bind(this);
// 		this.updateAudioPosition = this.updateAudioPosition.bind(this);