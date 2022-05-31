import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  redirectButton = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { redirectButton } = this;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">Feedback</p>
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

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
