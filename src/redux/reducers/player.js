import {
  PLAYER_INFO,
  ADD_PLAYER,
  ADD_SCORE,
  ADD_ASSEERTIONS,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_INFO:
    return state;
  case ADD_PLAYER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: action.payload.isOver ? 0 : state.score + action.payload.score,
    };
  case ADD_ASSEERTIONS:
    return {
      ...state,
      assertions: action.payload.assertions,
    };
  default:
    return state;
  }
};

export default playerReducer;
