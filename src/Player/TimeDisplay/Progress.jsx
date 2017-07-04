import React, { Component } from 'react';
import Utils from '../../utils.js';


class Progress extends Component {
	constructor() {
		super();
		this.state = { formattedTime: "" }
	}
	componentWillReceiveProps(nextProps) {
		this.setState({formattedTime: Utils.secondsToHMS(this.props.progress)})
	}
	render() {
		return <span>{this.state.formattedTime}</span>
	}
}

export default Progress;