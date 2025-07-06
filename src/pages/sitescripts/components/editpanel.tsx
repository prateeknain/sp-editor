import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  IOverlayProps,
  Panel,
  PanelType,
  PrimaryButton,
  Stack,
  TextField,
} from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { setConfirmEditDialog, setEditPanel, setSelectedItem } from '../../../store/sitescripts/actions';
import { ISiteScript } from '../../../store/sitescripts/types';
import { addSiteScript } from '../chrome/chrome-actions';

const SiteScriptsEditPanel = () => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state: IRootState) => state.home);
  const { editpanel, selectedItem, confirmedit } = useSelector((state: IRootState) => state.sitescripts);

  const [editItem, setEditItem] = useState<ISiteScript | undefined>();

  useEffect(() => {
    setEditItem(selectedItem);
  }, [selectedItem]);

  const panelOverlayProps: IOverlayProps = { isDarkThemed: isDark };

  const handleSubmit = () => {
    if (editItem) {
      dispatch(setSelectedItem(editItem));
      dispatch(setConfirmEditDialog(false));
    }
  };

  const _onRenderItemFooterContent = () => {
    return (
      <PrimaryButton
        onClick={handleSubmit}
        style={{ marginRight: '8px' }}
        text={'Update'}
        disabled={!editItem?.value.length}
      />
    );
  };

  return (
    <Panel
      isOpen={editpanel}
      type={PanelType.smallFixedFar}
      onDismiss={() => {
        dispatch(setSelectedItem(undefined));
        dispatch(setEditPanel(false));
      }}
      isLightDismiss={true}
      isFooterAtBottom={true}
      headerText="Edit Site script"
      closeButtonAriaLabel="Close"
      onRenderFooterContent={_onRenderItemFooterContent}
      overlayProps={panelOverlayProps}
    >
      {selectedItem && (
        <Stack>
          <TextField
            label="Property Key"
            description="The key of the property"
            value={editItem ? editItem.key : ''}
            readOnly
            disabled
            required
          />
          <TextField
            label="Property Value"
            description="The value of the property"
            value={editItem ? editItem.value : ''}
            multiline
            rows={5}
            autoAdjustHeight
            onChange={(event, newValue?: string) => {
              if (editItem) {
                setEditItem({ ...editItem, value: newValue ? newValue : '' });
              }
            }}
          />
          <TextField
            label="Property Description"
            description="The description of the property"
            value={editItem ? editItem.description : ''}
            multiline
            rows={5}
            autoAdjustHeight
            onChange={(event, newValue?: string) => {
              if (editItem) {
                setEditItem({ ...editItem, description: newValue ? newValue : '' });
              }
            }}
          />
          <TextField
            label="Property Comment"
            description="The comment of the property"
            value={editItem ? editItem.comment : ''}
            multiline
            rows={5}
            autoAdjustHeight
            onChange={(event, newValue?: string) => {
              if (editItem) {
                setEditItem({ ...editItem, comment: newValue ? newValue : '' });
              }
            }}
          />
        </Stack>
      )}
      <Dialog
        hidden={confirmedit}
        onDismiss={() => dispatch(setConfirmEditDialog(true))}
        dialogContentProps={{
          showCloseButton: true,
          type: DialogType.normal,
          title: 'Edit Site script',
          closeButtonAriaLabel: 'Cancel',
          subText: `Sure you want to edit the selected Site script?`,
        }}
        modalProps={{
          isDarkOverlay: isDark,
        }}
      >
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              addSiteScript(dispatch, selectedItem!, true);
            }}
            text="Update"
          />
          <DefaultButton
            onClick={() => {
              dispatch(setConfirmEditDialog(true));
            }}
            text="Cancel"
          />
        </DialogFooter>
      </Dialog>
    </Panel>
  );
};

export default SiteScriptsEditPanel;
