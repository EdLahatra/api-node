import {
  ADD_SANGUIN,
  GET_ONE_SANGUIN,
  GET_SANGUIN,
  DELETE_SANGUIN,
  SANGUIN_LOADING,
  UPDATE_SANGUIN,
} from '../actions/types';

const initialState = {
  sanguin: [],
  one_sanguin: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SANGUIN:
      return {
        ...state,
        sanguin: [action.payload, ...state.sanguin.filter(item => item._id !== action.payload._id)]
      };
    case SANGUIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SANGUIN:
      return {
        ...state,
        sanguin: action.payload,
        loading: false
      };
    case GET_ONE_SANGUIN:
      return {
        ...state,
        one_sanguin: action.payload,
        loading: false
      };
    case ADD_SANGUIN:
      return {
        ...state,
        sanguin: [action.payload, ...state.sanguin]
      };
    case DELETE_SANGUIN:
      return {
        ...state,
        sanguin: state.sanguin.filter(item => item._id !== action.payload)
      };
    default:
      return state;
  }
}
