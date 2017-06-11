import React, { Component } from 'react';
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
	handleFileUpload(e) {
		const files = e.target.files;
		// this.setState({ fileBlob:  this.createFileUrl(files) });
		this.setState(previousState => ({
			fileBlob: [...previousState.fileBlob, this.createFileUrl(files)]
		}));
	}
	createFileUrl(files) {
		let fileArr = [];
		for(let key in files) { 
			if(typeof files[key] === 'object') { fileArr.push( URL.createObjectURL(files[key])) }	
		};
		return fileArr;
	}
	createAudioElement(urls) {
		let audio = [];
		console.log(urls)
		if(urls[0]) {
			audio = urls[0].map( (url, index) => {
				return <audio key={"audio-" + index} src={url} controls autoPlay/>;		
			})
		}
		return audio;

	}
	render() {
		return (
			<div>
				<input type="file" accept="audio/*" onChange={this.handleFileUpload} multiple/>
				
				<audio src={this.state.fileBlob[0]} controls autoPlay/>
				{this.state.fileBlob}
				{this.createAudioElement(this.state.fileBlob)}
			</div>
			
		);
	}
}

export default AudioUpload;


// this.setState(previousState => ({
//     myArray: [...previousState.myArray, 'new value']
// }));