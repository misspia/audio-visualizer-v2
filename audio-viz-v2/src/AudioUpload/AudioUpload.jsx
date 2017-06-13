import React, { Component } from 'react';
import Store from '../store.js';
import Actions from '../actions.js';

import './AudioUpload.css';


class AudioUpload extends Component {
	constructor() {
		super();
		this.state = {
			fileBlob: [],
			audioElement: []
		}
		this.handleFileUpload = this.handleFileUpload.bind(this)
	}
	componentWillMount() {
		console.log(Store.getFiles());
	}
	handleFileUpload(e) {
		const files = e.target.files;

		this.setState(previousState => ({ fileBlob: [...previousState.fileBlob, this.createFileUrl(files)] }));
		this.setState(previousState =>({ audioElement: [...previousState.audioElement, this.createAudioElement(this.state.fileBlob)] }))
		// this.setFileBlob(files).then( (sources) => { this.setAudioElement(sources);  })
	}
	// setFileBlob(files) {
	// 	return new Promise( (resolve, reject) => {
	// 		this.setState(previousState => ({
	// 			fileBlob: [...previousState.fileBlob, this.createFileUrl(files)]
	// 		}));
	// 		resolve(this.state.fileBlob);
	// 	});	
	// }
	// setAudioElement(sources) {
	// 	this.setState(previousState =>({
	// 		audioElement: [...previousState.audioElement, this.createAudioElement(sources)]
	// 	}))
	// }
	createFileUrl(files) {
		let fileArr = [];
		for(let key in files) { 
			if(typeof files[key] === 'object') { fileArr.push( URL.createObjectURL(files[key])) }	
		};
		return fileArr;
	}
	createAudioElement(urls) {
		let audio = [];
		if(urls[0]) {
			audio = urls[0].map( (url, index) => { return <audio key={"audio-" + index} src={url} controls autoPlay/>;})
		}
		console.log(audio);
		return audio;

	}
	render() {
		return (
			<div>
				<input type="file" accept="audio/*" onChange={this.handleFileUpload} multiple/>
				{this.state.fileBlob}
				{this.state.audioElement}
				
			</div>
			
		);
	}
}

export default AudioUpload;
// {this.createAudioElement(this.state.fileBlob)}
// URL.revokeObjectURL()

// this.setState(previousState => ({
//     myArray: [...previousState.myArray, 'new value']
// }));