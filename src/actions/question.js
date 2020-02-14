import {
  GET_QUESTIONS,
  GET_PENDING_QUESTIONS,
  // GET_QUESTION,
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
    console.log('quest res', res.data)
    dispatch({
      type: GET_QUESTIONS,
      payload: res.data
    })
  } catch(e){
    console.log('quest err', e)
    dispatch({
      type: QUESTION_ERROR,
      payload: {
        msg: e.response, //e.response.statusText,
        status: e.response//e.response.status
      }
    })
  }
})()

export const getPendingQuestions = (() => async dispatch => {
  try{
    const res = await axios.get('/questions/pending')
    dispatch({
      type: GET_PENDING_QUESTIONS,
      payload: res.data
    })
  } catch(e){
    console.log('quest err', e)
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
    const res = await axios.post(`/questions/${questionID}/answer`, answer)
    dispatch({
      type: ADD_ANSWER,
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