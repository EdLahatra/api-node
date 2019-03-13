import { combineReducers } from 'redux';
import auth from './authReducer';
import errors from './errorReducer';
import profile from './profileReducer';
import maladie from './maladieReducer';
import vaccin from './vaccinReducer';
import question from './questionReducer';
import pays from './paysReducer';
import voyage from './voyageReducer';
import sante from './santeReducer';

export default combineReducers({
  auth,
  errors,
  profile,
  maladie,
  vaccin,
  pays,
  question,
  sante,
  voyage,
});
