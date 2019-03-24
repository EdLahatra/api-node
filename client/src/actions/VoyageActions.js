import axios from 'axios';
// import get, { post, put, del } from './api';
// import { get, post, put, del } from '../utils/setAuthToken';
import {
  ADD_VOYAGE,
  GET_ERRORS_VOYAGE,
  CLEAR_ERRORS,
  GET_ONE_VOYAGE,
  GET_VOYAGE,
  VOYAGE_LOADING,
  DELETE_VOYAGE,
  UPDATE_VOYAGE,
} from './types';

import config from '../utils/config';

// Add Post
export const updateVoyage = voyageData => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`${config.baseUrl}/api/voyage/${voyageData.id}`, voyageData)
    .then(res =>
      dispatch({
        type: UPDATE_VOYAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS_VOYAGE,
        payload: err.response.data
      })
    );
};

// Add Post
export const addVoyage = voyageData =>
  async (dispatch) => {
    dispatch(clearErrors());
    axios
      .post(`${config.baseUrl}/api/voyage/`, voyageData)
      .then(res =>
        dispatch({
          type: ADD_VOYAGE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS_VOYAGE,
          payload: err.response
        })
      );
  };

// Get Voyages
export const getVoyage = () =>
  async (dispatch) => {
    dispatch(setVoyagesLoading());
    axios
      .get(`${config.baseUrl}/api/voyage`)
      .then(res =>
        dispatch({
          type: GET_VOYAGE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_VOYAGE,
          payload: []
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
        type: GET_ERRORS_VOYAGE,
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
