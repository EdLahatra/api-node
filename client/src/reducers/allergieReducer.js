import {
  ADD_ALLERGIE,
  GET_ONE_ALLERGIE,
  GET_ALLERGIE,
  DELETE_ALLERGIE,
  ALLERGIE_LOADING,
  UPDATE_ALLERGIE,
} from '../actions/types';

const initialState = {
  allergie: [],
  one_allegie: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ALLERGIE:
      return {
        ...state,
        allergie: [action.payload, ...state.allergie.filter(item => item._id !== action.payload._id)]
      };
    case ALLERGIE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALLERGIE:
      return {
        ...state,
        allergie: action.payload ? action.payload : state.allergie,
        loading: false
      };
    case GET_ONE_ALLERGIE:
      return {
        ...state,
        one_allegie: action.payload,
        loading: false
      };
    case ADD_ALLERGIE:
      return {
        ...state,
        allergie: [action.payload, ...state.allergie]
      };
    case DELETE_ALLERGIE:
      return {
        ...state,
        allergie: state.allergie.filter(allergie => allergie._id !== action.payload)
      };
    default:
      return state;
  }
}
