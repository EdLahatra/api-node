import axios from 'axios';

import {
  ADD_MALADIE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_ONE_MALADIE,
  GET_MALADIE,
  MALADIE_LOADING,
  DELETE_MALADIE,
  UPDATE_MALADIE,
} from './types';

// Add Post
export const updateMaladie = maladieData => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/maladie/${maladieData.id}`, maladieData)
    .then(res =>
      dispatch({
        type: UPDATE_MALADIE,
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
export const addMaladie = maladieData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/maladie', maladieData)
    .then(res =>
      dispatch({
        type: ADD_MALADIE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

// Get Maladies
export const getMaladie = () => dispatch => {
  dispatch(setMaladiesLoading());
  axios
    .get('/api/maladie')
    .then(res =>
      dispatch({
        type: GET_MALADIE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MALADIE,
        payload: null
      })
    );
};

// Get Post
export const postMaladie = id => dispatch => {
  dispatch(setMaladiesLoading());
  axios
    .get(`/api/maladie/${id}`)
    .then(res =>
      dispatch({
        type: GET_ONE_MALADIE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ONE_MALADIE,
        payload: null
      })
    );
};

// Delete Maladies
export const deleteMaladie = id => dispatch => {
  axios
    .delete(`/api/maladie/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_MALADIE,
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
export const setMaladiesLoading = () => {
  return {
    type: MALADIE_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
