import React, {Component} from 'react';
import update from 'react-addons-update';
import clock_words from '../json/clock.json';
import ClockWord from './ClockWord';

class ClockWordContainer extends Component {
	constructor() {
		super();
		this.state = {
			words: clock_words.words,
			hours: clock_words.hours,
			displayWords:[],
			displayHours:[]
		}
	}
	resetState() {
		this.setState({
			words: clock_words.words
		})
	}
	setPrefix(min){
		

		switch(min) {
			case 5 : this.setState({ words: update( this.state.words, {five: {$set: true}, past: {$set: true} }) }); break; 
			case 10: this.setState({ words: update(this.state.words, {ten: {$set: true}, past: {$set:true} }) }); break;
			case 15: this.setState({ words: update(this.state.words, {a: {$set: true} , quarter: {$set: true}, past: {$set:true} }) }); break;
			case 20: this.setState({ words: update(this.state.words, {twenty: {$set: true}, past: {$set:true} }) }); break;
			case 25: this.setState({ words: update(this.state.words, {twenty: {$set: true}, five: {$set: true}, past: {$set:true} }) }); break;
			case 30: this.setState({ words: update(this.state.words, {half: {$set: true}, past: {$set:true} }) }); break;
			case 35: this.setState({ words: update(this.state.words, {twenty: {$set: true}, five: {$set:true}, to: {$set: true} }) }); break;
			case 40: this.setState({ words: update(this.state.words, {twenty: {$set: true}, to: {$set:true} }) }); break;
			case 45: this.setState({ words: update(this.state.words, {a: {$set: true}, quarter: {$set: true}, to: {$set:true} }) }); break;
			case 50: this.setState({ words: update(this.state.words, {ten: {$set: true}, to: {$set:true} }) }); break;
			case 55: this.setState({ words: update(this.state.words, {five: {$set: true}, to: {$set:true} }) }); break;
			default: ;
		}
	}
	
	addWords(obj, keyPrefix) {	
		let arr = [];

		for(let key in obj) {
			if(obj.hasOwnProperty(key)) {
				arr.push(  <ClockWord key={keyPrefix + '-' + key}  dataWord={key}  active={obj[key]}/>  );
			}	
		}
		return arr;
	}
	componentWillReceiveProps(nextProps) {	
		this.resetState();
		this.setPrefix(this.props.minute);


		this.setState({ displayWords: this.addWords(this.state.words, 'word') })
		this.setState({ displayHours: this.addWords(this.state.hours, 'hour') })
	}
	render() {			
		return (		
			<li>
				<ul className="row space-around align-center full-width-height">
					{this.state.displayWords}
					{this.state.displayHours}
				</ul>
			</li>		
		);
	}
}

export default ClockWordContainer;


	// setPrefix(min){
	// 	switch(min) {
	// 		case 5 : return ['five', 'past']; break; 
	// 		case 10: return ['ten', 'past']; break;
	// 		case 15: return ['a', 'quarter', 'past']; break;
	// 		case 20: return ['twenty', 'past']; break;
	// 		case 25: return ['twenty', 'five', 'past']; break;
	// 		case 30: return ['half', 'past']; break;
	// 		case 35: return ['twenty', 'five', 'to']; break;
	// 		case 40: return ['twenty', 'to']; break;
	// 		case 45: return ['a', 'quarter', 'to']; break;
	// 		case 50: return ['ten', 'to']; break;
	// 		case 55: return ['five', 'to']; break;
	// 		default: ;
	// 	}
	// }
	// activateWord(wordsArr) {
	// 	if( Array.isArray(wordsArr) ) {
	// 		for(let i = 0; i < wordsArr.length; i ++) {
	// 			console.log(this.state.words[ wordsArr[i] ]);
	// 		}
	// 	}	  
	// }


	// setPrefix(min){
	// 	switch(min) {
	// 		case 5 : this.setState({ words: update( this.state.words, {five: {$set: true}, past: {$set: true} }) }); break; 
	// 		case 10: this.setState({ words: update(this.state.words, {ten: {$set: true}, past: {$set:true} }) }); break;
	// 		case 15: this.setState({ words: update(this.state.words, {a: {$set: true} , quarter: {$set: true}, past: {$set:true} }) }); break;
	// 		case 20: this.setState({ words: update(this.state.words, {twenty: {$set: true}, past: {$set:true} }) }); break;
	// 		case 25: this.setState({ words: update(this.state.words, {twenty: {$set: true}, five: {$set: true}, past: {$set:true} }) }); break;
	// 		case 30: this.setState({ words: update(this.state.words, {half: {$set: true}, past: {$set:true} }) }); break;
	// 		case 35: this.setState({ words: update(this.state.words, {twenty: {$set: true}, five: {$set:true}, to: {$set: true} }) }); break;
	// 		case 40: this.setState({ words: update(this.state.words, {twenty: {$set: true}, to: {$set:true} }) }); break;
	// 		case 45: this.setState({ words: update(this.state.words, {a: {$set: true}, quarter: {$set: true}, to: {$set:true} }) }); break;
	// 		case 50: this.setState({ words: update(this.state.words, {ten: {$set: true}, to: {$set:true} }) }); break;
	// 		case 55: this.setState({ words: update(this.state.words, {five: {$set: true}, to: {$set:true} }) }); break;
	// 		default: ;
	// 	}
	// }
