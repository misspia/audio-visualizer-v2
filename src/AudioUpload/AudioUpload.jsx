import React, { Component } from 'react';
import Actions from '../actions.js';
import {icons} from '../utils.js';

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
		return <button className="button secondary longround input_file">
			<i className={icons.plus}></i> Upload a song
			<input type="file" accept="audio/*"
			onChange={this.handleFileUpload} multiple/>

		</button>;
	}
}

export default AudioUpload;