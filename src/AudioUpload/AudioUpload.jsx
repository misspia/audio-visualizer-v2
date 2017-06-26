import React, { Component } from 'react';
import Actions from '../actions.js';

import './AudioUpload.scss';

class AudioUpload extends Component {
	constructor() {
		super();
		this.handleFileUpload = this.handleFileUpload.bind(this)
	}
	handleFileUpload(e) {
		const files = e.target.files;
		Actions.addFile(files);
	}
	render() {
		return <input type="file" accept="audio/*" onChange={this.handleFileUpload} multiple/>;
	}
}

export default AudioUpload;