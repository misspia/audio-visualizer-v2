import React, { Component } from 'react';

class Seeker extends Component {
	constructor() {
		super();
		this.updateAudioPosition = this.updateAudioPosition.bind(this);
	}
	updateAudioPosition() {
		if(this.refs.seek) this.refs.audio.currentTime = this.refs.seek.value;
	}
	updateSeekPosition(e) {
		if(this.refs.audio) this.refs.seek.value = this.refs.audio.currentTime;
	}
	render() {
		console.log(this.props.test);
		return (
			<input id="seek" ref="seek" type="range" step="0.1" min="0"
					max={this.props.max}
					onChange={this.updateAudioPosition} />
		);
	}
}
export default Seeker;