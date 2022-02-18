// ❗ You don't need to add extra action creators to achieve MVP
import * as actions from './action-types'; 
import axios from 'axios';


export function moveClockwise() { }

export function moveCounterClockwise() { }

export function selectAnswer() { }

export function setMessage() { }

export function setQuiz(payload) {
  return { type: actions.SET_QUIZ_INTO_STATE, payload}
 }

export function inputChange () {}

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz())
    axios.get('http://localhost:9000/api/quiz/next')
    .then(resp => {
      console.log(resp)
      dispatch(setQuiz(resp.data))
    })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
