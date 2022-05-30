import React, { Component } from 'react';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">Feedback</p>
      </div>
    );
  }
}

export default FeedBack;
