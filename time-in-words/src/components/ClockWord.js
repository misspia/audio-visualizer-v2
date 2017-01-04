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
	componentWillMount() {
		this.setState({
			word: this.props.dataWord
		});
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			active: nextProps.active
		})
	}
	render() {
		return (
			<li className={this.state.active ? 'active' : '--'} >
				{this.state.word}
			</li>		
		);
	}
}

export default ClockWord;