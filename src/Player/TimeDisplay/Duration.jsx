import React, { Component } from 'react';
import Utils from '../../utils.js';

//fix end glitch
class Duration extends Component {
	constructor() {
		super();
		this.state = { formattedTime: "" }
	}
	componentWillReceiveProps(nextProps) {
		const remainingTime = this.props.duration - this.props.progress;
		this.setState({formattedTime: Utils.secondsToHMS(remainingTime)})
	}
	render() {
		return <span>{`- ${this.state.formattedTime}`}</span>
	}
}

export default Duration;