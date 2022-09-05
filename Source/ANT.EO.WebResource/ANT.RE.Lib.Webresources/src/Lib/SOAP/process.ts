import { SOAP_CONSTS } from "../../Constant/constants";
import { GlobalContext } from "../Context/GlobalContext/globalcontext";
// import { logger } from "../Logger/logger";
import { getChildNode, getChildNodes, getNodeTextValue, getNodeTextValueNotNull, getValue, getXmlValue } from "./common";
import { ISoapProcess } from "./process.interface";


export class Process extends GlobalContext implements ISoapProcess {
    constructor() {
        super()
    }

    // This can be used to execute custom requests if needed - useful for me testing the SOAP :)
    public callActionBase(requestXml: any, successCallback: any, errorCallback: any, asyn: boolean) {
        try {
            let req: any = new XMLHttpRequest();
            req.open(SOAP_CONSTS.HTTP_METHOD.POST, this.getClientUrl() + SOAP_CONSTS.SOAP_ENDPOINT, asyn != false);
            req.setRequestHeader(SOAP_CONSTS.ACCEPT_TYPE.text, SOAP_CONSTS.ACCEPT_TYPE.value.XML);
            req.setRequestHeader(SOAP_CONSTS.CONTENT_TYPE.text, SOAP_CONSTS.CONTENT_TYPE.value.XML);
            req.setRequestHeader(SOAP_CONSTS.SOAP_ACTION.text, SOAP_CONSTS.SOAP_ACTION.value);
            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        // If there's no successCallback we don't need to check the outputParams
                        if (successCallback) {
                            // Yucky but don't want to risk there being multiple 'Results' nodes or something
                            var resultsNode = req.responseXML.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1]; // <a:Results>
                            // Action completed successfully - get output params
                            var responseParams = getChildNodes(resultsNode, "a:KeyValuePairOfstringanyType");
                            var outputParams: any = {};
                            for (let i = 0; i < responseParams.length; i++) {
                                var attrNameNode = getChildNode(responseParams[i], "b:key");
                                var attrValueNode = getChildNode(responseParams[i], "b:value");
                                var attributeName = getNodeTextValue(attrNameNode);
                                var attributeValue = getValue(attrValueNode);
                                // v1.0 - Deprecated method using key/value pair and standard array
                                //outputParams.push({ key: attributeName, value: attributeValue.value });
                                // v2.0 - Allows accessing output params directly: outputParams["Target"].attributes["new_fieldname"];
                                outputParams[attributeName] = attributeValue.value;
                                /*
                                RETURN TYPES:
                                    DateTime = Users local time (JavaScript date)
                                    bool = true or false (JavaScript boolean)
                                    OptionSet, int, decimal, float, etc = 1 (JavaScript number)
                                    guid = string
                                    EntityReference = { id: "guid", name: "name", entityType: "account" }
                                    Entity = { logicalName: "account", id: "guid", attributes: {}, formattedValues: {} }
                                    EntityCollection = [{ logicalName: "account", id: "guid", attributes: {}, formattedValues: {} }]
                                Attributes for entity accessed like: entity.attributes["new_fieldname"].value
                                For entityreference: entity.attributes["new_fieldname"].value.id
                                Make sure attributes["new_fieldname"] is not null before using .value
                                Or use the extension method entity.get("new_fieldname") to get the .value
                                Also use entity.formattedValues["new_fieldname"] to get the string value of optionsetvalues, bools, moneys, etc
                                */
                            }
                            // Make sure the callback accepts exactly 1 argument - use dynamic function if you want more
                            successCallback(outputParams);
                        }
                    }
                    else {
                        // Error has occured, action failed
                        if (errorCallback) {
                            var message = null;
                            var traceText = null;
                            try {
                                message = getNodeTextValueNotNull(req.responseXML.getElementsByTagName("Message"));
                                traceText = getNodeTextValueNotNull(req.responseXML.getElementsByTagName("TraceText"));
                            } catch (e) { }
                            if (message == null) { message = "Error executing Action. Check input parameters or contact your CRM Administrator"; }
                            errorCallback(message, traceText);
                        }
                    }
                }
            };
            req.send(requestXml);
        }
        catch (e) {
            // logger.Critical(e.message, "SOAP.callActionBase")
        }
    }

    public callAction(actionName: string, inputParams: any, successCallback: any, errorCallback: any, asyn: boolean) {

        try {
            var ns: any = {
                "": "http://schemas.microsoft.com/xrm/2011/Contracts/Services",
                ":s": "http://schemas.xmlsoap.org/soap/envelope/",
                ":a": "http://schemas.microsoft.com/xrm/2011/Contracts",
                ":i": "http://www.w3.org/2001/XMLSchema-instance",
                ":b": "http://schemas.datacontract.org/2004/07/System.Collections.Generic",
                ":c": "http://www.w3.org/2001/XMLSchema",
                ":d": "http://schemas.microsoft.com/xrm/2011/Contracts/Services",
                ":e": "http://schemas.microsoft.com/2003/10/Serialization/",
                ":f": "http://schemas.microsoft.com/2003/10/Serialization/Arrays",
                ":g": "http://schemas.microsoft.com/crm/2011/Contracts",
                ":h": "http://schemas.microsoft.com/xrm/2011/Metadata",
                ":j": "http://schemas.microsoft.com/xrm/2011/Metadata/Query",
                ":k": "http://schemas.microsoft.com/xrm/2013/Metadata",
                ":l": "http://schemas.microsoft.com/xrm/2012/Contracts",
                //":c": "http://schemas.microsoft.com/2003/10/Serialization/" // Conflicting namespace for guid... hardcoding in the _getXmlValue bit
            };
            var requestXml = "<s:Envelope";
            // Add all the namespaces
            for (var i in ns) {
                requestXml += " xmlns" + i + "='" + ns[i] + "'";
            }
            requestXml += ">" +
                "<s:Body>" +
                "<Execute>" +
                "<request>";
            if (inputParams != null && inputParams.length > 0) {
                requestXml += "<a:Parameters>";
                // Add each input param
                for (let i = 0; i < inputParams.length; i++) {
                    var param = inputParams[i];
                    var value = getXmlValue(param.key, param.type, param.value);
                    requestXml += value;
                }
                requestXml += "</a:Parameters>";
            }
            else {
                requestXml += "<a:Parameters />";
            }
            requestXml += "<a:RequestId i:nil='true' />" +
                "<a:RequestName>" + actionName + "</a:RequestName>" +
                "</request>" +
                "</Execute>" +
                "</s:Body>" +
                "</s:Envelope>";
            this.callActionBase(requestXml, successCallback, errorCallback, asyn);
        }
        catch (e) {
            // logger.Critical(e.message, "SOAP.callAction")
        }
    }

    public callWorkflow(workflowId: string, recordId: string, successCallback: any, errorCallback: any, asyn: boolean) {
        try {
            var request = "<s:Envelope xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'>" +
                "<s:Body>" +
                "<Execute xmlns='http://schemas.microsoft.com/xrm/2011/Contracts/Services' xmlns:i='http://www.w3.org/2001/XMLSchema-instance'>" +
                "<request i:type='b:ExecuteWorkflowRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>" +
                "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>" +
                "<a:KeyValuePairOfstringanyType>" +
                "<c:key>EntityId</c:key>" +
                "<c:value i:type='d:guid' xmlns:d='http://schemas.microsoft.com/2003/10/Serialization/'>" + recordId + "</c:value>" +
                "</a:KeyValuePairOfstringanyType>" +
                "<a:KeyValuePairOfstringanyType>" +
                "<c:key>WorkflowId</c:key>" +
                "<c:value i:type='d:guid' xmlns:d='http://schemas.microsoft.com/2003/10/Serialization/'>" + workflowId + "</c:value>" +
                "</a:KeyValuePairOfstringanyType>" +
                "</a:Parameters>" +
                "<a:RequestId i:nil='true' />" +
                "<a:RequestName>ExecuteWorkflow</a:RequestName>" +
                "</request>" +
                "</Execute>" +
                "</s:Body>" +
                "</s:Envelope>";
            var req = new XMLHttpRequest();
            req.open(SOAP_CONSTS.HTTP_METHOD.POST, this.getClientUrl() + SOAP_CONSTS.SOAP_ENDPOINT, asyn != false);
            req.setRequestHeader(SOAP_CONSTS.ACCEPT_TYPE.text, SOAP_CONSTS.ACCEPT_TYPE.value.XML);
            req.setRequestHeader(SOAP_CONSTS.CONTENT_TYPE.text, SOAP_CONSTS.CONTENT_TYPE.value.XML);
            req.setRequestHeader(SOAP_CONSTS.SOAP_ACTION.text, SOAP_CONSTS.SOAP_ACTION.value);
            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        if (successCallback) {
                            successCallback();
                        }
                    }
                    else {
                        if (errorCallback) {
                            errorCallback();
                        }
                    }
                }
            };
            req.send(request);
        }
        catch (e) {
            // logger.Critical(e.message, "SOAP.callAction")
        }
    }
}


