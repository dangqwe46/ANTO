import { Constants } from '../../../Constant/constants';
import { IAttribute } from './attribute.interface';

export class Attribute implements IAttribute {

  get: () => IAttribute;

  constructor(name: string) {
    let _attribute = formContext.getAttribute(name);
    this.get = function () {
      return _attribute;
    };
  }

  addOnChange(fn: () => void) {
    try {
      fn && this.get()?.addOnChange && this.get().addOnChange(fn);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  fireOnChange() {
    try {
      this.get()?.fireOnChange && this.get().fireOnChange();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  getAttributeType() {
    try {
      return this.get()?.getAttributeType && this.get().getAttributeType();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getFormat() {
    try {
      return this.get()?.getFormat && this.get().getFormat();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getInitialValue() {
    try {
      return this.get()?.getInitialValue && this.get().getInitialValue();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getIsDirty() {
    try {
      return this.get()?.getIsDirty && this.get().getIsDirty();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getIsPartyList() {
    try {
      return this.get()?.getIsPartyList && this.get().getIsPartyList();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getMax() {
    try {
      return this.get()?.getMax && this.get().getMax();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getMaxLength() {
    try {
      return this.get()?.getMaxLength && this.get().getMaxLength();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getMin() {
    try {
      return this.get()?.getMin && this.get().getMin();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getName() {
    try {
      return this.get()?.getName && this.get().getName();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getOption(option: number) {
    try {
      return this.get()?.getOption && this.get().getOption(option);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getOptions() {
    try {
      return this.get()?.getOptions && this.get().getOptions();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getParent() {
    try {
      return this.get()?.getParent && this.get().getParent();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getPrecision() {
    try {
      return this.get()?.getPrecision && this.get().getPrecision();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getRequiredLevel() {
    try {
      return this.get()?.getRequiredLevel && this.get().getRequiredLevel();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getSelectedOption() {
    try {
      return this.get()?.getSelectedOption && this.get().getSelectedOption();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getSubmitMode() {
    try {
      return this.get()?.getSubmitMode && this.get().getSubmitMode();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getText() {
    try {
      return this.get()?.getText && this.get().getText();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getUserPrivilege() {
    try {
      return this.get()?.getUserPrivilege && this.get().getUserPrivilege();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return;
  }
  getValue() {
    try {
      return this.get()?.getValue && this.get().getValue();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  isValid() {
    try {
      return this.get()?.isValid && this.get().isValid();
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
    return false;
  }
  removeOnChange(fn: () => any) {
    try {
      fn && this.get()?.removeOnChange && this.get().removeOnChange(fn);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  setIsValid(bool: boolean, message: string) {
    try {
      this.get()?.setIsValid && this.get().setIsValid(bool, message);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  setPrecision(value: number) {
    try {
      this.get()?.setPrecision && this.get().setPrecision(value);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  setRequiredLevel(requirementLevel: Constants.RequiredLevel) {
    try {
      if (
        requirementLevel !== Constants.RequiredLevel.None &&
        requirementLevel !== Constants.RequiredLevel.Recommended &&
        requirementLevel !== Constants.RequiredLevel.Required
      )
        return console.log('[Error]: Invalid value for RequiredLevel');
      this.get()?.setRequiredLevel && this.get().setRequiredLevel(requirementLevel);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  setSubmitMode(mode: Constants.SubmitMode) {
    try {
      if (mode !== Constants.SubmitMode.Always && mode !== Constants.SubmitMode.Dirty && mode !== Constants.SubmitMode.Never)
        return console.log('[Error]: Invalid value for SubmitMode');
      this.get()?.setSubmitMode && this.get().setSubmitMode(mode);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
  setValue(value: any) {
    try {
      this.get()?.setValue && this.get().setValue(value);
    } catch (ex: any) {
      console.log('[ERROR]: ' + ex.message);
    }
  }
}
