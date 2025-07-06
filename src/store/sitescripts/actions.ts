import { action } from 'typesafe-actions';
import { Constants, ISiteScript } from './types';

export function setAllSiteScripts(items: ISiteScript[]) {
  return action(Constants.SS_GET_ITEMS, {
    items,
  });
}

export function setEditPanel(editpanel: boolean) {
  return action(Constants.SS_SET_EDITPANEL, {
    editpanel,
  });
}

export function setNewPanel(newpanel: boolean) {
  return action(Constants.SS_SET_NEWPANEL, {
    newpanel,
  });
}

export function setSelectedItem(selectedItem: ISiteScript | undefined) {
  return action(Constants.SS_SELECTED_ITEM, {
    selectedItem,
  });
}

export function setSelectedItems(selectedItems: ISiteScript[]) {
  return action(Constants.SS_SELECTED_ITEMS, {
    selectedItems,
  });
}

export function setConfirmEditDialog(confirmedit: boolean) {
  return action(Constants.SS_SET_CONFIRM_EDIT_DIALOG, {
    confirmedit,
  });
}

export function setConfirmRemoveDialog(confirmremove: boolean) {
  return action(Constants.SS_SET_CONFIRM_REMOVE_DIALOG, {
    confirmremove,
  });
}

export function setSearchString(searchstring: string) {
  return action(Constants.SS_SET_SEARCH_STRING, {
    searchstring,
  });
}
