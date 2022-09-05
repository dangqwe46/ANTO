import { ControlBase } from '../control-base';
import { _Controls } from '../controls';
import { Section } from '../Section/section';
import { ISection } from '../Section/section.interface';
import { ITab } from './tab.interface';


export class Tab extends ControlBase implements ITab {
  [name: string]: any;

  constructor(name: string) {
    let _tab = formContext.ui.tabs.get(name);
    super(_tab);
    this.get = () => {
      return _tab;
    };
  }

  addTabStateChange(fn: () => any) {
    this.get()?.addTabStateChange && this.get().addTabStateChange(fn);
  }

  getContentType() {
    return this.get()?.getContentType && this.get().getContentType();
  }

  getDisplayState() {
    return this.get()?.getDisplayState && this.get().getDisplayState();
  }

  removeTabStateChange(fn: () => any) {
    this.get()?.removeTabStateChange && this.get().removeTabStateChange(fn);
  }
  setContentType(contentType: string) {
    this.get()?.setContentType && this.get().setContentType(contentType);
  }

  setDisplayState(state: 'expanded' | 'collapsed') {
    this.get()?.setDisplayState && this.get().setDisplayState(state);
  }

  setFocus() {
    this.get()?.setFocus && this.get().setFocus();
  }

  getSection(name: string) {
    return this.get() && _Controls.getSection(name, this.getName());
  }

  getSections() {
      return this.get() && _Controls.getSections(this.getName());
  }
}
