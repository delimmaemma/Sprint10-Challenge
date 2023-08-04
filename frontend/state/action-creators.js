// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios'
import { 
  MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  SET_QUIZ_INTO_STATE 
} from "./action-types"

export function moveClockwise() {
  return function (dispatch) {
    dispatch({ type: MOVE_CLOCKWISE })
  }
}

export function moveCounterClockwise() {
  return function (dispatch) {
    dispatch({ type: MOVE_COUNTERCLOCKWISE })
  }
}

export function selectAnswer(answer_id) {
  return function (dispatch) {
    dispatch({type: SET_SELECTED_ANSWER, payload: answer_id})
  }
}

export function setMessage() { }

export function setQuiz() { }

export function inputChange() { }

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return async function (dispatch) {
    try {
      dispatch({type: SET_INFO_MESSAGE, payload: 'Loading next quiz...'})
      const response = await axios.get('http://localhost:9000/api/quiz/next')
      dispatch({type: SET_QUIZ_INTO_STATE, payload: response.data})
      dispatch({type: SET_INFO_MESSAGE, payload: ''})
    }
    catch (error) {
      console.error('Error fetching quiz: ', error)
      dispatch({type: SET_INFO_MESSAGE, payload: 'Failed to fetch quiz. Please try again.'})
    }
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(answer_id, quiz_id) {
  return async function (dispatch) {
    try {
      const response = await axios.post('http://localhost:9000/api/quiz/answer', {quiz_id, answer_id})
      dispatch({type: SET_SELECTED_ANSWER, payload: null})
      dispatch({type: SET_INFO_MESSAGE, payload: response.data.message})
      dispatch(fetchQuiz())
    }
    catch (error) {
      console.error('Error posting answer: ', error)
      dispatch({type: SET_INFO_MESSAGE, payload: 'Failed to submit answer. Please try again.'})
    }
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
