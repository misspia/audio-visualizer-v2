import React, { Component } from 'react';
import Utils from '../../utils.js';

//fix end glitch
class Duration extends Component {
	constructor() {
		super();
		this.state = { formattedTime: "" }
	}
	// shouldComponentUpdate() {
	// 	//handle end time glitch here
	// }
	componentWillReceiveProps(nextProps) {
		const remainingTime = this.props.duration - this.props.progress ?  this.props.duration - this.props.progress : 0;
		this.setState({formattedTime: Utils.secondsToHMS(remainingTime)})
	}
	render() {
		return <span>{`- ${this.state.formattedTime}`}</span>
	}
}

export default Duration;