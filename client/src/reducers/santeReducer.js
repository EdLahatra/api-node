import {
  ADD_SANTE,
  GET_ONE_SANTE,
  GET_SANTE,
  DELETE_SANTE,
  SANTE_LOADING,
  UPDATE_SANTE,
} from '../actions/types';

const initialState = {
  sante: [],
  one_sante: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SANTE:
      return {
        ...state,
        sante: [action.payload, ...state.sante.filter(item => item._id !== action.payload._id)]
      };
    case SANTE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SANTE:
      return {
        ...state,
        sante: action.payload,
        loading: false
      };
    case GET_ONE_SANTE:
      return {
        ...state,
        sante: action.payload,
        loading: false
      };
    case ADD_SANTE:
      return {
        ...state,
        sante: [action.payload, ...state.sante]
      };
    case DELETE_SANTE:
      return {
        ...state,
        sante: state.sante.filter(sante => sante._id !== action.payload)
      };
    default:
      return state;
  }
}
