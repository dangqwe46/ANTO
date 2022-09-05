import { INotification } from '../../Shared/shared.interface';
import { ControlBase } from '../control-base';
import { IControl } from './control.interface';

export class Control extends ControlBase implements IControl {
    
  constructor(name: string) {
    let _control = formContext?.getControl(name);
    super(_control);

    this.get = () => {
      return _control;
    };
  }

  addCustomFilter(filter: string, entityLogicaName?: string) {
    try {
      this.get()?.addCustomFilter && this.get().addCustomFilter(filter, entityLogicaName);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  addCustomView(viewId: string, entityName: string, viewDisplayName: string, fetchXml: string, layoutXml: string, isDefault: boolean) {
    try {
      this.get()?.addCustomView && this.get().addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, isDefault);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  addNotification(notification: INotification) {
    try {
      this.get()?.addNotification && this.get().addNotification(notification);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  addOnLookupTagClick(fn: () => void) {
    try {
      this.get()?.addOnLookupTagClick && this.get().addOnLookupTagClick(fn);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  addOption(option: number, index?: number) {
    try {
      this.get()?.addOption && this.get().addOption(option, index);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  addPreSearch(fn: () => void) {
    try {
      this.get()?.addPreSearch && this.get().addPreSearch(fn);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  clearNotification(uniqueId: string) {
    try {
      this.get()?.clearNotification && this.get().clearNotification(uniqueId);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  clearOptions() {
    try {
      this.get()?.clearOptions && this.get().clearOptions();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getAttribute() {
    try {
      return this.get()?.getAttribute && this.get().getAttribute();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getContentWindow(successCallback?: () => void, errorCallback?: () => void) {
    try {
      return this.get()?.getContentWindow && this.get().getContentWindow(successCallback, errorCallback);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getControl() {
    try {
      return this.get()?.getControl && this.get().getControl();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getControlType() {
    try {
      return this.get()?.getControlType && this.get().getControlType();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getData() {
    try {
      return this.get()?.getData && this.get().getData();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getDefaultView() {
    try {
      return this.get()?.getDefaultView && this.get().getDefaultView();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getDisabled() {
    try {
      return this.get()?.getDisabled && this.get().getDisabled();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getEntityTypes() {
    try {
      return this.get()?.getEntityTypes && this.get().getEntityTypes();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getInitialUrl() {
    try {
      return this.get()?.getInitialUrl && this.get().getInitialUrl();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getObject() {
    try {
      return this.get()?.getObject && this.get().getObject();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getOptions() {
    try {
      return this.get()?.getOptions && this.get().getOptions();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getSearchQuery() {
    try {
      return this.get()?.getSearchQuery && this.get().getSearchQuery();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getSelectedResults() {
    try {
      return this.get()?.getSelectedResults && this.get().getSelectedResults();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getShowTime() {
    try {
      return this.get()?.getShowTime && this.get().getShowTime();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getSrc() {
    try {
      return this.get()?.getSrc && this.get().getSrc();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getState() {
    try {
      return this.get()?.getState && this.get().getState();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getTotalResultCount() {
    try {
      return this.get()?.getTotalResultCount && this.get().getTotalResultCount();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getValue() {
    try {
      return this.get()?.getValue && this.get().getValue();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  openSearchResult(resultNumber: number, mode: 'Inline' | 'Popout') {
    try {
      return this.get()?.openSearchResult && this.get().openSearchResult(resultNumber, mode);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  refresh() {
    try {
      this.get()?.refresh && this.get().refresh();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  removeOnLookupTagClick(fn: () => void) {
    try {
      this.get()?.removeOnLookupTagClick && this.get().removeOnLookupTagClick(fn);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  removeOnPostSave(fn: () => void) {
    try {
      this.get()?.removeOnPostSave && this.get().removeOnPostSave(fn);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  removeOnPostSearch(fn: () => void) {
    try {
      this.get()?.removeOnPostSearch && this.get().removeOnPostSearch(fn);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  removeOnResultOpened(fn: () => void) {
    try {
      this.get()?.removeOnResultOpened && this.get().removeOnResultOpened(fn);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  removeOnSelection(fn: () => void) {
    try {
      this.get()?.removeOnSelection && this.get().removeOnSelection(fn);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  removeOption(value: number) {
    try {
      this.get()?.removeOption && this.get().removeOption(value);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  removePreSearch(fn: () => void) {
    try {
      this.get()?.removePreSearch && this.get().removePreSearch(fn);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  setData(value: string) {
    try {
      this.get()?.setData && this.get().setData(value);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  setDefaultView(viewId: string) {
    try {
      this.get()?.setDefaultView && this.get().setDefaultView(viewId);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  setDisabled(bool: boolean) {
    try {
      this.get()?.setDisabled && this.get().setDisabled(bool);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  setEntityTypes(entityLogicalNames: string[]) {
    try {
      this.get()?.setEntityTypes && this.get().setEntityTypes(entityLogicalNames);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  setFocus() {
    try {
      this.get()?.setFocus && this.get().setFocus();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  setNotification(message: string, uniqueId: string) {
    try {
      this.get()?.setNotification && this.get().setNotification(message, uniqueId);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  setSearchQuery(searchString: string) {
    try {
      this.get()?.setSearchQuery && this.get().setSearchQuery(searchString);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  setShowTime(bool: boolean) {
    try {
      this.get()?.setShowTime && this.get().setShowTime(bool);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  setSrc(string: string) {
    try {
      this.get()?.setSrc && this.get().setSrc(string);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
}
