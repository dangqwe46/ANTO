import { Control } from "./Control/control";
import { Tab } from "./Tab/tab";
import { Section } from "./Section/section";
import { _Navigate } from "../Navigate/navigate";
import { _GlobalContext } from "../Context/GlobalContext/globalcontext";
import { ISection } from "./Section/section.interface";

class Controls {
  private constructor() {}
  private static _instance: Controls;
  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  /* -------------------------------------------- Control -------------------------------------------- */

  getControl(name: string) {
    return new Control(name);
  }

  getAllControls() {
    return formContext?.getControl();
  }

  removeOnLookupTagClicks(fnS: (() => void)[], controlName: string) {
    for (let fn of fnS)
      this.getControl(controlName)?.removeOnLookupTagClick(fn);
  }

  removeOnPostSaves(fnS: (() => void)[], controlName: string) {
    for (let fn of fnS) this.getControl(controlName)?.removeOnPostSave(fn);
  }

  removeOnPostSearchs(fnS: (() => void)[], controlName: string) {
    for (let fn of fnS) this.getControl(controlName)?.removeOnPostSearch(fn);
  }

  removeOnResultOpeneds(fnS: (() => void)[], controlName: string) {
    for (let fn of fnS) this.getControl(controlName)?.removeOnResultOpened(fn);
  }

  removeOnSelections(fnS: (() => void)[], controlName: string) {
    for (let fn of fnS) this.getControl(controlName)?.removeOnSelection(fn);
  }

  removeOptions(options: number[], controlName: string) {
    for (let option of options)
      this.getControl(controlName)?.removeOption(option);
  }

  removePreSearchs(fnS: (() => void)[], controlName: string) {
    for (let fn of fnS) this.getControl(controlName)?.removePreSearch(fn);
  }

  setDisableds(controlNames: string[], bool: boolean) {
    for (let controlName of controlNames)
      this.getControl(controlName)?.setDisabled(bool);
  }

  setVisibles(controlNames: string[], bool: boolean) {
    for (let controlName of controlNames)
      this.getControl(controlName)?.setVisible(bool);
  }

  setDisabledAll() {
    let controls = this.getAllControls();
    for (let control of controls)
      if (control.getDisabled && !control.getDisabled())
        control.setDisabled(true);
  }

  /* -------------------------------------------- Tab -------------------------------------------- */

  getTab(name: string): Tab {
    return new Tab(name);
  }

  getAllTabs(): Tab[] {
    return formContext.ui.tabs.get();
  }

  setTabVisibles(tabNames: string[], bool: boolean) {
    for (let tabName of tabNames) this.getTab(tabName).setVisible(bool);
  }

  /* -------------------------------------------- Section -------------------------------------------- */

  getAllSections() {
    let tabs = this.getAllTabs();
    var sections: Section[] = [];
    for (let tab of tabs) {
      let _sections: ISection[] = sections.concat(
        tab["sections"] && tab["sections"].get()
      ) as ISection[];
      for (let _section of _sections) {
        sections.push(new Section(_section));
      }
    }
    return sections;
  }

  getSection(name: string, tabName?: string): Section {
    let sections: Section[] = [];
    if (tabName) {
      var tab = this.getTab(tabName).get();
      if (tab) sections = tab["sections"] && tab["sections"].get();
    } else {
      sections = this.getAllSections();
    }
    return new Section(
      sections.find((sec) => sec.getName() === name) as ISection
    );
  }

  getSections(tabName?: string): Section[] {
    let sections: Section[] = [];
    if (tabName) {
      var tab = this.getTab(tabName).get();
      if (tab) {
        let _sections = tab["sections"] && tab["sections"].get();
        for (let _section of _sections) {
          sections.push(new Section(_section));
        }
      }
    } else {
      sections = this.getAllSections();
    }
    return sections;
  }

  setSectionVisibles(bool: boolean, sectionNames: string[], tabName?: string) {
    let sections: Section[] = [];
    if (tabName) sections = this.getSections(tabName);
    else sections = this.getAllSections();

    for (let section of sections)
      if (sectionNames.indexOf(section.getName()) > -1)
        section.setVisible(bool);
  }

  openLookupDialog(executionContext?: any) {
    executionContext.getEventArgs().preventDefault();
    let lookup: IEntityReference = executionContext
      .getEventArgs()
      .getTagValue();
    _Navigate.openFormDialog(lookup.entityType, lookup.id);
  }

  addOpenLookupDialog(controlName: string, onMobile: boolean = true) {
    let client = _GlobalContext.getClient();
    if (client === "Mobile" && onMobile === false) return;
    this.getControl(controlName).addOnLookupTagClick(this.openLookupDialog);
  }

  addAllLookupOpenDialog(onMobile: boolean = true) {
    let client = _GlobalContext.getClient();
    if (client === "Mobile" && onMobile === false) return;

    let controls: Control[] = this.getAllControls();
    for (let control of controls) {
      if (control.getControlType && control.getControlType() === "lookup") {
        control.addOnLookupTagClick(this.openLookupDialog);
      }
    }
  }
}

export const _Controls = Controls.getInstance();
