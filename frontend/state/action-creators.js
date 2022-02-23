// ❗ You don't need to add extra action creators to achieve MVP
import * as actions from "./action-types";
import axios from "axios";

// wheel widget actions
export function moveClockwise(value) {
  return { type: actions.MOVE_CLOCKWISE, payload: value };
}

export function moveCounterClockwise() {
  return { type: actions.MOVE_COUNTERCLOCKWISE };
}

//quiz
export function selectAnswer(answerId) {
  return { type: actions.SET_SELECTED_ANSWER, payload: answerId };
}

//form
export function setMessage(value) {
  return { type: actions.SET_INFO_MESSAGE, payload: value };
}

export function setQuiz(question) {
  return { type: actions.SET_QUIZ_INTO_STATE, payload: question };
}

export function inputChange(value) {
  return { type: actions.INPUT_CHANGE, payload: value };
}

export function resetForm() {
  return { type: actions.RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((resp) => {
        //console.log("get resp", resp.data);
        dispatch(setQuiz(resp.data));
      })
      .catch((err) => {
        console.log(err);
      });
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  };
}
export function postAnswer({ quiz_id, answer_id }) {
  //console.log(body);
  // const obj = {
  //   quiz_id: body.quiz_id,
  // };
  // console.log(obj);
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/answer", { quiz_id, answer_id })
      .then((resp) => {
        //console.log("post resp", resp.data.message);

        //Dispatch an action to set the server message to state
        dispatch(setMessage(resp.data.message));
        dispatch(selectAnswer(answer_id));
        //Dispatch the fetching of the next quiz
        dispatch(setQuiz(null));
        dispatch(fetchQuiz());
      })
      .catch((err) => {
        console.log({ err });
      });
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}
export function postQuiz({
  question_text,
  true_answer_text,
  false_answer_text,
}) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/new", {
        question_text,
        true_answer_text,
        false_answer_text,
      })
      .then((resp) => {
        console.log("post quiz res", resp.data);
        dispatch(
          setMessage(`Congrats: "${resp.data.question}" is a great question!`)
        );
        dispatch(resetForm());
      })
      .catch((err) => {
        console.log("post quiz err", err);
      });
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
