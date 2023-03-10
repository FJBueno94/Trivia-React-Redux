import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import CardQuestion from '../components/CardQuestion';
import Header from '../components/Header';
import { getQuestionsThunk } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questionNum: 0,
    };
  }

  componentDidMount() {
    const { requestQuestions } = this.props;
    const data = JSON.parse(localStorage.getItem('data') || {});
    if (data.token !== undefined) {
      requestQuestions(data.token);
    }
  }

  changeQuestion = () => {
    this.setState((prevstate) => (
      { questionNum: prevstate.questionNum + 1 }
    ), () => {
      const { history, playerName, score } = this.props;
      const { questionNum } = this.state;
      const maxQuestions = 4;

      if (questionNum > maxQuestions) {
        const data = JSON.parse(localStorage.getItem('data'));
        const player = [...data.ranking, {
          playerName,
          score,
          img: `https://www.gravatar.com/avatar/${this.hashEmail()}`,
        }];
        localStorage.setItem('data', JSON.stringify({
          ranking: player,
          token: data.token,
        }));
        history.push('/feedback');
      }
    });
  }

  hashEmail() {
    const { email } = this.props;
    const hash = md5(email).toString();
    return hash;
  }

  tokenInvalid() {
    const { history, respCode } = this.props;
    if (respCode !== 0) {
      localStorage.setItem('data', '');
      history.push('/');
    }
  }

  render() {
    const { history, respCode, questions } = this.props;
    const { questionNum } = this.state;
    const invalidTokenResponse = 3;
    const maxQuestions = 4;

    return (
      <div>
        <Header />
        {respCode !== invalidTokenResponse
          ? questions.length > 0 && questionNum <= maxQuestions && (
            <div
              className="flex flex-col m-auto justify-around
              rounded w-2/5 h-fit mt-[4%] p-8 bg-white rounded-md"
            >
              <CardQuestion
                changeQuestion={ this.changeQuestion }
                question={ questions[questionNum] }
                questionNum={ questionNum }
                history={ history }
              />
            </div>
          )
          : this.tokenInvalid()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  respCode: state.trivia.response_code,
  questions: state.trivia.results,
  playerName: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (value) => dispatch(getQuestionsThunk(value)),
});

Game.propTypes = {
  respCode: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  requestQuestions: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
