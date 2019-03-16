import { combineReducers } from 'redux';

import auth from './authReducer';
import errors from './errorReducer';
import profile from './profileReducer';
import maladie from './maladieReducer';
import vaccin from './vaccinReducer';
import checklist from './questionReducer';
import pays from './paysReducer';
import voyage from './voyageReducer';
import sante from './santeReducer';
import centre from './centreReducer';
import sejour from './sejourReducer';
import urgence from './urgenceReducer';
import medecin from './medecinReducer';
import categorie from './categorieReducer';
import sanguin from './sanguinReducer';

export default combineReducers({
  auth,
  errors,
  profile,
  maladie,
  vaccin,
  pays,
  checklist,
  sante,
  voyage,
  medecin,
  centre,
  sejour,
  urgence,
  sanguin,
  categorie,
});
