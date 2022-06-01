export const PLAYER_INFO = 'PLAYER_INFO';
export const ADD_PLAYER = 'ADD_PLAYER';
export const GET_TOKEN = 'GET_TOKEN';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const ADD_TIMER = 'ADD_TIMER';
export const ADD_SCORE = 'ADD_SCORE';
export const ADD_ASSEERTIONS = 'ADD_ASSEERTIONS';

export const playerAction = (state) => ({ type: PLAYER_INFO, state });

export const addPlayerAction = (state) => ({
  type: ADD_PLAYER,
  payload: {
    ...state,
  },
});

export const addAssertionsAction = (state) => ({
  type: ADD_ASSEERTIONS,
  payload: {
    assertions: state,
  },
});

export const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export const addQuestionsAction = (state) => ({
  type: ADD_QUESTIONS,
  payload: {
    ...state,
  },
});

export const addTimerAction = (state) => ({
  type: ADD_TIMER,
  payload: {
    timer: state,
  },
});

export const addScoreAction = (score, isOver = false) => ({
  type: ADD_SCORE,
  payload: {
    score,
    isOver,
  },
});

export const getTokenThunk = () => async (dispatch) => {
  try {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await request.json();
    const token = await response.token;
    dispatch(getToken(token));
    localStorage.setItem('token', token);
    const prevData = JSON.parse(localStorage.getItem('data') || null);
    if (prevData !== null) {
      const data = JSON.stringify({ ranking: [...prevData.ranking], token } || {});
      localStorage.setItem('data', data);
    } else {
      const data = JSON.stringify({ ranking: [], token } || {});
      localStorage.setItem('data', data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionsThunk = (token) => async (dispatch) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    dispatch(addQuestionsAction(data));
  } catch (error) {
    console.log(error);
  }
};
