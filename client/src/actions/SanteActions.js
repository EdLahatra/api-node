import axios from 'axios';

import {
  ADD_SANTE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_ONE_SANTE,
  GET_SANTE,
  SANTE_LOADING,
  DELETE_SANTE,
  UPDATE_SANTE,
} from './types';
import config from '../utils/config';

// Add Post
export const updateSante = santeData => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${config.baseUrl}/api/sante/${santeData.id}`, santeData)
    .then(res =>
      dispatch({
        type: UPDATE_SANTE,
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
export const addSante = santeData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${config.baseUrl}/api/sante`, santeData)
    .then(res =>
      dispatch({
        type: ADD_SANTE,
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

// Get Santes
export const getSante = () => dispatch => {
  dispatch(setSantesLoading());
  axios
    .get(`${config.baseUrl}/api/sante`)
    .then(res =>
      dispatch({
        type: GET_SANTE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SANTE,
        payload: null
      })
    );
};

// Get Post
export const postSante = id => dispatch => {
  dispatch(setSantesLoading());
  axios
    .get(`${config.baseUrl}/api/sante/${id}`)
    .then(res =>
      dispatch({
        type: GET_ONE_SANTE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ONE_SANTE,
        payload: null
      })
    );
};

// Delete Santes
export const deleteSante = id => dispatch => {
  axios
    .delete(`${config.baseUrl}/api/sante/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_SANTE,
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
export const setSantesLoading = () => {
  return {
    type: SANTE_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
