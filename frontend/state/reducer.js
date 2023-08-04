// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from './action-types'

const initialWheelState = {
  location: [0, 1, 2, 3, 4, 5],
  active: 0
}

function wheel(state = initialWheelState, action) {
  switch(action.type) {
    case MOVE_CLOCKWISE:
      return {
        ...state,
        active: (state.active + 1) % state.location.length
      }
    case MOVE_COUNTERCLOCKWISE:
      return {
        ...state,
        active: (state.active - 1 + state.location.length) % state.location.length
      }
    default:
      return state
  }
}

const initialQuizState = {
  quiz: null,
  loading: true,
  selectedAnswer: null,
  message: ''
}

function quiz(state = initialQuizState, action) {
  switch(action.type) {
    case SET_QUIZ_INTO_STATE:
      return {
        ...state,
        quiz: action.payload,
        loading: true
      }
    case SET_SELECTED_ANSWER:
      return {
        ...state,
        message: '',
        selectedAnswer: action.payload,
      }
    case SET_INFO_MESSAGE:
      return {
        ...state, 
        loading: false, 
        message: action.payload
      }
    default:
      return state
  }
}

// const initialSelectedAnswerState = null
// function selectedAnswer(state = initialSelectedAnswerState, action) {
//   return state
// }

// const initialMessageState = {
//   message: ''
// }

// function infoMessage(state = initialMessageState, action) {
//   switch(action.type) {
//     case SET_INFO_MESSAGE:
//       return {message: action.payload}
//     default:
//       return state
//   }
// }

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  return state
}

export default combineReducers({ wheel, quiz, form })
