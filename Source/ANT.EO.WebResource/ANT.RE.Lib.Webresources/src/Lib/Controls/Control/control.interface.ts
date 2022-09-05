
import { Constants } from "../../../Constant/constants";
import { INotification } from "../../Shared/shared.interface";
import { IControlBase } from "../control-base";

export interface IControl extends IControlBase {
  addCustomFilter(filter: string, entityLogicaName?: string): void;
  addCustomView(viewId: string, entityName: string, viewDisplayName: string, fetchXml: string, layoutXml: string, isDefault: boolean): void;
  addNotification(notification: INotification): void;
  addOnLookupTagClick(fn: () => void): void;
  addOption(option: number, index?: number): void;
  addPreSearch(fn: () => void): void;
  clearNotification(uniqueId: string): void;
  clearOptions(): void;
  getAttribute(): {};
  getContentWindow(successCallback?: () => void, errorCallback?: () => void): Promise<{}>;
  getControl(): {};
  getControlType(): string;
  getData(): string;
  getDefaultView(): string;
  getDisabled(): boolean;
  getEntityTypes(): string[];
  getInitialUrl(): string;
  getObject(): {};
  getOptions(): {value: string, text: string}[];
  getSearchQuery(): string;
  getSelectedResults(): any;
  getShowTime(): boolean;
  getSrc(): string;
  getState(): Constants.TimerControlStateEnum;
  getTotalResultCount(): number;
  getValue(): string;
  openSearchResult(resultNumber: number, mode: 'Inline' | 'Popout'): boolean;
  refresh(): void;
  removeOnLookupTagClick(fn: () => any): void;
  removeOnPostSave(fn: () => void): void;
  removeOnPostSearch(fn: () => void): void;
  removeOnResultOpened(fn: () => void): void;
  removeOnSelection(fn: () => void): void;
  removeOption(value: number): void;
  removePreSearch(fn: () => void): void;
  setData(value: string): void;
  setDefaultView(viewId: string): void;
  setDisabled(bool: boolean): void;
  setEntityTypes(entityLogicalNames: string[]): void;
  setFocus(): void;
  setLabel(label: string): void;
  setNotification(message: string, uniqueId: string): void;
  setSearchQuery(searchString: string): void
  setShowTime(bool: boolean): void
  setSrc(string: string):void
}
