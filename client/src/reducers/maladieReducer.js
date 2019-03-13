import {
  ADD_MALADIE,
  GET_ONE_MALADIE,
  GET_MALADIE,
  DELETE_MALADIE,
  MALADIE_LOADING,
  UPDATE_MALADIE,
} from '../actions/types';

const initialState = {
  maladie: [],
  one_maladie: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MALADIE:
      return {
        ...state,
        maladie: [action.payload, ...state.maladie.filter(item => item._id !== action.payload._id)]
      };
    case MALADIE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_MALADIE:
      return {
        ...state,
        maladie: action.payload,
        loading: false
      };
    case GET_ONE_MALADIE:
      return {
        ...state,
        maladie: action.payload,
        loading: false
      };
    case ADD_MALADIE:
      return {
        ...state,
        maladie: [action.payload, ...state.maladie]
      };
    case DELETE_MALADIE:
      return {
        ...state,
        maladie: state.maladie.filter(maladie => maladie._id !== action.payload)
      };
    default:
      return state;
  }
}
