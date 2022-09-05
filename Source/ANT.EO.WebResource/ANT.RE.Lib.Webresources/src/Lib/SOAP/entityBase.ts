import { SOAP_CONSTS } from "../../Constant/constants";
import { GlobalContext } from "../Context/GlobalContext/globalcontext";
import { logger } from "../Logger/logger";
import { encodeValue, executeRequest, selectSingleNode, setSelectionNamespaces, getError, selectSingleNodeText, crmXmlDecode, isArray, getNodeText } from "./common";
import { IEntityBase } from "./entityBase.interface";
import { BusinessEntity } from "./objectType";

export class EntityBase extends GlobalContext implements IEntityBase {
    constructor() {
        super()
    }

    public setState(entityName: string, recordId: string, stateCode: number, statusCode: number, async: boolean, internalCallback: any) {
        try {
            var request = [
                '<Execute xmlns="http://schemas.microsoft.com/xrm/2011/Contracts/Services">',
                '<request i:type="b:SetStateRequest"',
                ' xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts" ',
                ' xmlns:b="http://schemas.microsoft.com/crm/2011/Contracts" ',
                ' xmlns:c="http://schemas.datacontract.org/2004/07/System.Collections.Generic" ',
                ' xmlns:i="http://www.w3.org/2001/XMLSchema-instance">',
                '<a:Parameters>',
                '<a:KeyValuePairOfstringanyType>',
                '<c:key>EntityMoniker</c:key>',
                '<c:value i:type="a:EntityReference">',
                '<a:Id>', recordId, '</a:Id>',
                '<a:LogicalName>', entityName, '</a:LogicalName>',
                '<a:Name i:nil="true" />',
                '</c:value>',
                '</a:KeyValuePairOfstringanyType>',
                '<a:KeyValuePairOfstringanyType>',
                '<c:key>State</c:key>',
                '<c:value i:type="a:OptionSetValue">',
                '<a:Value>', stateCode, '</a:Value>',
                '</c:value>',
                '</a:KeyValuePairOfstringanyType>',
                '<a:KeyValuePairOfstringanyType>',
                '<c:key>Status</c:key>',
                '<c:value i:type="a:OptionSetValue">',
                '<a:Value>', statusCode, '</a:Value>',
                '</c:value>',
                '</a:KeyValuePairOfstringanyType>',
                '</a:Parameters>',
                '<a:RequestId i:nil="true"/>',
                '<a:RequestName>SetState</a:RequestName>',
                '</request>',
                '</Execute>'].join("");
            return this.doSoapRequest(request, "Execute", async, function (resultXml: any) {
                var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
                var result = crmXmlDecode(responseText);
                if (!async)
                    return result;
                else
                    internalCallback(result);
                // ReSharper disable NotAllPathsReturnValue
            });
            // ReSharper restore NotAllPathsReturnValue
        }
        catch (e: any) {
            logger.Critical(e.message, "SOAP.setState")
        }
    }

    public assign(id: string, entityname: string, assigneeid: string, opt_asyn: boolean) {
        try {
            // default is true
            var request = ['<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">',
                '  <s:Body>',
                '    <Execute xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\" ',
                '           xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">',
                '      <request i:type=\"b:AssignRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\" ',
                '           xmlns:b=\"http://schemas.microsoft.com/crm/2011/Contracts\">',
                '        <a:Parameters xmlns:c=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">',
                '          <a:KeyValuePairOfstringanyType>',
                '            <c:key>Target</c:key>',
                '            <c:value i:type=\"a:EntityReference\">',
                '              <a:Id>' + id + '</a:Id>',
                '              <a:LogicalName>' + entityname + '</a:LogicalName>',
                '              <a:Name i:nil=\"true\" />',
                '            </c:value>',
                '          </a:KeyValuePairOfstringanyType>',
                '          <a:KeyValuePairOfstringanyType>',
                '            <c:key>Assignee</c:key>',
                '            <c:value i:type=\"a:EntityReference\">',
                '              <a:Id>' + assigneeid + '</a:Id>',
                '              <a:LogicalName>systemuser</a:LogicalName>',
                '              <a:Name i:nil=\"true\" />',
                '            </c:value>',
                '          </a:KeyValuePairOfstringanyType>',
                '        </a:Parameters>',
                '        <a:RequestId i:nil=\"true\" />',
                '        <a:RequestName>Assign</a:RequestName>',
                '      </request>',
                '    </Execute>',
                '  </s:Body>',
                '</s:Envelope>'].join('');
            return executeRequest(this.getClientUrl(), request, opt_asyn != false);
        }
        catch (e: any) {
            logger.Critical(e.message, "SOAP.assign")
        }
    }

    public doSoapRequest = (soapBody: any, requestType: string, async: boolean, internalCallback: any) => {
        async = async || false;

        // Wrap the Soap Body in a soap:Envelope.
        var soapXml = ["<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>",
            "<soap:Body>",
            "<", requestType, " xmlns='http://schemas.microsoft.com/xrm/2011/Contracts/Services' xmlns:i='http://www.w3.org/2001/XMLSchema-instance'>", soapBody, "</", requestType, ">",
            "</soap:Body>",
            "</soap:Envelope>"
        ].join("");

        var req: any = new XMLHttpRequest();
        req.open(SOAP_CONSTS.HTTP_METHOD.POST, this.getClientUrl() + SOAP_CONSTS.SOAP_ENDPOINT, async != false);
        req.setRequestHeader(SOAP_CONSTS.ACCEPT_TYPE.text, SOAP_CONSTS.ACCEPT_TYPE.value.XML);
        req.setRequestHeader(SOAP_CONSTS.CONTENT_TYPE.text, SOAP_CONSTS.CONTENT_TYPE.value.XML);
        req.setRequestHeader(SOAP_CONSTS.SOAP_ACTION.text, SOAP_CONSTS.SOAP_ACTION.value);

        //IE10
        try {
            req.responseType = 'msxml-document';
        } catch (e) { }

        if (async) {
            req.onreadystatechange = function () {
                if (req.readyState === 4 /* complete */) {
                    req.onreadystatechange = null; //Addresses potential memory leak issue with IE
                    if (req.status === 200) { // "OK"
                        var doc = req.responseXML;
                        try {
                            setSelectionNamespaces(doc);
                        } catch (e) { }
                        internalCallback(doc);
                    } else {
                        getError(true, req);
                    }
                }
            };

            req.send(soapXml);
        } else {
            req.send(soapXml);
            if (req.status === 200) {
                var doc = req.responseXML;
                try {
                    setSelectionNamespaces(doc);
                } catch (e) { }
                var result = doc;
                return !!internalCallback ? internalCallback(result) : result;
            } else {
                getError(false, req);
            }
        }
        // ReSharper disable NotAllPathsReturnValue
    };

    public retrieve = (entityName: string, id: string, columnSet: any, async: boolean, internalCallback: any) => {
        try {
            var attributes = "";
            // ReSharper disable AssignedValueIsNeverUsed
            var query = "";
            // ReSharper restore AssignedValueIsNeverUsed
            if (columnSet != null) {
                for (var i = 0, ilength = columnSet.length; i < ilength; i++) {
                    attributes += "<c:string>" + columnSet[i] + "</c:string>";
                }
                query = "<a:AllColumns>false</a:AllColumns>" +
                    "<a:Columns xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>" +
                    attributes +
                    "</a:Columns>";
            } else {
                query = "<a:AllColumns>true</a:AllColumns><a:Columns xmlns:b='http://schemas.microsoft.com/2003/10/Serialization/Arrays' />";
            }

            var msgBody = [
                "<request i:type='a:RetrieveRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                "<a:KeyValuePairOfstringanyType>",
                "<b:key>Target</b:key>",
                "<b:value i:type='a:EntityReference'>",
                "<a:Id>", encodeValue(id), "</a:Id>",
                "<a:LogicalName>", entityName, "</a:LogicalName>",
                "<a:Name i:nil='true' />",
                "</b:value>",
                "</a:KeyValuePairOfstringanyType>",
                "<a:KeyValuePairOfstringanyType>",
                "<b:key>ColumnSet</b:key>",
                "<b:value i:type='a:ColumnSet'>",
                query,
                "</b:value>",
                "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>Retrieve</a:RequestName>",
                "</request>"
            ].join("");

            return this.doSoapRequest(msgBody, "Execute", !!internalCallback, function (resultXml: any) {
                var retrieveResult = selectSingleNode(resultXml, "//b:value");
                var entity: BusinessEntity = new BusinessEntity();
                entity.deserialize(retrieveResult);

                if (!async)
                    return entity;
                else
                    return internalCallback(entity);
                // ReSharper disable NotAllPathsReturnValue
            });
            // ReSharper restore NotAllPathsReturnValue
        }
        catch (e: any) {
            logger.Critical(e.message, "SOAP.retrieve")
        }
    };

    public create = (be: any, internalCallback: any) => {
        try {
            var request = be.serialize();

            var async = !!internalCallback;

            var mBody = ["<request i:type='a:CreateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                "<a:KeyValuePairOfstringanyType>",
                "<b:key>Target</b:key>",
                request,
                "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>Create</a:RequestName>",
                "</request>"
            ].join("");

            return this.doSoapRequest(mBody, "Execute", async, function (resultXml: any) {
                var responseText = selectSingleNodeText(resultXml, "//b:value");

                var result = crmXmlDecode(responseText);

                if (!async)
                    return result;
                else
                    internalCallback(result);
                // ReSharper disable NotAllPathsReturnValue
            });
            // ReSharper restore NotAllPathsReturnValue
        }
        catch (e: any) {
            logger.Critical(e.message, "SOAP.create")
        }
    };

    public update = (be: any, internalCallback: any) => {
        try {
            var request = be.serialize();

            var async = !!internalCallback;

            var mBody = ["<request i:type='a:UpdateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                "<a:KeyValuePairOfstringanyType>",
                "<b:key>Target</b:key>",
                request,
                "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>Update</a:RequestName>",
                "</request>"
            ].join("");

            return this.doSoapRequest(mBody, "Execute", async, function (resultXml: any) {
                var responseText = selectSingleNodeText(resultXml, "//a:Results");
                var result = crmXmlDecode(responseText);

                if (!async)
                    return result;
                else
                    internalCallback(result);
                // ReSharper disable NotAllPathsReturnValue
            });
            // ReSharper restore NotAllPathsReturnValue
        }
        catch (e: any) {
            logger.Critical(e.message, "SOAP.update")
        }
    };

    public delete = (entityName: string, id: string, internalCallback: any) => {

        try {
            var request = [
                "<request i:type='a:DeleteRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'><a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'><a:KeyValuePairOfstringanyType><b:key>Target</b:key><b:value i:type='a:EntityReference'><a:Id>",
                id, "</a:Id><a:LogicalName>",
                entityName, "</a:LogicalName><a:Name i:nil='true' /></b:value></a:KeyValuePairOfstringanyType></a:Parameters><a:RequestId i:nil='true' /><a:RequestName>Delete</a:RequestName></request>"
            ].join("");

            var async = !!internalCallback;

            return this.doSoapRequest(request, "Execute", async, function (resultXml: any) {
                var responseText = selectSingleNodeText(resultXml, "//a:Results");
                var result = crmXmlDecode(responseText);

                if (!async)
                    return result;
                else
                    internalCallback(result);
                // ReSharper disable NotAllPathsReturnValue
            });
            // ReSharper restore NotAllPathsReturnValue
        }
        catch (e: any) {
            logger.Critical(e.message, "SOAP.delete")
        }
    };

    public retrieveMultiple = (query: string, internalCallback: any) => {
        try {
            var request = [
                "<request i:type='a:RetrieveMultipleRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                "<a:KeyValuePairOfstringanyType>",
                "<b:key>Query</b:key>",
                "<b:value i:type='a:QueryExpression'>",
                query,
                "</b:value>",
                "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true'/>",
                "<a:RequestName>RetrieveMultiple</a:RequestName>",
                "</request>"
            ].join("");

            var async = !!internalCallback;

            return this.doSoapRequest(request, "Execute", async, function (resultXml: any) {
                var resultNodes = selectSingleNode(resultXml, "//a:Entities");

                var retriveMultipleResults = [];

                for (var i = 0, ilength = resultNodes.childNodes.length; i < ilength; i++) {
                    var entity = new BusinessEntity();

                    entity.deserialize(resultNodes.childNodes[i]);
                    retriveMultipleResults[i] = entity;
                }

                if (!async)
                    return retriveMultipleResults;
                else
                    return internalCallback(retriveMultipleResults);
                // ReSharper disable NotAllPathsReturnValue
            });
            // ReSharper restore NotAllPathsReturnValue
        }
        catch (e: any) {
            logger.Critical(e.message, "SOAP.retrieveMultiple")
        }
    };

    public associate = (relationshipName: string, targetEntityName: string, targetId: string, relatedEntityName: string, relatedBusinessEntities: string, internalCallback: any) => {

        try {
            var relatedEntities: any = relatedBusinessEntities;

            relatedEntities = isArray(relatedEntities) ? relatedEntities : [relatedEntities];

            var output = [];
            for (var i = 0, ilength = relatedEntities.length; i < ilength; i++) {
                if (relatedEntities[i].id !== "") {
                    output.push("<a:EntityReference>",
                        "<a:Id>", relatedEntities[i].id, "</a:Id>",
                        "<a:LogicalName>", relatedEntityName, "</a:LogicalName>",
                        "<a:Name i:nil='true' />",
                        "</a:EntityReference>");
                }
            }

            var relatedXml = output.join("");

            var request = [
                "<request i:type='a:AssociateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                "<a:KeyValuePairOfstringanyType>",
                "<b:key>Target</b:key>",
                "<b:value i:type='a:EntityReference'>",
                "<a:Id>", encodeValue(targetId), "</a:Id>",
                "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
                "<a:Name i:nil='true' />",
                "</b:value>",
                "</a:KeyValuePairOfstringanyType>",
                "<a:KeyValuePairOfstringanyType>",
                "<b:key>Relationship</b:key>",
                "<b:value i:type='a:Relationship'>",
                "<a:PrimaryEntityRole>Referenced</a:PrimaryEntityRole>",
                "<a:SchemaName>", relationshipName, "</a:SchemaName>",
                "</b:value>",
                "</a:KeyValuePairOfstringanyType>",
                "<a:KeyValuePairOfstringanyType>",
                "<b:key>RelatedEntities</b:key>",
                "<b:value i:type='a:EntityReferenceCollection'>",
                relatedXml,
                "</b:value>",
                "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>Associate</a:RequestName>",
                "</request>"
            ].join("");

            var async = !!internalCallback;

            return this.doSoapRequest(request, "Execute", async, function (resultXml: any) {
                var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
                var result = crmXmlDecode(responseText);
                if (!async)
                    return result;
                else
                    internalCallback(result);
                // ReSharper disable NotAllPathsReturnValue
            });
            // ReSharper restore NotAllPathsReturnValue
        }
        catch (e: any) {
            logger.Critical(e.message, "SOAP.associate")
        }
    };

    public disassociate = (relationshipName: string, targetEntityName: string, targetId: string, relatedEntityName: string, relatedBusinessEntities: string, internalCallback: any) => {
        try {
            var relatedEntities: any = relatedBusinessEntities;

            relatedEntities = isArray(relatedEntities) ? relatedEntities : [relatedEntities];

            var output = [];
            for (var i = 0, ilength = relatedEntities.length; i < ilength; i++) {
                if (relatedEntities[i].id !== "") {
                    output.push("<a:EntityReference>",
                        "<a:Id>", relatedEntities[i].id, "</a:Id>",
                        "<a:LogicalName>", relatedEntityName, "</a:LogicalName>",
                        "<a:Name i:nil='true' />",
                        "</a:EntityReference>");
                }
            }

            var relatedXml = output.join("");

            var request = [
                "<request i:type='a:DisassociateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                "<a:KeyValuePairOfstringanyType>",
                "<b:key>Target</b:key>",
                "<b:value i:type='a:EntityReference'>",
                "<a:Id>", encodeValue(targetId), "</a:Id>",
                "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
                "<a:Name i:nil='true' />",
                "</b:value>",
                "</a:KeyValuePairOfstringanyType>",
                "<a:KeyValuePairOfstringanyType>",
                "<b:key>Relationship</b:key>",
                "<b:value i:type='a:Relationship'>",
                "<a:PrimaryEntityRole i:nil='true' />",
                "<a:SchemaName>", relationshipName, "</a:SchemaName>",
                "</b:value>",
                "</a:KeyValuePairOfstringanyType>",
                "<a:KeyValuePairOfstringanyType>",
                "<b:key>RelatedEntities</b:key>",
                "<b:value i:type='a:EntityReferenceCollection'>",
                relatedXml,
                "</b:value>",
                "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>Disassociate</a:RequestName>",
                "</request>"
            ].join("");

            var async = !!internalCallback;

            return this.doSoapRequest(request, "Execute", async, function (resultXml: any) {
                var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
                var result = crmXmlDecode(responseText);
                if (!async)
                    return result;
                else
                    internalCallback(result);
                // ReSharper disable NotAllPathsReturnValue
            });
            // ReSharper restore NotAllPathsReturnValue
        }
        catch (e: any) {
            logger.Critical(e.message, "SOAP.disassociate")
        }
    };
}

