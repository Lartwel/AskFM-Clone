import {
  GET_QUESTIONS,
  GET_PENDING_QUESTIONS,
  GET_QUESTION,
  // DELETE_QUESTION,
  ADD_QUESTION,
  ADD_ANSWER,
  // ADD_COMMENT,
  QUESTION_ERROR
} from './types';
const axios = require('axios')

export const getQuestions = (() => async dispatch => {
  try{
    const res = await axios.get('/questions/answered')
    dispatch({
      type: GET_QUESTIONS,
      payload: res.data
    })
  } catch(e){
    dispatch({
      type: QUESTION_ERROR,
      payload: {
        msg: e.response, //e.response.statusText,
        status: e.response//e.response.status
      }
    })
  }
})()

//getting a question to answer it
export const getQuestion = ((id) => async dispatch => {
  try{
    const res = await axios.get('/questions/' + id)
    dispatch({
      type: GET_QUESTION,
      payload: res.data
    })
  } catch(e){
    dispatch({
      type: QUESTION_ERROR,
      payload: {
        msg: e.response, //e.response.statusText,
        status: e.response//e.response.status
      }
    })
  }
})

export const getPendingQuestions = (() => async dispatch => {
  try{
    const res = await axios.get('/questions/pending')
    dispatch({
      type: GET_PENDING_QUESTIONS,
      payload: res.data
    })
  } catch(e){
    dispatch({
      type: QUESTION_ERROR,
      payload: {
        msg: e.response, //e.response.statusText,
        status: e.response//e.response.status
      }
    })
  }
})



export const addQuestion = (question => async dispatch => {
  try{
    const res = await axios.post('/questions', question);
    dispatch({
      type: ADD_QUESTION,
      payload: res.data
    })
  } catch(e){
    dispatch({
      type: QUESTION_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status
      }
    })
  }
})()

export const addAnswer = ((answer, questionID) => async (dispatch) => {
  try{
    console.log('add answer action', answer, questionID)
    const res = await axios.post(`/questions/${questionID}/answer`, {answer})
    dispatch({
      type: ADD_ANSWER,
      payload: answer
    })
  } catch(e){
    console.log('answer action e', e)
    dispatch({
      type: QUESTION_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status
      }
    })
  }
})