import React, { Component } from 'react';
import Actions from '../../actions.js';
import {icons} from '../../utils.js';

import './audioUpload.css';

class AudioUpload extends Component {
	constructor() {
		super();
		this.handleFileUpload = this.handleFileUpload.bind(this)
	}

	componentDidMount() {
		var xhr = new XMLHttpRequest();
		const that = this;
		xhr.addEventListener('progress', function(e) {
		    if (e.lengthComputable) {
		        var percentComplete = e.loaded / e.total;
		        console.log('Downloading: ' + percentComplete + '%');
		    }
		});

		xhr.addEventListener('load', function(blob) {
		    if (xhr.status == 200) {
						var theBlob = xhr.response;
						theBlob.lastModifiedDate = new Date();
						theBlob.name = "Skyrim 8-bit.mp3";
						const files = [theBlob];
						console.log(files)
						Actions.addFile(files)
		        //audioLink.src = window.URL.createObjectURL(xhr.response);
		    }
		});

		xhr.open('GET', '/assets/skyrim-8bit.mp3');
		xhr.responseType = 'blob';
		xhr.send(null);




	}
	handleFileUpload(e) {
		const files = e.target.files;
		console.log(files)
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
