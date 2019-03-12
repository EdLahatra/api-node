import {
  ADD_PAYS,
  GET_ONE_PAYS,
  GET_PAYS,
  DELETE_PAYS,
  PAYS_LOADING,
  UPDATE_PAYS,
} from '../actions/types';

const initialState = {
  pays: [],
  one_pays: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PAYS:
      return {
        ...state,
        pays: [action.payload, ...state.pays.filter(item => item._id !== action.payload._id)]
      };
    case PAYS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PAYS:
      return {
        ...state,
        pays: action.payload,
        loading: false
      };
    case GET_ONE_PAYS:
      return {
        ...state,
        pays: action.payload,
        loading: false
      };
    case ADD_PAYS:
      return {
        ...state,
        pays: [action.payload, ...state.pays]
      };
    case DELETE_PAYS:
      return {
        ...state,
        pays: state.pays.filter(pays => pays._id !== action.payload)
      };
    default:
      return state;
  }
}
