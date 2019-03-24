import axios from 'axios';

import {
  ADD_DOCUMENTS,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_DOCUMENTS,
  DOCUMENTS_LOADING,
  DELETE_DOCUMENTS,
  UPDATE_DOCUMENTS,
} from './types';
import config from '../utils/config';

// Add Post
export const updateDocuments = DOCUMENTSData => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${config.baseUrl}/api/documents/${DOCUMENTSData.id}`, DOCUMENTSData)
    .then(res =>
      dispatch({
        type: UPDATE_DOCUMENTS,
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
export const addDocuments = DOCUMENTSData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`${config.baseUrl}/api/documents`, DOCUMENTSData)
    .then(res =>
      dispatch({
        type: ADD_DOCUMENTS,
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

// Get DOCUMENTS
export const getDocuments = () => dispatch => {
  dispatch(setDocumentsLoading());
  axios
    .get(`${config.baseUrl}/api/documents`)
    .then(res =>
      dispatch({
        type: GET_DOCUMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DOCUMENTS,
        payload: null
      })
    );
};

// Get Post
export const postDocuments = id => dispatch => {
  dispatch(setDocumentsLoading());
  axios
    .get(`${config.baseUrl}/api/documents/${id}`)
    .then(res =>
      dispatch({
        type: GET_DOCUMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DOCUMENTS,
        payload: null
      })
    );
};

// Delete DOCUMENTS
export const deleteDocuments = id => dispatch => {
  axios
    .delete(`${config.baseUrl}/api/documents/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_DOCUMENTS,
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
export const setDocumentsLoading = () => {
  return {
    type: DOCUMENTS_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
