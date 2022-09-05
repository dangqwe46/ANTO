export { };

declare global {
  let Xrm: any;
  let ANT: any;
  let formContext: any;

  interface String {
    toODataFormattedValue(): string;
    toODataLookupId(): string;
    toODataLookupEntityType(): string;
    toODataLookupName(): string;
  }

  interface Date {
    dateDiff(date: string | Date): number;
  }

  export interface IEntityReference {
    entityType: string;
    id: string;
    name?: string;
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

  export interface IPageInput {
    pageType: 'entitylist' | 'entityrecord' | 'custom' | 'webresource' | 'dashboard';
    entityName?: string;
    viewId?: string;
    viewType?: string;

    entityId?: string;
    createFromEntity?: { entityType: string; id: string; name?: string };
    data?: string | {};
    formId?: {};
    isCrossEntityNavigate?: boolean;
    isOfflineSyncError?: boolean;
    processId?: string;
    processInstanceId?: string;
    relationship?: {};
    recordId?: string;
    webresourceName?: string;
    dashboardId?: string;
  }

  export interface INavigationOptions {
    target: 1 | 2;
    width?: number | { value: number; unit: string };
    height?: number | { value: number; unit: string };
    position?: 1 | 2;
    title?: string;
  }

  export interface IAlertStrings {
    confirmButtonLabel?: string;
    text: string;
    title?: string;
  }

  export interface IConfirmStrings extends IAlertStrings {
    cancelButtonLabel?: string;
    subtitle?: string;
  }

  export interface IEntityFormOptions {
    entityName: string;
    entityId?: string;
    formId?: string;
    cmdbar?: boolean;
    createFromEntity: { entityType: string; id: string; name?: string };
    height?: number;
    navbar: 'on' | 'off' | 'entity';
    openInNewWindow?: boolean;
    windowPosition?: 1 | 2;
    relationship: IRelationship;
    selectedStageId?: string;
    useQuickCreateForm?: boolean;
    width?: number;
  }

  export interface IRelationship {
    attributeName: string;
    name: string;
    navigationPropertyName: string;
    relationshipType: 1 | 2;
    roleType: 1 | 2;
  }

}
