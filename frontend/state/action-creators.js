// ❗ You don't need to add extra action creators to achieve MVP
import * as actions from './action-types'; 
import axios from 'axios';


export function moveClockwise() {
  return { type: actions.MOVE_CLOCKWISE}
 }

export function moveCounterClockwise() { 
  return { type: actions.MOVE_COUNTERCLOCKWISE}
}

export function selectAnswer(value) { 
  return { type: actions.SET_SELECTED_ANSWER, payload: value}
}

export function setMessage(message) {
  return { type: actions.SET_INFO_MESSAGE, payload: message}
 }

export function setQuiz(question_text) {
  return { type: actions.SET_QUIZ_INTO_STATE, question_text}
 }

export function inputChange (value) {
  return { type: actions.RESET_FORM, payload: value}
}

export function resetForm() { 
return { type: actions.RESET_FORM, payload: {}}
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios.get('http://localhost:9000/api/quiz/next')
    .then(resp => {
      console.log('get resp', resp)
      dispatch(setQuiz(resp.data))
    })
    .catch(err => {
      console.log(err)
    })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(answer_id, quiz_id) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', answer_id, quiz_id)
    .then(resp => {
      console.log('post resp', resp.data.message)

      //Dispatch an action to set the server message to state
      dispatch(setMessage(resp.data.message))
      dispatch(selectAnswer())
      //Dispatch the fetching of the next quiz
      dispatch(setQuiz())
      dispatch(fetchQuiz())
    })
    .catch(err => {
      console.log({err})
    })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(quizData) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', {quizData})
      .then(resp => {
        console.log('post quiz res', resp.data)
        dispatch(setMessage(resp.data.message))
        dispatch(resetForm)
      })
      .catch(err => {
        console.log('post quiz err', err)
      })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
