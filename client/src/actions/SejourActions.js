import axios from 'axios';

import {
  ADD_SEJOUR,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_SEJOURS,
  GET_SEJOUR,
  SEJOUR_LOADING,
  DELETE_SEJOUR,
  UPDATE_SEJOUR,
} from './types';

// Add Post
export const updateSejour = sejourData => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/sejour/${sejourData.id}`, sejourData)
    .then(res =>
      dispatch({
        type: UPDATE_SEJOUR,
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
export const addSejour = sejourData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/sejour', sejourData)
    .then(res =>
      dispatch({
        type: ADD_SEJOUR,
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

// Get Sejours
export const getSejours = () => dispatch => {
  dispatch(setSejoursLoading());
  axios
    .get('/api/sejour')
    .then(res =>
      dispatch({
        type: GET_SEJOUR,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SEJOUR,
        payload: [],
      })
    );
};

// Get Post
export const postSejour = id => dispatch => {
  dispatch(setSejoursLoading());
  axios
    .get(`/api/sejour/${id}`)
    .then(res =>
      dispatch({
        type: GET_SEJOUR,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SEJOUR,
        payload: null
      })
    );
};

// Delete Sejours
export const deleteSejour = id => dispatch => {
  axios
    .delete(`/api/sejour/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_SEJOUR,
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
export const setSejoursLoading = () => {
  return {
    type: SEJOUR_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
