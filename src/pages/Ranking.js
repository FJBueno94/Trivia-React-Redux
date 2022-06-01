import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../trivia.png';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount = () => {
    const data = JSON.parse(localStorage.getItem('data'));
    const ranking = data.ranking.map((e, i) => ({
      name: e.playerName,
      img: e.img,
      score: e.score,
      index: i,
    })).sort((a, b) => b.score - a.score);
    this.setState({ ranking });
  }

  onClickRanking = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className="flex flex-col items-center h-screen">
        <header className="mt-10">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <div
          className="flex flex-col items-center justify-center
          my-auto p-8 rounded-md bg-white"
        >
          <p
            data-testid="ranking-title"
            className="uppercase font-bold text-xl"
          >
            Ranking
          </p>
          <ul className="w-96 min-h-72">
            {
              ranking.map((e, index) => (
                <li
                  key={ e.index }
                  className="flex justify-around items-center my-5
                  odd:bg-purple-700 even:bg-blue-500 rounded-md font-medium"
                >
                  <p className="ml-5 text-white text-xl w-5">
                    { `${index + 1}º` }
                  </p>
                  <div
                    className={ `flex justify-around items-center bg-white border-y-2
                    ${index % 2 === 0 ? 'border-purple-700' : 'border-blue-500'}` }
                  >
                    <div className="p-3">
                      <img
                        src={ e.img }
                        alt={ e.name }
                        className={ `rounded-full w-16 border-[3px] p-0.5
                        ${index % 2 === 0 ? 'border-purple-700' : 'border-blue-500'}` }
                      />
                    </div>
                    <div className="text-center p-3 w-32">
                      <p data-testid={ `player-name-${e.index}` }>{ e.name }</p>
                    </div>
                    <div className="text-center p-3">
                      <p data-testiid={ `player-score-${e.index} ` }>{ e.score }</p>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
          <button
            type="submit"
            name="ranking"
            onClick={ this.onClickRanking }
            data-testid="btn-go-home"
            className="bg-blue-500 p-3 rounded text-white w-20 hover:bg-blue-800"
          >
            Inicio
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Ranking;
