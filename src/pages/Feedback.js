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
    const { redirectButton, props: { assertions, score } } = this;
    const THREE_ANSWERS = 3;
    console.log(assertions);
    return (
      <div>
        <Header />
        <h2>Result</h2>
        <span data-testid="feedback-text">
          { assertions < THREE_ANSWERS ? 'Could be better...' : 'Well Done!' }
        </span>
        <h3>
          Score:
          <span data-testid="feedback-total-score">{ score }</span>
        </h3>
        <h3>
          Assertions:
          <span data-testid="feedback-total-question">{ assertions }</span>
        </h3>

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
  score: state.player.score,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
