// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios'
import { 
  MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  SET_QUIZ_INTO_STATE, 
  INPUT_CHANGE,
  RESET_FORM
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

export function setMessage(message) {
  return function(dispatch) {
    dispatch({
      type: SET_INFO_MESSAGE,
      payload: message
    })
  }
}

export function inputChange(name, value) {
  return function (dispatch) {
    dispatch({
      type: INPUT_CHANGE,
      payload: {
        name,
        value
      }
    })
  }
}

export function resetForm() {
  return function (dispatch) {
    dispatch({type: RESET_FORM})
  }
}

// ❗ Async action creators
export function fetchQuiz() {
  return async function (dispatch) {
    try {
      dispatch({type: SET_QUIZ_INTO_STATE, payload: null})
      const response = await axios.get('http://localhost:9000/api/quiz/next')
      dispatch({type: SET_QUIZ_INTO_STATE, payload: response.data})
    }
    catch (error) {
      console.error('Error fetching quiz: ', error)
      dispatch({type: SET_INFO_MESSAGE, payload: 'Failed to fetch quiz. Please try again.'})
    }
  }
}
