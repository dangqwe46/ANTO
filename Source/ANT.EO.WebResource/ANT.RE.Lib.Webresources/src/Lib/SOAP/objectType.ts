import { Constants, SOAP_TYPE } from "../../Constant/constants";
import { crmXmlEncode, encodeValue, getNodeText, isArray, stringToDate } from "./common";

export class EntityReference {
    id: any;
    name: any;
    entityType: any;
    constructor(entityType: string, id: string, name: string) {
        this.id = id || Constants.EmptyGuid;
        this.name = name || "";
        this.entityType = entityType || "";
    }
}

export class Entity {
    logicalName: string;
    attributes: any;
    formattedValues: {};
    id: any;
    constructor(logicalName: string, id: string, attributes: any) {
        this.logicalName = logicalName || "";
        this.attributes = attributes || {};
        this.formattedValues = {};
        this.id = id || Constants.EmptyGuid;
    }
}
export class XrmOptionSetValue {
    value: any | undefined;
    formattedValue: any | undefined;
    type: any;
    constructor() {
        this.type = 'OptionSetValue';
    }
}
export class XrmEntityReference {
    id: string | undefined
    logicalName: string | undefined
    name: string | undefined
    type = 'EntityReference';
}

export class XrmEntityCollection {
    value: any
    type: string = 'EntityCollection';
}

export class XrmValue {
    type: any;
    value: any;
}

export class Attribute {
    value: string | null;
    type: string;
    constructor(value: string, type: string) {
        this.value = value != undefined ? value : null;
        this.type = type || "";
    }
}


export class BusinessEntity {
    id: any = null;
    logicalName: any = null;
    attributes: any = {};
    constructor(logicalName?: string, id?: string) {
        this.logicalName = logicalName;
        this.id = id
    }

    getValue = (attrname: any, opt_property: any) => {
        var attr = this.attributes[attrname];
        if (attr) {
            var attrType = attr.type;

            switch (attrType) {
                case SOAP_TYPE.EntityReference:
                    return (opt_property !== undefined) ? attr[opt_property] : attr.guid;
                case SOAP_TYPE.OptionSet:
                    return (opt_property !== undefined) ? attr[opt_property] : attr.value;
                default:
                    return attr.value;
            }
        }
        return null;
    };
    /**
            * Serialize a CRM Business Entity object to XML string in order to be passed to CRM Web Services.
            * @return {String} The serialized XML string of CRM entity.
            */
    serialize = () => {
        var xml = ["<b:value i:type='a:Entity'>"];
        xml.push('<a:Attributes xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">');
        var attributes = this.attributes;
        for (var attributeName in attributes) {
            if (attributes.hasOwnProperty(attributeName)) {
                var attribute = attributes[attributeName];

                xml.push("<a:KeyValuePairOfstringanyType>");
                xml.push("<b:key>", attributeName, "</b:key>");

                if (attribute === null || attribute.value === null) {
                    xml.push("<b:value i:nil='true' />");
                } else {
                    var sType = (!attribute.type) ?
                        typeof attribute :
                        crmXmlEncode(attribute.type);
                    var value;
                    var encodedValue;
                    var id;
                    var encodedId;
                    var logicalName;
                    var encodedLogicalName;
                    switch (sType) {
                        case "OptionSetValue":
                            value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                            encodedValue = encodeValue(value);
                            xml.push("<b:value i:type='a:OptionSetValue'>");
                            xml.push("<a:Value>", encodedValue, "</a:Value>", "</b:value>");
                            break;

                        case "EntityCollection":
                            xml.push("<b:value i:type='a:EntityCollection'>");
                            xml.push("<a:Entities>");
                            value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                            var collections = isArray(value) ? value : [value];

                            for (var i = 0, collectionLengh = collections.length; i < collectionLengh; i++) {
                                var item = collections[i];
                                id = (item.hasOwnProperty("id")) ? item["id"] : item;
                                encodedId = encodeValue(id);
                                logicalName = (item.hasOwnProperty("logicalName")) ? item["logicalName"] : item;
                                encodedLogicalName = encodeValue(logicalName);
                                xml.push("<a:Entity>");
                                xml.push("<a:Attributes>");
                                xml.push("<a:KeyValuePairOfstringanyType>");
                                xml.push("<b:key>partyid</b:key>");
                                xml.push("<b:value i:type='a:EntityReference'>");
                                xml.push("<a:Id>", encodedId, "</a:Id>");
                                if (Xrm.Utility.openQuickCreate !== undefined) {
                                    xml.push("<a:KeyAttributes xmlns:c='http://schemas.microsoft.com/xrm/7.1/Contracts' />");
                                }
                                xml.push("<a:LogicalName>", encodedLogicalName, "</a:LogicalName>");
                                xml.push("<a:Name i:nil='true' />");
                                if (Xrm.Utility.openQuickCreate !== undefined) {
                                    xml.push("<a:RowVersion i:nil='true' />");
                                }
                                xml.push("</b:value>");
                                xml.push("</a:KeyValuePairOfstringanyType>");
                                xml.push("</a:Attributes>");
                                xml.push("<a:EntityState i:nil='true' />");
                                xml.push("<a:FormattedValues />");
                                xml.push("<a:Id>00000000-0000-0000-0000-000000000000</a:Id>");
                                xml.push("<a:LogicalName>activityparty</a:LogicalName>");
                                xml.push("<a:RelatedEntities />");
                                xml.push("</a:Entity>");
                            }
                            xml.push("</a:Entities>");
                            xml.push("<a:EntityName i:nil='true' />");
                            xml.push("<a:MinActiveRowVersion i:nil='true' />");
                            xml.push("<a:MoreRecords>false</a:MoreRecords>");
                            xml.push("<a:PagingCookie i:nil='true' />");
                            xml.push("<a:TotalRecordCount>0</a:TotalRecordCount>");
                            xml.push("<a:TotalRecordCountLimitExceeded>false</a:TotalRecordCountLimitExceeded>");
                            xml.push("</b:value>");
                            break;

                        case "EntityReference":
                            id = (attribute.hasOwnProperty("id")) ? attribute["id"] : attribute;
                            encodedId = encodeValue(id);
                            logicalName = (attribute.hasOwnProperty("logicalName")) ? attribute["logicalName"] : attribute;
                            encodedLogicalName = encodeValue(logicalName);
                            xml.push("<b:value i:type='a:EntityReference'>");
                            xml.push("<a:Id>", encodedId, "</a:Id>");
                            if (Xrm.Utility.openQuickCreate !== undefined) {
                                xml.push("<a:KeyAttributes xmlns:c='http://schemas.microsoft.com/xrm/7.1/Contracts' />");
                            }
                            xml.push("<a:LogicalName>", encodedLogicalName, "</a:LogicalName>");
                            xml.push("<a:Name i:nil='true' />");
                            if (Xrm.Utility.openQuickCreate !== undefined) {
                                xml.push("<a:RowVersion i:nil='true' />");
                            }
                            xml.push("</b:value>");
                            break;

                        case "Money":
                            value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                            encodedValue = encodeValue(value);
                            xml.push("<b:value i:type='a:Money'>");
                            xml.push("<a:Value>", encodedValue, "</a:Value>", "</b:value>");
                            break;

                        case "guid":
                            value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                            encodedValue = encodeValue(value);
                            xml.push("<b:value i:type='c:guid' xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/'>");
                            xml.push(encodedValue, "</b:value>");
                            break;

                        case "number":
                            value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                            encodedValue = encodeValue(value);
                            var oType = (String(parseInt(value, 10)) === encodedValue) ? "c:int" : "c:decimal";
                            xml.push("<b:value i:type='", oType, "' xmlns:c='http://www.w3.org/2001/XMLSchema'>");
                            xml.push(encodedValue, '</b:value>');
                            break;

                        default:
                            value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                            encodedValue = encodeValue(value);
                            sType = (typeof value === "object" && value.getTime) ? "dateTime" : sType;
                            xml.push("<b:value i:type='c:", sType, "' xmlns:c='http://www.w3.org/2001/XMLSchema'>", encodedValue, "</b:value>");
                            break;
                    }
                }
                xml.push("</a:KeyValuePairOfstringanyType>");
            }
        }

        xml.push("</a:Attributes><a:EntityState i:nil='true' />");
        xml.push("<a:FormattedValues xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />");
        xml.push("<a:Id>", encodeValue(this.id), "</a:Id>");
        xml.push("<a:LogicalName>", this.logicalName, "</a:LogicalName>");
        xml.push("<a:RelatedEntities xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />");
        xml.push("</b:value>");
        return xml.join("");
    }

    /**
         * Deserialize an XML node into a CRM Business Entity object. The XML node comes from CRM Web Service's response.
         * @param {object} resultNode The XML node returned from CRM Web Service's Fetch, Retrieve, RetrieveMultiple messages.
         */
    deserialize = (resultNode: any) => {
        var obj: any = new Object();
        var resultNodes = resultNode.childNodes;

        for (var j = 0, lenj = resultNodes.length; j < lenj; j++) {
            var sKey;
            var parentNode = resultNodes[j];
            switch (parentNode.nodeName) {
                case "a:Attributes":
                    var attr = parentNode;
                    for (var k = 0, lenk = attr.childNodes.length; k < lenk; k++) {
                        var tempParentNode = attr.childNodes[k];
                        // Establish the Key for the Attribute
                        var tempParentNodeChildNodes = tempParentNode.childNodes;
                        sKey = getNodeText(tempParentNodeChildNodes[0]);

                        var tempNode = tempParentNodeChildNodes[1];
                        // Determine the Type of Attribute value we should expect
                        var sType = tempNode.attributes.getNamedItem("i:type").value;

                        // check for AliasedValue
                        if (sType.replace('c:', '').replace('a:', '') === "AliasedValue") {
                            // reset the type to the actual attribute type
                            var subNode = tempNode.childNodes[2];
                            sType = subNode.attributes.getNamedItem("i:type").value;

                            //sKey = getNodeText(tempNode.childNodes[1]) + "." + getNodeText(tempNode.childNodes[0]);
                            // reset the node to the AliasedValue value node
                            tempNode = subNode;
                        }

                        var entRef;
                        var entCv;
                        switch (sType) {
                            case "a:OptionSetValue":
                                var entOsv = new XrmOptionSetValue();
                                entOsv.type = sType.replace('a:', '');
                                entOsv.value = parseInt(getNodeText(tempNode));
                                obj[sKey] = entOsv;
                                break;

                            case "a:EntityReference":
                                entRef = new XrmEntityReference();
                                entRef.type = sType.replace('a:', '');
                                var oChildNodes = tempNode.childNodes;
                                for (let i = 0, leni = oChildNodes.length; i < leni; i++) {
                                    var entityReferenceNode = oChildNodes[i];

                                    switch (entityReferenceNode.nodeName) {
                                        case "a:Id":
                                            entRef.id = getNodeText(entityReferenceNode);
                                            break;
                                        case "a:LogicalName":
                                            entRef.logicalName = getNodeText(entityReferenceNode);
                                            break;
                                        case "a:Name":
                                            entRef.name = getNodeText(entityReferenceNode);
                                            break;
                                    }
                                }
                                obj[sKey] = entRef;
                                break;

                            case "a:EntityCollection":
                                entRef = new XrmEntityCollection();
                                entRef.type = sType.replace('a:', '');

                                //get all party items....
                                var items = [];
                                var partyNodes = tempNode.childNodes;
                                for (var y = 0, leny = partyNodes[0].childNodes.length; y < leny; y++) {
                                    var itemNodes = tempParentNode.childNodes[1].childNodes[0].childNodes[y].childNodes[0].childNodes;
                                    for (var z = 0, lenz = itemNodes.length; z < lenz; z++) {
                                        var itemNodeChildNodes = itemNodes[z].childNodes;
                                        var nodeText = getNodeText(itemNodeChildNodes[0]);
                                        if (nodeText === "partyid") {
                                            var itemRef = new XrmEntityReference();
                                            var partyListNodes = itemNodeChildNodes[1].childNodes;
                                            for (var pi = 0, lenpi = partyListNodes.length; pi < lenpi; pi++) {
                                                var partyReferenceNode = partyListNodes[pi];

                                                switch (partyReferenceNode.nodeName) {
                                                    case "a:Id":
                                                        itemRef.id = getNodeText(partyReferenceNode);
                                                        break;
                                                    case "a:LogicalName":
                                                        itemRef.logicalName = getNodeText(partyReferenceNode);
                                                        break;
                                                    case "a:Name":
                                                        itemRef.name = getNodeText(partyReferenceNode);
                                                        break;
                                                }
                                            }
                                            items[y] = itemRef;
                                        }
                                    }
                                }
                                entRef.value = items;
                                obj[sKey] = entRef;
                                break;

                            case "a:Money":
                                entCv = new XrmValue();
                                entCv.type = sType.replace('a:', '');
                                entCv.value = parseFloat(getNodeText(tempNode));
                                obj[sKey] = entCv;
                                break;

                            default:
                                entCv = new XrmValue();
                                entCv.type = sType.replace('c:', '').replace('a:', '');
                                if (entCv.type === "int") {
                                    entCv.value = parseInt(getNodeText(tempNode));
                                } else if (entCv.type === "decimal" || entCv.type === "double") {
                                    entCv.value = parseFloat(getNodeText(tempNode));
                                } else if (entCv.type === "dateTime") {
                                    entCv.value = stringToDate(getNodeText(tempNode));
                                } else if (entCv.type === "boolean") {
                                    entCv.value = (getNodeText(tempNode) === 'false') ? false : true;
                                } else {
                                    entCv.value = getNodeText(tempNode);
                                }
                                obj[sKey] = entCv;
                                break;
                        }
                    }
                    this.attributes = obj;
                    break;

                case "a:Id":
                    this.id = getNodeText(parentNode);
                    break;

                case "a:LogicalName":
                    this.logicalName = getNodeText(parentNode);
                    break;

                case "a:FormattedValues":
                    var foVal = parentNode;

                    for (var o = 0, leno = foVal.childNodes.length; o < leno; o++) {
                        // Establish the Key, we are going to fill in the formatted value of the already found attribute
                        var foNode = foVal.childNodes[o];
                        sKey = getNodeText(foNode.childNodes[0]);
                        this.attributes[sKey].formattedValue = getNodeText(foNode.childNodes[1]);
                        if (isNaN(this.attributes[sKey].value) && this.attributes[sKey].type === "dateTime") {
                            this.attributes[sKey].value = new Date(this.attributes[sKey].formattedValue);
                        }
                    }
                    break;
            }
        }
    }

}

