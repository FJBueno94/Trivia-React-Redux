import { combineReducers } from 'redux';
import playerReducer from './player';
import triviaReducer from './trivia';
import token from './token';
import timerReducer from './timer';

const rootReducer = combineReducers({
  player: playerReducer,
  trivia: triviaReducer,
  token,
  timer: timerReducer,
});

export default rootReducer;
