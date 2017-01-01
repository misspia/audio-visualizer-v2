import React, {Component} from 'react';

class Ticker extends Component {
	constructor() {
		super();
		this.state = {time: ''}
	}
	componentWillReceiveProps(nextProps) {
		const time = this.props.time;
		var displayTime = [];
		
		displayTime = time.map(function(num) {
			num = num.toString();
			num = ('0' + num).slice(-2);

			return num;
		})

		this.setState({
			time: displayTime.join(':')
		})
	}
	render() {
		return (
			<li>{this.state.time}</li>
		);
	}
}

export default Ticker;