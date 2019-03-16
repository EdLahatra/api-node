import {
  ADD_QUESTION,
  GET_QUESTIONS,
  GET_QUESTION,
  DELETE_QUESTION,
  QUESTION_LOADING,
  UPDATE_QUESTION,
} from '../actions/types';

const initialState = {
  checklists: [],
  checklist: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_QUESTION:
      return {
        ...state,
        checklists: [action.payload, ...state.checklists.filter(item => item._id !== action.payload._id)]
      };
    case QUESTION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_QUESTIONS:
      return {
        ...state,
        checklists: action.payload,
        loading: false
      };
    case GET_QUESTION:
      return {
        ...state,
        checklist: action.payload,
        loading: false
      };
    case ADD_QUESTION:
      return {
        ...state,
        checklists: [action.payload, ...state.checklists]
      };
    case DELETE_QUESTION:
      return {
        ...state,
        checklists: state.checklists.filter(checklist => checklist._id !== action.payload)
      };
    default:
      return state;
  }
}
