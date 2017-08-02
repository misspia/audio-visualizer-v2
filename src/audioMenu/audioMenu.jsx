import React, { Component } from 'react';

import './audioMenu.scss';

import AudioUpload from './audioUpload/audioUpload.smart.jsx';
import Playlist from './playlist/playlist.smart.jsx';
import {icons} from '../utils.js';


class AudioMenu extends Component {
	constructor() {
		super();
		this.state = { open: true }
		this.toggleMenu = this.toggleMenu.bind(this);
	}
	isMenuOpen() {
		return this.state.open ? 'opened' : 'closed';
	}
	toggleMenu() {
		this.setState({ open: !this.state.open });
	}
	render() {
		return <div className="audio_menu col">
					<button className={`${icons.music} button large secondary`}
						onClick={this.toggleMenu}
					></button>
					<div className={`container_outer col ${this.isMenuOpen()}`}>
						<AudioUpload />
						<div className='container_inner'>
							
							<Playlist />
						</div>	
					</div>
				</div>;
	}
}

export default AudioMenu;