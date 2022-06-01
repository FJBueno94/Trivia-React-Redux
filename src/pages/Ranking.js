import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Header from '../components/Header';

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
      <div>
        {/* <Header /> */}
        <p data-testid="ranking-title">Ranking</p>
        <div>
          {
            ranking.map((e) => (
              <div key={ e.index }>
                <img src={ e.img } alt={ e.name } />
                <p data-testid={ `player-name-${e.index}` }>{ e.name }</p>
                <p data-testiid={ `player-score-${e.index} ` }>{ e.score }</p>
              </div>
            ))
          }
        </div>
        <button
          type="submit"
          name="ranking"
          onClick={ this.onClickRanking }
          data-testid="btn-go-home"
        >
          Inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Ranking;
