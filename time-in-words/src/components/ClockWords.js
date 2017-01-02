import React, {Component} from 'react';
import clock_words from '../json/clock.json';

class ClockWords extends Component {
	constructor() {
		super();
		this.state = {
			words: clock_words.words,
			hours: clock_words.hours,

			clockDisplay:[]
		}
	}

	tagArray(arr, keyPrefix) {
		for(let i = 0; i < arr.length; i ++) {

			this.state.clockDisplay.push(
				<li key={keyPrefix + '-' + arr[i]}
					data-value={keyPrefix + '-' + arr[i]}>
						{arr[i]}
				</li>
			);
		}
	}

	componentWillMount() {
		this.tagArray(this.state.words, 'words');
		this.tagArray(this.state.hours, 'hours');
		console.log(clock_words);
	}

	render() {
		return (
			<li>
				<ul className="row space-around align-center full-width-height">
					{this.state.clockDisplay}
				</ul>
			</li>		
		);
	}
}

export default ClockWords;