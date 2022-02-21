import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Form(props) {
  const onChange = (evt) => {
    props.inputChange({
      [evt.target.id]: evt.target.value,
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    props.postQuiz({
      question_text: props.form.newQuestion,
      true_answer_text: props.form.newTrueAnswer,
      false_answer_text: props.form.newFalseAnswer,
    });
  };

  //The "Submit new quiz" button in the form stays disabled until **all** inputs have values such that `value.trim().length > 0`
  const enabledButton =
    props.form.newQuestion.trim().length > 1 &&
    props.form.newTrueAnswer.trim().length > 1 &&
    props.form.newFalseAnswer.trim().length > 1;

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />
      <button id="submitNewQuizBtn" disabled={!enabledButton}>
        Submit new quiz
      </button>
    </form>
  );
}

export default connect((st) => st, actionCreators)(Form);
