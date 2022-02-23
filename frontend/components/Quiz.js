import React, { useEffect } from "react";
import {
  selectAnswer,
  fetchQuiz,
  postAnswer,
  setMessage,
} from "../state/action-creators";
import { connect } from "react-redux";

export function Quiz(props) {
  const { quiz } = props;

  const selectClick = (answer_id) => {
    props.selectAnswer(answer_id);
  };

  useEffect(() => {
    props.fetchQuiz();
  }, []);

  const submitClick = (e) => {
    e.preventDefault();
    props.postAnswer({
      quiz_id: props.quiz.quiz_id,
      answer_id: props.selectAnswer,
    });
  };

  //The "Submit answer" button in the quiz stays disabled until **an answer is selected**.

  return (
    <div id="wrapper">
      {quiz ? (
        <>
          <h2>{quiz.question}</h2>
          <div id="quizAnswers">
            <div
              className={`${
                props.selectedAnswer == quiz.answers[0].answer_id
                  ? "answer selected"
                  : "answer"
              }`}
            >
              {quiz.answers[0].text}
              <button onClick={() => selectClick(quiz.answers[0].answer_id)}>
                {props.selectedAnswer === quiz.answers[0].answer_id
                  ? "SELECTED"
                  : "Select"}
              </button>
            </div>
            <div
              className={`${
                props.selectedAnswer == quiz.answers[1].answer_id
                  ? "answer selected"
                  : "answer"
              }`}
            >
              {quiz.answers[1].text}
              <button onClick={() => selectClick(quiz.answers[1].answer_id)}>
                {props.selectedAnswer == quiz.answers[1].answer_id
                  ? "SELECTED"
                  : "Select"}
              </button>
            </div>
          </div>
          <button
            disabled={!props.selectedAnswer}
            onClick={submitClick}
            id="submitAnswerBtn"
          >
            Submit answer
          </button>
        </>
      ) : (
        "Loading next quiz..."
      )}
    </div>
  );
}
//   return (
//     <div id="wrapper">
//       {
//         // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
//         quiz ? (
//           <>
//             <h2>What is a closure?</h2>
//             <div id="quizAnswers">
//               <div className="answer selected">
//                 A function
//                 <button>SELECTED</button>
//               </div>
//               <div className="answer">
//                 An elephant
//                 <button>Select</button>
//               </div>
//             </div>
//             <button id="submitAnswerBtn">Submit answer</button>
//           </>
//         ) : (
//           "Loading next quiz..."
//         )
//       }
//     </div>
//   );
// }

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
  };
};
export default connect(mapStateToProps, {
  fetchQuiz,
  selectAnswer,
  postAnswer,
  setMessage,
})(Quiz);

/** 
<div className="answer selected">
A function
<button onClick={selectClick}>SELECTED</button>
</div>

<div className="answer">
An elephant
<button>Select</button>
</div>
</div>
<button
              id="submitAnswerBtn"
              onClick={submitClick}
              disabled={!postAnswer}
            >
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

export default connect((state) => state, selectAnswer)(Quiz);
*/
