import React, { Component } from 'react';
import Track from './Track/Track';

import './Playlist.scss';


class Playlist extends Component {
	constructor() {
		super();
		this.state = { tracks: [] }
	}
	populateList(files) {
		let audio = files.map( (file, index) => { 
			// console.log(file);
			return <Track key={"audio-" + index} src={file.url} name={file.name} paused={file.paused} index={index}/>;
		})
		return audio;
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ tracks: this.populateList(nextProps.files)});
	}
	render() {
		// console.log(this.state.tracks);
		return <ul> {this.state.tracks} </ul>;
	}
}

export default Playlist;