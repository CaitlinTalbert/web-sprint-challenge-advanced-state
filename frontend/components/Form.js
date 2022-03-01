import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Form(props) {
  const { inputChange, form, postQuiz } = props;

  const onChange = (evt) => {
    const { value, id } = evt.target;
    const newQuestion = {
      ...form,
      [id]: value,
    };
    inputChange(newQuestion);
    console.log(newQuestion);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const questionInput = document.querySelector("#newQuestion");
    const trueAnswerInput = document.querySelector("#newTrueAnswer");
    const falseAnswerInput = document.querySelector("#newFalseAnswer");

    questionInput.value = "";
    trueAnswerInput.value = "";
    falseAnswerInput.value = "";

    postQuiz({
      question_text: props.form.newQuestion,
      true_answer_text: props.form.newTrueAnswer,
      false_answer_text: props.form.newFalseAnswer,
    });
    props.resetForm();
  };

  //The "Submit new quiz" button in the form stays disabled until **all** inputs have values such that `value.trim().length > 0`
  const enabledButton =
    props.form.newQuestion.trim().length > 0 &&
    props.form.newTrueAnswer.trim().length > 0 &&
    props.form.newFalseAnswer.trim().length > 0;

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

const mapStateToProps = (state) => {
  return {
    form: state.form,
  };
};

export default connect(mapStateToProps, actionCreators)(Form);
