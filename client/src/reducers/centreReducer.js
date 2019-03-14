import {
  ADD_CENTRE,
  GET_ONE_CENTRE,
  GET_CENTRE,
  DELETE_CENTRE,
  CENTRE_LOADING,
  UPDATE_CENTRE,
} from '../actions/types';

const initialState = {
  centre: [],
  one_centre: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CENTRE:
      return {
        ...state,
        centre: [action.payload, ...state.centre.filter(item => item._id !== action.payload._id)]
      };
    case CENTRE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CENTRE:
      return {
        ...state,
        centre: action.payload ? action.payload : state.centre,
        loading: false
      };
    case GET_ONE_CENTRE:
      return {
        ...state,
        centre: action.payload,
        loading: false
      };
    case ADD_CENTRE:
      return {
        ...state,
        centre: [action.payload, ...state.centre]
      };
    case DELETE_CENTRE:
      return {
        ...state,
        centre: state.centre.filter(centre => centre._id !== action.payload)
      };
    default:
      return state;
  }
}
