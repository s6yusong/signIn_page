import formReducer from './form';
import signInReducer from './signIn';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
  form: formReducer,
  signIn: signInReducer
})

export default allReducers;