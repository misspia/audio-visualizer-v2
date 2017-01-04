import React, { Component } from 'react';
import ClockWordContainer from './ClockWordContainer';
import ClockPeriod from './ClockPeriod';

class Clock extends Component {
	constructor() {
		super();
		this.state = {
			time: [],
			hour: 0,
			minute: 0,
			minuteRounded:0
		}
	}
	round5(num) {
		return Math.round(num / 5) * 5;
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			time: this.props.time,
			hour: this.props.time[0],
			minute: this.props.time[1],
			minuteRounded: this.round5(this.state.minute)
		})
		
	}
	render() {
		return(
			<li id="clock">
				<ul className="col space-between full-width-height">
					<ClockWordContainer hour={this.state.hour} minute={this.state.minuteRounded}/>
					<ClockPeriod hour={this.state.hour}/>
				</ul>
			</li>
		)
	}	
}

export default Clock;
