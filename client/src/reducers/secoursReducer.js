import {
  ADD_SECOURS,
  GET_ONE_SECOURS,
  GET_SECOURS,
  DELETE_SECOURS,
  SECOURS_LOADING,
  UPDATE_SECOURS,
} from '../actions/types';

const initialState = {
  secours: [],
  one_allegie: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SECOURS:
      return {
        ...state,
        secours: [action.payload, ...state.secours.filter(item => item._id !== action.payload._id)]
      };
    case SECOURS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SECOURS:
      return {
        ...state,
        secours: action.payload ? action.payload : state.secours,
        loading: false
      };
    case GET_ONE_SECOURS:
      return {
        ...state,
        one_allegie: action.payload,
        loading: false
      };
    case ADD_SECOURS:
      return {
        ...state,
        secours: [action.payload, ...state.secours]
      };
    case DELETE_SECOURS:
      return {
        ...state,
        secours: state.secours.filter(secours => secours._id !== action.payload)
      };
    default:
      return state;
  }
}
