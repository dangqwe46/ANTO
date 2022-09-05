import { IAlertStrings } from "./DialogStrings/alert-strings.interface";
import { IConfirmStrings } from "./DialogStrings/confirm-strings.interface";
import { IEntityFormOptions } from "./EntityFormOptions/entity-form-options.interface";
import { INavigationOptions } from "./NavigationOptions/navigation-options.interface";
import { IPageInput } from "./PageInput/page-input.interface";

export interface INavigate {
  navigateTo(pageInput: IPageInput, navigationOptions?: INavigationOptions, successCallback?: () => void, errorCallback?: () => any): Promise<any>;
  openAlertDialog(alertStrings: IAlertStrings, alertOptions: IWindowOptions, closeCallback?: () => void, errorCallback?: () => any): Promise<any>;
  openConfirmDialog(confirmStrings: IConfirmStrings, confirmOptions: IWindowOptions, confirmCallback?: () => void, closeCallback?: () => void, errorCallback?: () => any): Promise<any>;
  openErrorDialog(errorOptions: IErrorOptions, successCallback?: () => void, errorCallback?: () => void): Promise<any>;
  openFile(file: IFile, openFileOptions: { openMode: 1 | 2 }): void;
  openForm(entityFormOptions: IEntityFormOptions, formParameters: {}, successCallback?: () => void, errorCallback?: () => any): Promise<any>;
  openUrl(url: string, openUrlOptions: IWindowOptions): void;
  openWebResource(webResourceName: string, windowOptions: IWindowOptions, data: string): void;
}

export interface IWindowOptions {
  height?: number;
  width?: number;
}

export interface IErrorOptions {
  details?: string;
  errorCode?: number;
  message?: string;
}

export interface IFile {
  fileContent: string;
  fileName: string;
  fileSize: string;
  mimeType: string;
}


