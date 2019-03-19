import {
  ADD_DOCUMENTS,
  GET_ONE_DOCUMENTS,
  GET_DOCUMENTS,
  DELETE_DOCUMENTS,
  DOCUMENTS_LOADING,
  UPDATE_DOCUMENTS,
} from '../actions/types';

const initialState = {
  documents: [],
  one_allegie: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DOCUMENTS:
      return {
        ...state,
        documents: [action.payload, ...state.documents.filter(item => item._id !== action.payload._id)]
      };
    case DOCUMENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload ? action.payload : state.documents,
        loading: false
      };
    case GET_ONE_DOCUMENTS:
      return {
        ...state,
        one_allegie: action.payload,
        loading: false
      };
    case ADD_DOCUMENTS:
      return {
        ...state,
        documents: [action.payload, ...state.documents]
      };
    case DELETE_DOCUMENTS:
      return {
        ...state,
        documents: state.documents.filter(documents => documents._id !== action.payload)
      };
    default:
      return state;
  }
}
