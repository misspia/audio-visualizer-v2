// import React, { Component } from 'react';
// import Track from './Track/Track';

// import './Playlist.scss';


// class Playlist extends Component {
// 	constructor() {
// 		super();
// 		this.state = { tracks: [] }
// 	}
// 	populateList(files) {
// 		let audio = files.map( (file, index) => { 
// 			// console.log(file);
// 			return <Track key={"audio-" + index} src={file.url} name={file.name} paused={file.paused} index={index}/>;
// 		})
// 		return audio;
// 	}
// 	componentWillReceiveProps(nextProps) {
// 		this.setState({ tracks: this.populateList(nextProps.files)});
// 	}
// 	render() {
// 		// console.log(this.state.tracks);
// 		return <ul> {this.state.tracks} </ul>;
// 	}
// }

// export default Playlist;

import React, { Component } from 'react';

import './Playlist.scss';


class Playlist extends Component {
	constructor() {
		super();
		this.state = { tracks: [] }
	}
	populateList(files) {
		let audio = files.map( (file, index) => { 
			// console.log(file);
			// new Track components will not play any sound but instead
			// will have audio controls that will be interpreted in Playlist
		})
		return audio;
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ tracks: this.populateList(nextProps.files)});
		// update central audio tag src
		// only 1 audio tag as only 1 song will be playing at a time
		// if already playing: pause
		// if not already playing: stop
	}
	render() {
		// console.log(this.state.tracks);
		return <ul> {this.state.tracks} </ul>;
	}
}

export default Playlist;


