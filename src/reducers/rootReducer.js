import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import stuff from './stuffReducer';

const rootReducer = combineReducers({
  stuff,
  form: formReducer
});

export default rootReducer;