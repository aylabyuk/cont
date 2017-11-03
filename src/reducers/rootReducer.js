import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import continuous from './continuousReducer';

const rootReducer = combineReducers({
  continuous,
  form: formReducer
});

export default rootReducer;