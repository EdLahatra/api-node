import axios from 'axios';

import {
  ADD_SECOURS,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_SECOURS,
  SECOURS_LOADING,
  DELETE_SECOURS,
  UPDATE_SECOURS,
} from './types';
import config from '../utils/config';

// Add Post
export const updateSecours = SECOURSData => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${config.baseUrl}/api/secours/${SECOURSData.id}`, SECOURSData)
    .then(res =>
      dispatch({
        type: UPDATE_SECOURS,
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
export const addSecours = SECOURSData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${config.baseUrl}/api/secours`, SECOURSData)
    .then(res =>
      dispatch({
        type: ADD_SECOURS,
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

// Get SECOURS
export const getSecours = () => dispatch => {
  dispatch(setSecoursLoading());
  axios
    .get(`${config.baseUrl}/api/secours`)
    .then(res =>
      dispatch({
        type: GET_SECOURS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SECOURS,
        payload: null
      })
    );
};

// Get Post
export const postSecours = id => dispatch => {
  dispatch(setSecoursLoading());
  axios
    .get(`${config.baseUrl}/api/secours/${id}`)
    .then(res =>
      dispatch({
        type: GET_SECOURS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SECOURS,
        payload: null
      })
    );
};

// Delete SECOURS
export const deleteSecours = id => dispatch => {
  axios
    .delete(`${config.baseUrl}/api/secours/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_SECOURS,
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
export const setSecoursLoading = () => {
  return {
    type: SECOURS_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
