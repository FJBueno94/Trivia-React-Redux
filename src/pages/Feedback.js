import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaPlay } from 'react-icons/fa';
import { ImListNumbered } from 'react-icons/im';
import Header from '../components/Header';

class Feedback extends Component {
  redirectButton = (pathname) => {
    const { history } = this.props;
    history.push(`${pathname}`);
  }

  render() {
    const { redirectButton, props: { assertions, score } } = this;
    const THREE_ANSWERS = 3;
    return (
      <div>
        <Header />
        <div className="flex justify-center mt-[15%] h-72">
          <div
            className="flex flex-col justify-around
            items-center bg-white w-96 p-8 rounded-md"
          >
            <p data-testid="feedback-text" className="text-3xl font-bold">
              { assertions < THREE_ANSWERS ? 'Could be better...' : 'Well Done!' }
            </p>
            <h3 className="text-lg font-semibold">
              Score:
              <span data-testid="feedback-total-score">{ ` ${score}` }</span>
            </h3>
            <h3 className="text-lg font-semibold">
              Assertions:
              <span data-testid="feedback-total-question">{ ` ${assertions}` }</span>
            </h3>
            <div className="flex w-72">
              <button
                type="button"
                onClick={ () => redirectButton('/ranking') }
                data-testid="btn-ranking"
                className="flex items-center justify-center
                bg-purple-700 rounded p-3 text-white w-3/5 hover:bg-purple-900 mr-5"
              >
                <ImListNumbered className="mr-5" />
                Ranking
              </button>
              <button
                type="button"
                onClick={ () => redirectButton('/') }
                data-testid="btn-play-again"
                className="flex items-center justify-center
                bg-blue-500 rounded p-3 text-white w-3/5 hover:bg-blue-700"
              >
                <FaPlay className="mr-5"/>
                Play Again
              </button>
            </div>
          </div>
        </div>
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
