import initialState from './initialState';
import {SET_SELECTED_SITE} from '../actions/actionTypes';

export default function continuous(state = initialState.continuousForm, action) {
  let newState;
  switch (action.type) {
    case SET_SELECTED_SITE: 
        newState = { ...state  }
        newState.selectedSite = action.payload
        return newState
    default:
        return state;
  }
}