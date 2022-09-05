import { _Entity } from './../Entity/entity';
import { Constants } from '../../Constant/constants';
import { _Attributes } from '../Attributes/attributes';
import { _GlobalContext } from '../Context/GlobalContext/globalcontext';
import { _Validation } from '../Validation/validation';
import { _OData } from './../OData/odata';
import { _Navigate } from '../Navigate/navigate';
import { IAlertStrings } from '../Navigate/DialogStrings/alert-strings.interface';
import { IConfirmStrings } from '../Navigate/DialogStrings/confirm-strings.interface';
import { Messages } from '../../Messages/messages';
import { logger } from '../Logger/logger';
import { _Controls } from '../Controls/controls';
import { Xrm } from "../../Constant/constants"

import { Helpers } from '../Logger/utils/helpers';
import { LogData } from '../Logger/contracts/log-data';
import { LogLevel } from '../Logger/abstractions/log-level';
class Utility {
    public getQueryStringParameter = (paramToRetrieve: string): string => {
        if (location.search != '') {
            let params = window.location.search?.split('?')[1].split('&');
            if (Array.isArray(params)) {
                for (let i = 0; i < params.length; i = i + 1) {
                    let singleParam = params[i].split('=');
                    if (singleParam[0] === paramToRetrieve) {
                        return decodeURIComponent(singleParam[1]);
                    }
                }
            }
        }
        return '';
    };
    public queryStringParameterToObject = (paramToRetrieve: string): {} => {
        let query = this.getQueryStringParameter(paramToRetrieve);
        if (query) {
            let obj: any = {};
            let vals = query.split('&');
            for (let i in vals) {
                let item = vals[i].replace(/\+/g, ' ').split('=');
                for (let i = 0; i < item.length; i++) {
                    obj[item[i]] = item[i + 1];
                    break;
                }
            }
            return obj;
        }
        return {};
    };
    public createFetchXml = (fetchXml: string, pagingCookie: string, page: number, count: number) => {
        var domParser = new DOMParser();
        var xmlSerializer = new XMLSerializer();

        var fetchXmlDocument = domParser.parseFromString(fetchXml, 'text/xml');

        if (page) {
            fetchXmlDocument.getElementsByTagName('fetch')[0].setAttribute('page', page.toString());
        }

        if (count) {
            fetchXmlDocument.getElementsByTagName('fetch')[0].setAttribute('count', count.toString());
        }

        if (pagingCookie) {
            var cookieDoc = domParser.parseFromString(pagingCookie, 'text/xml');
            if (cookieDoc) {
                var innerPagingCookie = domParser.parseFromString(decodeURIComponent(decodeURIComponent(cookieDoc.getElementsByTagName('cookie')[0].getAttribute('pagingcookie') ?? '')), 'text/xml');
                fetchXmlDocument.getElementsByTagName('fetch')[0].setAttribute('paging-cookie', xmlSerializer.serializeToString(innerPagingCookie));
            }
        }

        return xmlSerializer.serializeToString(fetchXmlDocument);
    };
    public initLookup = (entityType: string, id: string, name?: string) => [{ entityType, id, name }];
    public guidEmpty = () => '00000000-0000-0000-0000-000000000000';
    public removeBrackets = (guid: string) => guid.replace(/[{}]/gi, '');
    /**
     * Mapping attribute value from fetchXml to current form's attributes
     * @param entityLogicalName
     * @param fetchXml
     * @returns
     * All attributes in fetchxml must be named alias same attribute name on current form
     */
    public autoMappingValue = async (entityLogicalName: string, fetchXml: string, lookupName?: string): Promise<any> => {
        if (typeof lookupName === 'string') {
        }
        if (fetchXml && !_Validation.isFetchXml(fetchXml)) return;
        let result = await _OData.retrieveMultipleRecords(entityLogicalName, fetchXml);
        if (result && result.entities && result.entities[0]) {
            let entity = result.entities[0];
            let keys = Object.keys(entity);
            var fields = keys.filter((k) => k.indexOf('@') < 0);

            for (let field of fields) {
                let attrName = field;
                try {
                    if (field.startsWith('_') && field.endsWith('_value')) attrName = field.substring(1, field.length - 6);
                    let attr = _Attributes.getAttribute(attrName);
                    let type = attr.getAttributeType();
                    switch (type) {
                        case 'boolean':
                        case 'decimal':
                        case 'double':
                        case 'integer':
                        case 'memo':
                        case 'money':
                        case 'optionset':
                        case 'string':
                            attr.setValue(entity[field]);
                            break;
                        case 'datetime':
                            attr.setValue(new Date(entity[field]));
                            break;
                        case 'lookup':
                            attr.setValue(this.initLookup(entity[field + Constants.ODataLookupLogicalName], entity[field], entity[field + Constants.ODataFormattedValue]));
                            break;
                        case 'multiselectoptionset':
                            var options: string[] = entity[field].split(',');
                            attr.setValue(options.map((op) => parseInt(op)));
                            break;
                        default:
                            break;
                    }
                } catch (ex: any) {
                    console.log(`[Error]: ${attrName}\n${ex.message}`);
                }
            }
        }
        return result;
    };
    public calculateAge = (dob: string | Date, exactDate: boolean = true) => {
        let age = 0;
        let birthDate = new Date(dob);
        if (birthDate) {
            var currentDate = new Date();
            var date = birthDate.getDate();
            var month = birthDate.getMonth();
            var year = birthDate.getFullYear();
            age = currentDate.getFullYear() - year;

            if (exactDate) {
                if (month > currentDate.getMonth() || (month === currentDate.getMonth() && date > currentDate.getDate())) age -= 1;
            }
        }
        return age;
    };
    public getCurrentUserRoles = (): [{ id: string; name: string }] => {
        return _GlobalContext.userSettings.roles.get();
    };
    public checkUserHaveRoles = (roleNames: string[]): boolean => {
        if (!Array.isArray(roleNames)) return false;

        let roles: [{ id: string; name: string }] = this.getCurrentUserRoles();
        return roleNames.some((roleName) => roles.some((role) => role.name === roleName));
    };
    public getEntityMetadata = (entityName: string, attributes?: string[]): Promise<any> => {
        return Xrm.Utility.getEntityMetadata(entityName, attributes);
    }
    public clickRibbonButton = async (text: string, title?: string) => {
        if (_Entity.getIsDirty()) {
            let alertStrings: IAlertStrings = <IAlertStrings>{};
            alertStrings.text = Messages.get('MS006');

            _Navigate.openAlertDialog(alertStrings);
            return false;
        }
        let confirmStrings: IConfirmStrings = <IConfirmStrings>{};
        confirmStrings.text = text;
        confirmStrings.title = title;
        return _Navigate.openConfirmDialog(confirmStrings);
    };
    public isSameGuId = (guid1: string, guid2: string): boolean => {
        try {
            return this.removeBrackets(guid1).toUpperCase() === this.removeBrackets(guid2).toUpperCase();
        } catch (ex: any) {
            logger.Warn(ex.message);
            return false;
        }
    };
    public showProgressIndicator = (message: string) => Xrm.Utility.showProgressIndicator(message);
    public closeProgressIndicator = () => Xrm.Utility.closeProgressIndicator();
    public reFreshIframe = (controlName: string) => {
        var subgrid = _Controls.getControl(controlName)
        if (subgrid) {
            var src = subgrid.getSrc();
            subgrid.setSrc("_blank");
            subgrid.setSrc(src);
        }
    }
    public getLookupValue = (fieldName: string) => {
        var value = null;
        var attr = _Attributes.getAttribute(fieldName)
        if (attr != null) {
            value = attr.getValue();
            if (value && value.length > 0)
                value = value[0];
            else
                value = null;
        }
        return value;
    }
    public setLookUp = (id: string, name: string, entityType: string, attribute: string) => {
        var object = new Array();
        object[0] = new Object();
        object[0].id = id;
        object[0].name = name;
        object[0].entityType = entityType;
        _Attributes.getAttribute(attribute).setValue(object);
    }
    public setOptionSetValueByText = (fieldname: string, optionText: string) => {
        var options: any = _Attributes.getAttribute(fieldname).getOptions();
        for (var i = 0; i < options.length; i++) {
            if (options[i].text === optionText) {
                _Attributes.getAttribute(fieldname).setValue(options[i].value);
                break;
            }
        }
    }
    public setOptionSetFieldByText = (field: any, optionText: string) => {
        var options = field.getOptions();
        for (var i = 0; i < options.length; i++) {
            if (options[i].text === optionText) {
                field.setValue(options[i].value);
                break;
            }
        }
    }
    public setValueByText = (fieldname: string, value: any) => {
        var getField = _Attributes.getAttribute(fieldname);
        if (getField) {
            getField.setValue(value);
        }
    }
    /**
     * @desc Remove all unused values in option set fields
     * @param {String} fieldName - field name
     * @param {String} fieldValue - field value
    */
    public removeOptionSetItem = (fieldName: string, fieldValue: any) => {
        _Controls.getControl(fieldName).removeOption(fieldValue);
    }
    /* find option in optionset by value */
    public findOption = (list: any, value: any) => {
        var rs = null;
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].value === value) {
                    rs = list[i];
                    break;
                }
            }
        }
        return rs;
    }
    public getParameterByName = (name: string) => {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    public QueryString = (url: string) => {
        // This function is anonymous, is executed immediately and 
        // the return value is assigned to QueryString!
        var query_string: any = {};
        var query = url;
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], pair[1]];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(pair[1]);
            }
        }
        return query_string;
    };

    public updateQueryString = (uri: string, key: string, value: string) => {
        var re = new RegExp("([?|&])" + key + "=.*?(&|#|$)", "i");
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            var hash = '';
            var separator = uri.indexOf('?') !== -1 ? "&" : "?";
            if (uri.indexOf('#') !== -1) {
                hash = uri.replace(/.*#/, '#');
                uri = uri.replace(/#.*/, '');
            }
            return uri + separator + key + "=" + value + hash;
        }
    }
    public removeThousandsSeparator(value: any, decimals: any) {
        if (decimals == undefined || isNaN(decimals))
            decimals = 0;
        if (isNaN(value)) {
            var decimal_sep = ',';
            var thousands_sep = '.';
            if ((window.navigator as any).systemLanguage == 'en-us') {
                var decimal_sep = '.';
                var thousands_sep = ',';
            }
            var n = value.toString();
            n = eval('n.replace(/\\' + thousands_sep + '/g,"")');
            n = eval('n.replace(/\\' + decimal_sep + '/g,".")');
            return n;
        }
        return value;
    }

    public openPopupLookup = (fieldNames: Array<string>) => {

        try {
            var navigationOptions: any = {
                target: 2,
                height: { value: 80, unit: "%" },
                width: { value: 80, unit: "%" },
                position: 1
            };

            fieldNames.forEach(fieldName => {
                var control: any = _Controls.getControl(fieldName);
                control.addOnLookupTagClick((e: any) => {
                    e.getEventArgs().preventDefault(); // disable the default behavior which to open the lookup record.
                    // get the lookup record value
                    var lookupRecord = e.getEventArgs().getTagValue();
                    var pageInput: any = {
                        pageType: "entityrecord",
                        entityName: lookupRecord.entityType,
                        entityId: lookupRecord.id,
                    };
                    _Navigate.navigateTo(pageInput, navigationOptions)
                });
            });
        }
        catch (e: any) {
            logger.Error(e.message, 'Utilitiy.openPopupLookup')
        }
    }

    public openNewWindowLookup = (fieldNames: Array<string>) => {
        try {
            fieldNames.forEach(fieldName => {
                var control: any = _Controls.getControl(fieldName);
                control.addOnLookupTagClick((e: any) => {
                    e.getEventArgs().preventDefault(); // disable the default behavior which to open the lookup record.
                    // get the lookup record value
                    var lookupRecord = e.getEventArgs().getTagValue();
                    var url = window.location.href;
                    var index = url.indexOf("etn=")
                    var uri = url.slice(0, index);
                    uri += `etn=${lookupRecord.entityType}&id=${lookupRecord.id}`
                    window.open(uri)
                });
            });
        }
        catch (e: any) {
            logger.Error(e.message, 'Utilitiy.openNewWindowLookup')
        }
    }
   
  sendLog = async (message: string, logerLevel: LogLevel, mod: string) => {
    let $ = (window as any).$ ? (window as any).$ : (window as any).parent.$;

    let url: string = Xrm.Utility.getGlobalContext().getClientUrl();
    let ipAddress = await $.getJSON('https://api.ipify.org?format=json', function () {});
    let logData: LogData = {
      name: (mod ? mod + '| ' : '') + new Date().toISOString(),
      url: url,
      logerLevel: logerLevel,
      ip: ipAddress ? ipAddress.ip : '',
      func: mod,
      message: message,
    };
    if (Xrm != null && Xrm.Page.ui != null) logData.form = Xrm.Page.ui.formSelector.getCurrentItem().getLabel();

    if (Xrm != null && Xrm.Page.data != null) {
      logData.entity = Xrm.Page.data.entity.getEntityName();
      logData.entityId = Xrm.Page.data.entity.getId();
    }

    Helpers.Send(logData);
  };
}

export const Utilities = new Utility()
