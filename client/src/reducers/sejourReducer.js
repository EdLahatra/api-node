import {
  ADD_SEJOUR,
  GET_ONE_SEJOUR,
  GET_SEJOUR,
  DELETE_SEJOUR,
  SEJOUR_LOADING,
  UPDATE_SEJOUR,
} from '../actions/types';

const initialState = {
  sejour: [],
  one_sejour: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SEJOUR:
      return {
        ...state,
        sejour: [action.payload, ...state.sejour.filter(item => item._id !== action.payload._id)]
      };
    case SEJOUR_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SEJOUR:
      return {
        ...state,
        sejour: action.payload ? action.payload : state.sejour,
        loading: false
      };
    case GET_ONE_SEJOUR:
      return {
        ...state,
        sejour: action.payload,
        loading: false
      };
    case ADD_SEJOUR:
      return {
        ...state,
        sejour: [action.payload, ...state.sejour]
      };
    case DELETE_SEJOUR:
      return {
        ...state,
        sejour: state.sejour.filter(sejour => sejour._id !== action.payload)
      };
    default:
      return state;
  }
}
