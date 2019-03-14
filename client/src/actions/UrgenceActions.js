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

// Add Post
export const updateUrgence = urgenceData => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/urgences/${urgenceData.id}`, urgenceData)
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
    .post('/api/urgences', urgenceData)
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

// Get Urgences
export const getUrgences = () => dispatch => {
  dispatch(setUrgencesLoading());
  axios
    .get('/api/urgences')
    .then(res =>
      dispatch({
        type: GET_URGENCES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_URGENCES,
        payload: null
      })
    );
};

// Get Post
export const postUrgence = id => dispatch => {
  dispatch(setUrgencesLoading());
  axios
    .get(`/api/urgences/${id}`)
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

// Delete Urgences
export const deleteUrgence = id => dispatch => {
  axios
    .delete(`/api/urgences/${id}`)
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
export const setUrgencesLoading = () => {
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
