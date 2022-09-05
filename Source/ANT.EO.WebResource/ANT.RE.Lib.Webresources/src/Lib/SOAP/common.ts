import { Constants, SOAP_CONSTS, SOAP_TYPE } from "../../Constant/constants";
import { Entity, EntityReference, Attribute, BusinessEntity } from './objectType'

if (!(window as any).$)
    (window as any).$ = (window as any).parent.$;
var _$: any = (window as any).$

export const $ = _$

export const getXmlValue = function (key: string, dataType: string, value: any) {
    var xml: string = "";
    var xmlValue: string = "";
    var extraNamespace: string = "";
    // Check the param type to determine how the value is formed
    switch (dataType) {
        case SOAP_TYPE.String:
            xmlValue = htmlEncode(value) || ""; // Allows fetchXml strings etc
            break;
        case SOAP_TYPE.DateTime:
            xmlValue = value.toISOString() || "";
            break;
        case SOAP_TYPE.EntityReference:
            xmlValue = "<a:Id>" + (value.id || "") + "</a:Id>" +
                "<a:LogicalName>" + (value.entityType || "") + "</a:LogicalName>" +
                "<a:Name i:nil='true' />";
            break;
        case SOAP_TYPE.OptionSet:
        case SOAP_TYPE.Money:
            xmlValue = "<a:Value>" + (value || 0) + "</a:Value>";
            break;
        case SOAP_TYPE.Entity:
            xmlValue = getXmlEntityData(value);
            break;
        case SOAP_TYPE.EntityCollection:
            if (value != null && value.length > 0) {
                var entityCollection = "";
                for (var i = 0; i < value.length; i++) {
                    var entityData = getXmlEntityData(value[i]);
                    if (entityData !== null) {
                        entityCollection += "<a:Entity>" + entityData + "</a:Entity>";
                    }
                }
                if (entityCollection !== null && entityCollection !== "") {
                    xmlValue = "<a:Entities>" + entityCollection + "</a:Entities>" +
                        "<a:EntityName i:nil='true' />" +
                        "<a:MinActiveRowVersion i:nil='true' />" +
                        "<a:MoreRecords>false</a:MoreRecords>" +
                        "<a:PagingCookie i:nil='true' />" +
                        "<a:TotalRecordCount>0</a:TotalRecordCount>" +
                        "<a:TotalRecordCountLimitExceeded>false</a:TotalRecordCountLimitExceeded>";
                }
            }
            break;
        case SOAP_TYPE.Guid:
            // I don't think guid fields can even be null?
            xmlValue = value || Constants.EmptyGuid;
            // This is a hacky fix to get guids working since they have a conflicting namespace :(
            extraNamespace = " xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/'";
            break;
        default: // bool, int, double, decimal
            xmlValue = value != undefined ? value : null;
            break;
    }
    xml = "<a:KeyValuePairOfstringanyType>" +
        "<b:key>" + key + "</b:key>" +
        "<b:value i:type='" + dataType + "'" + extraNamespace;
    // nulls crash if you have a non-self-closing tag
    if (xmlValue === null || xmlValue === "") {
        xml += " i:nil='true' />";
    }
    else {
        xml += ">" + xmlValue + "</b:value>";
    }
    xml += "</a:KeyValuePairOfstringanyType>";
    return xml;
}

// Get only the immediate child nodes for a specific tag, otherwise entitycollections etc mess it up
export const getChildNodes: any = function (node: any, childNodesName: any) {
    var childNodes = [];
    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].tagName == childNodesName) {
            childNodes.push(node.childNodes[i]);
        }
    }
    // Chrome uses just 'Results' instead of 'a:Results' etc
    if (childNodes.length == 0 && childNodesName.indexOf(":") !== -1) {
        childNodes = getChildNodes(node, childNodesName.substring(childNodesName.indexOf(":") + 1));
    }
    return childNodes;
}
// Get a single child node for a specific tag
export const getChildNode = function (node: any, childNodeName: any) {
    var nodes = getChildNodes(node, childNodeName);
    if (nodes != null && nodes.length > 0) { return nodes[0]; }
    else { return null; }
}
// Gets the first not null value from a collection of nodes
export const getNodeTextValueNotNull = function (nodes: any) {
    var value = "";
    for (var i = 0; i < nodes.length; i++) {
        if (value === "") {
            value = getNodeTextValue(nodes[i]);
        }
    }
    return value;
}
// Gets the string value of the XML node
export const getNodeTextValue = function (node: any) {
    if (node != null) {
        var textNode = node.firstChild;
        if (textNode != null) {
            return textNode.textContent || textNode.nodeValue || textNode.data || textNode.text;
        }
    }
    return "";
}
// Gets the value of a parameter based on its type, can be recursive for entities
export const getValue: any = function (node: any) {
    var value = null;
    var type = null;
    if (node != null) {
        type = node.getAttribute("i:type") || node.getAttribute("type");
        // If the parameter/attribute is null, there won't be a type either
        if (type != null) {
            // Get the part after the ':' (since Chrome doesn't have the ':')
            var valueType = type.substring(type.indexOf(":") + 1).toLowerCase();
            if (valueType == "entityreference") {
                // Gets the lookup object
                var attrValueIdNode = getChildNode(node, "a:Id");
                var attrValueEntityNode = getChildNode(node, "a:LogicalName");
                var attrValueNameNode = getChildNode(node, "a:Name");
                var lookupId = getNodeTextValue(attrValueIdNode);
                var lookupName = getNodeTextValue(attrValueNameNode);
                var lookupEntity = getNodeTextValue(attrValueEntityNode);
                value = new EntityReference(lookupEntity, lookupId, lookupName);
            }
            else if (valueType == "entity") {
                // Gets the entity data, and all attributes
                value = getEntityData(node);
            }
            else if (valueType == "entitycollection") {
                // Loop through each entity, returns each entity, and all attributes
                var entitiesNode = getChildNode(node, "a:Entities");
                var entityNodes = getChildNodes(entitiesNode, "a:Entity");
                value = [];
                if (entityNodes != null && entityNodes.length > 0) {
                    for (var i = 0; i < entityNodes.length; i++) {
                        value.push(getEntityData(entityNodes[i]));
                    }
                }
            }
            else if (valueType == "aliasedvalue") {
                // Gets the actual data type of the aliased value
                // Key for these is "alias.fieldname"
                var aliasedValue = getValue(getChildNode(node, "a:Value"));
                if (aliasedValue != null) {
                    value = aliasedValue.value;
                    type = aliasedValue.type;
                }
            }
            else {
                // Standard fields like string, int, date, money, optionset, float, bool, decimal
                // Output will be string, even for number fields etc
                var stringValue = getNodeTextValue(node);
                if (stringValue != null) {
                    switch (valueType) {
                        case "datetime":
                            value = new Date(stringValue);
                            break;
                        case "int":
                        case "money":
                        case "optionsetvalue":
                        case "double": // float
                        case "decimal":
                            value = Number(stringValue);
                            break;
                        case "boolean":
                            value = stringValue.toLowerCase() === "true";
                            break;
                        default:
                            value = stringValue;
                    }
                }
            }
        }
    }
    return new Attribute(value, type);
}
///
/// Encoding for the xml values
///
export const xmlEncode = function (strInput: string) {
    var c,
        encoded = '';
    if (strInput === null) {
        return null;
    }
    if (strInput === '') {
        return '';
    }
    for (var cnt = 0, max = strInput.length; cnt < max; cnt++) {
        c = strInput.charCodeAt(cnt);
        if (((c > 96) && (c < 123))
            || ((c > 64) && (c < 91))
            || (c === 32)
            || ((c > 47) && (c < 58))
            || (c === 46)
            || (c === 44)
            || (c === 45)
            || (c === 95)) {
            encoded = encoded + String.fromCharCode(c);
        }
        else {
            encoded = encoded + '&#' + c + ';';
        }
    }
    return encoded;
}

///
/// Converts the response to a result-object that contains the entities, pagaingcookie...
///
export const getFetchResult = function (data: any) {
    // "s:Envelope/s:Body/ExecuteResponse/ExecuteResult"
    var executeResult = data.firstChild.firstChild.firstChild.firstChild,
        resultsNode = getChildNode(executeResult, 'a:Results'),
        entityCollection = getChildNode(resultsNode.firstChild, 'b:value'),
        resultSet = getChildNode(entityCollection, 'a:Entities').childNodes;
    return {
        entityName: getChildNodeText(entityCollection, 'a:EntityName'),
        moreRecords: (getChildNodeText(entityCollection, 'a:MoreRecords') === 'true'),
        pagingCookie: getChildNodeText(entityCollection, 'a:PagingCookie'),
        totalRecordCount: parseInt(getChildNodeText(entityCollection, 'a:TotalRecordCount'), 10),
        entities: $.map(resultSet, parseSingleEntityNode)
    };
}


///
/// Injects the paging-cookie & page-count
///
export const injectPagingDetails = function (fetchxml: any, page: any, pagingCookie: any) {
    // inject the paging attributes
    var xmldoc = $.parseXML(fetchxml),
        fetch = $(xmldoc).find('fetch');
    fetch.attr('page', page);
    fetch.attr('paging-cookie', pagingCookie);
    return xmlToString(xmldoc);
}


///
/// Performs the Ajax request
///
export const executeRequest = function (serverUrl: string, xml: any, opt_asyn: boolean) {
    // default is true
    let header: any = {};
    header[SOAP_CONSTS.SOAP_ACTION.text] = SOAP_CONSTS.SOAP_ACTION.value;
    header[SOAP_CONSTS.ACCEPT_TYPE.text] = SOAP_CONSTS.ACCEPT_TYPE.value.JSON;
    header[SOAP_CONSTS.CONTENT_TYPE.text] = SOAP_CONSTS.CONTENT_TYPE.value.XML;
    return $.ajax({
        type: SOAP_CONSTS.HTTP_METHOD.POST,
        async: opt_asyn != false,
        data: xml,
        url: serverUrl + SOAP_CONSTS.SOAP_ENDPOINT,
        headers: header
    });
}

export const selectSingleNode = function (node: any, xpathExpr: any) {
    if (typeof (node.selectSingleNode) != "undefined") {
        return node.selectSingleNode(xpathExpr);
    } else {
        var xpe = new XPathEvaluator();
        var results = xpe.evaluate(xpathExpr, node, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return results.singleNodeValue;

    }
};

export const setSelectionNamespaces = function (doc: any) {
    var namespaces = [
        "xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'",
        "xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'",
        "xmlns:i='http://www.w3.org/2001/XMLSchema-instance'",
        "xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'",
        "xmlns:c='http://schemas.microsoft.com/xrm/2011/Metadata'",
        "xmlns:ser='http://schemas.microsoft.com/xrm/2011/Contracts/Services'"
    ];
    doc.setProperty("SelectionNamespaces", namespaces.join(" "));
};


export const getError = function (async: boolean, resp: any) {
    //Error descriptions come from http://support.microsoft.com/kb/193625

    if (resp.status === 12029) {
        throw new Error("The attempt to connect to the server failed.");
    }
    if (resp.status === 12007) {
        throw new Error("The server name could not be resolved.");
    }
    var faultXml = resp.responseXML;

    var errorMessage = "Unknown (unable to parse the fault)";
    if (faultXml !== null && typeof faultXml == "object") {

        var faultstring = null;
        var errorCode = null;

        var bodyNode = faultXml.firstChild.firstChild;

        //Retrieve the fault node
        for (var i = 0; i < bodyNode.childNodes.length; i++) {
            var node = bodyNode.childNodes[i];

            //NOTE: This comparison does not handle the case where the XML namespace changes
            if ("s:Fault" === node.nodeName) {
                for (var j = 0; j < node.childNodes.length; j++) {
                    var testNode = node.childNodes[j];
                    if ("faultstring" === testNode.nodeName) {
                        faultstring = getNodeText(testNode);
                    }
                    if ("detail" === testNode.nodeName) {
                        for (var k = 0; k < testNode.childNodes.length; k++) {
                            var orgServiceFault = testNode.childNodes[k];
                            if ("OrganizationServiceFault" === orgServiceFault.nodeName) {
                                for (var l = 0; l < orgServiceFault.childNodes.length; l++) {
                                    var errorCodeNode = orgServiceFault.childNodes[l];
                                    if ("ErrorCode" === errorCodeNode.nodeName) {
                                        errorCode = getNodeText(errorCodeNode);
                                        break;
                                    }
                                }
                            }
                        }

                    }
                }
                break;
            }

        }
    }
    if (errorCode != null && faultstring != null) {
        errorMessage = "Error Code:" + errorCode + " Message: " + faultstring;
    } else {
        if (faultstring != null) {
            errorMessage = faultstring;
        }
    }
    if (async) {
        return new Error(errorMessage);
    } else {
        throw new Error(errorMessage);
    }

};

export const isArray = function (input: any) {
    return input.constructor.toString().indexOf("Array") !== -1;
};

export const stringToDate = function (s: any) {
    var b = s.split(/\D/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5]));
};


///
/// IE 9/10 and Chrome, Firefox, ... using "textContent" and IE 8 using "text
///
export const getNodeText = function (node: any) {
    return node.text !== undefined
        ? node.text
        : node.textContent;
}

export const encodeValue = function (value: any) {
    // Handle GUIDs wrapped in braces
    if (typeof value == "string") {
        value = value.replace(/[{}]/g, "");
    }

    // ReSharper disable QualifiedExpressionMaybeNull
    return (typeof value === "object" && value.getTime)
        // ReSharper restore QualifiedExpressionMaybeNull
        ?
        encodeDate(value) :
        crmXmlEncode(value);
};

export const crmXmlEncode = function (s: any) {
    // ReSharper disable UsageOfPossiblyUnassignedValue
    // ReSharper disable ExpressionIsAlwaysConst
    if ('undefined' === typeof s || null === s) return s;
    // ReSharper restore ExpressionIsAlwaysConst
    // ReSharper restore UsageOfPossiblyUnassignedValue
    else if (typeof s != "string") s = s.toString();
    return innerSurrogateAmpersandWorkaround(s);
};

export const selectSingleNodeText = function (node: any, xpathExpr: any) {
    var x = selectSingleNode(node, xpathExpr);
    if (isNodeNull(x)) {
        return null;
    }
    if (typeof (x.text) != "undefined") {
        return x.text;
    } else {
        return x.textContent;
    }
};

export const crmXmlDecode = function (s: any) {
    if (typeof s != "string") s = s.toString();
    return s;
};


const getEntityData = function (entityNode: any) {
    var value: any = null;
    var entityAttrsNode = getChildNode(entityNode, "a:Attributes");
    var entityIdNode = getChildNode(entityNode, "a:Id");
    var entityLogicalNameNode = getChildNode(entityNode, "a:LogicalName");
    var entityFormattedValuesNode = getChildNode(entityNode, "a:FormattedValues");
    var entityLogicalName = getNodeTextValue(entityLogicalNameNode);
    var entityId = getNodeTextValue(entityIdNode);
    var entityAttrs = getChildNodes(entityAttrsNode, "a:KeyValuePairOfstringanyType");
    value = new Entity(entityLogicalName, entityId, null);
    // Attribute values accessed via entity.attributes["new_fieldname"]
    if (entityAttrs != null && entityAttrs.length > 0) {
        for (var i = 0; i < entityAttrs.length; i++) {
            var attrNameNode = getChildNode(entityAttrs[i], "b:key")
            var attrValueNode = getChildNode(entityAttrs[i], "b:value");
            var attributeName = getNodeTextValue(attrNameNode);
            var attributeValue = getValue(attrValueNode);
            value.attributes[attributeName] = attributeValue;
        }
    }
    // Formatted values accessed via entity.formattedValues["new_fieldname"]
    for (var j = 0; j < entityFormattedValuesNode.childNodes.length; j++) {
        var foNode = entityFormattedValuesNode.childNodes[j];
        var fNameNode = getChildNode(foNode, "b:key")
        var fValueNode = getChildNode(foNode, "b:value");
        var fName = getNodeTextValue(fNameNode);
        var fValue = getNodeTextValue(fValueNode);
        value.formattedValues[fName] = fValue;
    }
    return value;
}

const getXmlEntityData = function (entity: any): string {
    var xml: string = "";
    if (entity != null) {
        var attrXml = "";
        for (let field in entity.attributes) {
            var a = entity.attributes[field];
            var aXml = getXmlValue(field, a.type, a.value);
            attrXml += aXml;
        }
        if (attrXml !== "") {
            xml = "<a:Attributes>" + attrXml + "</a:Attributes>";
        }
        else {
            xml = "<a:Attributes />";
        }
        xml += "<a:EntityState i:nil='true' />" +
            "<a:FormattedValues />" +
            "<a:Id>" + entity.id + "</a:Id>" +
            "<a:KeyAttributes />" +
            "<a:LogicalName>" + entity.logicalName + "</a:LogicalName>" +
            "<a:RelatedEntities />" +
            "<a:RowVersion i:nil='true' />";
    }
    return xml;
}
const htmlEncode = function (s: any) {
    if (typeof s !== "string") { return s; }
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

///
/// Parses a date-string in ISO-format into a date-object
///
const parseISO8601Date = (s: any) => {
    // parenthese matches:
    // year month day    hours minutes seconds  
    // dotmilliseconds 
    // tzstring plusminus hours minutes
    var re = /(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(\.\d+)?(Z|([+-])(\d\d):(\d\d))/;
    var d = [];
    d = s.match(re);
    if (!d) {
        throw "Couldn't parse ISO 8601 date string '" + s + "'";
    }
    // parse strings, leading zeros into proper ints
    var a = [1, 2, 3, 4, 5, 6, 10, 11];
    for (var i = 0, max = a.length; i < max; i++) {
        d[a[i]] = parseInt(d[a[i]], 10);
    }
    d[7] = parseFloat(d[7]);
    // Date.UTC(year, month[, date[, hrs[, min[, sec[, ms]]]]])
    // note that month is 0-11, not 1-12
    // see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/UTC
    var ms = Date.UTC(d[1], d[2] - 1, d[3], d[4], d[5], d[6]);
    // if there are milliseconds, add them
    if (d[7] > 0) {
        ms += Math.round(d[7] * 1000);
    }
    // if there's a timezone, calculate it
    if (d[8] !== 'Z' && d[10]) {
        var offset = d[10] * 60 * 60 * 1000;
        if (d[11]) {
            offset += d[11] * 60 * 1000;
        }
        if (d[9] === '-') {
            ms -= offset;
        }
        else {
            ms += offset;
        }
    }
    return new Date(ms);
}

///
/// Converst the xml definiton into an attribute object. 
/// The joined attributes are evaluated via a recursive call of this function
///
const convertXmlToAttributeObject = function (type: string, xmlnode: any) {
    var attr: any = { 'type': type };
    switch (type) {
        case "a:OptionSetValue":
            attr.value = getNodeText(xmlnode);
            break;
        case "a:EntityReference":
            attr.guid = getChildNodeText(xmlnode, 'a:Id');
            attr.name = getChildNodeText(xmlnode, 'a:Name');
            attr.logicalName = getChildNodeText(xmlnode, 'a:LogicalName');
            break;
        case "a:Money":
            attr.value = parseFloat(getNodeText(xmlnode));
            break;
        case "a:AliasedValue":
            var aliasValue = getChildNode(xmlnode, 'a:Value'),
                aliasType = getAttribute(aliasValue, 'i:type');
            // recursive call
            attr = convertXmlToAttributeObject(aliasType, aliasValue);
            break;
        case 'c:int':
            attr.value = parseInt(getNodeText(xmlnode), 10);
            break;
        case 'c:decimal':
            attr.value = parseFloat(getNodeText(xmlnode));
            break;
        case 'c:dateTime':
            attr.value = parseISO8601Date(getNodeText(xmlnode));
            break;
        case 'c:boolean':
            attr.value = (getNodeText(xmlnode) !== 'true') ? false : true;
            break;
        default:
            attr.value = getNodeText(xmlnode);
            break;
    }
    return attr;
}

///
/// Parses "Attribute" nodes of the SOAP-response
///
const parseAttibutes = function (attributesNode: any) {
    var typedAttrSet: any = {},
        attrNode = null,
        key = null,
        type = null,
        value = null;
    for (var i = 0, max = attributesNode.childNodes.length; i < max; i++) {
        attrNode = attributesNode.childNodes[i];
        // Establish the key for the attribute 
        key = getChildNodeText(attrNode, 'b:key');
        value = getChildNode(attrNode, 'b:value');
        type = getAttribute(value, 'i:type');
        // populate the object
        typedAttrSet[key] = convertXmlToAttributeObject(type, value);
    }
    return typedAttrSet;
}
///
/// Parses a single xml-node -> transforms into BusinessEntity
///
const parseSingleEntityNode = function (entityNode: any) {
    var entity = new BusinessEntity();
    entity.id = getChildNodeText(entityNode, 'a:Id');
    entity.attributes = parseAttibutes(getChildNode(entityNode, 'a:Attributes'));
    entity.logicalName = getChildNodeText(entityNode, 'a:LogicalName');
    // parse the formated values
    var childSet = getChildNode(entityNode, 'a:FormattedValues').childNodes;
    for (var i = 0, max = childSet.length; i < max; i++) {
        var item = childSet[i],
            key = getChildNodeText(item, 'b:key'),
            value = getChildNodeText(item, 'b:value');
        entity.attributes[key].formattedValue = value;
    }
    return entity;
}

///
/// Converts a given XMLDocument of XmlELement into a string
///
const xmlToString = function (elem: any) {
    var serialized;
    if (window.XMLSerializer) {
        // XMLSerializer exists in current Mozilla browsers
        var serializer = new XMLSerializer();
        serialized = serializer.serializeToString(elem);
    }
    else {
        // Internet Explorer has a different approach to serializing XML
        serialized = elem.xml;
    }
    return serialized;
}
///
/// retrievs the text-value of the expression
///
const getChildNodeText = function (xml: any, xpathExpression: any) {
    return getNodeText(getChildNode(xml, xpathExpression));
}

///
/// Get the attribute regardless of the namespace
///
const getAttribute = function (xmlNode: any, attrName: string) {
    for (var i = 0; i < xmlNode.attributes.length; i++) {
        var attr = xmlNode.attributes[i];
        if (attr.name == attrName) {
            return attr.value;
        }
    }
};


const encodeDate = function (dateTime: any) {
    return dateTime.getFullYear() + "-" +
        padNumber(dateTime.getMonth() + 1) + "-" +
        padNumber(dateTime.getDate()) + "T" +
        padNumber(dateTime.getHours()) + ":" +
        padNumber(dateTime.getMinutes()) + ":" +
        padNumber(dateTime.getSeconds());
};
const padNumber = function (s: any) {
    let len = 2;

    s = '' + s;
    while (s.length < len) {
        s = "0" + s;
    }
    return s;
};


const innerSurrogateAmpersandWorkaround = function (s: any) {
    var buffer = '';
    var c0;
    var cnt;
    var cntlength;
    for (cnt = 0, cntlength = s.length; cnt < cntlength; cnt++) {
        c0 = s.charCodeAt(cnt);
        if (c0 >= 55296 && c0 <= 57343)
            if (cnt + 1 < s.length) {
                var c1 = s.charCodeAt(cnt + 1);
                if (c1 >= 56320 && c1 <= 57343) {
                    buffer += "CRMEntityReferenceOpen" + ((c0 - 55296) * 1024 + (c1 & 1023) + 65536).toString(16) + "CRMEntityReferenceClose";
                    cnt++;
                } else
                    buffer += String.fromCharCode(c0);
            } else buffer += String.fromCharCode(c0);
        else buffer += String.fromCharCode(c0);
    }
    s = buffer;
    buffer = "";
    for (cnt = 0, cntlength = s.length; cnt < cntlength; cnt++) {
        c0 = s.charCodeAt(cnt);
        if (c0 >= 55296 && c0 <= 57343)
            buffer += String.fromCharCode(65533);
        else buffer += String.fromCharCode(c0);
    }
    s = buffer;
    s = htmlEncode(s);
    s = s.replace(/CRMEntityReferenceOpen/g, "&#x");
    s = s.replace(/CRMEntityReferenceClose/g, ";");
    return s;
};

const nsResolver = function (prefix: any) {
    var ns: any = {
        "s": "http://schemas.xmlsoap.org/soap/envelope/",
        "a": "http://schemas.microsoft.com/xrm/2011/Contracts",
        "i": "http://www.w3.org/2001/XMLSchema-instance",
        "b": "http://schemas.datacontract.org/2004/07/System.Collections.Generic",
        "c": "http://schemas.microsoft.com/xrm/2011/Metadata",
        "ser": "http://schemas.microsoft.com/xrm/2011/Contracts/Services"
    };
    return ns[prefix] || null;
};

const isNodeNull = function (node: any) {
    if (node == null) {
        return true;
    }
    if ((node.attributes.getNamedItem("i:nil") != null) && (node.attributes.getNamedItem("i:nil").value === "true")) {
        return true;
    }
    return false;
};




