import React, { Component } from "react";
// import { connect } from 'react-redux'

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: {
        seconds: 0,
        minutes: 0,
        hours: 0,
      },
      startTimer: false,
    };
  }

  componentDidUpdate() {
    const { isTimerRunning } = this.props;

    if (isTimerRunning && !this.timer) {
      this.startTimer();
    }

    if (!isTimerRunning && this.timer) {
      this.stopTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    this.timer = setInterval(() => this.addSecond(), 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  addSecond() {
    let { seconds, minutes, hours } = this.state.timer;

    if (seconds < 60) {
      seconds++;
    } else {
      seconds = 0;
      minutes++;
      if (minutes > 59) {
        minutes = 0;
        hours++;
      }
    }

    this.setState({ timer: { seconds, minutes, hours } });
  }

  getTimeDigits(timePeriod) {
    if (timePeriod < 10) {
      return `0${timePeriod}`;
    }
    return timePeriod;
  }

  buildTimer() {
    const { seconds, minutes, hours } = this.state.timer;

    return `${this.getTimeDigits(hours)}:${this.getTimeDigits(
      minutes
    )}:${this.getTimeDigits(seconds)}`;
  }

  render() {
    return <div className="timer">{this.buildTimer()}</div>;
  }
}

// const mapStateToProps = state => {
//   console.log("state", state)
//   return {
//     number: state.add.count,
//   }
// };

// export default connect(
//   mapStateToProps,
//   { increment: actions.increment }
// )(App)

export default Timer;
