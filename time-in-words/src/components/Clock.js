import React, { Component } from 'react';
import ClockWords from './ClockWords';
import ClockPeriod from './ClockPeriod';

class Clock extends Component {
	constructor() {
		super();
		this.state = {
			time: [],
			hour: 0,
			minute: 0
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			time: this.props.time,
			hour: this.props.time[0],
			minute: this.props.time[1]
		})
	}
	render() {
		return(
			<li id="clock">
				<ul className="col space-between full-width-height">
					<ClockWords />
					<ClockPeriod hour={this.state.hour}/>
				</ul>
			</li>
		)
	}	
}

export default Clock;
