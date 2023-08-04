import React, {useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { selectAnswer, postAnswer, fetchQuiz } from '../state/action-creators';

function Quiz(props) {
  const { quiz, loading, selectedAnswer, selectedQuizId, infoMessage, selectAnswer, postAnswer } = props;
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchQuiz())
  }, [dispatch])

  console.log(props)

  const handleSubmitAnswer = () => {
    console.log(selectedQuizId, selectedAnswer)
    dispatch(postAnswer(selectedQuizId, selectedAnswer));
  };

  const handleAnswerSelect = answer_id => {
    dispatch(selectAnswer(answer_id))
  }

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
                <button onClick={() => handleAnswerSelect(answer.answer_id)}>
                  {selectedAnswer === answer.answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>
            ))}
          </div>
          <button id="submitAnswerBtn" onClick={handleSubmitAnswer} disabled={!selectedAnswer}>
            Submit answer
          </button>
        </>
      ) : (
        <p>No quiz available.</p>
      )}
      {infoMessage && <p>{infoMessage}</p>}
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
