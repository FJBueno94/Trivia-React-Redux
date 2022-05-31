import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Ranking extends Component {
  onClickRanking = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <Header />
        <p data-testid="ranking-title">Ranking</p>
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
