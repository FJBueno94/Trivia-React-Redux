import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/Game.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Timer from './Timer';
import { addScoreAction } from '../redux/actions';

class CardQuestion extends Component {
  constructor() {
    super();

    this.state = {
      answers: [],
      isClicked: false,
      next: false,
      isOver: false,
    };
  }

  componentDidMount() {
    this.updateAnswer();
  }

  updateAnswer = () => {
    const { question, questionNum } = this.props;
    const maxQuestions = 4;

    if (questionNum < maxQuestions) {
      const wrongAnswers = question.incorrect_answers
        .map((answer, index) => ({ answer, index, test: `wrong-answer-${index}` }));

      const answers = [...wrongAnswers,
        { answer: question.correct_answer, index: 4, test: 'correct-answer' }];

      const numRandom = 0.5;
      const shuffledAnswers = answers.sort(() => Math.random() - numRandom);

      this.setState({ answers: shuffledAnswers, isClicked: false, next: false });
    } else {
      this.setState({ isOver: true });
    }
  }

  clickedButton = (event) => {
    const { question, timer, addScore } = this.props;

    const difficulties = { hard: 3,
      medium: 2,
      easy: 1,
    };

    if (event) {
      const { target } = event;
      if (target.innerHTML === question.correct_answer) {
        const defaultPoint = 10;
        const points = defaultPoint + (difficulties[question.difficulty] * timer);
        addScore(points);
      }
    }

    this.setState({
      isClicked: true,
      next: true,
    });
  }

  render() {
    const { question, changeQuestion } = this.props;
    const { answers, isClicked, next, isOver } = this.state;

    return (
      <div>
        {isOver && <Redirect to="/feedback" />}
        <p data-testid="question-category">{question.category}</p>
        <h3 data-testid="question-text">{question.question}</h3>
        <div data-testid="answer-options">
          { answers.map((elem) => (
            <button
              key={ elem.index }
              className={ isClicked ? elem.test : '' }
              type="button"
              data-testid={ elem.test }
              onClick={ this.clickedButton }
              disabled={ isClicked }
            >
              { elem.answer }
            </button>
          )) }
        </div>
        {
          next && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ async () => {
                await changeQuestion();
                this.updateAnswer();
              } }
            >
              Next Question
            </button>
          )
        }
        <div>
          {
            !isClicked && <Timer clicked={ this.clickedButton } />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.timer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  addScore: (value) => dispatch(addScoreAction(value)),
});

CardQuestion.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  changeQuestion: PropTypes.func.isRequired,
  questionNum: PropTypes.number.isRequired,
  timer: PropTypes.string.isRequired,
  addScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardQuestion);
