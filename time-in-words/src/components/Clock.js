import React, { Component } from 'react';

class Clock extends Component {
	constructor() {
		super();
		this.state = {}
	}
	render() {
		return(
			<li id="clock">
				<ul className="col space-around align-center full-width-height">
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</li>
		)
	}

		

}

export default Clock;
