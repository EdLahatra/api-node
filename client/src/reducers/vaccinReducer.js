import {
  ADD_VACCIN,
  GET_ONE_VACCIN,
  GET_VACCIN,
  DELETE_VACCIN,
  VACCIN_LOADING,
  UPDATE_VACCIN,
} from '../actions/types';

const initialState = {
  vaccin: [],
  one_vaccin: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_VACCIN:
      return {
        ...state,
        vaccin: [action.payload, ...state.vaccin.filter(item => item._id !== action.payload._id)]
      };
    case VACCIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_VACCIN:
      return {
        ...state,
        vaccin: action.payload,
        loading: false
      };
    case GET_ONE_VACCIN:
      return {
        ...state,
        vaccin: action.payload,
        loading: false
      };
    case ADD_VACCIN:
      return {
        ...state,
        vaccin: [action.payload, ...state.vaccin]
      };
    case DELETE_VACCIN:
      return {
        ...state,
        vaccin: state.vaccin.filter(vaccin => vaccin._id !== action.payload)
      };
    default:
      return state;
  }
}
