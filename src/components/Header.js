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
      <div className="flex flex-row justify-between bg-blue-500 h-20 text-white">
        <div className="flex flex-row">
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="profile avatar"
            data-testid="header-profile-picture"
            className="place-self-center rounded-xl h-16 w-16 ml-3 place-self-center"
          />
          <p
            data-testid="header-player-name"
            className="place-self-center ml-3"
          >
            {name}
          </p>
        </div>
        <p data-testid="header-score" className="place-self-center mr-3">{ score }</p>
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
