import React, { Component } from 'react';
import './App.min.css';


/* Variables */

var clockTime;
var clockExact;
var firstHalf = true;
var hasMinutesWord;

const highlightedClass = "highlighted"
const allMinutesWord = [5,10,20];

const minutesValues = [
  {stringValue : "half", numValue: 30},
  {stringValue : "ten", numValue: 10},
  {stringValue : "quarter", numValue: 15},
  {stringValue : "twenty", numValue: 20},
  {stringValue : "five", numValue: 5}
];

const toPastValues = [
  {stringValue : "to", booleanValue: false},
  {stringValue : "past", booleanValue: true}
];

const hoursValues = ["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"];

/* StartText */

class StartText extends Component {

  render() {
    return (
      <React.Fragment>
        <li className={highlightedClass}>It</li>
        <li className={highlightedClass}>is</li>
      </React.Fragment>
    );
  }
}

/* MinutesValues */

class MinutesValues extends Component {
  getMinutesValue = () => {
    const minutesValue = minutesValues.map((value) =>
      <li className={this.props.clockMinute === value.numValue ? highlightedClass : ""} key={value.stringValue.toString()}>{value.stringValue}</li>
    );
    return minutesValue;
  }
  render() {
    return (
      <React.Fragment>
      {this.getMinutesValue()}
      </React.Fragment>
    );
  }
}

/* MinutesWord */

class MinutesWord extends Component {
  render() {
    return (
      <React.Fragment>
        <li className={this.props.hasMinutesWord ? highlightedClass : ""}>minutes</li>
      </React.Fragment>
    );
  }
}

/* ToPast */

class ToPast extends Component {
  getToPast = () => {
    const toPastValue = toPastValues.map((value) =>
      <li className={this.props.firstHalf === value.booleanValue && !this.props.clockExact ? highlightedClass : ""} key={value.stringValue.toString()}>{value.stringValue}</li>
    );
    return toPastValue;
  }
  render() {
    return (
      <React.Fragment>
      {this.getToPast()}
      </React.Fragment>
    );
  }
}

/* Hours */

class Hours extends Component {
  getHoursValue = () => {
    const hoursValue = hoursValues.map((value, index) =>
      <li className={this.props.clockHour === index + 1 ? highlightedClass : ""} key={value}>{value}</li>
    );
    return hoursValue;
  }
  render() {
    return (
      <React.Fragment>
      {this.getHoursValue()}
      </React.Fragment>
    );
  }
}

/* OClock */

class OClock extends Component {
  render() {
    return (
      <React.Fragment>
        <li className={this.props.clockExact ? highlightedClass : ""}>o&#39;clock</li>
      </React.Fragment>
    );
  }
}

/* test */

class Test extends Component {
  render() {
    return (
      <React.Fragment>
        <li>{this.props.testValue}</li>
      </React.Fragment>
    );
  }
}

/* ClockContent */

class ClockContent extends React.Component {
  constructor(props) {
    super(props);
    clockTime = this.getTime();
    this.state = {
      date: clockTime.date,
      clockMinute: clockTime.clockMinute,
      clockHour: clockTime.clockHour,
      clockExact: clockTime.clockExact,
      firstHalf: clockTime.firstHalf,
      hasMinutesWord: clockTime.hasMinutesWord
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    clockTime = this.getTime();
    this.setState({
      date: clockTime.date,
      clockMinute: clockTime.clockMinute,
      clockHour: clockTime.clockHour,
      clockExact: clockTime.clockExact,
      firstHalf: clockTime.firstHalf,
      hasMinutesWord: clockTime.hasMinutesWord
    });
  }

  getTime = () => {
    var date = new Date();
    var date = new Date();
    var clockHour = date.getHours();
    var clockMinute = date.getMinutes();
    clockMinute = Math.round(clockMinute/5)*5;

    if(clockMinute > 35 ) {
      clockHour = clockHour + 1;
      firstHalf = false;
    }

    clockHour = clockHour < 13 ? clockHour : clockHour - 12;
    clockHour = clockHour === 13 ? clockHour - 12 : clockHour;
    clockHour = clockHour === 0 ? 12 : clockHour;
    clockExact = clockMinute === 0 ? true : false;
    clockMinute = firstHalf ? clockMinute : 60 - clockMinute;
    clockMinute = clockMinute > 20 && clockMinute < 40 ? 30 : clockMinute;
    hasMinutesWord = allMinutesWord.includes(clockMinute) ? true : false;
    return {
      clockMinute: clockMinute,
      clockHour: clockHour,
      clockExact: clockExact,
      firstHalf: firstHalf,
      hasMinutesWord: hasMinutesWord,
      date: date
    };
  }

  render() {
    return (
      <React.Fragment>
        <MinutesValues clockMinute={this.state.clockMinute} />
        <MinutesWord hasMinutesWord={this.state.hasMinutesWord} />
        <ToPast firstHalf={this.state.firstHalf} clockExact={this.state.clockExact}  />
        <Hours clockHour={this.state.clockHour} />
        <OClock clockExact={this.state.clockExact} />
      </React.Fragment>
    );
  }
}

/* ClockContainer */

class ClockContainer extends Component {
  render() {
    return (
        <ul className="clock">
          <StartText />
          <ClockContent />
        </ul>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <ClockContainer />
      </div>
    );
  }
}

export default App;
