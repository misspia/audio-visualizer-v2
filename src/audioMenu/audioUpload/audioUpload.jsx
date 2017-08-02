import React, { Component } from 'react';
import Actions from '../../actions.js';
import {icons} from '../../utils.js';

import './audioUpload.scss';

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
		return <div className="input_file">
			<i className={icons.plus}></i> Upload a song
			<input type="file" accept="audio/*"
			onChange={this.handleFileUpload} multiple/>
		</div>;
	}
}

export default AudioUpload;