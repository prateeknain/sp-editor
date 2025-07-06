import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type SiteScriptsActions = ActionType<typeof actions>;

export interface ISiteScript {
  key: string;
  title: string;
  description: string;
  scriptValue: string | object;
}

export interface ISiteScriptsState {
  siteScripts: ISiteScript[];
  loading: boolean;
  editpanel: boolean;
  newpanel: boolean;
  selectedItems: ISiteScript[];
  selectedItem: ISiteScript | undefined;
  confirmremove: boolean;
  confirmedit: boolean;
  searchstring: string;
}

export enum Constants {
  SS_GET_ITEMS = 'SS_GET_ITEMS',
  SS_ADD_ITEM = 'SS_ADD_ITEM',
  SS_UPDATE_ITEM = 'SS_UPDATE_ITEM',
  SS_REMOVE_ITEMS = 'SS_REMOVE_ITEM"',
  SS_SET_EDITPANEL = 'SS_SET_EDITPANEL',
  SS_SET_NEWPANEL = 'SS_SET_NEWPANEL',
  SS_SELECTED_ITEM = 'SS_SELECTED_ITEM',
  SS_SELECTED_ITEMS = 'SS_SELECTED_ITEMS',
  SS_SET_CONFIRM_REMOVE_DIALOG = 'SS_SET_CONFIRM_REMOVE_DIALOG',
  SS_SET_CONFIRM_EDIT_DIALOG = 'SS_SET_CONFIRM_EDIT_DIALOG',
  SS_SET_SEARCH_STRING = 'SS_SET_SEARCH_STRING',
}
