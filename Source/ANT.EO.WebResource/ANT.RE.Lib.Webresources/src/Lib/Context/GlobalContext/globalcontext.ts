import { logger } from '../../Logger/logger';
import { FormContext } from '../FormContext/formcontext';
import { IGlobalContext } from './globalContext.interface';

export class GlobalContext extends FormContext implements IGlobalContext {
  userSettings: any;
  client: any;
  organizationSettings: any;
  constructor() {
    super();
    this.userSettings = this.globalContext.userSettings;
    this.client = this.globalContext.client;
    this.organizationSettings = this.globalContext.organizationSettings;
  }
  getAdvancedConfigSetting(setting: string) {
    try {
      return this.globalContext.getAdvancedConfigSetting(setting);
    } catch (e: any) {
      logger.Error(e.message, 'GlobalContext.getAdvancedConfigSetting');
    }
  }
  getClientUrl(): any {
    try {
      return this.globalContext.getClientUrl();
    } catch (e: any) {
      logger.Error(e.message, 'GlobalContext.getClientUrl');
    }
  }
  getCurrentAppName(): any {
    try {
      return this.globalContext.getCurrentAppName();
    } catch (e: any) {
      logger.Error(e.message, 'GlobalContext.getCurrentAppName');
    }
  }
  getCurrentAppProperties(): any {
    try {
      return this.globalContext.getCurrentAppProperties();
    } catch (e: any) {
      logger.Error(e.message, 'GlobalContext.getCurrentAppProperties');
    }
  }
  getCurrentAppUrl(): any {
    try {
      return this.globalContext.getCurrentAppUrl();
    } catch (e: any) {
      logger.Error(e.message, 'GlobalContext.getCurrentAppUrl');
    }
  }
  getVersion(): any {
    try {
      return this.globalContext.getVersion();
    } catch (e: any) {
      logger.Error(e.message, 'GlobalContext.getVersion');
    }
  }
  getWebResourceUrl(webResourceName: string): any {
    try {
      return this.globalContext.getWebResourceUrl(webResourceName);
    } catch (e: any) {
      logger.Error(e.message, 'GlobalContext.getWebResourceUrl');
    }
  }
  getClient(): 'Web' | 'Mobile' {
    return this.client.getClient();
  }
}

export const _GlobalContext = new GlobalContext();
