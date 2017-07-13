import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as Auth from './modules/auth'
const { authReducer } = Auth;

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
