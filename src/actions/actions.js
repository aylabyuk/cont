import * as types from './actionTypes';

export function setSelectedSite(site) {
    return { type: types.SET_SELECTED_SITE, payload: site }
}