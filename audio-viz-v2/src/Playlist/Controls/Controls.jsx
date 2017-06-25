import React, { Component } from 'react';
import Actions from '../../actions.js';

import './Controls.scss';

class Controls extends Component {
	render() {
		return (
			<div>
				<button>
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