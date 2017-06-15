import React, { Component } from 'react';
import Store from '../store.js';
import Actions from '../actions.js';

import './AudioUpload.css';


class AudioUpload extends Component {
	constructor() {
		super();
		this.state = { audioElement: [] }
		this.handleFileUpload = this.handleFileUpload.bind(this)
	}
	handleFileUpload(e) {
		const files = e.target.files;
		Actions.addFile(files);
		this.setState({ audioElement: this.createAudioElement()});
	}
	createAudioElement() {
		let audio = Store.getFiles().map( (url, index) => { return <audio key={"audio-" + index} src={url} controls autoPlay/>;})
		return audio;
	}
	render() {
		return (
			<div>
				<input type="file" accept="audio/*" onChange={this.handleFileUpload} multiple/>
				{this.state.audioElement}
			</div>
			
		);
	}
}

export default AudioUpload;