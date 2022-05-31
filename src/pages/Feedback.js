import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  redirectButton = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { redirectButton, props: { assertions } } = this;
    const THREE_ANSWERS = 3;
    console.log(assertions);
    return (
      <div>
        <Header />
        <h2>Result</h2>
        <span data-testid="feedback-text">
          { assertions < THREE_ANSWERS ? 'Could be better...' : 'Well Done!' }
        </span>
        <button
          type="button"
          onClick={ redirectButton }
          data-testid="btn-ranking"
        >
          Ranking

        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
