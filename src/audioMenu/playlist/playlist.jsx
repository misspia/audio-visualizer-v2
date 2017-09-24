import React, { Component } from 'react';
import Track from './track/track.jsx';
import './playlist.css';

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
		return <div className='playlist'>
				{this.state.tracks}
			</div>;
	}
}

export default Playlist;

