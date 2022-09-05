
export interface ISoapProcess {
    callActionBase(requestXml: any, successCallback: any, errorCallback: any, asyn: boolean): any
    callAction(actionName: string, inputParams: any, successCallback: any, errorCallback: any, asyn: boolean): any
    callWorkflow(workflowId: string, recordId: string, successCallback: any, errorCallback: any, asyn: boolean): any
}