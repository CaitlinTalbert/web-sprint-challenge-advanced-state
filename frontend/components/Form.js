import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Form(props) {
  const onChange = (evt) => {
    evt.preventDefault();
    const { value, id } = evt.target;
    props.inputChange({ [id]: value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const newQuestion = {
      question_text: props.form.newQuestion,
      true_answer_text: props.form.newTrueAnswer,
      false_answer_text: props.form.newFalseAnswer,
    };
    props.postQuiz(newQuestion);
  };

  const enabledButton = () => {
    return (
      props.form.newQuestion.trim().length < 1 ||
      props.form.newTrueAnswer.trim().length < 1 ||
      props.form.newFalseAnswer.trim().length < 1
    );
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={props.form.newQuestion}
        id="newQuestion"
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        onChange={onChange}
        value={props.form.newTrueAnswer}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        onChange={onChange}
        value={props.form.newFalseAnswer}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />
      <button id="submitNewQuizBtn" disabled={enabledButton()}>
        Submit new quiz{enabledButton()}
      </button>
    </form>
  );
}

export default connect((st) => st, actionCreators)(Form);
