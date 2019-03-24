import axios from 'axios';

import {
  ADD_PAYS,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_ONE_PAYS,
  GET_PAYS,
  PAYS_LOADING,
  DELETE_PAYS,
  UPDATE_PAYS,
} from './types';
import config from '../utils/config';

// Add Post
export const updatePays = paysData => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${config.baseUrl}/api/pays/${paysData.id}`, paysData)
    .then(res =>
      dispatch({
        type: UPDATE_PAYS,
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
export const addPays = paysData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${config.baseUrl}/api/pays`, paysData)
    .then(res =>
      dispatch({
        type: ADD_PAYS,
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

// Get Payss
export const getPays = () => dispatch => {
  dispatch(setPayssLoading());
  axios
    .get(`${config.baseUrl}/api/pays`)
    .then(res =>
      dispatch({
        type: GET_PAYS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PAYS,
        payload: null
      })
    );
};

// Get Post
export const postPays = id => dispatch => {
  dispatch(setPayssLoading());
  axios
    .get(`${config.baseUrl}/api/pays/${id}`)
    .then(res =>
      dispatch({
        type: GET_ONE_PAYS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ONE_PAYS,
        payload: null
      })
    );
};

// Delete Payss
export const deletePays = id => dispatch => {
  axios
    .delete(`${config.baseUrl}/api/pays/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PAYS,
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
export const setPayssLoading = () => {
  return {
    type: PAYS_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
