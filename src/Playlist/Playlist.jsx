import React, { Component } from 'react';
import Track from './Track/Track.jsx';
import Controls from './Controls/Controls.jsx';
import './Playlist.scss';


class Playlist extends Component {
	constructor() {
		super();
		this.state = { tracks: [], audioSrc: "" , current: ""}
	}
	populateList(files) {
		let audio = files.map( (file, index) => {
			return <Track key={index} name={file.name} url={file.url} 
					playing={file.playing} selected={file.selected}
					loop={file.loop}
					playlistEnded={this.props.playlist.ended}/>
		})
		return audio;
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ tracks: this.populateList(nextProps.files) });
	}
	render() {
		return (
			<ul id="playlist">
				<Controls />
				{this.state.tracks}
			</ul>
		);
	}
}

export default Playlist;

// https://dribbble.com/shots/1114707-FREE-PSDs-iGravertical-Screen-Layers-iOS-7-Screen-Converter

