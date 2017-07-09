import React, { Component } from 'react';

class ProgressBar extends Component {
	constructor() {
		super();
		this.state = { progressStyle: {} }
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			progressStyle: { width: this.props.progress + '%'}
		})
	}
	render() {
		return <div id="seek_progress" style={this.state.progressStyle}></div>;
	}
}

export default ProgressBar;