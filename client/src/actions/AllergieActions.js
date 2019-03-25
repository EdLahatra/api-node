import axios from 'axios';

import {
  ADD_ALLERGIE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_ALLERGIE,
  ALLERGIE_LOADING,
  DELETE_ALLERGIE,
  UPDATE_ALLERGIE,
} from './types';
import config from '../utils/config';

// Add Post
export const updateAllergie = ALLERGIEData => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${config.baseUrl}/api/allergie/${ALLERGIEData.id}`, ALLERGIEData)
    .then(res =>
      dispatch({
        type: UPDATE_ALLERGIE,
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
export const addAllergie = ALLERGIEData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${config.baseUrl}/api/allergie`, ALLERGIEData)
    .then(res =>
      dispatch({
        type: ADD_ALLERGIE,
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

// Get ALLERGIE
export const getAllergie = () => dispatch => {
  dispatch(setAllergieLoading());
  axios
    .get(`${config.baseUrl}/api/allergie`)
    .then(res =>
      dispatch({
        type: GET_ALLERGIE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALLERGIE,
        payload: null
      })
    );
};

// Get Post
export const postAllergie = id => dispatch => {
  dispatch(setAllergieLoading());
  axios
    .get(`${config.baseUrl}/api/allergie/${id}`)
    .then(res =>
      dispatch({
        type: GET_ALLERGIE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALLERGIE,
        payload: null
      })
    );
};

// Delete ALLERGIE
export const deleteAllergie = id => dispatch => {
  axios
    .delete(`${config.baseUrl}/api/allergie/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_ALLERGIE,
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
export const setAllergieLoading = () => {
  return {
    type: ALLERGIE_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
