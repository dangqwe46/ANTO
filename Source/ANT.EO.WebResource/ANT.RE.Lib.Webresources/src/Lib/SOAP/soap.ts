import { EntityBase } from './entityBase';
import { FetchKit } from './fetchKit';
import { BusinessEntity } from './objectType';
import { Process } from './process';

class SOAP {
  public _FetchKit: FetchKit = new FetchKit();
  public _Process: Process = new Process();
  public _EntityBase: EntityBase = new EntityBase();

  public BusinessEntity = (logicalName?: string, id?: string) => {
    return new BusinessEntity(logicalName, id);
  };

  public fetch = (fetchXml: string, async: boolean) => {
    return this._FetchKit.fetch(fetchXml, async);
  };
  public fetchAll = (fetchXml: string, async: boolean) => {
    return this._FetchKit.fetchAll(fetchXml, async);
  };
  public fetchMore = (fetchXml: string, async: boolean) => {
    return this._FetchKit.fetchMore(fetchXml, async);
  };

  public callAction = (actionName: string, inputParams: any, successCallBack: any, errorCallback: any, async: boolean) => {
    this._Process.callAction(actionName, inputParams, successCallBack, errorCallback, async);
  };

  public callWorkflow = (workflowId: string, recordId: string, successCallBack: any, errorCallback: any, async: boolean) => {
    this._Process.callWorkflow(workflowId, recordId, successCallBack, errorCallback, async);
  };

  public setState(entityName: string, recordId: string, stateCode: number, statusCode: number, async: boolean, internalCallback: any) {
    this._EntityBase.setState(entityName, recordId, stateCode, statusCode, async, internalCallback);
  }

  public assign(id: string, entityname: string, assigneeid: string, async: boolean) {
    return this._EntityBase.assign(id, entityname, assigneeid, async);
  }

  public retrieve = (entityName: string, id: string, columnSet: any, async: boolean, internalCallback: any) => {
    this._EntityBase.retrieve(entityName, id, columnSet, async, internalCallback);
  };

  public create = (be: any, internalCallback: any) => {
    this._EntityBase.create(be, internalCallback);
  };

  public update = (be: any, internalCallback: any) => {
    this._EntityBase.update(be, internalCallback);
  };

  public delete = (entityName: string, id: string, internalCallback: any) => {
    this._EntityBase.delete(entityName, id, internalCallback);
  };

  public retrieveMultiple = (query: string, internalCallback: any) => {
    this._EntityBase.retrieveMultiple(query, internalCallback);
  };

  public associate = (relationshipName: string, targetEntityName: string, targetId: string, relatedEntityName: string, relatedBusinessEntities: string, internalCallback: any) => {
    this._EntityBase.associate(relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, internalCallback);
  };

  public disassociate = (relationshipName: string, targetEntityName: string, targetId: string, relatedEntityName: string, relatedBusinessEntities: string, internalCallback: any) => {
    this._EntityBase.disassociate(relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, internalCallback);
  };
}

export const _SOAP = new SOAP();
