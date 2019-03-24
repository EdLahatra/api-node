import axios from 'axios';

import {
  ADD_URGENCE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_URGENCES,
  GET_URGENCE,
  URGENCE_LOADING,
  DELETE_URGENCE,
  UPDATE_URGENCE,
} from './types';
import config from '../utils/config';

// Add Post
export const updateUrgence = urgenceData => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${config.baseUrl}/api/urgence/${urgenceData.id}`, urgenceData)
    .then(res =>
      dispatch({
        type: UPDATE_URGENCE,
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
export const addUrgence = urgenceData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${config.baseUrl}/api/urgence`, urgenceData)
    .then(res =>
      dispatch({
        type: ADD_URGENCE,
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

// Get urgence
export const getUrgence = () => dispatch => {
  dispatch(setUrgenceLoading());
  axios
    .get(`${config.baseUrl}/api/urgence`)
    .then(res =>
      dispatch({
        type: GET_URGENCE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_URGENCE,
        payload: null
      })
    );
};

// Get Post
export const postUrgence = id => dispatch => {
  dispatch(setUrgenceLoading());
  axios
    .get(`${config.baseUrl}/api/urgence/${id}`)
    .then(res =>
      dispatch({
        type: GET_URGENCE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_URGENCE,
        payload: null
      })
    );
};

// Delete urgence
export const deleteUrgence = id => dispatch => {
  axios
    .delete(`${config.baseUrl}/api/urgence/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_URGENCE,
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
export const setUrgenceLoading = () => {
  return {
    type: URGENCE_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
