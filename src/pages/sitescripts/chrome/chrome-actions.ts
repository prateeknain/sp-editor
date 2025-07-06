import { Dispatch } from 'redux';
import * as rootActions from '../../../store/home/actions';
import { HomeActions, MessageBarColors } from '../../../store/home/types';
import * as actions from '../../../store/sitescripts/actions';
import { ISiteScript, SiteScriptsActions } from '../../../store/sitescripts/types';
import { spDelay } from '../../../utilities/utilities';
import { createSiteScript } from './createsitescript';
import { deleteSiteScripts } from './deletesitescripts';
import { getSiteScripts } from './getsitescripts';

export async function getAllSiteScripts(dispatch: Dispatch<SiteScriptsActions | HomeActions>) {
  dispatch(rootActions.setLoading(true));

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [chrome.runtime.getURL('')],
      func: getSiteScripts,
    })
    .then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any;
        if (res.success === false) {
          dispatch(
            rootActions.setAppMessage({
              showMessage: true,
              message: res.errorMessage,
              color: MessageBarColors.danger,
            })
          );
          dispatch(actions.setAllSiteScripts([]));
        } else {
          /* on success */
          let sitescripts: ISiteScript[] = res;

          const vti_indexedpropertykeys = sitescripts.find((obj) => {
            return obj.key === 'vti_indexedpropertykeys';
          });

          // find indexed properties
          if (
            vti_indexedpropertykeys &&
            vti_indexedpropertykeys.title &&
            vti_indexedpropertykeys.title.indexOf('|') > -1
          ) {
            sitescripts = sitescripts.map((property) => {
              const bytes = [];
              for (let i = 0; i < property.key.length; ++i) {
                bytes.push(property.key.charCodeAt(i));
                bytes.push(0);
              }
              const b64encoded = window.btoa(String.fromCharCode.apply(null, bytes));
              return property;
            });
          }

          // add sitescripts to state
          dispatch(actions.setAllSiteScripts(sitescripts));
        }
        // hide loading component
        dispatch(rootActions.setLoading(false));
      }
    });
}

export async function addSiteScript(
  dispatch: Dispatch<SiteScriptsActions | HomeActions>,
  payload: ISiteScript,
  update: boolean
) {
  // show loading spinner
  dispatch(rootActions.setLoading(true));
  // close panel
  if (update) {
    dispatch(actions.setConfirmEditDialog(true));
    dispatch(actions.setEditPanel(false));
  } else {
    dispatch(actions.setNewPanel(false));
  }

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [payload, chrome.runtime.getURL('')],
      func: createSiteScript,
    })
    .then(async (injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any;
        if (res.success) {
          /* on success */
          // add small delay just be sure SP can process previous requests
          await spDelay(500);
          // load all scriptlinks
          getAllSiteScripts(dispatch);
          // set success message
          dispatch(
            rootActions.setAppMessage({
              showMessage: true,
              message: !update ? 'Site script added succesfully!' : 'Site script updated succesfully!',
              color: MessageBarColors.success,
            })
          );
        } else {
          /* on error */
          // hide loading
          dispatch(rootActions.setLoading(false));
          // show error message
          dispatch(
            rootActions.setAppMessage({
              showMessage: true,
              message: res.errorMessage,
              color: MessageBarColors.danger,
            })
          );
        }
      }
    });
}

export async function removeSiteScripts(dispatch: Dispatch<SiteScriptsActions | HomeActions>, payload: ISiteScript[]) {
  // hide confirm dialog
  dispatch(actions.setConfirmRemoveDialog(true));
  // show loading spinner
  dispatch(rootActions.setLoading(true));

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [payload, chrome.runtime.getURL('')],
      func: deleteSiteScripts,
    })
    .then(async (injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any;
        if (res.success) {
          /* on success */
          // add small delay just be sure SP can process previous requests
          await spDelay(500);
          // load all scriptlinks
          getAllSiteScripts(dispatch);
          // set success message
          dispatch(
            rootActions.setAppMessage({
              showMessage: true,
              message: 'Site scripts removed succesfully!',
              color: MessageBarColors.success,
            })
          );
        } else {
          /* on error */
          // hide loading
          dispatch(rootActions.setLoading(false));
          // set error message
          dispatch(
            rootActions.setAppMessage({
              showMessage: true,
              message: res.errorMessage,
              color: MessageBarColors.danger,
            })
          );
        }
      }
    });
}
