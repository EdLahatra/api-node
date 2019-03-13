import axios from 'axios';

import {
  ADD_VOYAGE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_ONE_VOYAGE,
  GET_VOYAGE,
  VOYAGE_LOADING,
  DELETE_VOYAGE,
  UPDATE_VOYAGE,
} from './types';

// Add Post
export const updateVoyage = voyageData => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/voyage/${voyageData.id}`, voyageData)
    .then(res =>
      dispatch({
        type: UPDATE_VOYAGE,
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
export const addVoyage = voyageData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/voyage', voyageData)
    .then(res =>
      dispatch({
        type: ADD_VOYAGE,
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

// Get Voyages
export const getVoyage = () => dispatch => {
  dispatch(setVoyagesLoading());
  axios
    .get('/api/voyage')
    .then(res =>
      dispatch({
        type: GET_VOYAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_VOYAGE,
        payload: null
      })
    );
};

// Get Post
export const postVoyage = id => dispatch => {
  dispatch(setVoyagesLoading());
  axios
    .get(`/api/voyage/${id}`)
    .then(res =>
      dispatch({
        type: GET_ONE_VOYAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ONE_VOYAGE,
        payload: null
      })
    );
};

// Delete Voyages
export const deleteVoyage = id => dispatch => {
  axios
    .delete(`/api/voyage/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_VOYAGE,
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
export const setVoyagesLoading = () => {
  return {
    type: VOYAGE_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
