import React, {useEffect} from 'react';
import axios from 'axios'
import { connect, useDispatch } from 'react-redux';
import { selectAnswer, postAnswer, fetchQuiz } from '../state/action-creators';
import { SET_SELECTED_ANSWER, SET_INFO_MESSAGE } from '../state/action-types';

function Quiz(props) {
  const { quiz, loading, selectedAnswer } = props;
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchQuiz())
  }, [dispatch])

  const handleSubmitAnswer = (quiz_id, answer_id) => {
    axios.post('http://localhost:9000/api/quiz/answer', {quiz_id, answer_id})
      .then(
        res => {
          dispatch({type: SET_SELECTED_ANSWER, payload: null})
          dispatch({type: SET_INFO_MESSAGE, payload: res.data.message})
          dispatch(fetchQuiz())
        })
        .catch(err => {
          dispatch({type: SET_INFO_MESSAGE, payload: err.message})
        })
  };

  return (
    <div id="wrapper">
      {loading ? (
        <p>Loading next quiz...</p>
      ) : quiz ? (
        <>
          <h2>{quiz.question}</h2>
          <div id="quizAnswers">
            {quiz.answers.map((answer) => (
              <div className={`answer ${selectedAnswer === answer.answer_id ? 'selected' : ''}`} key={answer.answer_id}>
                {answer.text}
                <button onClick={() => dispatch({type: SET_SELECTED_ANSWER, payload: answer.answer_id})}>
                  {selectedAnswer === answer.answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>
            ))}
          </div>
          <button id="submitAnswerBtn" onClick={() => handleSubmitAnswer(quiz.quiz_id, selectedAnswer)} disabled={!selectedAnswer}>
            Submit answer
          </button>
        </>
      ) : (
        <p>No quiz available.</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  quiz: state.quiz.quiz,
  loading: state.quiz.loading,
  selectedAnswer: state.quiz.selectedAnswer,
  infoMessage: state.infoMessage,
});

export default connect(mapStateToProps, { selectAnswer, postAnswer, fetchQuiz })(Quiz);
