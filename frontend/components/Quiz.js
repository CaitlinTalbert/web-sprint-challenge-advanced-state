import React, { useEffect } from 'react'; 
import * as actionCreators from '../state/action-creators'; 
import { connect } from 'react-redux';


export function Quiz(props) {

    const {
      quiz, 
      postAnswer
    } = props; 


    const selectClick = () => {
      props.selectAnswer(props.quiz.answers[0].answer_id)
    }

    useEffect(() => {
      props.fetchQuiz()
    }, [])

    const submitClick = (e) => {
      e.preventDefault(); 
      postAnswer({ quiz_id: props.quiz.quiz_id, answer_id: props.quiz.answers[0][1].answer_id})
    }

    //The "Submit answer" button in the quiz stays disabled until **an answer is selected**.
   

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

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

            <button id="submitAnswerBtn" onClick={submitClick} disabled={!postAnswer}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}


export default connect (state => state, actionCreators)(Quiz)