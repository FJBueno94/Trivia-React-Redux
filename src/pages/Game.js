import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    const data = JSON.parse(localStorage.getItem('data'));
    requestQuestions(data.token);
  }

  changeQuestion = () => {
    const questionLimit = 4;

    this.setState((prevstate) => (
      { questionNum: prevstate.questionNum < questionLimit
        ? prevstate.questionNum + 1 : 0 }
    ));
  }

  tokenInvalid() {
    const { history, respCode } = this.props;
    if (respCode !== 0) {
      localStorage.setItem('data', '');
      history.push('/');
    }
  }

  render() {
    const { respCode, questions } = this.props;
    const { questionNum } = this.state;
    const invalidTokenResponse = 3;

    return (
      <div>
        <Header />
        {respCode !== invalidTokenResponse
          ? questions.length > 0 && (
            <div>
              <CardQuestion
                changeQuestion={ this.changeQuestion }
                question={ questions[questionNum] }
                questionNum={ questionNum }
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
