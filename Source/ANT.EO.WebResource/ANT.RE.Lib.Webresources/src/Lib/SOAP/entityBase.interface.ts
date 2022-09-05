export interface IEntityBase {
    ///<summary>
    /// Sends synchronous/asynchronous request to setState of a record.
    ///</summary>
    ///<param name="entityName" type="String">
    /// A JavaScript String corresponding to the Schema name of
    /// entity that is used for setState operations.
    /// </param>
    ///<param name="id" type="String">
    /// A JavaScript String corresponding to the GUID of
    /// entity that is used for setState operations.
    /// </param>
    ///<param name="stateCode" type="Int">
    /// A JavaScript Integer corresponding to the value of
    /// entity state that is used for setState operations.
    /// </param>
    ///<param name="statusCode" type="Int">
    /// A JavaScript Integer corresponding to the value of
    /// entity status that is used for setState operations.
    /// </param>
    ///<param name="callback" type="Function">
    /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
    /// </param>
    setState(entityName: string, recordId: string, stateCode: number, statusCode: number, successCallback: any, errorCallback: any, async: boolean): void
    ///<summary>
    /// Sends synchronous/asynchronous request to assign an existing record to a user / a team.
    ///</summary>
    ///<param name="targetEntityName" type="String">
    /// A JavaScript String corresponding to the schema name of the target entity
    /// that is used for assign operations.
    /// </param>
    ///<param name="targetId" type="String">
    /// A JavaScript String corresponding to the GUID of the target entity
    /// that is used for assign operations.
    /// </param>
    ///<param name="assigneeEntityName" type="String">
    /// A JavaScript String corresponding to the schema name of the assignee entity
    /// that is used for assign operations.
    /// </param>
    ///<param name="assigneeId" type="String">
    /// A JavaScript String corresponding to the GUID of the assignee entity
    /// that is used for assign operations.
    /// </param>
    ///<param name="callback" type="Function">
    /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
    /// </param>
    assign(id: string, entityname: string, assigneeid: string, opt_asyn: boolean): any
    doSoapRequest(soapBody: any, requestType: string, async: boolean, internalCallback: any): any
    ///<summary>
    /// Sends synchronous/asynchronous request to retrieve a record.
    ///</summary>
    ///<param name="entityName" type="String">
    /// A JavaScript String corresponding to the Schema name of
    /// entity that is used for retrieve operations.
    /// </param>
    ///<param name="id" type="String">
    /// A JavaScript String corresponding to the GUID of
    /// entity that is used for retrieve operations.
    /// </param>
    ///<param name="columnSet" type="Array">
    /// A JavaScript Array corresponding to the attributes of
    /// entity that is used for retrieve operations.
    /// </param>
    ///<param name="internalCallback" type="Function">
    /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
    /// </param>
    retrieve(entityName: string, id: string, columnSet: any, async: boolean, internalCallback: any): any

    ///<summary>
    /// Sends synchronous/asynchronous request to do a retrieveMultiple request.
    ///</summary>
    ///<param name="query" type="String">
    /// A JavaScript String with properties corresponding to the retrievemultiple request
    /// that are valid for retrievemultiple operations.
    /// </param>
    ///<param name="internalCallback" type="Function">
    /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
    /// </param>
    retrieveMultiple(query: string, internalCallback: any): any

    ///<summary>
    /// Sends synchronous/asynchronous request to create a new record.
    ///</summary>
    ///<param name="be" type="Object">
    /// A JavaScript object with properties corresponding to the Schema name of
    /// entity attributes that are valid for create operations.
    /// </param>
    ///<param name="internalCallback" type="Function">
    /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
    /// </param>
    create(be: any, internalCallback: any): any

    ///<summary>
    /// Sends synchronous/asynchronous request to update an existing record.
    ///</summary>
    ///<param name="businessEntity" type="Object">
    /// A JavaScript object with properties corresponding to the Schema name of
    /// entity attributes that are valid for update operations.
    /// </param>
    ///<param name="internalCallback" type="Function">
    /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
    /// </param>
    update(be: any, internalCallback: any): any

    ///<summary>
    /// Sends synchronous/asynchronous request to delete a record.
    ///</summary>
    ///<param name="entityName" type="String">
    /// A JavaScript String corresponding to the Schema name of
    /// entity that is used for delete operations.
    /// </param>
    ///<param name="id" type="String">
    /// A JavaScript String corresponding to the GUID of
    /// entity that is used for delete operations.
    /// </param>
    ///<param name="internalCallback" type="Function">
    /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
    /// </param>
    delete(entityName: string, id: string, internalCallback: any): any

    ///<summary>
    /// Sends synchronous/asynchronous request to associate records.
    ///</summary>
    ///<param name="relationshipName" type="String">
    /// A JavaScript String corresponding to the relationship name
    /// that is used for associate operations.
    /// </param>
    ///<param name="targetEntityName" type="String">
    /// A JavaScript String corresponding to the schema name of the target entity
    /// that is used for associate operations.
    /// </param>
    ///<param name="targetId" type="String">
    /// A JavaScript String corresponding to the GUID of the target entity
    /// that is used for associate operations.
    /// </param>
    ///<param name="relatedEntityName" type="String">
    /// A JavaScript String corresponding to the schema name of the related entity
    /// that is used for associate operations.
    /// </param>
    ///<param name="relationshipBusinessEntities" type="Array">
    /// A JavaScript Array corresponding to the collection of the related entities as BusinessEntity
    /// that is used for associate operations.
    /// </param>
    ///<param name="internalCallback" type="Function">
    /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
    /// </param>
    associate(relationshipName: string, targetEntityName: string, targetId: string, relatedEntityName: string, relatedBusinessEntities: string, internalCallback: any): any

    ///<summary>
    /// Sends synchronous/asynchronous request to disassociate records.
    ///</summary>
    ///<param name="relationshipName" type="String">
    /// A JavaScript String corresponding to the relationship name
    /// that is used for disassociate operations.
    /// </param>
    ///<param name="targetEntityName" type="String">
    /// A JavaScript String corresponding to the schema name of the target entity
    /// that is used for disassociate operations.
    /// </param>
    ///<param name="targetId" type="String">
    /// A JavaScript String corresponding to the GUID of the target entity
    /// that is used for disassociate operations.
    /// </param>
    ///<param name="relatedEntityName" type="String">
    /// A JavaScript String corresponding to the schema name of the related entity
    /// that is used for disassociate operations.
    /// </param>
    ///<param name="relationshipBusinessEntities" type="Array">
    /// A JavaScript Array corresponding to the collection of the related entities as BusinessEntity
    /// that is used for disassociate operations.
    /// </param>
    ///<param name="internalCallback" type="Function">
    /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
    /// </param>
    disassociate(relationshipName: string, targetEntityName: string, targetId: string, relatedEntityName: string, relatedBusinessEntities: string, internalCallback: any): any

}