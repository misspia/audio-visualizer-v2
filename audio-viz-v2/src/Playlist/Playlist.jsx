import React, { Component } from 'react';
import Track from './Track/Track.jsx';
// import Player from './Player/Player.jsx';
import Player from './Player/Player.smart.jsx';
import './Playlist.scss';


class Playlist extends Component {
	constructor() {
		super();
		this.state = { tracks: [], audioSrc: "" , current: ""}
	}
	populateList(files) {
		let audio = files.map( (file, index) => { 
			return <Track key={index} name={file.name} src={file.url} paused={file.paused} index={index}/>
			// new Track components will not play any sound but instead
			// will have audio controls that will be interpreted in Playlist
		})
		return audio;
	}
	componentWillReceiveProps(nextProps) {
		console.log(nextProps);

		this.setState({ 
			tracks: this.populateList(nextProps.files),
			current: this.getCurrent(nextProps.files)
		});
		this.getAudioSrc(nextProps.files);
		// update central audio tag src
		// only 1 audio tag as only 1 song will be playing at a time
		// if already playing: pause
		// if not already playing: stop
	}
	getAudioSrc(files) {
		this.setState({
			audioSrc: files.forEach((file, index)=>{ if(!file.paused) return file.url; })
		}) 
	}
	getCurrent(files) {
		let selected;

		files.forEach((file)=>{
			if(file.selected) { selected = file; }
		});
		return selected;
	}
	render() {
		return (
			<ul> 
				<Player/>
				{this.state.tracks}
			</ul>
		);
			
	}
}

export default Playlist;

// {this.state.tracks}

