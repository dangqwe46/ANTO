import { Constants } from '../../../Constant/constants';
import { IControlBase } from '../control-base';


export interface ITab extends IControlBase {
  [name: string]: any;
  addTabStateChange(fn: () => any): void;
  getContentType(): any;
  getDisplayState(): Constants.TabDisplayState;
  removeTabStateChange(fn: () => any): void;
  setContentType(contentType: string): void;
  setDisplayState(state: Constants.TabDisplayState): void;
  setFocus(): void;
}
