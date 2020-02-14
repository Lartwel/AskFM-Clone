
import {
  GET_QUESTIONS,
  GET_QUESTION,
  DELETE_QUESTION,
  ADD_QUESTION,
  ADD_COMMENT,
  QUESTION_ERROR
} from '../actions/types'

export const initialQuestions = {
  questions: [],
  question: '',
  loading: true,
  error: {}
}


export const questionReducer = (state = initialQuestions, action) => {
  const { type, payload } = action;

  switch(type){
    case GET_QUESTIONS: 
      return {
        ...state,
        questions: payload,
        loading: false
      }
    case GET_QUESTION:
      return{
        ...state,
        questions: payload,
        loading: false
      }
    case QUESTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default: 
      return state;
  }
}