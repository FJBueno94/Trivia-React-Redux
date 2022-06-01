import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/Game.css';
import { connect } from 'react-redux';
import Timer from './Timer';
import { addScoreAction, addAssertionsAction } from '../redux/actions';

class CardQuestion extends Component {
  constructor() {
    super();

    this.state = {
      answers: [],
      isClicked: false,
      next: false,
      assertions: 0,
    };
  }

  componentDidMount() {
    this.updateAnswer();
  }

  updateAnswer = () => {
    const { question } = this.props;

    const wrongAnswers = question.incorrect_answers
      .map((answer, index) => ({ answer, index, test: `wrong-answer-${index}` }));
    const answers = [...wrongAnswers,
      { answer: question.correct_answer, index: 4, test: 'correct-answer' }];

    const numRandom = 0.5;
    const shuffledAnswers = answers.sort(() => Math.random() - numRandom);

    this.setState({ answers: shuffledAnswers, isClicked: false, next: false });
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
        this.setState((prevState) => ({ assertions: prevState.assertions + 1 }));
        addScore(points);
      }
    }

    this.setState({
      isClicked: true,
      next: true,
    });
  }

  componentWillUnmount = () => {
    const { addAssertions } = this.props;
    const { assertions } = this.state;
    addAssertions(assertions);
  }

  render() {
    const { question, changeQuestion } = this.props;
    const { answers, isClicked, next } = this.state;
    return (
      <div className="flex flex-col justify-around">
        <p
          data-testid="question-category"
          className="mx-auto text-xl mb-4 text-slate-500"
        >
          {question.category}
        </p>
        <h3
          data-testid="question-text"
          className="mx-auto text-2xl font-bold mb-4"
        >
          {question.question}
        </h3>
        <div data-testid="answer-options" className="flex flex-col justify-around">
          { answers.map((elem) => (
            <button
              key={ elem.index }
              className={
                `rounded-md p-3 text-white w-2/5 bg-blue-500
                mx-auto mt-2 mb-2 font-bold
                ${isClicked ? elem.test : ''}`
              }
              type="button"
              data-testid={ elem.test }
              onClick={ this.clickedButton }
              disabled={ isClicked }
            >
              { elem.answer }
            </button>
          )) }
        </div>
        <div className="flex justify-center mt-2">
          {
            next && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ async () => {
                  await changeQuestion();
                  this.updateAnswer();
                } }
                className="flex items-center justify-center
              bg-purple-700 rounded p-3 text-white w-2/5
              hover:bg-purple-900 w-[75%]"
              >
                Next Question
              </button>
            )
          }
        </div>
        <div className="flex justify-end">
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
  addAssertions: (value) => dispatch(addAssertionsAction(value)),
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
  timer: PropTypes.string.isRequired,
  addScore: PropTypes.func.isRequired,
  addAssertions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardQuestion);
