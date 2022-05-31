import React, { Component } from 'react';
import Header from '../components/Header';

class Ranking extends Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="ranking-title">Ranking</p>
      </div>
    );
  }
}

export default Ranking;
