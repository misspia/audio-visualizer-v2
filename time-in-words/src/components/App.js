import React, { Component } from 'react';
import Clock from './Clock';
import Ticker from './Ticker';
// http://stackoverflow.com/questions/32880484/react-js-live-clock-update

class App extends Component {
    constructor() {
      super();
      this.state = {currentTime: ''};
    }

    updateTime() {      
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();

      this.setState({
        currentTime: [hours, minutes, seconds]
      })
    }

    componentWillMount() {
      this.updateTime();
    }

    componentDidMount() {
      window.setInterval(function() {

        this.updateTime();
      
      }.bind(this), 1000);
    }

    render() {

        return (
            <li className="col">
                <ul className="col center align-center full-width-height">

                    <Clock time={this.state.currentTime}/>
                    <Ticker time={this.state.currentTime} />
                
                </ul>
            </li>
        );
    }
}

export default App;
