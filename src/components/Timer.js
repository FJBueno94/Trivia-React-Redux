import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTimerAction } from '../redux/actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      maxTime: 30,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    const interval = 1000;
    this.timer = setInterval(() => {
      this.setState((prev) => ({
        maxTime: prev.maxTime - 1,
      }), () => this.stopTimer());
    }, interval);
  }

  stopTimer = () => {
    const {
      state: { maxTime },
      props: { clicked, addTimer },
    } = this;
    if (maxTime === 0) clicked();

    addTimer(maxTime);
  }

  render() {
    const { state: { maxTime } } = this;
    return (
      <div>{maxTime.toString().padStart(2, '0')}</div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTimer: (value) => dispatch(addTimerAction(value)),
});

Timer.propTypes = {
  clicked: PropTypes.func.isRequired,
  addTimer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);
