import React, { Component } from 'react';
import './AudioUpload.css';

class AudioUpload extends Component {
	constructor() {
		super();
		this.state = {
			fileBlob: null,

		}
		this.handleFileUpload = this.handleFileUpload.bind(this)
	}
	handleFileUpload(e) {
		const files = e.target.files;
		console.log(files)
		this.setState({ fileBlob:  this.createFileUrl(files) });
		// this.setState(previousState => ({
		// 	fileBlob: [...previousState.fileBlob, createFileUrl(files)]
		// }));
	}
	createFileUrl(files) {
		const fileArr = [];
		for(let key in files) { 
			if(typeof files[key] === 'object') { fileArr.push( URL.createObjectURL(files[key])) }	
		};
		return fileArr;
	}
	render() {
		return (
			<div>
				<audio src={this.state.fileBlob} controls autoPlay/>
				<input type="file" accept="audio/*" onChange={this.handleFileUpload} multiple/>
			</div>
			
		);
	}
}

export default AudioUpload;




// this.setState(previousState => ({
//     myArray: [...previousState.myArray, 'new value']
// }));