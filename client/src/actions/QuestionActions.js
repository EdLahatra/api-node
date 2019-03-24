import axios from 'axios';

import {
  ADD_QUESTION,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_QUESTIONS,
  GET_QUESTION,
  QUESTION_LOADING,
  DELETE_QUESTION,
  UPDATE_QUESTION,
} from './types';
import config from '../utils/config';

// Add Post
export const updateQuestion = questionData => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${config.baseUrl}/api/checklist/${questionData.id}`, questionData)
    .then(res =>
      dispatch({
        type: UPDATE_QUESTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Post
export const addQuestion = questionData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${config.baseUrl}/api/checklist`, questionData)
    .then(res =>
      dispatch({
        type: ADD_QUESTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Questions
export const getQuestions = () => dispatch => {
  dispatch(setQuestionsLoading());
  axios
    .get(`${config.baseUrl}/api/checklist`)
    .then(res =>
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_QUESTIONS,
        payload: null
      })
    );
};

// Get Post
export const postQuestion = id => dispatch => {
  dispatch(setQuestionsLoading());
  axios
    .get(`${config.baseUrl}/api/checklist/${id}`)
    .then(res =>
      dispatch({
        type: GET_QUESTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_QUESTION,
        payload: null
      })
    );
};

// Delete Questions
export const deleteQuestion = id => dispatch => {
  axios
    .delete(`${config.baseUrl}/api/checklist/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_QUESTION,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Set loading state
export const setQuestionsLoading = () => {
  return {
    type: QUESTION_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
