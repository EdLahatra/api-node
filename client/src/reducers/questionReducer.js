import {
  ADD_QUESTION,
  GET_QUESTIONS,
  GET_QUESTION,
  DELETE_QUESTION,
  QUESTION_LOADING,
  UPDATE_QUESTION,
} from '../actions/types';

const initialState = {
  questions: [],
  question: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions.filter(item => item._id !== action.payload._id)]
      };
    case QUESTION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false
      };
    case GET_QUESTION:
      return {
        ...state,
        question: action.payload,
        loading: false
      };
    case ADD_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions]
      };
    case DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(question => question._id !== action.payload)
      };
    default:
      return state;
  }
}
