import { Constants, ISiteScriptsState, SiteScriptsActions } from './types';

const init: ISiteScriptsState = {
  siteScripts: [],
  loading: false,
  editpanel: false,
  newpanel: false,
  selectedItems: [],
  selectedItem: undefined,
  confirmremove: true,
  confirmedit: true,
  searchstring: '',
};

export function siteScriptsReducer(state: ISiteScriptsState = init, action: SiteScriptsActions): ISiteScriptsState {
  switch (action.type) {
    case Constants.SS_GET_ITEMS:
      return { ...state, siteScripts: action.payload.items };
    case Constants.SS_SET_EDITPANEL:
      return { ...state, ...action.payload };
    case Constants.SS_SET_NEWPANEL:
      return { ...state, ...action.payload };
    case Constants.SS_SELECTED_ITEMS:
      return { ...state, ...action.payload };
    case Constants.SS_SELECTED_ITEM:
      return { ...state, ...action.payload };
    case Constants.SS_SET_CONFIRM_EDIT_DIALOG:
      return { ...state, ...action.payload };
    case Constants.SS_SET_CONFIRM_REMOVE_DIALOG:
      return { ...state, ...action.payload };
    case Constants.SS_SET_SEARCH_STRING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
