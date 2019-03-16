import axios from 'axios';

import {
  ADD_SANGUIN,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_SANGUIN,
  SANGUIN_LOADING,
  DELETE_SANGUIN,
  UPDATE_SANGUIN,
} from './types';

// Add Post
export const updateSanguin = data => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/sanguin/${data.id}`, data)
    .then(res =>
      dispatch({
        type: UPDATE_SANGUIN,
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
export const addSanguin = data => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/sanguin', data)
    .then(res =>
      dispatch({
        type: ADD_SANGUIN,
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

// Get SANGUINs
export const getSanguin = () => dispatch => {
  dispatch(setSanguinLoading());
  axios
    .get('/api/sanguin')
    .then(res =>
      dispatch({
        type: GET_SANGUIN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SANGUIN,
        payload: []
      })
    );
};

// Get Post
export const postSanguin = id => dispatch => {
  dispatch(setSanguinLoading());
  axios
    .get(`/api/sanguin/${id}`)
    .then(res =>
      dispatch({
        type: GET_SANGUIN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SANGUIN,
        payload: null
      })
    );
};

// Delete SANGUINs
export const deleteSanguin = id => dispatch => {
  axios
    .delete(`/api/sanguin/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_SANGUIN,
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
export const setSanguinLoading = () => {
  return {
    type: SANGUIN_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
