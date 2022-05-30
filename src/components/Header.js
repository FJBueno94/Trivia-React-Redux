import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      hash: '',
    };
  }

  componentDidMount = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({ hash });
  }

  render() {
    const { hash } = this.state;
    const { name, score } = this.props;
    return (
      <div>
        <p data-testid="header-player-name">{name}</p>
        <img src={ `https://www.gravatar.com/avatar/${hash}` } alt="profile avatar" data-testid="header-profile-picture" />
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
