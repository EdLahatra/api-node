import axios from 'axios';

import {
  ADD_CENTRE,
  GET_ERRORS_CENTRE,
  CLEAR_ERRORS,
  GET_CENTRES,
  GET_CENTRE,
  CENTRE_LOADING,
  DELETE_CENTRE,
  UPDATE_CENTRE,
} from './types';

// Add Post
export const updateCentre = centreData => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/centres/${centreData.id}`, centreData)
    .then(res =>
      dispatch({
        type: UPDATE_CENTRE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS_CENTRE,
        payload: err.response.data
      })
    );
};

// Add Post
export const addCentre = centreData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/centres', centreData)
    .then(res =>
      dispatch({
        type: ADD_CENTRE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS_CENTRE,
        payload: err.response.data
      })
    );
};

// Get Centres
export const getCentres = () => dispatch => {
  dispatch(setCentresLoading());
  axios
    .get('/api/centres')
    .then(res =>
      dispatch({
        type: GET_CENTRE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CENTRE,
        payload: []
      })
    );
};

// Get Post
export const postCentre = id => dispatch => {
  dispatch(setCentresLoading());
  axios
    .get(`/api/centres/${id}`)
    .then(res =>
      dispatch({
        type: GET_CENTRE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CENTRE,
        payload: {}
      })
    );
};

// Delete Centres
export const deleteCentre = id => dispatch => {
  axios
    .delete(`/api/centres/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_CENTRE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS_CENTRE,
        payload: err.response.data
      })
    );
};


// Set loading state
export const setCentresLoading = () => {
  return {
    type: CENTRE_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
