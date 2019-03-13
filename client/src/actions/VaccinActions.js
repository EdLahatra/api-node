import axios from 'axios';

import {
  ADD_VACCIN,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_ONE_VACCIN,
  GET_VACCIN,
  VACCIN_LOADING,
  DELETE_VACCIN,
  UPDATE_VACCIN,
} from './types';

// Add Post
export const updateVaccin = vaccinData => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/vaccin/${vaccinData.id}`, vaccinData)
    .then(res =>
      dispatch({
        type: UPDATE_VACCIN,
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
export const addVaccin = vaccinData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/vaccin', vaccinData)
    .then(res =>
      dispatch({
        type: ADD_VACCIN,
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

// Get Vaccins
export const getVaccin = () => dispatch => {
  dispatch(setVaccinsLoading());
  axios
    .get('/api/vaccin')
    .then(res =>
      dispatch({
        type: GET_VACCIN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_VACCIN,
        payload: null
      })
    );
};

// Get Post
export const postVaccin = id => dispatch => {
  dispatch(setVaccinsLoading());
  axios
    .get(`/api/vaccin/${id}`)
    .then(res =>
      dispatch({
        type: GET_ONE_VACCIN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ONE_VACCIN,
        payload: null
      })
    );
};

// Delete Vaccins
export const deleteVaccin = id => dispatch => {
  axios
    .delete(`/api/vaccin/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_VACCIN,
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
export const setVaccinsLoading = () => {
  return {
    type: VACCIN_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
