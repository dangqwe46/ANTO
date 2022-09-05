
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

  