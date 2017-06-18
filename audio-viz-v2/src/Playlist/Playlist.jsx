import React, { Component } from 'react';
import PlaylistItem from './PlaylistItem/PlaylistItem';

import './Playlist.scss';


class Playlist extends Component {
	constructor() {
		super();
		this.state = { playlistItem: [] }
	}
	populateList(files) {
		let audio = files.map( (file, index) => { return <PlaylistItem key={"audio-" + index} src={file.url} name={file.name}/>;})
		return audio;
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ playlistItem: this.populateList(nextProps.files)});
	}
	render() {
		return <ul> {this.state.playlistItem} </ul>;
	}
}

export default Playlist;