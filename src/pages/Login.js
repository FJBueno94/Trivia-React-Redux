import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaPlay } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import { addPlayerAction, getTokenThunk, addScoreAction } from '../redux/actions';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
  }

  componentDidMount = () => {
    const { addScore } = this.props;
    addScore(0, true);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.validateEmail();
    });
  }

  validateEmail = () => {
    const regex = /\S+@\S+\.\S+/;
    const { name, email } = this.state;
    const nameLength = 0;
    if (regex.test(email) && name.length > nameLength) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  onclick = async (event) => {
    const { addPlayer, getToken, history } = this.props;
    const { name, email } = this.state;
    event.preventDefault();
    addPlayer({ name, email });
    await getToken();
    history.push('/game');
  }

settingButton = () => {
  const { history } = this.props;
  history.push('/settings');
}

render() {
  const {
    state: {
      name,
      email,
      disabled,
    }, settingButton, onclick, handleChange } = this;
  return (
    <div className="flex flex-col items-center">
      <header className="mt-10">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
      <form
        className="flex flex-col justify-around rounded w-80 h-72 mt-[15%] p-8 bg-white"
      >
        <input
          type="text"
          id="name"
          name="name"
          value={ name }
          onChange={ handleChange }
          data-testid="input-player-name"
          className="border-b-2 border-purple-700 text-center p-2 outline-none
          focus:border-blue-500 transition-all ease-in duration-300"
          placeholder="Nome"
        />
        <input
          type="email"
          id="email"
          name="email"
          value={ email }
          data-testid="input-gravatar-email"
          onChange={ handleChange }
          className="border-b-2 border-purple-700 text-center p-2 outline-none
          focus:border-blue-500 transition-all ease-in duration-300"
          placeholder="Email"
        />
        <div className="flex justify-around">
          <button
            type="submit"
            onClick={ onclick }
            data-testid="btn-play"
            disabled={ disabled }
            className="flex items-center justify-center
            bg-purple-700 rounded p-3 text-white w-2/5
            disabled:text-gray disabled:bg-purple-300 hover:bg-purple-900"
          >
            <FaPlay />
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ settingButton }
            className="flex items-center justify-center
            bg-blue-500 rounded p-3 text-white w-2/5 hover:bg-blue-700"
          >
            <AiFillSetting />
          </button>
        </div>
      </form>
    </div>
  );
}
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  addScore: (value, isOver) => dispatch(addScoreAction(value, isOver)),
  addPlayer: (value) => dispatch(addPlayerAction(value)),
  getToken: () => dispatch(getTokenThunk()),
});

Login.propTypes = {
  addPlayer: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  addScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
