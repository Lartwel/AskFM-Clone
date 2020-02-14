import {
  GET_QUESTIONS,
  GET_QUESTION,
  DELETE_QUESTION,
  ADD_QUESTION,
  ADD_COMMENT,
  QUESTION_ERROR
} from './types';
const axios = require('axios')

export const getQuestions = (() => async dispatch => {
  try{
    const res = await axios.get('/questions')
    console.log('quest res', res)
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

export const addQuestion = question => async dispatch => {
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
}