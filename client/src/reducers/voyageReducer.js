import {
  ADD_VOYAGE,
  GET_ONE_VOYAGE,
  GET_VOYAGE,
  DELETE_VOYAGE,
  VOYAGE_LOADING,
  UPDATE_VOYAGE,
} from '../actions/types';

const initialState = {
  voyage: [],
  one_voyage: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_VOYAGE:
      return {
        ...state,
        voyage: [action.payload, ...state.voyage.filter(item => item._id !== action.payload._id)]
      };
    case VOYAGE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_VOYAGE:
      return {
        ...state,
        voyage: action.payload,
        loading: false
      };
    case GET_ONE_VOYAGE:
      return {
        ...state,
        voyage: action.payload,
        loading: false
      };
    case ADD_VOYAGE:
      return {
        ...state,
        voyage: [action.payload, ...state.voyage]
      };
    case DELETE_VOYAGE:
      return {
        ...state,
        voyage: state.voyage.filter(voyage => voyage._id !== action.payload)
      };
    default:
      return state;
  }
}
