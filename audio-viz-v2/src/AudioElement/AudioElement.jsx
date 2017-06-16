import React, { Component } from 'react';
import Store from '../store.js';
import Actions from '../actions.js';

import './AudioElement.scss';


class AudioElement extends Component {
	constructor() {
		super();
	}
	createAudioElement() {
		let audio = Store.getFiles().map( (url, index) => { return <audio key={"audio-" + index} src={url} controls autoPlay/>;})
		// let audio = this.props.files.map( (url, index) => { return <audio key={"audio-" + index} src={url} controls autoPlay/>;})
		return audio;
	}
	render() {
		return (

		);
	}
}

export default AudioElement;