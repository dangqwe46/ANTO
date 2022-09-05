import { Constants } from "../../../Constant/constants";

export interface IAttribute {

  addOnChange(fn: () => void): void;
  fireOnChange(): void;
  getAttributeType(): string | undefined;
  getFormat(): string | undefined;
  getInitialValue(): number | undefined;
  getIsDirty(): boolean | undefined;
  getIsPartyList(): boolean | undefined;
  getMax(): number | undefined;
  getMaxLength(): number | undefined;
  getMin(): number | undefined;
  getName(): string | undefined;
  getOption(value: number): {} | undefined;
  getOptions(): {}[] | undefined;
  getParent(): {} | undefined;
  getPrecision(): number | undefined;
  getRequiredLevel(): Constants.RequiredLevel | undefined;
  getSelectedOption(): {} | undefined;
  getSubmitMode(): Constants.SubmitMode | undefined;
  getText(): string | undefined;
  getUserPrivilege(): {} | undefined;
  getValue(): any;
  isValid(): boolean;
  removeOnChange(fn: () => void): void;
  setIsValid(bool: boolean, message: string): void;
  setPrecision(value: number): void;
  setRequiredLevel(requirementLevel: Constants.RequiredLevel): void;
  setSubmitMode(mode: Constants.SubmitMode): void;
  setValue(value: any): void;
}
