import { ContextBase } from "../contextBase";
import { IFormContext } from "./formContext.interface";
import { logger } from '../../Logger/logger'

export class FormContext extends ContextBase implements IFormContext {

  constructor() {
    super();
  }
  refresh(_save: boolean): Promise<{}> {
    throw new Error("Method not implemented.");
  }
  getFormSelector(id?: string) {
    try {
      return this.context.ui.formSelector.items.get(id ? id : undefined);
    }
    catch (e: any) {
      logger.Error(e.message, "FormContext.getFormSelector", 15)
    }
  }
  getCurrentItem() {
    try {
      return this.context.ui.formSelector.getCurrentItem();
    }
    catch (e: any) {
      logger.Error(e.message, "FormContext.getCurrentItem", 23)
    }
  }

  close(): void {
    try {
      this.context['ui']['close']();
    }
    catch (e: any) {
      logger.Error(e.message, "FormContext.close", 32)
    }
  }

  getViewPortHeight(): any {
    try {
      return this.context['ui']['getViewPortHeight']();
    }
    catch (e: any) {
      logger.Error(e.message, "FormContext.getViewPortHeight", 41)
    }
  }

  getViewPortWidth(): any {
    try {
      return this.context['ui']['getViewPortWidth']();
    }
    catch (e: any) {
      logger.Error(e.message, "FormContext.getViewPortWidth", 41)
    }
  }

  getIsDirty(): any {
    try {
      return this.context['data']['entity']['getIsDirty']();
    }
    catch (e: any) {
      logger.Error(e.message, "FormContext.getIsDirty", 59)
    }
  }
  isValid(): any {
    try {
      return this.context['data']['entity']['isValid']();
    }
    catch (e: any) {
      logger.Error(e.message, "FormContext.isValid", 67)
    }
  }
  save(option: string): any {
    try {
      return this.context['data']['entity']["save"](option);
    }
    catch (e: any) {
      logger.Error(e.message, "FormContext.save", 75)
    }
  }
  refreshData(save: boolean): any {
    try {
      return this.context['data']["refresh"](save);
    }
    catch (e: any) {
      logger.Error(e.message, "FormContext.refreshData", 83)
    }
    }
    refreshUI(save: boolean): any {
        try {
            return this.context['ui']["refresh"](save);
        }
        catch (e: any) {
            logger.Error(e.message, "FormContext.refreshUI", 83)
        }
    }
  getFormType(): any {
    try {
      return this.context['ui']['getFormType']();
    }
    catch (e: any) {
      logger.Error(e.message, "FormContext.getFormType", 91)
    }
  }
  refreshRibbon(refreshAll: boolean) {
    try {
      this.context['ui']['refreshRibbon'](refreshAll);
    }
    catch (e: any) {
      logger.Error(e.message, "FormContext.refreshRibbon", 99)
    }
  }
  setFormNotification(message: string, level: string, uniqueId: string): void {
    try {
      this.context['ui'].setFormNotification(message, level, uniqueId);
    }
    catch (e: any) {
      logger.Error(e.message, "FormContext.setFormNotification", 107)
    }

  }
  clearFormNotification(uniqueId: string): void {
    try {
      this.context['ui'].clearFormNotification(uniqueId);
    }
    catch (e: any) {
      logger.Error(e.message, "FormContext.clearFormNotification", 116)
    }
  }

  navigation() {
    try {
      return this.context.ui.navigation
    }
    catch (e: any) {
      logger.Error(e.message, "FormContext.navigation", 126)
    }
  }

  quickForms() {
    try {
      return this.context.ui.quickForms
    }
    catch (e: any) {
      logger.Error(e.message, "FormContext.quickForms", 126)
    }
  }
}

export const _FormContext =  new FormContext();