import React, {Component} from 'react';

class ClockWord extends Component {
	constructor() {
		super();
		this.state = {
			dataWord:'',
			active: '',
			activeClass: ''
		}
	}
	setProps() {
		this.setState({
			word: this.props.dataWord,
			active: this.props.active,
			activeClass: this.state.active ? 'active': '---'
		})
	}
	componentWillMount() {
		this.setProps();
	}
	componentWillReceiveProps(nextProps) {
		this.setProps();


	}
	render() {
		return (
			<li className={this.state.activeClass} >
				{this.state.word}
			</li>		
		);
	}
}

export default ClockWord;