import { IAlertStrings } from './DialogStrings/alert-strings.interface';
import { IConfirmStrings } from './DialogStrings/confirm-strings.interface';
import { IEntityFormOptions } from './EntityFormOptions/entity-form-options.interface';
import { IErrorOptions, IFile, INavigate, IWindowOptions } from './navigate.interface';
import { INavigationOptions } from './NavigationOptions/navigation-options.interface';
import { IPageInput } from './PageInput/page-input.interface';

class Navigate implements INavigate {
  private constructor() {}
  private static _instance: Navigate;
  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  async navigateTo(pageInput: IPageInput, navigationOptions?: INavigationOptions, successCallback?: () => void) {
    let navigateTo = await Xrm.Navigation.navigateTo(pageInput, navigationOptions);
    if (successCallback) successCallback();
    return navigateTo;
  }

  async openAlertDialog(alertStrings: IAlertStrings, alertOptions?: IWindowOptions, closeCallback?: () => void): Promise<any> {
    var openAlertDialog = await Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);

    if (closeCallback) closeCallback();
    return openAlertDialog;
  }
  async openConfirmDialog(confirmStrings: IConfirmStrings, confirmOptions?: IWindowOptions, confirmCallback?: () => void, closeCallback?: () => void): Promise<any> {
    var openAlertDialog = await Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions);
    if (openAlertDialog.confirmed) {
      if (confirmCallback) confirmCallback();
    } else {
      if (closeCallback) closeCallback();
    }
    return openAlertDialog;
  }

  async openErrorDialog(errorOptions: IErrorOptions, successCallback?: () => void): Promise<any> {
    var openAlertDialog = await Xrm.Navigation.openErrorDialog(errorOptions);
    if (successCallback) successCallback();
    return openAlertDialog;
  }

  openFile(file: IFile, openFileOptions: { openMode: 1 | 2 }): void {
    Xrm.Navigation.openFile(file, openFileOptions);
  }

  async openForm(entityFormOptions: IEntityFormOptions, formParameters: {}, successCallback?: () => void): Promise<any> {
    var openForm = await Xrm.Navigation.openForm(entityFormOptions, formParameters);
    if (successCallback) successCallback();
    return openForm;
  }

  openUrl(url: string, openUrlOptions: IWindowOptions): void {
    Xrm.Navigation.openUrl(url, openUrlOptions);
  }

  openWebResource(webResourceName: string, windowOptions: IWindowOptions, data: string): void {
    Xrm.Navigation.openWebResource(webResourceName, windowOptions, data);
  }

  async openWebResourceDialog(webresourceName: string, data?: string, title?: string, height?: number, width?: number, position?: 1 | 2): Promise<any> {
    let pageInput = <IPageInput>{};
    pageInput.pageType = 'webresource';
    pageInput.webresourceName = webresourceName;

    if (data) pageInput.data = data;

    var navigationOptions: INavigationOptions = <INavigationOptions>{};
    navigationOptions.target = 2;
    if (height) navigationOptions.height = height;
    if (width) navigationOptions.width = width;
    if (position) navigationOptions.position = position;
    if (title) navigationOptions.title = title;
    let openWebResourceDialog = await this.navigateTo(pageInput, navigationOptions);
    return openWebResourceDialog;
  }

  async openView(entityName: string, viewId?: string, viewType?: 'savedquery' | 'userquery', navigationOptions?: INavigationOptions, callback?: () => void): Promise<any> {
    let pageInput = <IPageInput>{};
    pageInput.pageType = 'entitylist';
    pageInput.entityName = entityName;
    if (viewId) pageInput.viewId = viewId;
    if (viewType) pageInput.viewType = viewType;

    let openView = await this.navigateTo(pageInput, navigationOptions);
    if (callback) return callback();
    return openView;
  }

  async openDashboard(dashboardId?: string, navigationOptions?: INavigationOptions, callback?: () => void): Promise<any> {
    let pageInput = <IPageInput>{};
    pageInput.pageType = 'dashboard';
    if (dashboardId) pageInput.dashboardId = dashboardId;

    let openView = await this.navigateTo(pageInput, navigationOptions);
    if (callback) callback();

    return openView;
  }

  async openFormDialog(entityName: string, entityId?: string, height?: number, width?: number, position?: 1 | 2): Promise<any> {
    let pageInput = <IPageInput>{};
    pageInput.pageType = 'entityrecord';
    pageInput.entityName = entityName;
    if (entityId) pageInput.entityId = entityId;

    var navigationOptions: INavigationOptions = <INavigationOptions>{};
    navigationOptions.target = 2;
    if (height) navigationOptions.height = height;
    if (width) navigationOptions.width = width;
    if (position) navigationOptions.position = position;

    let openFormDialog = await this.navigateTo(pageInput, navigationOptions);
    return openFormDialog;
  }
}

export let _Navigate = Navigate.getInstance();
