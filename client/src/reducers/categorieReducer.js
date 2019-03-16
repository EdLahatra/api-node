import {
  ADD_CATEGORIE,
  GET_ONE_CATEGORIE,
  GET_CATEGORIE,
  DELETE_CATEGORIE,
  CATEGORIE_LOADING,
  UPDATE_CATEGORIE,
} from '../actions/types';

const initialState = {
  categorie: [],
  one_categorie: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CATEGORIE:
      return {
        ...state,
        categorie: [action.payload, ...state.categorie.filter(item => item._id !== action.payload._id)]
      };
    case CATEGORIE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CATEGORIE:
      return {
        ...state,
        categorie: action.payload,
        loading: false
      };
    case GET_ONE_CATEGORIE:
      return {
        ...state,
        one_categorie: action.payload,
        loading: false
      };
    case ADD_CATEGORIE:
      return {
        ...state,
        categorie: [action.payload, ...state.categorie]
      };
    case DELETE_CATEGORIE:
      return {
        ...state,
        categorie: state.categorie.filter(item => item._id !== action.payload)
      };
    default:
      return state;
  }
}
