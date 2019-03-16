import axios from 'axios';

import {
  ADD_CATEGORIE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_ONE_CATEGORIE,
  GET_CATEGORIE,
  CATEGORIE_LOADING,
  DELETE_CATEGORIE,
  UPDATE_CATEGORIE,
} from './types';

// Add Post
export const updateCategorie = CategorieData => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/categorie/${CategorieData.id}`, CategorieData)
    .then(res =>
      dispatch({
        type: UPDATE_CATEGORIE,
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
export const addCategorie = CategorieData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/categorie', CategorieData)
    .then(res =>
      dispatch({
        type: ADD_CATEGORIE,
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

// Get Categories
export const getCategorie = () => dispatch => {
  dispatch(setCategoriesLoading());
  axios
    .get('/api/categorie')
    .then(res =>
      dispatch({
        type: GET_CATEGORIE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CATEGORIE,
        payload: null
      })
    );
};

// Get Post
export const postCategorie = id => dispatch => {
  dispatch(setCategoriesLoading());
  axios
    .get(`/api/categorie/${id}`)
    .then(res =>
      dispatch({
        type: GET_ONE_CATEGORIE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ONE_CATEGORIE,
        payload: null
      })
    );
};

// Delete Categories
export const deleteCategorie = id => dispatch => {
  axios
    .delete(`/api/categorie/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_CATEGORIE,
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
export const setCategoriesLoading = () => {
  return {
    type: CATEGORIE_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
