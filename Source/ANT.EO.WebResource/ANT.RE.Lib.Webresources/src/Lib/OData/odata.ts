import { Utilities } from '../Utility/utility';
import { _Validation } from '../Validation/validation';
import { Constants } from './../../Constant/constants';

class OData {
  private constructor() {}
  private static _instance: OData;
  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  associateRecords = async (target: { entityType: string; id: string }, relatedEntities: { entityType: string; id: string }[], relationship: string): Promise<any> => {
    relatedEntities.forEach((_) => (_.id = Utilities.removeBrackets(_.id)));
    let request: any = { target, relatedEntities, relationship };
    request.getMetadata = function () {
      return {
        boundParameter: Constants.BoundParameter.Global,
        parameterTypes: {},
        operationType: Constants.OperationType.CRUD,
        operationName: 'Associate',
      };
    };
    let associateRecords = await this.execute(request);
    return associateRecords;
  };

  callWorkflow = async (entityId: string, workflowId: string): Promise<any> => {
    let request: any = {};
    request.EntityId = { guid: entityId };
    request.entity = {
      id: workflowId,
      entityType: 'workflow',
    };
    request.getMetadata = function () {
      return {
        boundParameter: Constants.BoundParameter.Entity,
        parameterTypes: {
          entity: {
            typeName: 'Microsoft.Dynamics.CRM.Workflow',
            structuralProperty: Constants.StructuralProperty.EntityType,
          },
          EntityId: {
            typeName: 'Edm.Guid',
            structuralProperty: Constants.StructuralProperty.PrimitiveType,
          },
        },
        operationType: Constants.OperationType.Action,
        operationName: 'ExecuteWorkflow',
      };
    };

    let callWorkFlow = await this.execute(request);
    return callWorkFlow;
  };

  createRecord = async (entityLogicalName: string, data: {}, successCallback?: () => void, errorCallback?: () => void): Promise<any> =>
    (successCallback && Xrm.WebApi.createRecord(entityLogicalName, data).then(successCallback, errorCallback)) || Xrm.WebApi.createRecord(entityLogicalName, data);

  deleteRecord = async (entityLogicalName: string, id: string, successCallback?: () => void, errorCallback?: () => void): Promise<any> =>
    (successCallback && Xrm.WebApi.deleteRecord(entityLogicalName, id).then(successCallback, errorCallback)) || Xrm.WebApi.deleteRecord(entityLogicalName, id);

  disassociateRecord = async (target: { entityType: string; id: string }, relatedEntityId: string, relationship: string): Promise<any> => {
    let disassociateRecord = await this.execute(this.initDisassociateRequest(target, Utilities.removeBrackets(relatedEntityId), relationship));
    return disassociateRecord;
  };

  disassociateRecords = async (target: { entityType: string; id: string }, relatedEntityIds: string[], relationship: string): Promise<any> => {
    var changeSet = [];
    for (let relatedEntityId of relatedEntityIds) {
      changeSet.push(this.initDisassociateRequest(target, Utilities.removeBrackets(relatedEntityId), relationship));
    }
    let requests = [changeSet];

    let disassociateRecords = await this.executeMultiple(requests);
    return disassociateRecords;
  };

  execute = async (request: any, successCallback?: () => void, errorCallback?: () => void): Promise<any> =>
    (successCallback && Xrm.WebApi.online.execute(request).then(successCallback, errorCallback)) || Xrm.WebApi.online.execute(request);

  executeMultiple = async (requests: any[], successCallback?: () => void, errorCallback?: () => void): Promise<any> =>
    (successCallback && Xrm.WebApi.online.executeMultiple(requests).then(successCallback, errorCallback)) || Xrm.WebApi.online.executeMultiple(requests);

  initDisassociateRequest = (target: { entityType: string; id: string }, relatedEntityId: string, relationship: string): any => {
    let request: any = { target, relatedEntityId: Utilities.removeBrackets(relatedEntityId), relationship };
    request.getMetadata = function () {
      return {
        boundParameter: Constants.BoundParameter.Global,
        parameterTypes: {},
        operationType: Constants.OperationType.CRUD,
        operationName: 'Disassociate',
      };
    };
    return request;
  };

  retrieveRecord = async (entityLogicalName: string, id: string, options?: string, successCallback?: () => void, errorCallback?: () => void): Promise<any> =>
    (successCallback && Xrm.WebApi.retrieveRecord(entityLogicalName, Utilities.removeBrackets(id), options).then(successCallback, errorCallback)) ||
    Xrm.WebApi.retrieveRecord(entityLogicalName, id, options);

  retrieveMultipleRecords = async (entityLogicalName: string, options: string, maxPageSize?: number | null, successCallback?: () => void, errorCallback?: () => void): Promise<any> => {
    if (_Validation.isFetchXml(options)) options = '?fetchXml=' + options;
    return (
      (successCallback && Xrm.WebApi.retrieveMultipleRecords(entityLogicalName, options, maxPageSize).then(successCallback, errorCallback)) ||
      Xrm.WebApi.retrieveMultipleRecords(entityLogicalName, options, maxPageSize)
    );
  };

  retrievePageFetchXml = async (
    entityLogicalName: string,
    fetchXml: string,
    pageNumber: number,
    count: number,
    pagingCookie: string,
    successCallback?: () => void,
    errorCallback?: () => void
  ): Promise<any> => {
    if (!fetchXml || typeof fetchXml !== 'string') return console.log('[Error]: Invalid XML');

    var fetchXml = '?fetchXml=' + Utilities.createFetchXml(fetchXml, pagingCookie, pageNumber, count);

    return this.retrieveMultipleRecords(entityLogicalName, fetchXml, null, successCallback, errorCallback);
  };

  retrieveAllRecordsFetchXml = async (entityLogicalName: string, fetchXml: string, count: number): Promise<any> => {
    if (!fetchXml || typeof fetchXml !== 'string') return console.log('[Error]: Invalid XML');
    var page = 1;

    var entities: any[] = [];
    var pagingCookie = null;

    do {
      var result: any = await this.retrievePageFetchXml(entityLogicalName, fetchXml, page, count, pagingCookie);
      if (result) entities = entities.concat(result.entities);

      pagingCookie = result.fetchXmlPagingCookie;
      page++;
    } while (result.fetchXmlPagingCookie);

    return entities;
  };

  setStateReocord = async (entityLogicalName: string, id: string, statecode: number, statuscode: number, successCallback?: () => void, errorCallback?: () => void): Promise<any> => {
    return await this.updateRecord(entityLogicalName, Utilities.removeBrackets(id), { statecode, statuscode }, successCallback, errorCallback);
  };

  updateRecord = async (entityLogicalName: string, id: string, data: {}, successCallback?: () => void, errorCallback?: () => void): Promise<any> =>
    (successCallback && Xrm.WebApi.updateRecord(entityLogicalName, Utilities.removeBrackets(id), data).then(successCallback, errorCallback)) || Xrm.WebApi.updateRecord(entityLogicalName, id, data);

  doRequest = (action: string, uri: string, data?: {}): Promise<any> => {
    if (!RegExp(action, 'g').test('POST PATCH PUT GET DELETE')) {
      // Expected action verbs.
      throw new Error('Request: action parameter must be one of the following: ' + 'POST, PATCH, PUT, GET, or DELETE.');
    }
    if (typeof uri !== 'string') {
      throw new Error('Request: uri parameter must be a string.');
    }
    if (RegExp(action, 'g').test('PATCH PUT') && (data === null || data === undefined)) {
      throw new Error('Request: data parameter must not be null for operations that create or modify data.');
    }

    // Construct a fully qualified URI if a relative URI is passed in.
    if (uri.charAt(0) === '/') {
      uri = Xrm.Utility.getGlobalContext().getClientUrl() + '/api/data/v9.1' + uri;
    }

    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.open(action, encodeURI(uri), true);
      request.setRequestHeader('OData-MaxVersion', '4.0');
      request.setRequestHeader('OData-Version', '4.0');
      request.setRequestHeader('Accept', 'application/json');
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          request.onreadystatechange = null;
          switch (this.status) {
            case 200: // Success with content returned in response body.
            case 204: // Success with no content returned in response body.
              resolve(this);
              break;
            default:
              // All other statuses are unexpected so are treated like errors.
              var error;
              try {
                error = JSON.parse(request.response).error;
              } catch (e: any) {
                error = new Error(e);
              }
              reject(error);
              break;
          }
        }
      };
      request.send(JSON.stringify(data));
    });
  };

  getFileColumn(entityset: string, id: string, field: string): Promise<any> {
    if (!entityset) throw new Error('entityset parameter must not be null ');
    if (!id) throw new Error('id parameter must not be null ');
    if (!field) throw new Error('field parameter must not be null ');

    let action = 'GET';
    let uri = `/${entityset}(${Utilities.removeBrackets(id)})/${field}/$value`;

    return this.doRequest(action, uri);
  }

  callAction = async (entityName: string, id: string, actionName: string, data: any): Promise<any> => {
    let uri = '/';
    if (typeof actionName !== 'string' || actionName === '') throw new Error('actionName parameter is invalid.');

    if (entityName) {
      let entityMetadata = await Utilities.getEntityMetadata(entityName);
      if (entityMetadata !== null && entityName !== entityMetadata.EntitySetName) entityName = entityMetadata.EntitySetName;

      uri += entityName;
      if (id) uri += `(${id})`;
      uri += '/' + (actionName.startsWith('Microsoft.Dynamics.CRM.') ? actionName : 'Microsoft.Dynamics.CRM.' + actionName);
    } else uri += actionName;

    let callAction = await this.doRequest('POST', uri, data);
    return callAction;
  };
}

export const _OData = OData.getInstance();
