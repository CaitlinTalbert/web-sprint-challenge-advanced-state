import React, { useEffect } from 'react'; 
import { fetchQuiz, postAnswer, selectAnswer } from '../state/action-creators'; 
import { useDispatch, useSelector } from 'react-redux';


export default function Quiz() {
  const state = useSelector((appState) => appState.quiz)
  const selectedAnswer = useSelector((appState) => appState.selectedAnswer)
  const dispatcher = useDispatch()

  const submitClick = (e) => {
  e.preventDefault()
  const answer = {quizId: state.quizId, answerId: selectedAnswer}
  dispatcher(postAnswer(answer))
}

  

  useEffect(() => {
    dispatcher(fetchQuiz())
  }, [])

  const selectClick = (e) => {
    e.preventDefault(); 

  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        state ? (
          <>
            <h2>{state.question}</h2>

            <div id="quizAnswers">
              <div className="answer selected">
                A function
                <button onClick={selectClick}>SELECTED</button>
              </div>

              <div className="answer">
                An elephant
                <button>
                  Select
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onClick={submitClick} disabled={!selectedAnswer}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}
