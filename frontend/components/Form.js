import React from 'react'
import axios from 'axios'
import { connect, useDispatch } from 'react-redux'
import { inputChange, resetForm } from '../state/action-creators'
import { SET_INFO_MESSAGE } from '../state/action-types'

export function Form(props) {
  const { newQuestion, newTrueAnswer, newFalseAnswer } = props
  const dispatch = useDispatch()

  const onChange = evt => {
    const {name, value} = evt.target
    dispatch(inputChange(name, value))
  }

  const onSubmit = (evt, question_text, true_answer_text, false_answer_text) => {
    evt.preventDefault()
    axios.post('http://localhost:9000/api/quiz/new', {question_text, true_answer_text, false_answer_text})
    .then(
      res => {
        console.log(res)
        dispatch(resetForm())
        dispatch({type: SET_INFO_MESSAGE, payload: `Congrats: "${question_text}" is a great question!`})
      })
      .catch(err => {
        dispatch({type: SET_INFO_MESSAGE, payload: err.message})
      })
  }

  return (
    <form id="form" onSubmit={(evt) => onSubmit(evt, newQuestion, newTrueAnswer, newFalseAnswer)}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={newQuestion} name="newQuestion" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={newTrueAnswer} name='newTrueAnswer' />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={newFalseAnswer} name='newFalseAnswer' />
      <button id="submitNewQuizBtn" disabled={!(newQuestion && newTrueAnswer && newFalseAnswer)}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => ({
  newQuestion: state.form.newQuestion,
  newTrueAnswer: state.form.newTrueAnswer,
  newFalseAnswer: state.form.newFalseAnswer
})

export default connect(mapStateToProps, { inputChange, resetForm })(Form)
