import {
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  Dialog,
  DialogFooter,
  DialogType,
  IColumn,
  MarqueeSelection,
  PrimaryButton,
  ScrollablePane,
  SelectionMode,
  Sticky,
  StickyPositionType,
} from '@fluentui/react';
import { Selection } from '@fluentui/react/lib/Utilities';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import {
  setConfirmRemoveDialog,
  setEditPanel,
  setSelectedItem,
  setSelectedItems,
} from '../../../store/sitescripts/actions';
import { ISiteScript } from '../../../store/sitescripts/types';
import { getAllSiteScripts, removeSiteScripts } from '../chrome/chrome-actions';

const SiteScriptsList = () => {
  const dispatch = useDispatch();
  const { siteScripts, selectedItems, confirmremove, searchstring } = useSelector(
    (state: IRootState) => state.sitescripts
  );
  const { isDark } = useSelector((state: IRootState) => state.home);

  const [sortkey, setSortkey] = useState('webkey');
  const [keyAsc, setKeyAsc] = useState(true);

  // set selected items to store
  const [selection] = useState(
    new Selection({
      onSelectionChanged: () => {
        const newSelection = selection.getSelection() as typeof selectedItems;
        dispatch(setSelectedItems(newSelection));
      },
    })
  );

  // load initial data
  useEffect(() => {
    getAllSiteScripts(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // clear selection after every update on siteScripts
  useEffect(() => {
    selection.setAllSelected(false);
    dispatch(setSelectedItems([]));
    setKeyAsc(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteScripts]);

  const onColumnClick = (_e: any, { key }: any) => {
    if (key === 'siteScriptkey') {
      siteScripts.sort((a, b) =>
        a.key.toLocaleLowerCase() < b.key.toLocaleLowerCase()
          ? keyAsc
            ? 1
            : -1
          : b.key.toLocaleLowerCase() < a.key.toLocaleLowerCase()
          ? keyAsc
            ? -1
            : 1
          : 0
      );
      setKeyAsc(!keyAsc);
    }
    setSortkey(key);

    selection.setAllSelected(false);
    dispatch(setSelectedItems([]));
  };

  const filteredProps = siteScripts.filter(
    (prop) => prop.key.toLocaleLowerCase().indexOf(searchstring.toLocaleLowerCase()) > -1
  );

  const detailsListColumns: IColumn[] = [
    {
      data: 'string',
      fieldName: 'key',
      isPadded: true,
      isResizable: true,
      isRowHeader: true,
      isSorted: sortkey === 'siteScriptkey',
      isSortedDescending: keyAsc,
      key: 'siteScriptkey',
      maxWidth: 280,
      minWidth: 160,
      name: `Property (${filteredProps.length})`,
      onColumnClick,
    },
    {
      data: 'string',
      fieldName: 'value',
      isPadded: true,
      isResizable: true,
      isRowHeader: true,
      key: 'siteScriptvalue',
      maxWidth: 450,
      minWidth: 160,
      name: 'Value',
      isMultiline: true,
      isCollapsable: false,
    },
    {
      data: 'string',
      fieldName: 'description',
      isPadded: true,
      isResizable: true,
      isRowHeader: true,
      key: 'sitescriptdescription',
      maxWidth: 450,
      minWidth: 160,
      name: 'Description',
      isMultiline: true,
      isCollapsable: false,
    },
  ];

  // make columns sticky
  const renderHeader = (headerProps: any, defaultRender: any) => {
    return (
      <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
        {defaultRender(headerProps)}
      </Sticky>
    );
  };

  // render custom column (indexed) with icon
  const _renderItemColumn = (item?: any, index?: number | undefined, column?: IColumn | undefined) => {
    const fieldContent = item[column?.fieldName as keyof ISiteScript] as string;

    return <span>{fieldContent}</span>;
  };

  return (
    <>
      <ScrollablePane>
        <MarqueeSelection selection={selection} isEnabled={true}>
          <DetailsList
            layoutMode={DetailsListLayoutMode.justified}
            onShouldVirtualize={() => false}
            items={filteredProps}
            selection={selection}
            selectionPreservedOnEmptyClick={true}
            columns={detailsListColumns}
            selectionMode={SelectionMode.single}
            getKey={(item: ISiteScript) => {
              return item.key;
            }}
            setKey="SiteScriptsset"
            isHeaderVisible={true}
            enterModalSelectionOnTouch={true}
            onItemInvoked={(item: ISiteScript) => {
              dispatch(setSelectedItem(item));
              dispatch(setEditPanel(true));
            }}
            onRenderDetailsHeader={renderHeader}
            onRenderItemColumn={_renderItemColumn}
          />
        </MarqueeSelection>
      </ScrollablePane>

      <Dialog
        hidden={confirmremove} // Dialog for Remove
        onDismiss={() => dispatch(setConfirmRemoveDialog(true))}
        dialogContentProps={{
          showCloseButton: true,
          type: DialogType.normal,
          title: 'Remove site script',
          closeButtonAriaLabel: 'Cancel',
          subText:
            selectedItems.length > 1
              ? `Sure you want to remove these ${selectedItems.length} selected site scripts?`
              : `Sure you want to remove the "${
                  selectedItems && selectedItems.length > 0 ? selectedItems[0].key : ''
                }" site script?`,
        }}
        modalProps={{
          isDarkOverlay: isDark,
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={() => removeSiteScripts(dispatch, selectedItems)} text="Remove" />
          <DefaultButton onClick={() => dispatch(setConfirmRemoveDialog(true))} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default SiteScriptsList;
