import React, { Component } from 'react';

class ClockPeriod extends Component {
	constructor() {
		super();
		this.state = {
			hour: null,
			periods: { am: false,  pm: false },
			displayPeriods: []
		}
	}
	determinePeriod() {
		if(this.state.hour < 12) {	
			this.setState({

				periods: { am: true,  pm: false }
			})
		} else {
			this.setState({

				periods: { am: false, pm: true }
			})

		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			hour: this.props.hour,
			displayPeriods: []
		})

		this.determinePeriod(this.state.hour);	
	}
	render() {
		return (
			<li className="row center align-center periods">
				<span className={ this.state.periods.am ? 'active' : ''}> am</span>
				<span className={ this.state.periods.pm ? 'active' : ''}> pm</span>
			</li>
		)
	}
}

export default ClockPeriod;