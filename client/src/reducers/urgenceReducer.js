import {
  ADD_URGENCE,
  GET_ONE_URGENCE,
  GET_URGENCE,
  DELETE_URGENCE,
  URGENCE_LOADING,
  UPDATE_URGENCE,
} from '../actions/types';

const initialState = {
  urgence: [],
  one_urgence: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_URGENCE:
      return {
        ...state,
        urgence: [action.payload, ...state.urgence.filter(item => item._id !== action.payload._id)]
      };
    case URGENCE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_URGENCE:
      return {
        ...state,
        urgence: action.payload ? action.payload : state.urgence,
        loading: false
      };
    case GET_ONE_URGENCE:
      return {
        ...state,
        urgence: action.payload,
        loading: false
      };
    case ADD_URGENCE:
      return {
        ...state,
        urgence: [action.payload, ...state.urgence]
      };
    case DELETE_URGENCE:
      return {
        ...state,
        urgence: state.urgence.filter(urgence => urgence._id !== action.payload)
      };
    default:
      return state;
  }
}
