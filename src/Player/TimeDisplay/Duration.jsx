import React, { Component } from 'react';
import Utils from '../../utils.js';

class Duration extends Component {
	constructor() {
		super();
		this.state = { formattedTime: "" }
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.ended) return;

		const remainingTime = this.props.duration - this.props.progress ?  this.props.duration - this.props.progress : 0;
		this.setState({formattedTime: Utils.secondsToHMS(remainingTime)})
	}
	render() {
		return <span>{`- ${this.state.formattedTime}`}</span>
	}
}

export default Duration;