import axios from 'axios';

import {
  ADD_MEDECIN,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_ONE_MEDECIN,
  GET_MEDECIN,
  VACCIN_LOADING,
  DELETE_MEDECIN,
  UPDATE_MEDECIN,
} from './types';
import config from '../utils/config';

// Add Post
export const updateMedecin = medecinData => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${config.baseUrl}/api/medecin/${medecinData.id}`, medecinData)
    .then(res =>
      dispatch({
        type: UPDATE_MEDECIN,
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
export const addMedecin = medecinData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${config.baseUrl}/api/medecin`, medecinData)
    .then(res =>
      dispatch({
        type: ADD_MEDECIN,
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

// Get Medecins
export const getMedecin = () => dispatch => {
  dispatch(setMedecinsLoading());
  axios
    .get(`${config.baseUrl}/api/medecin`)
    .then(res =>
      dispatch({
        type: GET_MEDECIN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MEDECIN,
        payload: null
      })
    );
};

// Get Post
export const postMedecin = id => dispatch => {
  dispatch(setMedecinsLoading());
  axios
    .get(`${config.baseUrl}/api/medecin/${id}`)
    .then(res =>
      dispatch({
        type: GET_ONE_MEDECIN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ONE_MEDECIN,
        payload: null
      })
    );
};

// Delete Medecins
export const deleteMedecin = id => dispatch => {
  axios
    .delete(`${config.baseUrl}/api/medecin/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_MEDECIN,
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
export const setMedecinsLoading = () => {
  return {
    type: VACCIN_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
