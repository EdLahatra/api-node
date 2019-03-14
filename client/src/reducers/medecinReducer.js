import {
  ADD_MEDECIN,
  GET_ONE_MEDECIN,
  GET_MEDECIN,
  DELETE_MEDECIN,
  MEDECIN_LOADING,
  UPDATE_MEDECIN,
} from '../actions/types';

const initialState = {
  medecin: [],
  one_medecin: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MEDECIN:
      return {
        ...state,
        medecin: [action.payload, ...state.medecin.filter(item => item._id !== action.payload._id)]
      };
    case MEDECIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_MEDECIN:
      return {
        ...state,
        medecin: action.payload,
        loading: false
      };
    case GET_ONE_MEDECIN:
      return {
        ...state,
        medecin: action.payload,
        loading: false
      };
    case ADD_MEDECIN:
      return {
        ...state,
        medecin: [action.payload, ...state.medecin]
      };
    case DELETE_MEDECIN:
      return {
        ...state,
        medecin: state.medecin.filter(medecin => medecin._id !== action.payload)
      };
    default:
      return state;
  }
}
