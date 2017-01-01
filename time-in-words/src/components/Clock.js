import React, { Component } from 'react';

class Clock extends Component {
	constructor() {
		super();
		this.state = {time: []}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			time: this.props.time.join(':')
		})
	}
	render() {
		return(
			<li id="clock">
				<ul className="col space-around align-center full-width-height">
					<li>{this.state.time} </li>
				</ul>
			</li>
		)
	}	
}

export default Clock;
