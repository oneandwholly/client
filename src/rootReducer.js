import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as auth from './modules/auth'
const { authReducer } = auth;

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer
});

export default rootReducer;
