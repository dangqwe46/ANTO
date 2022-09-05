import { IControl } from './Control/control.interface';
import { ISection } from "./Section/section.interface";
import { ITab } from "./Tab/tab.interface";


export class ControlBase implements IControlBase {
  get: () => IControl | ITab | ISection | any;

  constructor(control: IControl | ISection | ITab) {
    let _control = control;
    this.get = function(){
      return _control;
    } 
  }

  getLabel() {
    return this.get()?.getLabel && this.get().getLabel();
  }

  getName() {
    return this.get()?.getName && this.get().getName();
  }

  getParent() {
    return this.get()?.getParent && this.get().getParent();
  }

  getVisible() {
    return this.get()?.getVisible && this.get().getVisible();
  }

  setLabel(label: string) {
    this.get()?.setLabel && this.get().setLabel(label);
  }

  setVisible(bool: boolean) {
    this.get()?.setVisible && this.get().setVisible(bool);
  }
}

export interface IControlBase {
  getLabel(): string;
  getName(): string;
  getParent(): {};
  getVisible(): boolean;
  setLabel(label: string): void;
  setVisible(bool: boolean): void;
}
