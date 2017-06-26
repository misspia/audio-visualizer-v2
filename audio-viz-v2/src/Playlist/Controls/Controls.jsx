import React, { Component } from 'react';
import Actions from '../../actions.js';

import './Controls.scss';

class Controls extends Component {
	constructor() {
		super();
		this.loopPlaylist = this.loopPlaylist.bind(this);
	}
	loopPlaylist() {
		Actions.loopPlaylist();	
	}
	render() {
		return (
			<div>
				<button onClick={this.loopPlaylist}>
					<i className="fa fa-repeat" aria-hidden="true"></i>
				</button>
				<button>
					<i className="fa fa-random" aria-hidden="true"></i>
				</button>
			</div>
		);		
	}
}

export default Controls;