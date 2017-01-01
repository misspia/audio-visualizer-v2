import React, { Component } from 'react';
import Clock from './Clock';

// http://stackoverflow.com/questions/32880484/react-js-live-clock-update

class App extends Component {
    constructor() {
      super();
      this.state = {time: ''};
    }
    
    updateTime() {

      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();
 
      console.log(currentTime);
      console.log(hours);
      console.log(minutes);
      console.log(seconds);

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

                    <Clock/>
                
                </ul>
            </li>
        );
    }
}


export default App;
