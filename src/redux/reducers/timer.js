import { ADD_TIMER } from '../actions';

const INITIAL_STATE = {
  timer: 30,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TIMER:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default timerReducer;
