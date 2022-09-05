/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ 431:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Xrm = exports.$ = exports.SOAP_TYPE = exports.SOAP_CONSTS = exports.SaveOption = exports.FormType = exports.Constants = void 0;
var Constants;
(function (Constants) {
    Constants.ODataFormattedValue = '@OData.Community.Display.V1.FormattedValue';
    Constants.ODataLookupLogicalName = '@Microsoft.Dynamics.CRM.lookuplogicalname';
    Constants.ODataAssociatedNavigationProperty = '@Microsoft.Dynamics.CRM.associatednavigationproperty';
    var BoundParameter;
    (function (BoundParameter) {
        BoundParameter["CRUD"] = "undefined";
        BoundParameter["Global"] = "null";
        BoundParameter["Entity"] = "entity";
    })(BoundParameter = Constants.BoundParameter || (Constants.BoundParameter = {}));
    var OperationType;
    (function (OperationType) {
        OperationType[OperationType["Action"] = 0] = "Action";
        OperationType[OperationType["Function"] = 1] = "Function";
        OperationType[OperationType["CRUD"] = 2] = "CRUD";
    })(OperationType = Constants.OperationType || (Constants.OperationType = {}));
    var StructuralProperty;
    (function (StructuralProperty) {
        StructuralProperty[StructuralProperty["Unknown"] = 0] = "Unknown";
        StructuralProperty[StructuralProperty["PrimitiveType"] = 1] = "PrimitiveType";
        StructuralProperty[StructuralProperty["ComplexType"] = 2] = "ComplexType";
        StructuralProperty[StructuralProperty["EnumerationType"] = 3] = "EnumerationType";
        StructuralProperty[StructuralProperty["Collection"] = 4] = "Collection";
        StructuralProperty[StructuralProperty["EntityType"] = 5] = "EntityType";
    })(StructuralProperty = Constants.StructuralProperty || (Constants.StructuralProperty = {}));
    var RequiredLevel;
    (function (RequiredLevel) {
        RequiredLevel["None"] = "none";
        RequiredLevel["Required"] = "required";
        RequiredLevel["Recommended"] = "recommended";
    })(RequiredLevel = Constants.RequiredLevel || (Constants.RequiredLevel = {}));
    var SubmitMode;
    (function (SubmitMode) {
        SubmitMode["Always"] = "always";
        SubmitMode["Never"] = "never";
        SubmitMode["Dirty"] = "dirty";
    })(SubmitMode = Constants.SubmitMode || (Constants.SubmitMode = {}));
    var TabDisplayState;
    (function (TabDisplayState) {
        TabDisplayState["Expanded"] = "expanded";
        TabDisplayState["Collapsed"] = "collapsed";
    })(TabDisplayState = Constants.TabDisplayState || (Constants.TabDisplayState = {}));
    var NotificationLevel;
    (function (NotificationLevel) {
        NotificationLevel["ERROR"] = "RECOMMENDATION";
        NotificationLevel["RECOMMENDATION"] = "ERROR";
    })(NotificationLevel = Constants.NotificationLevel || (Constants.NotificationLevel = {}));
    var FormType;
    (function (FormType) {
        FormType[FormType["Undefined"] = 0] = "Undefined";
        FormType[FormType["Create"] = 1] = "Create";
        FormType[FormType["Update"] = 2] = "Update";
        FormType[FormType["ReadOnly"] = 3] = "ReadOnly";
        FormType[FormType["Disabled"] = 4] = "Disabled";
        FormType[FormType["BulkEdit"] = 5] = "BulkEdit";
    })(FormType = Constants.FormType || (Constants.FormType = {}));
    var LogerLevel;
    (function (LogerLevel) {
        LogerLevel[LogerLevel["Warning"] = 100000000] = "Warning";
        LogerLevel[LogerLevel["Error"] = 100000001] = "Error";
        LogerLevel[LogerLevel["Critical"] = 100000002] = "Critical";
    })(LogerLevel = Constants.LogerLevel || (Constants.LogerLevel = {}));
    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["None"] = 0] = "None";
        LogLevel[LogLevel["Critical"] = 1] = "Critical";
        LogLevel[LogLevel["Error"] = 2] = "Error";
        LogLevel[LogLevel["Warning"] = 4] = "Warning";
        LogLevel[LogLevel["Information"] = 8] = "Information";
        LogLevel[LogLevel["Debug"] = 16] = "Debug";
        LogLevel[LogLevel["Trace"] = 32] = "Trace";
    })(LogLevel = Constants.LogLevel || (Constants.LogLevel = {}));
    Constants.Logger = {
        logicalName: 'ant_logger',
        primaryId: 'ant_loggerid',
        name: 'ant_name',
        clientType: {
            name: 'ant_clienttype',
            value: {
                web: 100000000,
            },
        },
        logerLevel: {
            name: 'ant_level',
            value: {},
        },
        url: 'ant_url',
        module: 'ant_module',
        function: 'ant_functionaction',
        ip: 'ant_ip',
        form: 'ant_form',
        entity: 'ant_entity',
        entityId: 'ant_entityid',
        message: 'ant_message',
        trace: 'ant_trace',
    };
    var TimerControlStateEnum;
    (function (TimerControlStateEnum) {
        TimerControlStateEnum[TimerControlStateEnum["NotSet"] = 1] = "NotSet";
        TimerControlStateEnum[TimerControlStateEnum["InProgress"] = 2] = "InProgress";
        TimerControlStateEnum[TimerControlStateEnum["Warning"] = 3] = "Warning";
        TimerControlStateEnum[TimerControlStateEnum["Violated"] = 4] = "Violated";
        TimerControlStateEnum[TimerControlStateEnum["Success"] = 5] = "Success";
        TimerControlStateEnum[TimerControlStateEnum["Expired"] = 6] = "Expired";
        TimerControlStateEnum[TimerControlStateEnum["Canceled"] = 7] = "Canceled";
        TimerControlStateEnum[TimerControlStateEnum["Paused"] = 8] = "Paused";
    })(TimerControlStateEnum = Constants.TimerControlStateEnum || (Constants.TimerControlStateEnum = {}));
    Constants.EmptyGuid = '00000000-0000-0000-0000-000000000000';
    var LangCode;
    (function (LangCode) {
        LangCode[LangCode["English"] = 1033] = "English";
        LangCode[LangCode["Vietnam"] = 1066] = "Vietnam";
    })(LangCode = Constants.LangCode || (Constants.LangCode = {}));
})(Constants = exports.Constants || (exports.Constants = {}));
var FormType;
(function (FormType) {
    FormType[FormType["Undefined"] = 0] = "Undefined";
    FormType[FormType["Create"] = 1] = "Create";
    FormType[FormType["Update"] = 2] = "Update";
    FormType[FormType["ReadOnly"] = 3] = "ReadOnly";
    FormType[FormType["Disabled"] = 4] = "Disabled";
    FormType[FormType["BulkEdit"] = 5] = "BulkEdit";
})(FormType = exports.FormType || (exports.FormType = {}));
exports.SaveOption = {
    SaveAndClose: 'saveandclose',
    SaveAndNew: 'saveandnew',
};
exports.SOAP_CONSTS = {
    SOAP_ENDPOINT: '/XRMServices/2011/Organization.svc/web',
    SOAP_ACTION: { text: 'SOAPAction', value: 'http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute' },
    HTTP_METHOD: {
        GET: 'GET',
        POST: 'POST',
        PATCH: 'PATCH',
        DELETE: 'DELETE',
    },
    X_HTTP_Method: {
        text: 'X-HTTP-Method',
        value: {
            DELETE: 'DELETE',
            MERGE: 'MERGE',
        },
    },
    ACCEPT_TYPE: {
        text: 'Accept',
        value: {
            JSON: 'application/json',
            XML: 'application/xml, text/xml, */*',
        },
    },
    CONTENT_TYPE: {
        text: 'Content-Type',
        value: {
            JSON: 'application/json; charset=utf-8',
            XML: 'text/xml; charset=utf-8',
        },
    },
    crmWebResources: {
        dialog: '/webresources/c30seeds_/dialog/dialog.html',
    },
};
var SOAP_TYPE;
(function (SOAP_TYPE) {
    SOAP_TYPE["Bool"] = "c:boolean";
    SOAP_TYPE["Float"] = "c:double";
    SOAP_TYPE["Decimal"] = "c:decimal";
    SOAP_TYPE["Int"] = "c:int";
    SOAP_TYPE["String"] = "c:string";
    SOAP_TYPE["DateTime"] = "c:dateTime";
    SOAP_TYPE["Guid"] = "c:guid";
    SOAP_TYPE["EntityReference"] = "a:EntityReference";
    SOAP_TYPE["OptionSet"] = "a:OptionSetValue";
    SOAP_TYPE["Money"] = "a:Money";
    SOAP_TYPE["Entity"] = "a:Entity";
    SOAP_TYPE["EntityCollection"] = "a:EntityCollection";
})(SOAP_TYPE = exports.SOAP_TYPE || (exports.SOAP_TYPE = {}));
exports.$ = window.$ ? window.$ : window.parent.$;
exports.Xrm = window.parent['Xrm'];


/***/ }),

/***/ 472:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Attribute = void 0;
var constants_1 = __webpack_require__(431);
var Attribute = (function () {
    function Attribute(name) {
        var _attribute = formContext.getAttribute(name);
        this.get = function () {
            return _attribute;
        };
    }
    Attribute.prototype.addOnChange = function (fn) {
        var _a;
        try {
            fn && ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.addOnChange) && this.get().addOnChange(fn);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Attribute.prototype.fireOnChange = function () {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.fireOnChange) && this.get().fireOnChange();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Attribute.prototype.getAttributeType = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getAttributeType) && this.get().getAttributeType();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getFormat = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getFormat) && this.get().getFormat();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getInitialValue = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getInitialValue) && this.get().getInitialValue();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getIsDirty = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getIsDirty) && this.get().getIsDirty();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getIsPartyList = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getIsPartyList) && this.get().getIsPartyList();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getMax = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getMax) && this.get().getMax();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getMaxLength = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getMaxLength) && this.get().getMaxLength();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getMin = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getMin) && this.get().getMin();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getName = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getName) && this.get().getName();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getOption = function (option) {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getOption) && this.get().getOption(option);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getOptions = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getOptions) && this.get().getOptions();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getParent = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getParent) && this.get().getParent();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getPrecision = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getPrecision) && this.get().getPrecision();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getRequiredLevel = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getRequiredLevel) && this.get().getRequiredLevel();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getSelectedOption = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getSelectedOption) && this.get().getSelectedOption();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getSubmitMode = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getSubmitMode) && this.get().getSubmitMode();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getText = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getText) && this.get().getText();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getUserPrivilege = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getUserPrivilege) && this.get().getUserPrivilege();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return;
    };
    Attribute.prototype.getValue = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getValue) && this.get().getValue();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Attribute.prototype.isValid = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.isValid) && this.get().isValid();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
        return false;
    };
    Attribute.prototype.removeOnChange = function (fn) {
        var _a;
        try {
            fn && ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.removeOnChange) && this.get().removeOnChange(fn);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Attribute.prototype.setIsValid = function (bool, message) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setIsValid) && this.get().setIsValid(bool, message);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Attribute.prototype.setPrecision = function (value) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setPrecision) && this.get().setPrecision(value);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Attribute.prototype.setRequiredLevel = function (requirementLevel) {
        var _a;
        try {
            if (requirementLevel !== constants_1.Constants.RequiredLevel.None &&
                requirementLevel !== constants_1.Constants.RequiredLevel.Recommended &&
                requirementLevel !== constants_1.Constants.RequiredLevel.Required)
                return console.log('[Error]: Invalid value for RequiredLevel');
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setRequiredLevel) && this.get().setRequiredLevel(requirementLevel);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Attribute.prototype.setSubmitMode = function (mode) {
        var _a;
        try {
            if (mode !== constants_1.Constants.SubmitMode.Always && mode !== constants_1.Constants.SubmitMode.Dirty && mode !== constants_1.Constants.SubmitMode.Never)
                return console.log('[Error]: Invalid value for SubmitMode');
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setSubmitMode) && this.get().setSubmitMode(mode);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Attribute.prototype.setValue = function (value) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setValue) && this.get().setValue(value);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    return Attribute;
}());
exports.Attribute = Attribute;


/***/ }),

/***/ 234:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._Attributes = void 0;
var attribute_1 = __webpack_require__(472);
var Attributes = (function () {
    function Attributes() {
    }
    Attributes.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    Attributes.prototype.getAttribute = function (name) {
        return new attribute_1.Attribute(name);
    };
    Attributes.prototype.setRequiredLevels = function (attrs, requirementLevel) {
        var _a;
        try {
            if (attrs && Array.isArray(attrs))
                for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
                    var attr = attrs_1[_i];
                    (_a = this.getAttribute(attr)) === null || _a === void 0 ? void 0 : _a.setRequiredLevel(requirementLevel);
                }
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Attributes.prototype.setSubmitModes = function (attrs, mode) {
        var _a;
        try {
            if (attrs && Array.isArray(attrs))
                for (var _i = 0, attrs_2 = attrs; _i < attrs_2.length; _i++) {
                    var attr = attrs_2[_i];
                    (_a = this.getAttribute(attr)) === null || _a === void 0 ? void 0 : _a.setSubmitMode(mode);
                }
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Attributes.prototype.clearAttributeValues = function (attrs) {
        if (attrs && Array.isArray(attrs))
            for (var _i = 0, attrs_3 = attrs; _i < attrs_3.length; _i++) {
                var attr = attrs_3[_i];
                this.getAttribute(attr).setValue(null);
            }
    };
    return Attributes;
}());
exports._Attributes = Attributes.getInstance();


/***/ }),

/***/ 416:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormContext = void 0;
var contextBase_1 = __webpack_require__(14);
var logger_1 = __webpack_require__(218);
var FormContext = (function (_super) {
    __extends(FormContext, _super);
    function FormContext() {
        return _super.call(this) || this;
    }
    FormContext.prototype.getFormSelector = function (id) {
        try {
            return this.context.ui.formSelector.items.get(id ? id : undefined);
        }
        catch (e) {
            logger_1.logger.Error(e.message, "FormContext.getFormSelector", 15);
        }
    };
    FormContext.prototype.getCurrentItem = function () {
        try {
            return this.context.ui.formSelector.getCurrentItem();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "FormContext.getCurrentItem", 23);
        }
    };
    FormContext.prototype.close = function () {
        try {
            this.context['ui']['close']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "FormContext.close", 32);
        }
    };
    FormContext.prototype.getViewPortHeight = function () {
        try {
            return this.context['ui']['getViewPortHeight']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "FormContext.getViewPortHeight", 41);
        }
    };
    FormContext.prototype.getViewPortWidth = function () {
        try {
            return this.context['ui']['getViewPortWidth']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "FormContext.getViewPortWidth", 41);
        }
    };
    FormContext.prototype.getIsDirty = function () {
        try {
            return this.context['data']['entity']['getIsDirty']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "FormContext.getIsDirty", 59);
        }
    };
    FormContext.prototype.isValid = function () {
        try {
            return this.context['data']['entity']['isValid']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "FormContext.isValid", 67);
        }
    };
    FormContext.prototype.save = function (option) {
        try {
            return this.context['data']['entity']["save"](option);
        }
        catch (e) {
            logger_1.logger.Error(e.message, "FormContext.save", 75);
        }
    };
    FormContext.prototype.refresh = function (save) {
        try {
            return this.context['data']['entity']["refresh"](save);
        }
        catch (e) {
            logger_1.logger.Error(e.message, "FormContext.refresh", 83);
        }
    };
    FormContext.prototype.getFormType = function () {
        try {
            return this.context['ui']['getFormType']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "FormContext.getFormType", 91);
        }
    };
    FormContext.prototype.refreshRibbon = function (refreshAll) {
        try {
            this.context['ui']['refreshRibbon'](refreshAll);
        }
        catch (e) {
            logger_1.logger.Error(e.message, "FormContext.refreshRibbon", 99);
        }
    };
    FormContext.prototype.setFormNotification = function (message, level, uniqueId) {
        try {
            this.context['ui'].setFormNotification(message, level, uniqueId);
        }
        catch (e) {
            logger_1.logger.Error(e.message, "FormContext.setFormNotification", 107);
        }
    };
    FormContext.prototype.clearFormNotification = function (uniqueId) {
        try {
            this.context['ui'].clearFormNotification(uniqueId);
        }
        catch (e) {
            logger_1.logger.Error(e.message, "FormContext.clearFormNotification", 116);
        }
    };
    return FormContext;
}(contextBase_1.ContextBase));
exports.FormContext = FormContext;


/***/ }),

/***/ 713:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._GlobalContext = exports.GlobalContext = void 0;
var logger_1 = __webpack_require__(218);
var formcontext_1 = __webpack_require__(416);
var GlobalContext = (function (_super) {
    __extends(GlobalContext, _super);
    function GlobalContext() {
        var _this = _super.call(this) || this;
        _this.userSettings = _this.globalContext.userSettings;
        _this.client = _this.globalContext.client;
        _this.organizationSettings = _this.globalContext.organizationSettings;
        return _this;
    }
    GlobalContext.prototype.getAdvancedConfigSetting = function (setting) {
        try {
            return this.globalContext.getAdvancedConfigSetting(setting);
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GlobalContext.getAdvancedConfigSetting");
        }
    };
    GlobalContext.prototype.getClientUrl = function () {
        try {
            return this.globalContext.getClientUrl();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GlobalContext.getClientUrl");
        }
    };
    GlobalContext.prototype.getCurrentAppName = function () {
        try {
            return this.globalContext.getCurrentAppName();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GlobalContext.getCurrentAppName");
        }
    };
    GlobalContext.prototype.getCurrentAppProperties = function () {
        try {
            return this.globalContext.getCurrentAppProperties();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GlobalContext.getCurrentAppProperties");
        }
    };
    GlobalContext.prototype.getCurrentAppUrl = function () {
        try {
            return this.globalContext.getCurrentAppUrl();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GlobalContext.getCurrentAppUrl");
        }
    };
    GlobalContext.prototype.getVersion = function () {
        try {
            return this.globalContext.getVersion();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GlobalContext.getVersion");
        }
    };
    GlobalContext.prototype.getWebResourceUrl = function (webResourceName) {
        try {
            return this.globalContext.getWebResourceUrl(webResourceName);
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GlobalContext.getWebResourceUrl");
        }
    };
    GlobalContext.prototype.getClient = function () {
        return this.client.getClient();
    };
    return GlobalContext;
}(formcontext_1.FormContext));
exports.GlobalContext = GlobalContext;
exports._GlobalContext = new GlobalContext();


/***/ }),

/***/ 19:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Grid = void 0;
var logger_1 = __webpack_require__(218);
var contextBase_1 = __webpack_require__(14);
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        return _super.call(this) || this;
    }
    Grid.prototype.getRrow = function () {
        try {
            return this.gridContext['getGrid']()['getRows']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GlobalContext.getRrow");
        }
    };
    Grid.prototype.getSelectedRows = function () {
        try {
            return this.gridContext['getGrid']()['getSelectedRows']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GlobalContext.getSelectedRows");
        }
    };
    Grid.prototype.getTotalRecordCount = function () {
        try {
            return this.gridContext['getGrid']()['getTotalRecordCount']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GlobalContext.getTotalRecordCount");
        }
    };
    return Grid;
}(contextBase_1.ContextBase));
exports.Grid = Grid;


/***/ }),

/***/ 826:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GridContext = void 0;
var logger_1 = __webpack_require__(218);
var grid_1 = __webpack_require__(19);
var GridContext = (function (_super) {
    __extends(GridContext, _super);
    function GridContext() {
        return _super.call(this) || this;
    }
    GridContext.prototype.getEntityName = function () {
        try {
            return this.gridContext['getEntityName']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GridContext.getEntityName");
        }
    };
    GridContext.prototype.getFetchXml = function () {
        try {
            return this.gridContext['getFetchXml']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GridContext.getFetchXml");
        }
    };
    GridContext.prototype.getGridType = function () {
        try {
            return this.gridContext['getGridType']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GridContext.getGridType");
        }
    };
    GridContext.prototype.getRelationship = function () {
        try {
            return this.gridContext['getRelationship']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GridContext.getRelationship");
        }
    };
    GridContext.prototype.getUrl = function (client) {
        try {
            return this.gridContext['getUrl'](client);
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GridContext.getUrl");
        }
    };
    GridContext.prototype.getViewSelector = function () {
        try {
            return this.gridContext['getViewSelector']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GridContext.getViewSelector");
        }
    };
    GridContext.prototype.openRelatedGrid = function () {
        try {
            this.gridContext['openRelatedGrid']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GridContext.openRelatedGrid");
        }
    };
    GridContext.prototype.refresh = function () {
        try {
            return this.gridContext['refresh']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GridContext.refresh");
        }
    };
    GridContext.prototype.refreshRibbon = function () {
        try {
            return this.gridContext['refreshRibbon']();
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GridContext.refreshRibbon");
        }
    };
    GridContext.prototype.getRrow = function () {
        try {
            return _super.prototype.getRrow.call(this);
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GridContext.getRrow");
        }
    };
    GridContext.prototype.getSelectedRows = function () {
        try {
            return _super.prototype.getSelectedRows.call(this);
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GridContext.getSelectedRows");
        }
    };
    GridContext.prototype.getTotalRecordCount = function () {
        try {
            return _super.prototype.getTotalRecordCount.call(this);
        }
        catch (e) {
            logger_1.logger.Error(e.message, "GridContext.getTotalRecordCount");
        }
    };
    return GridContext;
}(grid_1.Grid));
exports.GridContext = GridContext;


/***/ }),

/***/ 14:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContextBase = void 0;
var ContextBase = (function () {
    function ContextBase() {
        ContextBase._globalContext = window.parent['Xrm']['Utility']['getGlobalContext']();
    }
    ContextBase.prototype.init = function (context, _top) {
        try {
            if (context.getFormContext) {
                ContextBase._context = context.getFormContext();
                ContextBase._excutionContext = ContextBase._context;
                if (_top) {
                    if (typeof top.formContext === 'undefined')
                        top.formContext = ContextBase._context;
                }
                else {
                    if (typeof window.formContext === 'undefined')
                        window.formContext = ContextBase._context;
                }
            }
            else {
                this._gridContext = context;
            }
        }
        catch (e) {
        }
    };
    Object.defineProperty(ContextBase.prototype, "getPageContext", {
        get: function () {
            try {
                return Xrm.Utility.getPageContext();
            }
            catch (e) {
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContextBase.prototype, "context", {
        get: function () {
            return ContextBase._context;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContextBase.prototype, "globalContext", {
        get: function () {
            return ContextBase._globalContext;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContextBase.prototype, "excutionContext", {
        get: function () {
            return ContextBase._excutionContext;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContextBase.prototype, "gridContext", {
        get: function () {
            return this._gridContext;
        },
        enumerable: false,
        configurable: true
    });
    return ContextBase;
}());
exports.ContextBase = ContextBase;


/***/ }),

/***/ 803:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Control = void 0;
var control_base_1 = __webpack_require__(91);
var Control = (function (_super) {
    __extends(Control, _super);
    function Control(name) {
        var _this = this;
        var _control = formContext === null || formContext === void 0 ? void 0 : formContext.getControl(name);
        _this = _super.call(this, _control) || this;
        _this.get = function () {
            return _control;
        };
        return _this;
    }
    Control.prototype.addCustomFilter = function (filter, entityLogicaName) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.addCustomFilter) && this.get().addCustomFilter(filter, entityLogicaName);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.addCustomView = function (viewId, entityName, viewDisplayName, fetchXml, layoutXml, isDefault) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.addCustomView) && this.get().addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, isDefault);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.addNotification = function (notification) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.addNotification) && this.get().addNotification(notification);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.addOnLookupTagClick = function (fn) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.addOnLookupTagClick) && this.get().addOnLookupTagClick(fn);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.addOption = function (option, index) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.addOption) && this.get().addOption(option, index);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.addPreSearch = function (fn) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.addPreSearch) && this.get().addPreSearch(fn);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.clearNotification = function (uniqueId) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.clearNotification) && this.get().clearNotification(uniqueId);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.clearOptions = function () {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.clearOptions) && this.get().clearOptions();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getAttribute = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getAttribute) && this.get().getAttribute();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getContentWindow = function (successCallback, errorCallback) {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getContentWindow) && this.get().getContentWindow(successCallback, errorCallback);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getControl = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getControl) && this.get().getControl();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getControlType = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getControlType) && this.get().getControlType();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getData = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getData) && this.get().getData();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getDefaultView = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getDefaultView) && this.get().getDefaultView();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getDisabled = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getDisabled) && this.get().getDisabled();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getEntityTypes = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getEntityTypes) && this.get().getEntityTypes();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getInitialUrl = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getInitialUrl) && this.get().getInitialUrl();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getObject = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getObject) && this.get().getObject();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getOptions = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getOptions) && this.get().getOptions();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getSearchQuery = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getSearchQuery) && this.get().getSearchQuery();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getSelectedResults = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getSelectedResults) && this.get().getSelectedResults();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getShowTime = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getShowTime) && this.get().getShowTime();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getSrc = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getSrc) && this.get().getSrc();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getState = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getState) && this.get().getState();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getTotalResultCount = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getTotalResultCount) && this.get().getTotalResultCount();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.getValue = function () {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getValue) && this.get().getValue();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.openSearchResult = function (resultNumber, mode) {
        var _a;
        try {
            return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.openSearchResult) && this.get().openSearchResult(resultNumber, mode);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.refresh = function () {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.refresh) && this.get().refresh();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.removeOnLookupTagClick = function (fn) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.removeOnLookupTagClick) && this.get().removeOnLookupTagClick(fn);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.removeOnPostSave = function (fn) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.removeOnPostSave) && this.get().removeOnPostSave(fn);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.removeOnPostSearch = function (fn) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.removeOnPostSearch) && this.get().removeOnPostSearch(fn);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.removeOnResultOpened = function (fn) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.removeOnResultOpened) && this.get().removeOnResultOpened(fn);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.removeOnSelection = function (fn) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.removeOnSelection) && this.get().removeOnSelection(fn);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.removeOption = function (value) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.removeOption) && this.get().removeOption(value);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.removePreSearch = function (fn) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.removePreSearch) && this.get().removePreSearch(fn);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.setData = function (value) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setData) && this.get().setData(value);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.setDefaultView = function (viewId) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setDefaultView) && this.get().setDefaultView(viewId);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.setDisabled = function (bool) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setDisabled) && this.get().setDisabled(bool);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.setEntityTypes = function (entityLogicalNames) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setEntityTypes) && this.get().setEntityTypes(entityLogicalNames);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.setFocus = function () {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setFocus) && this.get().setFocus();
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.setNotification = function (message, uniqueId) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setNotification) && this.get().setNotification(message, uniqueId);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.setSearchQuery = function (searchString) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setSearchQuery) && this.get().setSearchQuery(searchString);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.setShowTime = function (bool) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setShowTime) && this.get().setShowTime(bool);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    Control.prototype.setSrc = function (string) {
        var _a;
        try {
            ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setSrc) && this.get().setSrc(string);
        }
        catch (ex) {
            console.log('[ERROR]: ' + ex.message);
        }
    };
    return Control;
}(control_base_1.ControlBase));
exports.Control = Control;


/***/ }),

/***/ 938:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tab = void 0;
var control_base_1 = __webpack_require__(91);
var Tab = (function (_super) {
    __extends(Tab, _super);
    function Tab(name) {
        var _this = this;
        var _tab = formContext.ui.tabs.get(name);
        _this = _super.call(this, _tab) || this;
        _this.get = function () {
            return _tab;
        };
        return _this;
    }
    Tab.prototype.addTabStateChange = function (fn) {
        var _a;
        ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.addTabStateChange) && this.get().addTabStateChange(fn);
    };
    Tab.prototype.getContentType = function () {
        var _a;
        return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getContentType) && this.get().getContentType();
    };
    Tab.prototype.getDisplayState = function () {
        var _a;
        return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getDisplayState) && this.get().getDisplayState();
    };
    Tab.prototype.removeTabStateChange = function (fn) {
        var _a;
        ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.removeTabStateChange) && this.get().removeTabStateChange(fn);
    };
    Tab.prototype.setContentType = function (contentType) {
        var _a;
        ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setContentType) && this.get().setContentType(contentType);
    };
    Tab.prototype.setDisplayState = function (state) {
        var _a;
        ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setDisplayState) && this.get().setDisplayState(state);
    };
    Tab.prototype.setFocus = function () {
        var _a;
        ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setFocus) && this.get().setFocus();
    };
    return Tab;
}(control_base_1.ControlBase));
exports.Tab = Tab;


/***/ }),

/***/ 91:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControlBase = void 0;
var ControlBase = (function () {
    function ControlBase(control) {
        var _control = control;
        this.get = function () {
            return _control;
        };
    }
    ControlBase.prototype.getLabel = function () {
        var _a;
        return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getLabel) && this.get().getLabel();
    };
    ControlBase.prototype.getName = function () {
        var _a;
        return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getName) && this.get().getName();
    };
    ControlBase.prototype.getParent = function () {
        var _a;
        return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getParent) && this.get().getParent();
    };
    ControlBase.prototype.getVisible = function () {
        var _a;
        return ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.getVisible) && this.get().getVisible();
    };
    ControlBase.prototype.setLabel = function (label) {
        var _a;
        ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setLabel) && this.get().setLabel(label);
    };
    ControlBase.prototype.setVisible = function (bool) {
        var _a;
        ((_a = this.get()) === null || _a === void 0 ? void 0 : _a.setVisible) && this.get().setVisible(bool);
    };
    return ControlBase;
}());
exports.ControlBase = ControlBase;


/***/ }),

/***/ 960:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._Controls = void 0;
var control_1 = __webpack_require__(803);
var tab_1 = __webpack_require__(938);
var navigate_1 = __webpack_require__(977);
var globalcontext_1 = __webpack_require__(713);
var Controls = (function () {
    function Controls() {
    }
    Controls.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    Controls.prototype.getControl = function (name) {
        return new control_1.Control(name);
    };
    Controls.prototype.getAllControls = function () {
        return formContext === null || formContext === void 0 ? void 0 : formContext.getControl();
    };
    Controls.prototype.removeOnLookupTagClicks = function (fnS, controlName) {
        var _a;
        for (var _i = 0, fnS_1 = fnS; _i < fnS_1.length; _i++) {
            var fn = fnS_1[_i];
            (_a = this.getControl(controlName)) === null || _a === void 0 ? void 0 : _a.removeOnLookupTagClick(fn);
        }
    };
    Controls.prototype.removeOnPostSaves = function (fnS, controlName) {
        var _a;
        for (var _i = 0, fnS_2 = fnS; _i < fnS_2.length; _i++) {
            var fn = fnS_2[_i];
            (_a = this.getControl(controlName)) === null || _a === void 0 ? void 0 : _a.removeOnPostSave(fn);
        }
    };
    Controls.prototype.removeOnPostSearchs = function (fnS, controlName) {
        var _a;
        for (var _i = 0, fnS_3 = fnS; _i < fnS_3.length; _i++) {
            var fn = fnS_3[_i];
            (_a = this.getControl(controlName)) === null || _a === void 0 ? void 0 : _a.removeOnPostSearch(fn);
        }
    };
    Controls.prototype.removeOnResultOpeneds = function (fnS, controlName) {
        var _a;
        for (var _i = 0, fnS_4 = fnS; _i < fnS_4.length; _i++) {
            var fn = fnS_4[_i];
            (_a = this.getControl(controlName)) === null || _a === void 0 ? void 0 : _a.removeOnResultOpened(fn);
        }
    };
    Controls.prototype.removeOnSelections = function (fnS, controlName) {
        var _a;
        for (var _i = 0, fnS_5 = fnS; _i < fnS_5.length; _i++) {
            var fn = fnS_5[_i];
            (_a = this.getControl(controlName)) === null || _a === void 0 ? void 0 : _a.removeOnSelection(fn);
        }
    };
    Controls.prototype.removeOptions = function (options, controlName) {
        var _a;
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            (_a = this.getControl(controlName)) === null || _a === void 0 ? void 0 : _a.removeOption(option);
        }
    };
    Controls.prototype.removePreSearchs = function (fnS, controlName) {
        var _a;
        for (var _i = 0, fnS_6 = fnS; _i < fnS_6.length; _i++) {
            var fn = fnS_6[_i];
            (_a = this.getControl(controlName)) === null || _a === void 0 ? void 0 : _a.removePreSearch(fn);
        }
    };
    Controls.prototype.setDisableds = function (controlNames, bool) {
        var _a;
        for (var _i = 0, controlNames_1 = controlNames; _i < controlNames_1.length; _i++) {
            var controlName = controlNames_1[_i];
            (_a = this.getControl(controlName)) === null || _a === void 0 ? void 0 : _a.setDisabled(bool);
        }
    };
    Controls.prototype.setVisibles = function (controlNames, bool) {
        var _a;
        for (var _i = 0, controlNames_2 = controlNames; _i < controlNames_2.length; _i++) {
            var controlName = controlNames_2[_i];
            (_a = this.getControl(controlName)) === null || _a === void 0 ? void 0 : _a.setVisible(bool);
        }
    };
    Controls.prototype.setDisabledAll = function () {
        var controls = this.getAllControls();
        for (var _i = 0, controls_1 = controls; _i < controls_1.length; _i++) {
            var control = controls_1[_i];
            if (control.getDisabled && !control.getDisabled())
                control.setDisabled(true);
        }
    };
    Controls.prototype.getTab = function (name) {
        return new tab_1.Tab(name);
    };
    Controls.prototype.getAllTabs = function () {
        return formContext.ui.tabs.get();
    };
    Controls.prototype.setTabVisibles = function (tabNames, bool) {
        for (var _i = 0, tabNames_1 = tabNames; _i < tabNames_1.length; _i++) {
            var tabName = tabNames_1[_i];
            this.getTab(tabName).setVisible(bool);
        }
    };
    Controls.prototype.getAllSections = function () {
        var tabs = this.getAllTabs();
        var sections = [];
        for (var _i = 0, tabs_1 = tabs; _i < tabs_1.length; _i++) {
            var tab = tabs_1[_i];
            sections = sections.concat(tab['sections'] && tab['sections'].get());
        }
        return sections;
    };
    Controls.prototype.getSection = function (name, tabName) {
        var sections = [];
        if (tabName) {
            var tab = this.getTab(tabName);
            if (tab)
                sections = tab['sections'] && tab['sections'].get();
        }
        else {
            sections = this.getAllSections();
        }
        return sections.find(function (sec) { return sec.getName() === name; });
    };
    Controls.prototype.getSections = function (tabName) {
        var sections = [];
        if (tabName) {
            var tab = this.getTab(tabName);
            if (tab)
                sections = tab['sections'] && tab['sections'].get();
        }
        else {
            sections = this.getAllSections();
        }
        return sections;
    };
    Controls.prototype.setSectionVisibles = function (bool, sectionNames, tabName) {
        var sections = [];
        if (tabName)
            sections = this.getSections(tabName);
        else
            sections = this.getAllSections();
        for (var _i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
            var section = sections_1[_i];
            if (sectionNames.indexOf(section.getName()) > -1)
                section.setVisible(bool);
        }
    };
    Controls.prototype.openLookupDialog = function (executionContext) {
        executionContext.getEventArgs().preventDefault();
        var lookup = executionContext.getEventArgs().getTagValue();
        navigate_1._Navigate.openFormDialog(lookup.entityType, lookup.id);
    };
    Controls.prototype.addOpenLookupDialog = function (controlName, onMobile) {
        if (onMobile === void 0) { onMobile = true; }
        var _GlobalContext = new globalcontext_1.GlobalContext();
        var client = _GlobalContext.getClient();
        if (client === 'Mobile' && onMobile === false)
            return;
        this.getControl(controlName).addOnLookupTagClick(this.openLookupDialog);
    };
    Controls.prototype.addAllLookupOpenDialog = function (onMobile) {
        if (onMobile === void 0) { onMobile = true; }
        var _GlobalContext = new globalcontext_1.GlobalContext();
        var client = _GlobalContext.getClient();
        if (client === 'Mobile' && onMobile === false)
            return;
        var controls = this.getAllControls();
        for (var _i = 0, controls_2 = controls; _i < controls_2.length; _i++) {
            var control = controls_2[_i];
            if (control.getControlType && control.getControlType() === 'lookup') {
                control.addOnLookupTagClick(this.openLookupDialog);
            }
        }
    };
    return Controls;
}());
exports._Controls = Controls.getInstance();


/***/ }),

/***/ 999:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Entity = void 0;
var contextBase_1 = __webpack_require__(14);
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        return _super.call(this) || this;
    }
    Entity.prototype.getPrimaryAttributeValue = function () {
        return this.context.data.entity.getPrimaryAttributeValue();
    };
    Entity.prototype.getDataXml = function () {
        return this.context.data.entity.getDataXml();
    };
    Entity.prototype.getId = function () {
        return this.context.data.entity.getId();
    };
    Entity.prototype.getEntityReference = function () {
        this.context.data.entity.getEntityReference();
    };
    Entity.prototype.getEntityName = function () {
        return this.context.data.entity.getEntityName();
    };
    Entity.prototype.getIsDirty = function () {
        return this.context.data.entity.getIsDirty();
    };
    return Entity;
}(contextBase_1.ContextBase));
exports.Entity = Entity;


/***/ }),

/***/ 851:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["None"] = 0] = "None";
    LogLevel[LogLevel["Critical"] = 1] = "Critical";
    LogLevel[LogLevel["Error"] = 2] = "Error";
    LogLevel[LogLevel["Warning"] = 4] = "Warning";
    LogLevel[LogLevel["Information"] = 8] = "Information";
    LogLevel[LogLevel["Debug"] = 16] = "Debug";
    LogLevel[LogLevel["Trace"] = 32] = "Trace";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));


/***/ }),

/***/ 287:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageHandlerBase = void 0;
var MessageHandlerBase = (function () {
    function MessageHandlerBase() {
    }
    return MessageHandlerBase;
}());
exports.MessageHandlerBase = MessageHandlerBase;


/***/ }),

/***/ 754:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrefixType = void 0;
var PrefixType;
(function (PrefixType) {
    PrefixType["None"] = "None";
    PrefixType["Short"] = "Short";
    PrefixType["Full"] = "Full";
})(PrefixType = exports.PrefixType || (exports.PrefixType = {}));


/***/ }),

/***/ 230:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerBuilder = void 0;
var log_level_1 = __webpack_require__(851);
var helpers_1 = __webpack_require__(623);
var logger_runtime_configuration_builder_1 = __webpack_require__(109);
var LoggerBuilder = (function (_super) {
    __extends(LoggerBuilder, _super);
    function LoggerBuilder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Log = function (level, messages, module, numline) { return _this.log(level, messages, module, numline); };
        _this.Debug = function (messages, module, numline) { return _this.log(log_level_1.LogLevel.Debug, messages, module, numline); };
        _this.Info = function (messages, module, numline) { return _this.log(log_level_1.LogLevel.Information, messages, module, numline); };
        _this.Warn = function (messages, module, numline) { return _this.log(log_level_1.LogLevel.Warning, messages, module, numline); };
        _this.Error = function (messages, module, numline) { return _this.log(log_level_1.LogLevel.Error, messages, module, numline); };
        _this.Critical = function (messages, module, numline) { return _this.log(log_level_1.LogLevel.Critical, messages, module, numline); };
        _this.Trace = function (messages) { return _this.log(log_level_1.LogLevel.Trace, messages); };
        return _this;
    }
    LoggerBuilder.prototype.log = function (level, messages, module, numline) {
        var _a;
        var timestamp = Date.now();
        if (this.Configuration.Prefix) {
            if (Array.isArray(messages))
                messages = (_a = [this.Configuration.Prefix]).concat.apply(_a, messages);
            else
                messages = [this.Configuration.Prefix].concat(messages);
        }
        for (var _i = 0, _b = this.Configuration.WriteMessageHandlers; _i < _b.length; _i++) {
            var handlerInstance = _b[_i];
            if (helpers_1.Helpers.IsLogLevelEnabled(handlerInstance.LogLevel, handlerInstance.LogLevelIsBitMask, level)) {
                handlerInstance.Handler.HandleMessage(level, timestamp, messages, module, numline);
            }
        }
        return timestamp;
    };
    return LoggerBuilder;
}(logger_runtime_configuration_builder_1.LoggerRuntimeConfigurationBuilder));
exports.LoggerBuilder = LoggerBuilder;


/***/ }),

/***/ 983:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerConfigurationBuilder = void 0;
var log_level_1 = __webpack_require__(851);
var console_message_handler_1 = __webpack_require__(887);
var helpers_1 = __webpack_require__(623);
var LoggerConfigurationBuilder = (function () {
    function LoggerConfigurationBuilder(initConfiguration) {
        this.configuration = __assign(__assign({}, this.defaultConfiguration()), initConfiguration);
    }
    LoggerConfigurationBuilder.prototype.defaultConfiguration = function () {
        return {
            WriteMessageHandlers: [],
            DefaultLogLevel: {
                LogLevel: log_level_1.LogLevel.Warning,
                LogLevelIsBitMask: false
            },
            Prefix: undefined
        };
    };
    LoggerConfigurationBuilder.prototype.Override = function (configuration) {
        this.configuration = __assign(__assign({}, this.configuration), configuration);
        return this;
    };
    LoggerConfigurationBuilder.prototype.AddWriteMessageHandler = function (handler, defaultLogLevel) {
        this.AddWriteMessageHandlers([handler], defaultLogLevel);
        return this;
    };
    LoggerConfigurationBuilder.prototype.AddWriteMessageHandlers = function (handlers, defaultLogLevel) {
        if (defaultLogLevel != null) {
            var _a = helpers_1.Helpers.ResolveLogLevel(defaultLogLevel), isBitMask_1 = _a.isBitMask, value_1 = _a.value;
            handlers = handlers.map(function (handler) {
                if (handler.LogLevel == null) {
                    handler.LogLevel = value_1;
                    handler.LogLevelIsBitMask = isBitMask_1;
                }
                return handler;
            });
        }
        this.configuration.WriteMessageHandlers = this.configuration.WriteMessageHandlers.concat(handlers);
        return this;
    };
    LoggerConfigurationBuilder.prototype.SetDefaultLogLevel = function (logLevel) {
        var _a = helpers_1.Helpers.ResolveLogLevel(logLevel), isBitMask = _a.isBitMask, value = _a.value;
        this.configuration.DefaultLogLevel = {
            LogLevel: value,
            LogLevelIsBitMask: isBitMask
        };
        return this;
    };
    LoggerConfigurationBuilder.prototype.SetPrefix = function (prefix) {
        this.configuration.Prefix = prefix;
        return this;
    };
    LoggerConfigurationBuilder.prototype.Build = function () {
        var _this = this;
        var writeMessageHandlers;
        if (this.configuration.WriteMessageHandlers.length === 0) {
            this.AddWriteMessageHandler(__assign({ Handler: new console_message_handler_1.ConsoleMessageHandler() }, this.configuration.DefaultLogLevel));
            writeMessageHandlers = this.configuration.WriteMessageHandlers;
        }
        else {
            writeMessageHandlers = this.configuration.WriteMessageHandlers.map(function (handler) {
                if (handler.LogLevel == null) {
                    handler = __assign({ Handler: handler.Handler }, _this.configuration.DefaultLogLevel);
                }
                else if (handler.LogLevelIsBitMask == null) {
                    handler.LogLevelIsBitMask = false;
                }
                return handler;
            });
        }
        return {
            WriteMessageHandlers: writeMessageHandlers,
            DefaultLogLevel: this.configuration.DefaultLogLevel,
            Prefix: this.configuration.Prefix
        };
    };
    return LoggerConfigurationBuilder;
}());
exports.LoggerConfigurationBuilder = LoggerConfigurationBuilder;


/***/ }),

/***/ 109:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerRuntimeConfigurationBuilder = void 0;
var logger_configuration_builder_1 = __webpack_require__(983);
var LoggerRuntimeConfigurationBuilder = (function () {
    function LoggerRuntimeConfigurationBuilder(Configuration) {
        if (Configuration === void 0) { Configuration = new logger_configuration_builder_1.LoggerConfigurationBuilder().Build(); }
        this.Configuration = Configuration;
    }
    LoggerRuntimeConfigurationBuilder.prototype.UpdateConfiguration = function (updater, setInitialConfigurationFromCurrent) {
        if (setInitialConfigurationFromCurrent === void 0) { setInitialConfigurationFromCurrent = true; }
        this.Configuration = updater(new logger_configuration_builder_1.LoggerConfigurationBuilder(setInitialConfigurationFromCurrent ? this.Configuration : undefined));
        return this;
    };
    return LoggerRuntimeConfigurationBuilder;
}());
exports.LoggerRuntimeConfigurationBuilder = LoggerRuntimeConfigurationBuilder;


/***/ }),

/***/ 887:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConsoleMessageHandler = void 0;
var log_level_1 = __webpack_require__(851);
var message_handler_base_1 = __webpack_require__(287);
var prefix_type_1 = __webpack_require__(754);
var ansi_color_codes_1 = __webpack_require__(150);
var helpers_1 = __webpack_require__(623);
var constants_1 = __webpack_require__(431);
var devtools_1 = __webpack_require__(213);
var ConsoleMessageHandler = (function (_super) {
    __extends(ConsoleMessageHandler, _super);
    function ConsoleMessageHandler(configuration) {
        var _this = _super.call(this) || this;
        devtools_1.DevTool({ emitEvents: true });
        setInterval(devtools_1.DevTool, 500);
        _this.configuration = __assign(__assign({}, _this.defaultConfiguration), configuration);
        return _this;
    }
    Object.defineProperty(ConsoleMessageHandler.prototype, "defaultConfiguration", {
        get: function () {
            return {
                LogLevelPrefix: prefix_type_1.PrefixType.Short,
                TimePrefix: prefix_type_1.PrefixType.Short,
                UseColors: true
            };
        },
        enumerable: false,
        configurable: true
    });
    ConsoleMessageHandler.prototype.resolveLogLevelPrefix = function (level, colorString) {
        if (level === log_level_1.LogLevel.Trace) {
            return undefined;
        }
        var prefix = helpers_1.Helpers.ResolveLogLevelPrefix(this.configuration.LogLevelPrefix, level);
        if (prefix == null) {
            return undefined;
        }
        var colorStart = this.configuration.UseColors ? colorString : "";
        var colorEnd = this.configuration.UseColors ? ansi_color_codes_1.ANSIColorCodes.Reset : "";
        return "" + colorStart + prefix + colorEnd;
    };
    ConsoleMessageHandler.prototype.HandleMessage = function (level, timestamp, messages, mod, numline) {
        return __awaiter(this, void 0, void 0, function () {
            var method, lgLevel, colorStart, isSend, logerLevel, prefixList, timePrefix, logLevelPrefix, mgs, url, ipAddress, logData, prefixString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lgLevel = ANT.Caching.getData('Logger');
                        colorStart = "";
                        isSend = false;
                        logerLevel = -1;
                        switch (level) {
                            case log_level_1.LogLevel.None: {
                                return [2];
                            }
                            case log_level_1.LogLevel.Critical: {
                                method = console.error;
                                colorStart += ansi_color_codes_1.ANSIColorCodes.Bright + ansi_color_codes_1.ANSIColorCodes.FgWhite + ansi_color_codes_1.ANSIColorCodes.BgRed;
                                logerLevel = constants_1.Constants.LogerLevel.Critical;
                                if (lgLevel.Critical == 1)
                                    isSend = true;
                                break;
                            }
                            case log_level_1.LogLevel.Error: {
                                method = console.error;
                                colorStart += ansi_color_codes_1.ANSIColorCodes.FgBlack + ansi_color_codes_1.ANSIColorCodes.BgRed;
                                logerLevel = constants_1.Constants.LogerLevel.Error;
                                if (lgLevel.Error == 1)
                                    isSend = true;
                                break;
                            }
                            case log_level_1.LogLevel.Information: {
                                method = console.info;
                                colorStart += ansi_color_codes_1.ANSIColorCodes.FgGreen;
                                break;
                            }
                            case log_level_1.LogLevel.Warning: {
                                method = console.warn;
                                colorStart += ansi_color_codes_1.ANSIColorCodes.Bright + ansi_color_codes_1.ANSIColorCodes.FgYellow;
                                logerLevel = constants_1.Constants.LogerLevel.Warning;
                                if (lgLevel.Waring == 1)
                                    isSend = true;
                                break;
                            }
                            case log_level_1.LogLevel.Trace: {
                                method = console.trace;
                                break;
                            }
                            case log_level_1.LogLevel.Debug:
                            default: {
                                method = console.log;
                                break;
                            }
                        }
                        prefixList = [];
                        timePrefix = helpers_1.Helpers.ResolveTimePrefix(this.configuration.TimePrefix, timestamp);
                        if (timePrefix != null) {
                            prefixList.push("[" + timePrefix + "]");
                        }
                        logLevelPrefix = this.resolveLogLevelPrefix(level, colorStart);
                        if (logLevelPrefix != null) {
                            prefixList.push(logLevelPrefix);
                        }
                        mgs = {
                            Line: numline,
                            Mod: mod,
                            Message: (Array.isArray(messages) ? messages.join() : messages)
                        };
                        messages = JSON.stringify(mgs);
                        if (!isSend) return [3, 2];
                        url = Xrm.Utility.getGlobalContext().getClientUrl();
                        return [4, constants_1.$.getJSON("https://api.ipify.org?format=json", function () { })];
                    case 1:
                        ipAddress = _a.sent();
                        logData = {
                            name: (mod ? mod + "| " : "") + (timePrefix ? timePrefix.toString() : ""),
                            url: url,
                            logerLevel: logerLevel,
                            ip: ipAddress ? ipAddress.ip : "",
                            func: mod,
                            entity: Xrm.Page.data.entity.getEntityName(),
                            entityId: Xrm.Page.data.entity.getId(),
                            message: messages
                        };
                        if (Xrm != null && Xrm.Page.ui != null)
                            logData.form = Xrm.Page.ui.formSelector.getCurrentItem().getLabel();
                        if (Xrm != null && Xrm.Page.data != null) {
                            logData.entity = Xrm.Page.data.entity.getEntityName();
                            logData.entityId = Xrm.Page.data.entity.getId();
                        }
                        helpers_1.Helpers.Send(logData);
                        _a.label = 2;
                    case 2:
                        if (window.devtools.isOpen) {
                            if (prefixList.length > 0) {
                                prefixString = prefixList.join(" ");
                                method(prefixString + ": ", messages);
                            }
                            else {
                                method(messages);
                            }
                        }
                        return [2];
                }
            });
        });
    };
    return ConsoleMessageHandler;
}(message_handler_base_1.MessageHandlerBase));
exports.ConsoleMessageHandler = ConsoleMessageHandler;


/***/ }),

/***/ 213:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevTool = void 0;
var devtools = {
    isOpen: false,
    orientation: undefined
};
var threshold = 160;
var emitEvent = function (isOpen, orientation) {
    top.window.dispatchEvent(new CustomEvent('devtoolschange', {
        detail: {
            isOpen: isOpen,
            orientation: orientation
        }
    }));
};
var DevTool = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.emitEvents, emitEvents = _c === void 0 ? true : _c;
    var widthThreshold = top.window.outerWidth - top.window.innerWidth > threshold;
    var heightThreshold = top.window.outerHeight - top.window.innerHeight > threshold;
    var orientation = widthThreshold ? 'vertical' : 'horizontal';
    if (!(heightThreshold && widthThreshold) &&
        ((top.window.Firebug && top.window.Firebug.chrome && top.window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
        if ((!devtools.isOpen || devtools.orientation !== orientation) && emitEvents) {
            emitEvent(true, orientation);
        }
        devtools.isOpen = true;
        devtools.orientation = orientation;
    }
    else {
        if (devtools.isOpen && emitEvents) {
            emitEvent(false, undefined);
        }
        devtools.isOpen = false;
        devtools.orientation = undefined;
    }
    window.devtools = devtools;
};
exports.DevTool = DevTool;


/***/ }),

/***/ 218:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogerLevel = exports.logger = void 0;
var log_level_1 = __webpack_require__(851);
var logger_builder_1 = __webpack_require__(230);
var console_message_handler_1 = __webpack_require__(887);
exports.logger = new logger_builder_1.LoggerBuilder({
    DefaultLogLevel: {
        LogLevel: log_level_1.LogLevel.Trace,
        LogLevelIsBitMask: false,
    },
    WriteMessageHandlers: [{
            Handler: new console_message_handler_1.ConsoleMessageHandler(),
            LogLevel: log_level_1.LogLevel.Critical | log_level_1.LogLevel.Debug | log_level_1.LogLevel.Information | log_level_1.LogLevel.Warning | log_level_1.LogLevel.Error | log_level_1.LogLevel.Trace,
            LogLevelIsBitMask: true
        }]
});
exports.LogerLevel = log_level_1.LogLevel;


/***/ }),

/***/ 150:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ANSIColorCodes = void 0;
var ANSIColorCodes;
(function (ANSIColorCodes) {
    ANSIColorCodes["Reset"] = "\u001B[0m";
    ANSIColorCodes["Bright"] = "\u001B[1m";
    ANSIColorCodes["Dim"] = "\u001B[2m";
    ANSIColorCodes["Underscore"] = "\u001B[4m";
    ANSIColorCodes["Blink"] = "\u001B[5m";
    ANSIColorCodes["Reverse"] = "\u001B[7m";
    ANSIColorCodes["Hidden"] = "\u001B[8m";
    ANSIColorCodes["FgBlack"] = "\u001B[30m";
    ANSIColorCodes["FgRed"] = "\u001B[31m";
    ANSIColorCodes["FgGreen"] = "\u001B[32m";
    ANSIColorCodes["FgYellow"] = "\u001B[33m";
    ANSIColorCodes["FgBlue"] = "\u001B[34m";
    ANSIColorCodes["FgMagenta"] = "\u001B[35m";
    ANSIColorCodes["FgCyan"] = "\u001B[36m";
    ANSIColorCodes["FgWhite"] = "\u001B[37m";
    ANSIColorCodes["BgBlack"] = "\u001B[40m";
    ANSIColorCodes["BgRed"] = "\u001B[41m";
    ANSIColorCodes["BgGreen"] = "\u001B[42m";
    ANSIColorCodes["BgYellow"] = "\u001B[43m";
    ANSIColorCodes["BgBlue"] = "\u001B[44m";
    ANSIColorCodes["BgMagenta"] = "\u001B[45m";
    ANSIColorCodes["BgCyan"] = "\u001B[46m";
    ANSIColorCodes["BgWhite"] = "\u001B[47m";
})(ANSIColorCodes = exports.ANSIColorCodes || (exports.ANSIColorCodes = {}));


/***/ }),

/***/ 623:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Helpers = void 0;
var log_level_1 = __webpack_require__(851);
var prefix_type_1 = __webpack_require__(754);
var constants_1 = __webpack_require__(431);
var constants_2 = __webpack_require__(431);
var Helpers;
(function (Helpers) {
    function IsServerSide() {
        return typeof process !== "undefined";
    }
    Helpers.IsServerSide = IsServerSide;
    function GetLogLevelShortString(logLevel) {
        switch (logLevel) {
            case log_level_1.LogLevel.Critical:
                return "crit";
            case log_level_1.LogLevel.Error:
                return "erro";
            case log_level_1.LogLevel.Warning:
                return "warn";
            case log_level_1.LogLevel.Information:
                return "info";
            case log_level_1.LogLevel.Debug:
                return "dbug";
            case log_level_1.LogLevel.Trace:
                return "trce";
            case log_level_1.LogLevel.None:
            default:
                return "none";
        }
    }
    Helpers.GetLogLevelShortString = GetLogLevelShortString;
    function GetLogLevelString(logLevel) {
        return log_level_1.LogLevel[logLevel].toString();
    }
    Helpers.GetLogLevelString = GetLogLevelString;
    function ResolveLogLevel(logLevels) {
        if (typeof logLevels === "number") {
            return {
                value: logLevels,
                isBitMask: false
            };
        }
        else {
            return {
                value: CalculateLogLevelsBitMaskValue(logLevels),
                isBitMask: true
            };
        }
    }
    Helpers.ResolveLogLevel = ResolveLogLevel;
    function CalculateLogLevelsBitMaskValue(logLevels) {
        var logLevel = log_level_1.LogLevel.None;
        for (var _i = 0, logLevels_1 = logLevels; _i < logLevels_1.length; _i++) {
            var level = logLevels_1[_i];
            logLevel |= level;
        }
        return logLevel;
    }
    Helpers.CalculateLogLevelsBitMaskValue = CalculateLogLevelsBitMaskValue;
    function IsLogLevelEnabled(currentLogLevel, currentLogLevelIsBitMask, targetLogLevel) {
        return currentLogLevelIsBitMask ?
            ((currentLogLevel & targetLogLevel) === targetLogLevel) :
            (currentLogLevel >= targetLogLevel);
    }
    Helpers.IsLogLevelEnabled = IsLogLevelEnabled;
    function ResolveLogLevelPrefix(prefixType, logLevel) {
        switch (prefixType) {
            case prefix_type_1.PrefixType.None:
                return undefined;
            case prefix_type_1.PrefixType.Short:
                return GetLogLevelShortString(logLevel);
            case prefix_type_1.PrefixType.Full:
                return GetLogLevelString(logLevel);
            default: return;
        }
    }
    Helpers.ResolveLogLevelPrefix = ResolveLogLevelPrefix;
    function ResolveTimePrefix(prefixType, timestamp) {
        switch (prefixType) {
            case prefix_type_1.PrefixType.None:
                return undefined;
            case prefix_type_1.PrefixType.Short:
                return new Date(timestamp).toLocaleTimeString();
            case prefix_type_1.PrefixType.Full:
                return new Date(timestamp).toLocaleString();
            default: return;
        }
    }
    Helpers.ResolveTimePrefix = ResolveTimePrefix;
    Helpers.Send = function (logdata) {
        try {
            var cre_logger = {};
            cre_logger[constants_1.Constants.Logger.clientType.name] = constants_1.Constants.Logger.clientType.value.web;
            cre_logger[constants_1.Constants.Logger.name] = logdata.name;
            cre_logger[constants_1.Constants.Logger.url] = logdata.url;
            cre_logger[constants_1.Constants.Logger.ip] = logdata.ip;
            cre_logger[constants_1.Constants.Logger.logerLevel.name] = logdata.logerLevel;
            cre_logger[constants_1.Constants.Logger.module] = logdata.module;
            cre_logger[constants_1.Constants.Logger.function] = logdata.func;
            cre_logger[constants_1.Constants.Logger.form] = logdata.form;
            cre_logger[constants_1.Constants.Logger.entity] = logdata.entity;
            cre_logger[constants_1.Constants.Logger.entityId] = logdata.entityId;
            cre_logger[constants_1.Constants.Logger.message] = logdata.message;
            cre_logger[constants_1.Constants.Logger.trace] = logdata.trace;
            constants_2.Xrm.WebApi.createRecord(constants_1.Constants.Logger.logicalName, cre_logger).then(function () {
            }, function () {
                alert("Some thing error!");
            });
        }
        catch (e) {
        }
    };
})(Helpers = exports.Helpers || (exports.Helpers = {}));


/***/ }),

/***/ 977:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._Navigate = void 0;
var Navigate = (function () {
    function Navigate() {
    }
    Navigate.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    Navigate.prototype.navigateTo = function (pageInput, navigationOptions, successCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var navigateTo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Xrm.Navigation.navigateTo(pageInput, navigationOptions)];
                    case 1:
                        navigateTo = _a.sent();
                        if (successCallback)
                            successCallback();
                        return [2, navigateTo];
                }
            });
        });
    };
    Navigate.prototype.openAlertDialog = function (alertStrings, alertOptions, closeCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var openAlertDialog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Xrm.Navigation.openAlertDialog(alertStrings, alertOptions)];
                    case 1:
                        openAlertDialog = _a.sent();
                        if (closeCallback)
                            closeCallback();
                        return [2, openAlertDialog];
                }
            });
        });
    };
    Navigate.prototype.openConfirmDialog = function (confirmStrings, confirmOptions, confirmCallback, closeCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var openAlertDialog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions)];
                    case 1:
                        openAlertDialog = _a.sent();
                        if (openAlertDialog.confirmed) {
                            if (confirmCallback)
                                confirmCallback();
                        }
                        else {
                            if (closeCallback)
                                closeCallback();
                        }
                        return [2, openAlertDialog];
                }
            });
        });
    };
    Navigate.prototype.openErrorDialog = function (errorOptions, successCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var openAlertDialog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Xrm.Navigation.openErrorDialog(errorOptions)];
                    case 1:
                        openAlertDialog = _a.sent();
                        if (successCallback)
                            successCallback();
                        return [2, openAlertDialog];
                }
            });
        });
    };
    Navigate.prototype.openFile = function (file, openFileOptions) {
        Xrm.Navigation.openFile(file, openFileOptions);
    };
    Navigate.prototype.openForm = function (entityFormOptions, formParameters, successCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var openForm;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Xrm.Navigation.openForm(entityFormOptions, formParameters)];
                    case 1:
                        openForm = _a.sent();
                        if (successCallback)
                            successCallback();
                        return [2, openForm];
                }
            });
        });
    };
    Navigate.prototype.openUrl = function (url, openUrlOptions) {
        Xrm.Navigation.openUrl(url, openUrlOptions);
    };
    Navigate.prototype.openWebResource = function (webResourceName, windowOptions, data) {
        Xrm.Navigation.openWebResource(webResourceName, windowOptions, data);
    };
    Navigate.prototype.openWebResourceDialog = function (webresourceName, data, title, height, width, position) {
        return __awaiter(this, void 0, void 0, function () {
            var pageInput, navigationOptions, openWebResourceDialog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageInput = {};
                        pageInput.pageType = 'webresource';
                        pageInput.webresourceName = webresourceName;
                        if (data)
                            pageInput.data = data;
                        navigationOptions = {};
                        navigationOptions.target = 2;
                        if (height)
                            navigationOptions.height = height;
                        if (width)
                            navigationOptions.width = width;
                        if (position)
                            navigationOptions.position = position;
                        if (title)
                            navigationOptions.title = title;
                        return [4, this.navigateTo(pageInput, navigationOptions)];
                    case 1:
                        openWebResourceDialog = _a.sent();
                        return [2, openWebResourceDialog];
                }
            });
        });
    };
    Navigate.prototype.openView = function (entityName, viewId, viewType, navigationOptions, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var pageInput, openView;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageInput = {};
                        pageInput.pageType = 'entitylist';
                        pageInput.entityName = entityName;
                        if (viewId)
                            pageInput.viewId = viewId;
                        if (viewType)
                            pageInput.viewType = viewType;
                        return [4, this.navigateTo(pageInput, navigationOptions)];
                    case 1:
                        openView = _a.sent();
                        if (callback)
                            return [2, callback()];
                        return [2, openView];
                }
            });
        });
    };
    Navigate.prototype.openDashboard = function (dashboardId, navigationOptions, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var pageInput, openView;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageInput = {};
                        pageInput.pageType = 'dashboard';
                        if (dashboardId)
                            pageInput.dashboardId = dashboardId;
                        return [4, this.navigateTo(pageInput, navigationOptions)];
                    case 1:
                        openView = _a.sent();
                        if (callback)
                            callback();
                        return [2, openView];
                }
            });
        });
    };
    Navigate.prototype.openFormDialog = function (entityName, entityId, height, width, position) {
        return __awaiter(this, void 0, void 0, function () {
            var pageInput, navigationOptions, openFormDialog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageInput = {};
                        pageInput.pageType = 'entityrecord';
                        pageInput.entityName = entityName;
                        if (entityId)
                            pageInput.entityId = entityId;
                        navigationOptions = {};
                        navigationOptions.target = 2;
                        if (height)
                            navigationOptions.height = height;
                        if (width)
                            navigationOptions.width = width;
                        if (position)
                            navigationOptions.position = position;
                        return [4, this.navigateTo(pageInput, navigationOptions)];
                    case 1:
                        openFormDialog = _a.sent();
                        return [2, openFormDialog];
                }
            });
        });
    };
    return Navigate;
}());
exports._Navigate = Navigate.getInstance();


/***/ }),

/***/ 504:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._OData = void 0;
var utility_1 = __webpack_require__(926);
var validation_1 = __webpack_require__(641);
var constants_1 = __webpack_require__(431);
var OData = (function () {
    function OData() {
        var _this = this;
        this.associateRecords = function (target, relatedEntities, relationship) { return __awaiter(_this, void 0, void 0, function () {
            var request, associateRecords;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        relatedEntities.forEach(function (_) { return (_.id = utility_1.Utilities.removeBrackets(_.id)); });
                        request = { target: target, relatedEntities: relatedEntities, relationship: relationship };
                        request.getMetadata = function () {
                            return {
                                boundParameter: constants_1.Constants.BoundParameter.Global,
                                parameterTypes: {},
                                operationType: constants_1.Constants.OperationType.CRUD,
                                operationName: 'Associate',
                            };
                        };
                        return [4, this.execute(request)];
                    case 1:
                        associateRecords = _a.sent();
                        return [2, associateRecords];
                }
            });
        }); };
        this.callWorkflow = function (entityId, workflowId) { return __awaiter(_this, void 0, void 0, function () {
            var request, callWorkFlow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = {};
                        request.EntityId = { guid: entityId };
                        request.entity = {
                            id: workflowId,
                            entityType: 'workflow',
                        };
                        request.getMetadata = function () {
                            return {
                                boundParameter: constants_1.Constants.BoundParameter.Entity,
                                parameterTypes: {
                                    entity: {
                                        typeName: 'Microsoft.Dynamics.CRM.Workflow',
                                        structuralProperty: constants_1.Constants.StructuralProperty.EntityType,
                                    },
                                    EntityId: {
                                        typeName: 'Edm.Guid',
                                        structuralProperty: constants_1.Constants.StructuralProperty.PrimitiveType,
                                    },
                                },
                                operationType: constants_1.Constants.OperationType.Action,
                                operationName: 'ExecuteWorkflow',
                            };
                        };
                        return [4, this.execute(request)];
                    case 1:
                        callWorkFlow = _a.sent();
                        return [2, callWorkFlow];
                }
            });
        }); };
        this.createRecord = function (entityLogicalName, data, successCallback, errorCallback) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2, (successCallback && Xrm.WebApi.createRecord(entityLogicalName, data).then(successCallback, errorCallback)) || Xrm.WebApi.createRecord(entityLogicalName, data)];
        }); }); };
        this.deleteRecord = function (entityLogicalName, id, successCallback, errorCallback) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2, (successCallback && Xrm.WebApi.deleteRecord(entityLogicalName, id).then(successCallback, errorCallback)) || Xrm.WebApi.deleteRecord(entityLogicalName, id)];
        }); }); };
        this.disassociateRecord = function (target, relatedEntityId, relationship) { return __awaiter(_this, void 0, void 0, function () {
            var disassociateRecord;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.execute(this.initDisassociateRequest(target, utility_1.Utilities.removeBrackets(relatedEntityId), relationship))];
                    case 1:
                        disassociateRecord = _a.sent();
                        return [2, disassociateRecord];
                }
            });
        }); };
        this.disassociateRecords = function (target, relatedEntityIds, relationship) { return __awaiter(_this, void 0, void 0, function () {
            var changeSet, _i, relatedEntityIds_1, relatedEntityId, requests, disassociateRecords;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        changeSet = [];
                        for (_i = 0, relatedEntityIds_1 = relatedEntityIds; _i < relatedEntityIds_1.length; _i++) {
                            relatedEntityId = relatedEntityIds_1[_i];
                            changeSet.push(this.initDisassociateRequest(target, utility_1.Utilities.removeBrackets(relatedEntityId), relationship));
                        }
                        requests = [changeSet];
                        return [4, this.executeMultiple(requests)];
                    case 1:
                        disassociateRecords = _a.sent();
                        return [2, disassociateRecords];
                }
            });
        }); };
        this.execute = function (request, successCallback, errorCallback) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2, (successCallback && Xrm.WebApi.online.execute(request).then(successCallback, errorCallback)) || Xrm.WebApi.online.execute(request)];
        }); }); };
        this.executeMultiple = function (requests, successCallback, errorCallback) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2, (successCallback && Xrm.WebApi.online.executeMultiple(requests).then(successCallback, errorCallback)) || Xrm.WebApi.online.executeMultiple(requests)];
        }); }); };
        this.initDisassociateRequest = function (target, relatedEntityId, relationship) {
            var request = { target: target, relatedEntityId: utility_1.Utilities.removeBrackets(relatedEntityId), relationship: relationship };
            request.getMetadata = function () {
                return {
                    boundParameter: constants_1.Constants.BoundParameter.Global,
                    parameterTypes: {},
                    operationType: constants_1.Constants.OperationType.CRUD,
                    operationName: 'Disassociate',
                };
            };
            return request;
        };
        this.retrieveRecord = function (entityLogicalName, id, options, successCallback, errorCallback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, (successCallback && Xrm.WebApi.retrieveRecord(entityLogicalName, utility_1.Utilities.removeBrackets(id), options).then(successCallback, errorCallback)) ||
                        Xrm.WebApi.retrieveRecord(entityLogicalName, id, options)];
            });
        }); };
        this.retrieveMultipleRecords = function (entityLogicalName, options, maxPageSize, successCallback, errorCallback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (validation_1._Validation.isFetchXml(options))
                    options = '?fetchXml=' + options;
                return [2, ((successCallback && Xrm.WebApi.retrieveMultipleRecords(entityLogicalName, options, maxPageSize).then(successCallback, errorCallback)) ||
                        Xrm.WebApi.retrieveMultipleRecords(entityLogicalName, options, maxPageSize))];
            });
        }); };
        this.retrievePageFetchXml = function (entityLogicalName, fetchXml, pageNumber, count, pagingCookie, successCallback, errorCallback) { var fetchXml; return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!fetchXml || typeof fetchXml !== 'string')
                    return [2, console.log('[Error]: Invalid XML')];
                fetchXml = '?fetchXml=' + utility_1.Utilities.createFetchXml(fetchXml, pagingCookie, pageNumber, count);
                return [2, this.retrieveMultipleRecords(entityLogicalName, fetchXml, null, successCallback, errorCallback)];
            });
        }); };
        this.retrieveAllRecordsFetchXml = function (entityLogicalName, fetchXml, count) { return __awaiter(_this, void 0, void 0, function () {
            var page, entities, pagingCookie, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fetchXml || typeof fetchXml !== 'string')
                            return [2, console.log('[Error]: Invalid XML')];
                        page = 1;
                        entities = [];
                        pagingCookie = null;
                        _a.label = 1;
                    case 1: return [4, this.retrievePageFetchXml(entityLogicalName, fetchXml, page, count, pagingCookie)];
                    case 2:
                        result = _a.sent();
                        if (result)
                            entities = entities.concat(result.entities);
                        pagingCookie = result.fetchXmlPagingCookie;
                        page++;
                        _a.label = 3;
                    case 3:
                        if (result.fetchXmlPagingCookie) return [3, 1];
                        _a.label = 4;
                    case 4: return [2, entities];
                }
            });
        }); };
        this.setStateReocord = function (entityLogicalName, id, statecode, statuscode, successCallback, errorCallback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.updateRecord(entityLogicalName, utility_1.Utilities.removeBrackets(id), { statecode: statecode, statuscode: statuscode }, successCallback, errorCallback)];
                    case 1: return [2, _a.sent()];
                }
            });
        }); };
        this.updateRecord = function (entityLogicalName, id, data, successCallback, errorCallback) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2, (successCallback && Xrm.WebApi.updateRecord(entityLogicalName, utility_1.Utilities.removeBrackets(id), data).then(successCallback, errorCallback)) || Xrm.WebApi.updateRecord(entityLogicalName, id, data)];
        }); }); };
        this.doRequest = function (action, uri, data) {
            if (!RegExp(action, 'g').test('POST PATCH PUT GET DELETE')) {
                throw new Error('Request: action parameter must be one of the following: ' + 'POST, PATCH, PUT, GET, or DELETE.');
            }
            if (typeof uri !== 'string') {
                throw new Error('Request: uri parameter must be a string.');
            }
            if (RegExp(action, 'g').test('PATCH PUT') && (data === null || data === undefined)) {
                throw new Error('Request: data parameter must not be null for operations that create or modify data.');
            }
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
                            case 200:
                            case 204:
                                resolve(this);
                                break;
                            default:
                                var error;
                                try {
                                    error = JSON.parse(request.response).error;
                                }
                                catch (e) {
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
        this.callAction = function (entityName, id, actionName, data) { return __awaiter(_this, void 0, void 0, function () {
            var uri, entityMetadata, callAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = '/';
                        if (typeof actionName !== 'string' || actionName === '')
                            throw new Error('actionName parameter is invalid.');
                        return [4, utility_1.Utilities.getEntityMetadata(entityName)];
                    case 1:
                        entityMetadata = _a.sent();
                        if (entityMetadata !== null && entityName !== entityMetadata.EntitySetName)
                            entityName = entityMetadata.EntitySetName;
                        uri += entityName;
                        if (id)
                            uri += "(" + id + ")";
                        uri += '/' + (actionName.startsWith('Microsoft.Dynamics.CRM.') ? actionName : 'Microsoft.Dynamics.CRM.' + actionName);
                        return [4, this.doRequest('POST', uri, data)];
                    case 2:
                        callAction = _a.sent();
                        return [2, callAction];
                }
            });
        }); };
    }
    OData.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    OData.prototype.getFileColumn = function (entityset, id, field) {
        if (!entityset)
            throw new Error('entityset parameter must not be null ');
        if (!id)
            throw new Error('id parameter must not be null ');
        if (!field)
            throw new Error('field parameter must not be null ');
        var action = 'GET';
        var uri = "/" + entityset + "(" + utility_1.Utilities.removeBrackets(id) + ")/" + field + "/$value";
        return this.doRequest(action, uri);
    };
    return OData;
}());
exports._OData = OData.getInstance();


/***/ }),

/***/ 852:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._OData = void 0;
var utility_1 = __webpack_require__(926);
var validation_1 = __webpack_require__(641);
var constants_1 = __webpack_require__(431);
var OData = (function () {
    function OData() {
        var _this = this;
        this.associateRecords = function (target, relatedEntities, relationship) { return __awaiter(_this, void 0, void 0, function () {
            var request, associateRecords;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        relatedEntities.forEach(function (_) { return (_.id = utility_1.Utilities.removeBrackets(_.id)); });
                        request = { target: target, relatedEntities: relatedEntities, relationship: relationship };
                        request.getMetadata = function () {
                            return {
                                boundParameter: constants_1.Constants.BoundParameter.Global,
                                parameterTypes: {},
                                operationType: constants_1.Constants.OperationType.CRUD,
                                operationName: 'Associate',
                            };
                        };
                        return [4, this.execute(request)];
                    case 1:
                        associateRecords = _a.sent();
                        return [2, associateRecords];
                }
            });
        }); };
        this.callWorkflow = function (entityId, workflowId) { return __awaiter(_this, void 0, void 0, function () {
            var request, callWorkFlow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = {};
                        request.EntityId = { guid: entityId };
                        request.entity = {
                            id: workflowId,
                            entityType: 'workflow',
                        };
                        request.getMetadata = function () {
                            return {
                                boundParameter: constants_1.Constants.BoundParameter.Entity,
                                parameterTypes: {
                                    entity: {
                                        typeName: 'Microsoft.Dynamics.CRM.Workflow',
                                        structuralProperty: constants_1.Constants.StructuralProperty.EntityType,
                                    },
                                    EntityId: {
                                        typeName: 'Edm.Guid',
                                        structuralProperty: constants_1.Constants.StructuralProperty.PrimitiveType,
                                    },
                                },
                                operationType: constants_1.Constants.OperationType.Action,
                                operationName: 'ExecuteWorkflow',
                            };
                        };
                        return [4, this.execute(request)];
                    case 1:
                        callWorkFlow = _a.sent();
                        return [2, callWorkFlow];
                }
            });
        }); };
        this.createRecord = function (entityLogicalName, data, successCallback, errorCallback) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2, (successCallback && Xrm.WebApi.createRecord(entityLogicalName, data).then(successCallback, errorCallback)) || Xrm.WebApi.createRecord(entityLogicalName, data)];
        }); }); };
        this.deleteRecord = function (entityLogicalName, id, successCallback, errorCallback) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2, (successCallback && Xrm.WebApi.deleteRecord(entityLogicalName, id).then(successCallback, errorCallback)) || Xrm.WebApi.deleteRecord(entityLogicalName, id)];
        }); }); };
        this.disassociateRecord = function (target, relatedEntityId, relationship) { return __awaiter(_this, void 0, void 0, function () {
            var disassociateRecord;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.execute(this.initDisassociateRequest(target, utility_1.Utilities.removeBrackets(relatedEntityId), relationship))];
                    case 1:
                        disassociateRecord = _a.sent();
                        return [2, disassociateRecord];
                }
            });
        }); };
        this.disassociateRecords = function (target, relatedEntityIds, relationship) { return __awaiter(_this, void 0, void 0, function () {
            var changeSet, _i, relatedEntityIds_1, relatedEntityId, requests, disassociateRecords;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        changeSet = [];
                        for (_i = 0, relatedEntityIds_1 = relatedEntityIds; _i < relatedEntityIds_1.length; _i++) {
                            relatedEntityId = relatedEntityIds_1[_i];
                            changeSet.push(this.initDisassociateRequest(target, utility_1.Utilities.removeBrackets(relatedEntityId), relationship));
                        }
                        requests = [changeSet];
                        return [4, this.executeMultiple(requests)];
                    case 1:
                        disassociateRecords = _a.sent();
                        return [2, disassociateRecords];
                }
            });
        }); };
        this.execute = function (request, successCallback, errorCallback) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2, (successCallback && Xrm.WebApi.online.execute(request).then(successCallback, errorCallback)) || Xrm.WebApi.online.execute(request)];
        }); }); };
        this.executeMultiple = function (requests, successCallback, errorCallback) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2, (successCallback && Xrm.WebApi.online.executeMultiple(requests).then(successCallback, errorCallback)) || Xrm.WebApi.online.executeMultiple(requests)];
        }); }); };
        this.initDisassociateRequest = function (target, relatedEntityId, relationship) {
            var request = { target: target, relatedEntityId: utility_1.Utilities.removeBrackets(relatedEntityId), relationship: relationship };
            request.getMetadata = function () {
                return {
                    boundParameter: constants_1.Constants.BoundParameter.Global,
                    parameterTypes: {},
                    operationType: constants_1.Constants.OperationType.CRUD,
                    operationName: 'Disassociate',
                };
            };
            return request;
        };
        this.retrieveRecord = function (entityLogicalName, id, options, successCallback, errorCallback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, (successCallback && Xrm.WebApi.retrieveRecord(entityLogicalName, utility_1.Utilities.removeBrackets(id), options).then(successCallback, errorCallback)) ||
                        Xrm.WebApi.retrieveRecord(entityLogicalName, id, options)];
            });
        }); };
        this.retrieveMultipleRecords = function (entityLogicalName, options, maxPageSize, successCallback, errorCallback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (validation_1._Validation.isFetchXml(options))
                    options = '?fetchXml=' + options;
                return [2, ((successCallback && Xrm.WebApi.retrieveMultipleRecords(entityLogicalName, options, maxPageSize).then(successCallback, errorCallback)) ||
                        Xrm.WebApi.retrieveMultipleRecords(entityLogicalName, options, maxPageSize))];
            });
        }); };
        this.retrievePageFetchXml = function (entityLogicalName, fetchXml, pageNumber, count, pagingCookie, successCallback, errorCallback) { var fetchXml; return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!fetchXml || typeof fetchXml !== 'string')
                    return [2, console.log('[Error]: Invalid XML')];
                fetchXml = '?fetchXml=' + utility_1.Utilities.createFetchXml(fetchXml, pagingCookie, pageNumber, count);
                return [2, this.retrieveMultipleRecords(entityLogicalName, fetchXml, null, successCallback, errorCallback)];
            });
        }); };
        this.retrieveAllRecordsFetchXml = function (entityLogicalName, fetchXml, count) { return __awaiter(_this, void 0, void 0, function () {
            var page, entities, pagingCookie, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fetchXml || typeof fetchXml !== 'string')
                            return [2, console.log('[Error]: Invalid XML')];
                        page = 1;
                        entities = [];
                        pagingCookie = null;
                        _a.label = 1;
                    case 1: return [4, this.retrievePageFetchXml(entityLogicalName, fetchXml, page, count, pagingCookie)];
                    case 2:
                        result = _a.sent();
                        if (result)
                            entities = entities.concat(result.entities);
                        pagingCookie = result.fetchXmlPagingCookie;
                        page++;
                        _a.label = 3;
                    case 3:
                        if (result.fetchXmlPagingCookie) return [3, 1];
                        _a.label = 4;
                    case 4: return [2, entities];
                }
            });
        }); };
        this.setStateReocord = function (entityLogicalName, id, statecode, statuscode, successCallback, errorCallback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.updateRecord(entityLogicalName, utility_1.Utilities.removeBrackets(id), { statecode: statecode, statuscode: statuscode }, successCallback, errorCallback)];
                    case 1: return [2, _a.sent()];
                }
            });
        }); };
        this.updateRecord = function (entityLogicalName, id, data, successCallback, errorCallback) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2, (successCallback && Xrm.WebApi.updateRecord(entityLogicalName, utility_1.Utilities.removeBrackets(id), data).then(successCallback, errorCallback)) || Xrm.WebApi.updateRecord(entityLogicalName, id, data)];
        }); }); };
        this.doRequest = function (action, uri, data) {
            if (!RegExp(action, 'g').test('POST PATCH PUT GET DELETE')) {
                throw new Error('Request: action parameter must be one of the following: ' + 'POST, PATCH, PUT, GET, or DELETE.');
            }
            if (typeof uri !== 'string') {
                throw new Error('Request: uri parameter must be a string.');
            }
            if (RegExp(action, 'g').test('PATCH PUT') && (data === null || data === undefined)) {
                throw new Error('Request: data parameter must not be null for operations that create or modify data.');
            }
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
                            case 200:
                            case 204:
                                resolve(this);
                                break;
                            default:
                                var error;
                                try {
                                    error = JSON.parse(request.response).error;
                                }
                                catch (e) {
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
        this.callAction = function (entityName, id, actionName, data) { return __awaiter(_this, void 0, void 0, function () {
            var uri, entityMetadata, callAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = '/';
                        if (typeof actionName !== 'string' || actionName === '')
                            throw new Error('actionName parameter is invalid.');
                        return [4, utility_1.Utilities.getEntityMetadata(entityName)];
                    case 1:
                        entityMetadata = _a.sent();
                        if (entityMetadata !== null && entityName !== entityMetadata.EntitySetName)
                            entityName = entityMetadata.EntitySetName;
                        uri += entityName;
                        if (id)
                            uri += "(" + id + ")";
                        uri += '/' + (actionName.startsWith('Microsoft.Dynamics.CRM.') ? actionName : 'Microsoft.Dynamics.CRM.' + actionName);
                        return [4, this.doRequest('POST', uri, data)];
                    case 2:
                        callAction = _a.sent();
                        return [2, callAction];
                }
            });
        }); };
    }
    OData.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    OData.prototype.getFileColumn = function (entityset, id, field) {
        if (!entityset)
            throw new Error('entityset parameter must not be null ');
        if (!id)
            throw new Error('id parameter must not be null ');
        if (!field)
            throw new Error('field parameter must not be null ');
        var action = 'GET';
        var uri = "/" + entityset + "(" + utility_1.Utilities.removeBrackets(id) + ")/" + field + "/$value";
        return this.doRequest(action, uri);
    };
    return OData;
}());
exports._OData = OData.getInstance();


/***/ }),

/***/ 262:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Process = void 0;
var Process = (function () {
    function Process() {
    }
    Process.prototype.addOnPreProcessStatusChange = function (fuc) {
        formContext['data']['process']['addOnPreProcessStatusChange'](fuc);
    };
    Process.prototype.removeOnPreProcessStatusChange = function (fuc) {
        formContext['data']['process']['removeOnPreProcessStatusChange'](fuc);
    };
    Process.prototype.addOnProcessStatusChange = function (fuc) {
        formContext['data']['process']['addOnProcessStatusChange'](fuc);
    };
    Process.prototype.removeOnProcessStatusChange = function (fuc) {
        formContext['data']['process']['removeOnProcessStatusChange'](fuc);
    };
    Process.prototype.addOnStageChange = function (fuc) {
        formContext['data']['process']['addOnStageChange'](fuc);
    };
    Process.prototype.removeOnStageChange = function (fuc) {
        formContext['data']['process']['removeOnStageChange'](fuc);
    };
    Process.prototype.addOnStageSelected = function (fuc) {
        formContext['data']['process']['addOnStageSelected'](fuc);
    };
    Process.prototype.removeOnStageSelected = function (fuc) {
        formContext['data']['process']['removeOnStageSelected'](fuc);
    };
    Process.prototype.getActiveProcess = function () {
        formContext['data']['process']['getActiveProcess']();
    };
    Process.prototype.setActiveProcess = function (processId, callbackFunction) {
        formContext['data']['process']['setActiveProcess'](processId, callbackFunction);
    };
    Process.prototype.getProcessInstances = function (callbackFunction) {
        formContext['data']['process']['getProcessInstances'](callbackFunction);
    };
    Process.prototype.setActiveProcessInstance = function (processInstanceId, callbackFunction) {
        formContext['data']['process']['setActiveProcessInstance'](processInstanceId, callbackFunction);
    };
    Process.prototype.getInstanceId = function () {
        return formContext['data']['process']['getInstanceId']();
    };
    Process.prototype.getInstanceName = function () {
        return formContext['data']['process']['getInstanceName']();
    };
    Process.prototype.getStatus = function () {
        return formContext['data']['process']['getStatus']();
    };
    Process.prototype.setStatus = function (status, callbackFunction) {
        return formContext['data']['process']['setStatus'](status, callbackFunction);
    };
    Process.prototype.getActiveStage = function () {
        formContext['data']['process']['getActiveStage']();
    };
    Process.prototype.setActiveStage = function (stageId, callbackFunction) {
        formContext['data']['process']['setActiveStage'](stageId, callbackFunction);
    };
    Process.prototype.moveNext = function (callbackFunction) {
        formContext['data']['process']['moveNext'](callbackFunction);
    };
    Process.prototype.movePrevious = function (callbackFunction) {
        formContext['data']['process']['movePrevious'](callbackFunction);
    };
    Process.prototype.getActivePath = function () {
        formContext['data']['process']['getActivePath']();
    };
    Process.prototype.getEnabledProcesses = function (callbackFunction) {
        formContext['data']['process']['getEnabledProcesses'](callbackFunction);
    };
    Process.prototype.getSelectedStage = function () {
        formContext['data']['process']['getSelectedStage']();
    };
    return Process;
}());
exports.Process = Process;


/***/ }),

/***/ 362:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.crmXmlDecode = exports.selectSingleNodeText = exports.crmXmlEncode = exports.encodeValue = exports.getNodeText = exports.stringToDate = exports.isArray = exports.getError = exports.setSelectionNamespaces = exports.selectSingleNode = exports.executeRequest = exports.injectPagingDetails = exports.getFetchResult = exports.xmlEncode = exports.getValue = exports.getNodeTextValue = exports.getNodeTextValueNotNull = exports.getChildNode = exports.getChildNodes = exports.getXmlValue = exports.$ = void 0;
var constants_1 = __webpack_require__(431);
var objectType_1 = __webpack_require__(662);
if (!window.$)
    window.$ = window.parent.$;
var _$ = window.$;
exports.$ = _$;
var getXmlValue = function (key, dataType, value) {
    var xml = "";
    var xmlValue = "";
    var extraNamespace = "";
    switch (dataType) {
        case constants_1.SOAP_TYPE.String:
            xmlValue = htmlEncode(value) || "";
            break;
        case constants_1.SOAP_TYPE.DateTime:
            xmlValue = value.toISOString() || "";
            break;
        case constants_1.SOAP_TYPE.EntityReference:
            xmlValue = "<a:Id>" + (value.id || "") + "</a:Id>" +
                "<a:LogicalName>" + (value.entityType || "") + "</a:LogicalName>" +
                "<a:Name i:nil='true' />";
            break;
        case constants_1.SOAP_TYPE.OptionSet:
        case constants_1.SOAP_TYPE.Money:
            xmlValue = "<a:Value>" + (value || 0) + "</a:Value>";
            break;
        case constants_1.SOAP_TYPE.Entity:
            xmlValue = getXmlEntityData(value);
            break;
        case constants_1.SOAP_TYPE.EntityCollection:
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
        case constants_1.SOAP_TYPE.Guid:
            xmlValue = value || constants_1.Constants.EmptyGuid;
            extraNamespace = " xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/'";
            break;
        default:
            xmlValue = value != undefined ? value : null;
            break;
    }
    xml = "<a:KeyValuePairOfstringanyType>" +
        "<b:key>" + key + "</b:key>" +
        "<b:value i:type='" + dataType + "'" + extraNamespace;
    if (xmlValue === null || xmlValue === "") {
        xml += " i:nil='true' />";
    }
    else {
        xml += ">" + xmlValue + "</b:value>";
    }
    xml += "</a:KeyValuePairOfstringanyType>";
    return xml;
};
exports.getXmlValue = getXmlValue;
var getChildNodes = function (node, childNodesName) {
    var childNodes = [];
    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].tagName == childNodesName) {
            childNodes.push(node.childNodes[i]);
        }
    }
    if (childNodes.length == 0 && childNodesName.indexOf(":") !== -1) {
        childNodes = exports.getChildNodes(node, childNodesName.substring(childNodesName.indexOf(":") + 1));
    }
    return childNodes;
};
exports.getChildNodes = getChildNodes;
var getChildNode = function (node, childNodeName) {
    var nodes = exports.getChildNodes(node, childNodeName);
    if (nodes != null && nodes.length > 0) {
        return nodes[0];
    }
    else {
        return null;
    }
};
exports.getChildNode = getChildNode;
var getNodeTextValueNotNull = function (nodes) {
    var value = "";
    for (var i = 0; i < nodes.length; i++) {
        if (value === "") {
            value = exports.getNodeTextValue(nodes[i]);
        }
    }
    return value;
};
exports.getNodeTextValueNotNull = getNodeTextValueNotNull;
var getNodeTextValue = function (node) {
    if (node != null) {
        var textNode = node.firstChild;
        if (textNode != null) {
            return textNode.textContent || textNode.nodeValue || textNode.data || textNode.text;
        }
    }
    return "";
};
exports.getNodeTextValue = getNodeTextValue;
var getValue = function (node) {
    var value = null;
    var type = null;
    if (node != null) {
        type = node.getAttribute("i:type") || node.getAttribute("type");
        if (type != null) {
            var valueType = type.substring(type.indexOf(":") + 1).toLowerCase();
            if (valueType == "entityreference") {
                var attrValueIdNode = exports.getChildNode(node, "a:Id");
                var attrValueEntityNode = exports.getChildNode(node, "a:LogicalName");
                var attrValueNameNode = exports.getChildNode(node, "a:Name");
                var lookupId = exports.getNodeTextValue(attrValueIdNode);
                var lookupName = exports.getNodeTextValue(attrValueNameNode);
                var lookupEntity = exports.getNodeTextValue(attrValueEntityNode);
                value = new objectType_1.EntityReference(lookupEntity, lookupId, lookupName);
            }
            else if (valueType == "entity") {
                value = getEntityData(node);
            }
            else if (valueType == "entitycollection") {
                var entitiesNode = exports.getChildNode(node, "a:Entities");
                var entityNodes = exports.getChildNodes(entitiesNode, "a:Entity");
                value = [];
                if (entityNodes != null && entityNodes.length > 0) {
                    for (var i = 0; i < entityNodes.length; i++) {
                        value.push(getEntityData(entityNodes[i]));
                    }
                }
            }
            else if (valueType == "aliasedvalue") {
                var aliasedValue = exports.getValue(exports.getChildNode(node, "a:Value"));
                if (aliasedValue != null) {
                    value = aliasedValue.value;
                    type = aliasedValue.type;
                }
            }
            else {
                var stringValue = exports.getNodeTextValue(node);
                if (stringValue != null) {
                    switch (valueType) {
                        case "datetime":
                            value = new Date(stringValue);
                            break;
                        case "int":
                        case "money":
                        case "optionsetvalue":
                        case "double":
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
    return new objectType_1.Attribute(value, type);
};
exports.getValue = getValue;
var xmlEncode = function (strInput) {
    var c, encoded = '';
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
};
exports.xmlEncode = xmlEncode;
var getFetchResult = function (data) {
    var executeResult = data.firstChild.firstChild.firstChild.firstChild, resultsNode = exports.getChildNode(executeResult, 'a:Results'), entityCollection = exports.getChildNode(resultsNode.firstChild, 'b:value'), resultSet = exports.getChildNode(entityCollection, 'a:Entities').childNodes;
    return {
        entityName: getChildNodeText(entityCollection, 'a:EntityName'),
        moreRecords: (getChildNodeText(entityCollection, 'a:MoreRecords') === 'true'),
        pagingCookie: getChildNodeText(entityCollection, 'a:PagingCookie'),
        totalRecordCount: parseInt(getChildNodeText(entityCollection, 'a:TotalRecordCount'), 10),
        entities: exports.$.map(resultSet, parseSingleEntityNode)
    };
};
exports.getFetchResult = getFetchResult;
var injectPagingDetails = function (fetchxml, page, pagingCookie) {
    var xmldoc = exports.$.parseXML(fetchxml), fetch = exports.$(xmldoc).find('fetch');
    fetch.attr('page', page);
    fetch.attr('paging-cookie', pagingCookie);
    return xmlToString(xmldoc);
};
exports.injectPagingDetails = injectPagingDetails;
var executeRequest = function (serverUrl, xml, opt_asyn) {
    var header = {};
    header[constants_1.SOAP_CONSTS.SOAP_ACTION.text] = constants_1.SOAP_CONSTS.SOAP_ACTION.value;
    header[constants_1.SOAP_CONSTS.ACCEPT_TYPE.text] = constants_1.SOAP_CONSTS.ACCEPT_TYPE.value.JSON;
    header[constants_1.SOAP_CONSTS.CONTENT_TYPE.text] = constants_1.SOAP_CONSTS.CONTENT_TYPE.value.XML;
    return exports.$.ajax({
        type: constants_1.SOAP_CONSTS.HTTP_METHOD.POST,
        async: opt_asyn != false,
        data: xml,
        url: serverUrl + constants_1.SOAP_CONSTS.SOAP_ENDPOINT,
        headers: header
    });
};
exports.executeRequest = executeRequest;
var selectSingleNode = function (node, xpathExpr) {
    if (typeof (node.selectSingleNode) != "undefined") {
        return node.selectSingleNode(xpathExpr);
    }
    else {
        var xpe = new XPathEvaluator();
        var results = xpe.evaluate(xpathExpr, node, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return results.singleNodeValue;
    }
};
exports.selectSingleNode = selectSingleNode;
var setSelectionNamespaces = function (doc) {
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
exports.setSelectionNamespaces = setSelectionNamespaces;
var getError = function (async, resp) {
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
        for (var i = 0; i < bodyNode.childNodes.length; i++) {
            var node = bodyNode.childNodes[i];
            if ("s:Fault" === node.nodeName) {
                for (var j = 0; j < node.childNodes.length; j++) {
                    var testNode = node.childNodes[j];
                    if ("faultstring" === testNode.nodeName) {
                        faultstring = exports.getNodeText(testNode);
                    }
                    if ("detail" === testNode.nodeName) {
                        for (var k = 0; k < testNode.childNodes.length; k++) {
                            var orgServiceFault = testNode.childNodes[k];
                            if ("OrganizationServiceFault" === orgServiceFault.nodeName) {
                                for (var l = 0; l < orgServiceFault.childNodes.length; l++) {
                                    var errorCodeNode = orgServiceFault.childNodes[l];
                                    if ("ErrorCode" === errorCodeNode.nodeName) {
                                        errorCode = exports.getNodeText(errorCodeNode);
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
    }
    else {
        if (faultstring != null) {
            errorMessage = faultstring;
        }
    }
    if (async) {
        return new Error(errorMessage);
    }
    else {
        throw new Error(errorMessage);
    }
};
exports.getError = getError;
var isArray = function (input) {
    return input.constructor.toString().indexOf("Array") !== -1;
};
exports.isArray = isArray;
var stringToDate = function (s) {
    var b = s.split(/\D/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5]));
};
exports.stringToDate = stringToDate;
var getNodeText = function (node) {
    return node.text !== undefined
        ? node.text
        : node.textContent;
};
exports.getNodeText = getNodeText;
var encodeValue = function (value) {
    if (typeof value == "string") {
        value = value.replace(/[{}]/g, "");
    }
    return (typeof value === "object" && value.getTime)
        ?
            encodeDate(value) :
        exports.crmXmlEncode(value);
};
exports.encodeValue = encodeValue;
var crmXmlEncode = function (s) {
    if ('undefined' === typeof s || null === s)
        return s;
    else if (typeof s != "string")
        s = s.toString();
    return innerSurrogateAmpersandWorkaround(s);
};
exports.crmXmlEncode = crmXmlEncode;
var selectSingleNodeText = function (node, xpathExpr) {
    var x = exports.selectSingleNode(node, xpathExpr);
    if (isNodeNull(x)) {
        return null;
    }
    if (typeof (x.text) != "undefined") {
        return x.text;
    }
    else {
        return x.textContent;
    }
};
exports.selectSingleNodeText = selectSingleNodeText;
var crmXmlDecode = function (s) {
    if (typeof s != "string")
        s = s.toString();
    return s;
};
exports.crmXmlDecode = crmXmlDecode;
var getEntityData = function (entityNode) {
    var value = null;
    var entityAttrsNode = exports.getChildNode(entityNode, "a:Attributes");
    var entityIdNode = exports.getChildNode(entityNode, "a:Id");
    var entityLogicalNameNode = exports.getChildNode(entityNode, "a:LogicalName");
    var entityFormattedValuesNode = exports.getChildNode(entityNode, "a:FormattedValues");
    var entityLogicalName = exports.getNodeTextValue(entityLogicalNameNode);
    var entityId = exports.getNodeTextValue(entityIdNode);
    var entityAttrs = exports.getChildNodes(entityAttrsNode, "a:KeyValuePairOfstringanyType");
    value = new objectType_1.Entity(entityLogicalName, entityId, null);
    if (entityAttrs != null && entityAttrs.length > 0) {
        for (var i = 0; i < entityAttrs.length; i++) {
            var attrNameNode = exports.getChildNode(entityAttrs[i], "b:key");
            var attrValueNode = exports.getChildNode(entityAttrs[i], "b:value");
            var attributeName = exports.getNodeTextValue(attrNameNode);
            var attributeValue = exports.getValue(attrValueNode);
            value.attributes[attributeName] = attributeValue;
        }
    }
    for (var j = 0; j < entityFormattedValuesNode.childNodes.length; j++) {
        var foNode = entityFormattedValuesNode.childNodes[j];
        var fNameNode = exports.getChildNode(foNode, "b:key");
        var fValueNode = exports.getChildNode(foNode, "b:value");
        var fName = exports.getNodeTextValue(fNameNode);
        var fValue = exports.getNodeTextValue(fValueNode);
        value.formattedValues[fName] = fValue;
    }
    return value;
};
var getXmlEntityData = function (entity) {
    var xml = "";
    if (entity != null) {
        var attrXml = "";
        for (var field in entity.attributes) {
            var a = entity.attributes[field];
            var aXml = exports.getXmlValue(field, a.type, a.value);
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
};
var htmlEncode = function (s) {
    if (typeof s !== "string") {
        return s;
    }
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};
var parseISO8601Date = function (s) {
    var re = /(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(\.\d+)?(Z|([+-])(\d\d):(\d\d))/;
    var d = [];
    d = s.match(re);
    if (!d) {
        throw "Couldn't parse ISO 8601 date string '" + s + "'";
    }
    var a = [1, 2, 3, 4, 5, 6, 10, 11];
    for (var i = 0, max = a.length; i < max; i++) {
        d[a[i]] = parseInt(d[a[i]], 10);
    }
    d[7] = parseFloat(d[7]);
    var ms = Date.UTC(d[1], d[2] - 1, d[3], d[4], d[5], d[6]);
    if (d[7] > 0) {
        ms += Math.round(d[7] * 1000);
    }
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
};
var convertXmlToAttributeObject = function (type, xmlnode) {
    var attr = { 'type': type };
    switch (type) {
        case "a:OptionSetValue":
            attr.value = exports.getNodeText(xmlnode);
            break;
        case "a:EntityReference":
            attr.guid = getChildNodeText(xmlnode, 'a:Id');
            attr.name = getChildNodeText(xmlnode, 'a:Name');
            attr.logicalName = getChildNodeText(xmlnode, 'a:LogicalName');
            break;
        case "a:Money":
            attr.value = parseFloat(exports.getNodeText(xmlnode));
            break;
        case "a:AliasedValue":
            var aliasValue = exports.getChildNode(xmlnode, 'a:Value'), aliasType = getAttribute(aliasValue, 'i:type');
            attr = convertXmlToAttributeObject(aliasType, aliasValue);
            break;
        case 'c:int':
            attr.value = parseInt(exports.getNodeText(xmlnode), 10);
            break;
        case 'c:decimal':
            attr.value = parseFloat(exports.getNodeText(xmlnode));
            break;
        case 'c:dateTime':
            attr.value = parseISO8601Date(exports.getNodeText(xmlnode));
            break;
        case 'c:boolean':
            attr.value = (exports.getNodeText(xmlnode) !== 'true') ? false : true;
            break;
        default:
            attr.value = exports.getNodeText(xmlnode);
            break;
    }
    return attr;
};
var parseAttibutes = function (attributesNode) {
    var typedAttrSet = {}, attrNode = null, key = null, type = null, value = null;
    for (var i = 0, max = attributesNode.childNodes.length; i < max; i++) {
        attrNode = attributesNode.childNodes[i];
        key = getChildNodeText(attrNode, 'b:key');
        value = exports.getChildNode(attrNode, 'b:value');
        type = getAttribute(value, 'i:type');
        typedAttrSet[key] = convertXmlToAttributeObject(type, value);
    }
    return typedAttrSet;
};
var parseSingleEntityNode = function (entityNode) {
    var entity = new objectType_1.BusinessEntity();
    entity.id = getChildNodeText(entityNode, 'a:Id');
    entity.attributes = parseAttibutes(exports.getChildNode(entityNode, 'a:Attributes'));
    entity.logicalName = getChildNodeText(entityNode, 'a:LogicalName');
    var childSet = exports.getChildNode(entityNode, 'a:FormattedValues').childNodes;
    for (var i = 0, max = childSet.length; i < max; i++) {
        var item = childSet[i], key = getChildNodeText(item, 'b:key'), value = getChildNodeText(item, 'b:value');
        entity.attributes[key].formattedValue = value;
    }
    return entity;
};
var xmlToString = function (elem) {
    var serialized;
    if (window.XMLSerializer) {
        var serializer = new XMLSerializer();
        serialized = serializer.serializeToString(elem);
    }
    else {
        serialized = elem.xml;
    }
    return serialized;
};
var getChildNodeText = function (xml, xpathExpression) {
    return exports.getNodeText(exports.getChildNode(xml, xpathExpression));
};
var getAttribute = function (xmlNode, attrName) {
    for (var i = 0; i < xmlNode.attributes.length; i++) {
        var attr = xmlNode.attributes[i];
        if (attr.name == attrName) {
            return attr.value;
        }
    }
};
var encodeDate = function (dateTime) {
    return dateTime.getFullYear() + "-" +
        padNumber(dateTime.getMonth() + 1) + "-" +
        padNumber(dateTime.getDate()) + "T" +
        padNumber(dateTime.getHours()) + ":" +
        padNumber(dateTime.getMinutes()) + ":" +
        padNumber(dateTime.getSeconds());
};
var padNumber = function (s) {
    var len = 2;
    s = '' + s;
    while (s.length < len) {
        s = "0" + s;
    }
    return s;
};
var innerSurrogateAmpersandWorkaround = function (s) {
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
                }
                else
                    buffer += String.fromCharCode(c0);
            }
            else
                buffer += String.fromCharCode(c0);
        else
            buffer += String.fromCharCode(c0);
    }
    s = buffer;
    buffer = "";
    for (cnt = 0, cntlength = s.length; cnt < cntlength; cnt++) {
        c0 = s.charCodeAt(cnt);
        if (c0 >= 55296 && c0 <= 57343)
            buffer += String.fromCharCode(65533);
        else
            buffer += String.fromCharCode(c0);
    }
    s = buffer;
    s = htmlEncode(s);
    s = s.replace(/CRMEntityReferenceOpen/g, "&#x");
    s = s.replace(/CRMEntityReferenceClose/g, ";");
    return s;
};
var nsResolver = function (prefix) {
    var ns = {
        "s": "http://schemas.xmlsoap.org/soap/envelope/",
        "a": "http://schemas.microsoft.com/xrm/2011/Contracts",
        "i": "http://www.w3.org/2001/XMLSchema-instance",
        "b": "http://schemas.datacontract.org/2004/07/System.Collections.Generic",
        "c": "http://schemas.microsoft.com/xrm/2011/Metadata",
        "ser": "http://schemas.microsoft.com/xrm/2011/Contracts/Services"
    };
    return ns[prefix] || null;
};
var isNodeNull = function (node) {
    if (node == null) {
        return true;
    }
    if ((node.attributes.getNamedItem("i:nil") != null) && (node.attributes.getNamedItem("i:nil").value === "true")) {
        return true;
    }
    return false;
};


/***/ }),

/***/ 479:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EntityBase = void 0;
var constants_1 = __webpack_require__(431);
var globalcontext_1 = __webpack_require__(713);
var logger_1 = __webpack_require__(218);
var common_1 = __webpack_require__(362);
var objectType_1 = __webpack_require__(662);
var EntityBase = (function (_super) {
    __extends(EntityBase, _super);
    function EntityBase() {
        var _this = _super.call(this) || this;
        _this.doSoapRequest = function (soapBody, requestType, async, internalCallback) {
            async = async || false;
            var soapXml = ["<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>",
                "<soap:Body>",
                "<", requestType, " xmlns='http://schemas.microsoft.com/xrm/2011/Contracts/Services' xmlns:i='http://www.w3.org/2001/XMLSchema-instance'>", soapBody, "</", requestType, ">",
                "</soap:Body>",
                "</soap:Envelope>"
            ].join("");
            var req = new XMLHttpRequest();
            req.open(constants_1.SOAP_CONSTS.HTTP_METHOD.POST, _this.getClientUrl() + constants_1.SOAP_CONSTS.SOAP_ENDPOINT, async != false);
            req.setRequestHeader(constants_1.SOAP_CONSTS.ACCEPT_TYPE.text, constants_1.SOAP_CONSTS.ACCEPT_TYPE.value.XML);
            req.setRequestHeader(constants_1.SOAP_CONSTS.CONTENT_TYPE.text, constants_1.SOAP_CONSTS.CONTENT_TYPE.value.XML);
            req.setRequestHeader(constants_1.SOAP_CONSTS.SOAP_ACTION.text, constants_1.SOAP_CONSTS.SOAP_ACTION.value);
            try {
                req.responseType = 'msxml-document';
            }
            catch (e) { }
            if (async) {
                req.onreadystatechange = function () {
                    if (req.readyState === 4) {
                        req.onreadystatechange = null;
                        if (req.status === 200) {
                            var doc = req.responseXML;
                            try {
                                common_1.setSelectionNamespaces(doc);
                            }
                            catch (e) { }
                            internalCallback(doc);
                        }
                        else {
                            common_1.getError(true, req);
                        }
                    }
                };
                req.send(soapXml);
            }
            else {
                req.send(soapXml);
                if (req.status === 200) {
                    var doc = req.responseXML;
                    try {
                        common_1.setSelectionNamespaces(doc);
                    }
                    catch (e) { }
                    var result = doc;
                    return !!internalCallback ? internalCallback(result) : result;
                }
                else {
                    common_1.getError(false, req);
                }
            }
        };
        _this.retrieve = function (entityName, id, columnSet, async, internalCallback) {
            try {
                var attributes = "";
                var query = "";
                if (columnSet != null) {
                    for (var i = 0, ilength = columnSet.length; i < ilength; i++) {
                        attributes += "<c:string>" + columnSet[i] + "</c:string>";
                    }
                    query = "<a:AllColumns>false</a:AllColumns>" +
                        "<a:Columns xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>" +
                        attributes +
                        "</a:Columns>";
                }
                else {
                    query = "<a:AllColumns>true</a:AllColumns><a:Columns xmlns:b='http://schemas.microsoft.com/2003/10/Serialization/Arrays' />";
                }
                var msgBody = [
                    "<request i:type='a:RetrieveRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                    "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                    "<a:KeyValuePairOfstringanyType>",
                    "<b:key>Target</b:key>",
                    "<b:value i:type='a:EntityReference'>",
                    "<a:Id>", common_1.encodeValue(id), "</a:Id>",
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
                return _this.doSoapRequest(msgBody, "Execute", !!internalCallback, function (resultXml) {
                    var retrieveResult = common_1.selectSingleNode(resultXml, "//b:value");
                    var entity = new objectType_1.BusinessEntity();
                    entity.deserialize(retrieveResult);
                    if (!async)
                        return entity;
                    else
                        return internalCallback(entity);
                });
            }
            catch (e) {
                logger_1.logger.Critical(e.message, "SOAP.retrieve");
            }
        };
        _this.create = function (be, internalCallback) {
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
                return _this.doSoapRequest(mBody, "Execute", async, function (resultXml) {
                    var responseText = common_1.selectSingleNodeText(resultXml, "//b:value");
                    var result = common_1.crmXmlDecode(responseText);
                    if (!async)
                        return result;
                    else
                        internalCallback(result);
                });
            }
            catch (e) {
                logger_1.logger.Critical(e.message, "SOAP.create");
            }
        };
        _this.update = function (be, internalCallback) {
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
                return _this.doSoapRequest(mBody, "Execute", async, function (resultXml) {
                    var responseText = common_1.selectSingleNodeText(resultXml, "//a:Results");
                    var result = common_1.crmXmlDecode(responseText);
                    if (!async)
                        return result;
                    else
                        internalCallback(result);
                });
            }
            catch (e) {
                logger_1.logger.Critical(e.message, "SOAP.update");
            }
        };
        _this.delete = function (entityName, id, internalCallback) {
            try {
                var request = [
                    "<request i:type='a:DeleteRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'><a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'><a:KeyValuePairOfstringanyType><b:key>Target</b:key><b:value i:type='a:EntityReference'><a:Id>",
                    id, "</a:Id><a:LogicalName>",
                    entityName, "</a:LogicalName><a:Name i:nil='true' /></b:value></a:KeyValuePairOfstringanyType></a:Parameters><a:RequestId i:nil='true' /><a:RequestName>Delete</a:RequestName></request>"
                ].join("");
                var async = !!internalCallback;
                return _this.doSoapRequest(request, "Execute", async, function (resultXml) {
                    var responseText = common_1.selectSingleNodeText(resultXml, "//a:Results");
                    var result = common_1.crmXmlDecode(responseText);
                    if (!async)
                        return result;
                    else
                        internalCallback(result);
                });
            }
            catch (e) {
                logger_1.logger.Critical(e.message, "SOAP.delete");
            }
        };
        _this.retrieveMultiple = function (query, internalCallback) {
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
                return _this.doSoapRequest(request, "Execute", async, function (resultXml) {
                    var resultNodes = common_1.selectSingleNode(resultXml, "//a:Entities");
                    var retriveMultipleResults = [];
                    for (var i = 0, ilength = resultNodes.childNodes.length; i < ilength; i++) {
                        var entity = new objectType_1.BusinessEntity();
                        entity.deserialize(resultNodes.childNodes[i]);
                        retriveMultipleResults[i] = entity;
                    }
                    if (!async)
                        return retriveMultipleResults;
                    else
                        return internalCallback(retriveMultipleResults);
                });
            }
            catch (e) {
                logger_1.logger.Critical(e.message, "SOAP.retrieveMultiple");
            }
        };
        _this.associate = function (relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, internalCallback) {
            try {
                var relatedEntities = relatedBusinessEntities;
                relatedEntities = common_1.isArray(relatedEntities) ? relatedEntities : [relatedEntities];
                var output = [];
                for (var i = 0, ilength = relatedEntities.length; i < ilength; i++) {
                    if (relatedEntities[i].id !== "") {
                        output.push("<a:EntityReference>", "<a:Id>", relatedEntities[i].id, "</a:Id>", "<a:LogicalName>", relatedEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</a:EntityReference>");
                    }
                }
                var relatedXml = output.join("");
                var request = [
                    "<request i:type='a:AssociateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                    "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                    "<a:KeyValuePairOfstringanyType>",
                    "<b:key>Target</b:key>",
                    "<b:value i:type='a:EntityReference'>",
                    "<a:Id>", common_1.encodeValue(targetId), "</a:Id>",
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
                return _this.doSoapRequest(request, "Execute", async, function (resultXml) {
                    var responseText = common_1.selectSingleNodeText(resultXml, "//ser:ExecuteResult");
                    var result = common_1.crmXmlDecode(responseText);
                    if (!async)
                        return result;
                    else
                        internalCallback(result);
                });
            }
            catch (e) {
                logger_1.logger.Critical(e.message, "SOAP.associate");
            }
        };
        _this.disassociate = function (relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, internalCallback) {
            try {
                var relatedEntities = relatedBusinessEntities;
                relatedEntities = common_1.isArray(relatedEntities) ? relatedEntities : [relatedEntities];
                var output = [];
                for (var i = 0, ilength = relatedEntities.length; i < ilength; i++) {
                    if (relatedEntities[i].id !== "") {
                        output.push("<a:EntityReference>", "<a:Id>", relatedEntities[i].id, "</a:Id>", "<a:LogicalName>", relatedEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</a:EntityReference>");
                    }
                }
                var relatedXml = output.join("");
                var request = [
                    "<request i:type='a:DisassociateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                    "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                    "<a:KeyValuePairOfstringanyType>",
                    "<b:key>Target</b:key>",
                    "<b:value i:type='a:EntityReference'>",
                    "<a:Id>", common_1.encodeValue(targetId), "</a:Id>",
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
                return _this.doSoapRequest(request, "Execute", async, function (resultXml) {
                    var responseText = common_1.selectSingleNodeText(resultXml, "//ser:ExecuteResult");
                    var result = common_1.crmXmlDecode(responseText);
                    if (!async)
                        return result;
                    else
                        internalCallback(result);
                });
            }
            catch (e) {
                logger_1.logger.Critical(e.message, "SOAP.disassociate");
            }
        };
        return _this;
    }
    EntityBase.prototype.setState = function (entityName, recordId, stateCode, statusCode, async, internalCallback) {
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
                '</Execute>'
            ].join("");
            return this.doSoapRequest(request, "Execute", async, function (resultXml) {
                var responseText = common_1.selectSingleNodeText(resultXml, "//ser:ExecuteResult");
                var result = common_1.crmXmlDecode(responseText);
                if (!async)
                    return result;
                else
                    internalCallback(result);
            });
        }
        catch (e) {
            logger_1.logger.Critical(e.message, "SOAP.setState");
        }
    };
    EntityBase.prototype.assign = function (id, entityname, assigneeid, opt_asyn) {
        try {
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
            return common_1.executeRequest(this.getClientUrl(), request, opt_asyn != false);
        }
        catch (e) {
            logger_1.logger.Critical(e.message, "SOAP.assign");
        }
    };
    return EntityBase;
}(globalcontext_1.GlobalContext));
exports.EntityBase = EntityBase;


/***/ }),

/***/ 182:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FetchKit = void 0;
var globalcontext_1 = __webpack_require__(713);
var logger_1 = __webpack_require__(218);
var common_1 = __webpack_require__(362);
var FetchKit = (function (_super) {
    __extends(FetchKit, _super);
    function FetchKit() {
        var _this = _super.call(this) || this;
        _this.fetchMore = function (fetchxml, opt_asyn) {
            try {
                return _fetchMore(_this.getClientUrl(), fetchxml, opt_asyn);
            }
            catch (e) {
                logger_1.logger.Critical(e.message, "SOAP.fetchMore");
            }
        };
        _this.fetchAll = function (fetchxml, opt_page) {
            try {
                return _fetchAll(_this.getClientUrl(), fetchxml, opt_page);
            }
            catch (e) {
                logger_1.logger.Critical(e.message, "SOAP.fetchAll");
            }
        };
        _this.fetch = function (fetchxml, opt_asyn) {
            try {
                return _fetch(_this.getClientUrl(), fetchxml, opt_asyn);
            }
            catch (e) {
                logger_1.logger.Critical(e.message, "SOAP.fetch");
            }
        };
        return _this;
    }
    return FetchKit;
}(globalcontext_1.GlobalContext));
exports.FetchKit = FetchKit;
var _fetchAll = function (clientUrl, fetchxml, opt_page) {
    var dfd = common_1.$.Deferred(), allRecords = [], page = opt_page || 1;
    _fetchMore(clientUrl, fetchxml, true).then(function (result) {
        allRecords = allRecords.concat(result.entities);
        if (result.moreRecords) {
            page++;
            var paging_fetchxml = common_1.injectPagingDetails(fetchxml, page, result.pagingCookie);
            _fetchAll(clientUrl, paging_fetchxml, page).then(function (collection) {
                allRecords = allRecords.concat(collection);
                dfd.resolve(allRecords);
            }, dfd.reject);
        }
        else {
            dfd.resolve(allRecords);
        }
    }, dfd.reject);
    return dfd.promise();
};
var _fetchMore = function (clientUrl, fetchxml, opt_asyn) {
    opt_asyn = (opt_asyn === false) ? false : true;
    var dfd = common_1.$.Deferred(), request = ['<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">',
        ' <s:Body>',
        '  <Execute xmlns="http://schemas.microsoft.com/xrm/2011/Contracts/Services">',
        '     <request i:type="b:RetrieveMultipleRequest" xmlns:b="http://schemas.microsoft.com/xrm/2011/Contracts" ',
        '         xmlns:i="http://www.w3.org/2001/XMLSchema-instance">',
        '             <b:Parameters xmlns:c="http://schemas.datacontract.org/2004/07/System.Collections.Generic">',
        '             <b:KeyValuePairOfstringanyType>',
        '                 <c:key>Query</c:key>',
        '                 <c:value i:type="b:FetchExpression">',
        '                     <b:Query>',
        common_1.xmlEncode(fetchxml),
        '                     </b:Query>',
        '                 </c:value>',
        '             </b:KeyValuePairOfstringanyType>',
        '         </b:Parameters>',
        '         <b:RequestId i:nil="true"/>',
        '         <b:RequestName>RetrieveMultiple</b:RequestName>',
        '     </request>',
        ' </Execute>',
        '</s:Body></s:Envelope>'].join('');
    common_1.executeRequest(clientUrl, request, opt_asyn).then(function (data) {
        dfd.resolve(common_1.getFetchResult(data));
    }, dfd.reject);
    return dfd.promise();
};
var _fetch = function (clientUrl, fetchxml, opt_asyn) {
    opt_asyn = (opt_asyn === false) ? false : true;
    var dfd = common_1.$.Deferred();
    _fetchMore(clientUrl, fetchxml, opt_asyn).then(function (result) {
        dfd.resolve(result.entities);
    })
        .fail(dfd.reject);
    return dfd.promise();
};


/***/ }),

/***/ 662:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessEntity = exports.Attribute = exports.XrmValue = exports.XrmEntityCollection = exports.XrmEntityReference = exports.XrmOptionSetValue = exports.Entity = exports.EntityReference = void 0;
var constants_1 = __webpack_require__(431);
var common_1 = __webpack_require__(362);
var EntityReference = (function () {
    function EntityReference(entityType, id, name) {
        this.id = id || constants_1.Constants.EmptyGuid;
        this.name = name || "";
        this.entityType = entityType || "";
    }
    return EntityReference;
}());
exports.EntityReference = EntityReference;
var Entity = (function () {
    function Entity(logicalName, id, attributes) {
        this.logicalName = logicalName || "";
        this.attributes = attributes || {};
        this.formattedValues = {};
        this.id = id || constants_1.Constants.EmptyGuid;
    }
    return Entity;
}());
exports.Entity = Entity;
var XrmOptionSetValue = (function () {
    function XrmOptionSetValue() {
        this.type = 'OptionSetValue';
    }
    return XrmOptionSetValue;
}());
exports.XrmOptionSetValue = XrmOptionSetValue;
var XrmEntityReference = (function () {
    function XrmEntityReference() {
        this.type = 'EntityReference';
    }
    return XrmEntityReference;
}());
exports.XrmEntityReference = XrmEntityReference;
var XrmEntityCollection = (function () {
    function XrmEntityCollection() {
        this.type = 'EntityCollection';
    }
    return XrmEntityCollection;
}());
exports.XrmEntityCollection = XrmEntityCollection;
var XrmValue = (function () {
    function XrmValue() {
    }
    return XrmValue;
}());
exports.XrmValue = XrmValue;
var Attribute = (function () {
    function Attribute(value, type) {
        this.value = value != undefined ? value : null;
        this.type = type || "";
    }
    return Attribute;
}());
exports.Attribute = Attribute;
var BusinessEntity = (function () {
    function BusinessEntity(logicalName, id) {
        var _this = this;
        this.id = null;
        this.logicalName = null;
        this.attributes = {};
        this.getValue = function (attrname, opt_property) {
            var attr = _this.attributes[attrname];
            if (attr) {
                var attrType = attr.type;
                switch (attrType) {
                    case constants_1.SOAP_TYPE.EntityReference:
                        return (opt_property !== undefined) ? attr[opt_property] : attr.guid;
                    case constants_1.SOAP_TYPE.OptionSet:
                        return (opt_property !== undefined) ? attr[opt_property] : attr.value;
                    default:
                        return attr.value;
                }
            }
            return null;
        };
        this.serialize = function () {
            var xml = ["<b:value i:type='a:Entity'>"];
            xml.push('<a:Attributes xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">');
            var attributes = _this.attributes;
            for (var attributeName in attributes) {
                if (attributes.hasOwnProperty(attributeName)) {
                    var attribute = attributes[attributeName];
                    xml.push("<a:KeyValuePairOfstringanyType>");
                    xml.push("<b:key>", attributeName, "</b:key>");
                    if (attribute === null || attribute.value === null) {
                        xml.push("<b:value i:nil='true' />");
                    }
                    else {
                        var sType = (!attribute.type) ?
                            typeof attribute :
                            common_1.crmXmlEncode(attribute.type);
                        var value;
                        var encodedValue;
                        var id;
                        var encodedId;
                        var logicalName;
                        var encodedLogicalName;
                        switch (sType) {
                            case "OptionSetValue":
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                encodedValue = common_1.encodeValue(value);
                                xml.push("<b:value i:type='a:OptionSetValue'>");
                                xml.push("<a:Value>", encodedValue, "</a:Value>", "</b:value>");
                                break;
                            case "EntityCollection":
                                xml.push("<b:value i:type='a:EntityCollection'>");
                                xml.push("<a:Entities>");
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                var collections = common_1.isArray(value) ? value : [value];
                                for (var i = 0, collectionLengh = collections.length; i < collectionLengh; i++) {
                                    var item = collections[i];
                                    id = (item.hasOwnProperty("id")) ? item["id"] : item;
                                    encodedId = common_1.encodeValue(id);
                                    logicalName = (item.hasOwnProperty("logicalName")) ? item["logicalName"] : item;
                                    encodedLogicalName = common_1.encodeValue(logicalName);
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
                                encodedId = common_1.encodeValue(id);
                                logicalName = (attribute.hasOwnProperty("logicalName")) ? attribute["logicalName"] : attribute;
                                encodedLogicalName = common_1.encodeValue(logicalName);
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
                                encodedValue = common_1.encodeValue(value);
                                xml.push("<b:value i:type='a:Money'>");
                                xml.push("<a:Value>", encodedValue, "</a:Value>", "</b:value>");
                                break;
                            case "guid":
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                encodedValue = common_1.encodeValue(value);
                                xml.push("<b:value i:type='c:guid' xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/'>");
                                xml.push(encodedValue, "</b:value>");
                                break;
                            case "number":
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                encodedValue = common_1.encodeValue(value);
                                var oType = (String(parseInt(value, 10)) === encodedValue) ? "c:int" : "c:decimal";
                                xml.push("<b:value i:type='", oType, "' xmlns:c='http://www.w3.org/2001/XMLSchema'>");
                                xml.push(encodedValue, '</b:value>');
                                break;
                            default:
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                encodedValue = common_1.encodeValue(value);
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
            xml.push("<a:Id>", common_1.encodeValue(_this.id), "</a:Id>");
            xml.push("<a:LogicalName>", _this.logicalName, "</a:LogicalName>");
            xml.push("<a:RelatedEntities xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />");
            xml.push("</b:value>");
            return xml.join("");
        };
        this.deserialize = function (resultNode) {
            var obj = new Object();
            var resultNodes = resultNode.childNodes;
            for (var j = 0, lenj = resultNodes.length; j < lenj; j++) {
                var sKey;
                var parentNode = resultNodes[j];
                switch (parentNode.nodeName) {
                    case "a:Attributes":
                        var attr = parentNode;
                        for (var k = 0, lenk = attr.childNodes.length; k < lenk; k++) {
                            var tempParentNode = attr.childNodes[k];
                            var tempParentNodeChildNodes = tempParentNode.childNodes;
                            sKey = common_1.getNodeText(tempParentNodeChildNodes[0]);
                            var tempNode = tempParentNodeChildNodes[1];
                            var sType = tempNode.attributes.getNamedItem("i:type").value;
                            if (sType.replace('c:', '').replace('a:', '') === "AliasedValue") {
                                var subNode = tempNode.childNodes[2];
                                sType = subNode.attributes.getNamedItem("i:type").value;
                                tempNode = subNode;
                            }
                            var entRef;
                            var entCv;
                            switch (sType) {
                                case "a:OptionSetValue":
                                    var entOsv = new XrmOptionSetValue();
                                    entOsv.type = sType.replace('a:', '');
                                    entOsv.value = parseInt(common_1.getNodeText(tempNode));
                                    obj[sKey] = entOsv;
                                    break;
                                case "a:EntityReference":
                                    entRef = new XrmEntityReference();
                                    entRef.type = sType.replace('a:', '');
                                    var oChildNodes = tempNode.childNodes;
                                    for (var i = 0, leni = oChildNodes.length; i < leni; i++) {
                                        var entityReferenceNode = oChildNodes[i];
                                        switch (entityReferenceNode.nodeName) {
                                            case "a:Id":
                                                entRef.id = common_1.getNodeText(entityReferenceNode);
                                                break;
                                            case "a:LogicalName":
                                                entRef.logicalName = common_1.getNodeText(entityReferenceNode);
                                                break;
                                            case "a:Name":
                                                entRef.name = common_1.getNodeText(entityReferenceNode);
                                                break;
                                        }
                                    }
                                    obj[sKey] = entRef;
                                    break;
                                case "a:EntityCollection":
                                    entRef = new XrmEntityCollection();
                                    entRef.type = sType.replace('a:', '');
                                    var items = [];
                                    var partyNodes = tempNode.childNodes;
                                    for (var y = 0, leny = partyNodes[0].childNodes.length; y < leny; y++) {
                                        var itemNodes = tempParentNode.childNodes[1].childNodes[0].childNodes[y].childNodes[0].childNodes;
                                        for (var z = 0, lenz = itemNodes.length; z < lenz; z++) {
                                            var itemNodeChildNodes = itemNodes[z].childNodes;
                                            var nodeText = common_1.getNodeText(itemNodeChildNodes[0]);
                                            if (nodeText === "partyid") {
                                                var itemRef = new XrmEntityReference();
                                                var partyListNodes = itemNodeChildNodes[1].childNodes;
                                                for (var pi = 0, lenpi = partyListNodes.length; pi < lenpi; pi++) {
                                                    var partyReferenceNode = partyListNodes[pi];
                                                    switch (partyReferenceNode.nodeName) {
                                                        case "a:Id":
                                                            itemRef.id = common_1.getNodeText(partyReferenceNode);
                                                            break;
                                                        case "a:LogicalName":
                                                            itemRef.logicalName = common_1.getNodeText(partyReferenceNode);
                                                            break;
                                                        case "a:Name":
                                                            itemRef.name = common_1.getNodeText(partyReferenceNode);
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
                                    entCv.value = parseFloat(common_1.getNodeText(tempNode));
                                    obj[sKey] = entCv;
                                    break;
                                default:
                                    entCv = new XrmValue();
                                    entCv.type = sType.replace('c:', '').replace('a:', '');
                                    if (entCv.type === "int") {
                                        entCv.value = parseInt(common_1.getNodeText(tempNode));
                                    }
                                    else if (entCv.type === "decimal" || entCv.type === "double") {
                                        entCv.value = parseFloat(common_1.getNodeText(tempNode));
                                    }
                                    else if (entCv.type === "dateTime") {
                                        entCv.value = common_1.stringToDate(common_1.getNodeText(tempNode));
                                    }
                                    else if (entCv.type === "boolean") {
                                        entCv.value = (common_1.getNodeText(tempNode) === 'false') ? false : true;
                                    }
                                    else {
                                        entCv.value = common_1.getNodeText(tempNode);
                                    }
                                    obj[sKey] = entCv;
                                    break;
                            }
                        }
                        _this.attributes = obj;
                        break;
                    case "a:Id":
                        _this.id = common_1.getNodeText(parentNode);
                        break;
                    case "a:LogicalName":
                        _this.logicalName = common_1.getNodeText(parentNode);
                        break;
                    case "a:FormattedValues":
                        var foVal = parentNode;
                        for (var o = 0, leno = foVal.childNodes.length; o < leno; o++) {
                            var foNode = foVal.childNodes[o];
                            sKey = common_1.getNodeText(foNode.childNodes[0]);
                            _this.attributes[sKey].formattedValue = common_1.getNodeText(foNode.childNodes[1]);
                            if (isNaN(_this.attributes[sKey].value) && _this.attributes[sKey].type === "dateTime") {
                                _this.attributes[sKey].value = new Date(_this.attributes[sKey].formattedValue);
                            }
                        }
                        break;
                }
            }
        };
        this.logicalName = logicalName;
        this.id = id;
    }
    return BusinessEntity;
}());
exports.BusinessEntity = BusinessEntity;


/***/ }),

/***/ 114:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Process = void 0;
var constants_1 = __webpack_require__(431);
var globalcontext_1 = __webpack_require__(713);
var common_1 = __webpack_require__(362);
var Process = (function (_super) {
    __extends(Process, _super);
    function Process() {
        return _super.call(this) || this;
    }
    Process.prototype.callActionBase = function (requestXml, successCallback, errorCallback, asyn) {
        try {
            var req_1 = new XMLHttpRequest();
            req_1.open(constants_1.SOAP_CONSTS.HTTP_METHOD.POST, this.getClientUrl() + constants_1.SOAP_CONSTS.SOAP_ENDPOINT, asyn != false);
            req_1.setRequestHeader(constants_1.SOAP_CONSTS.ACCEPT_TYPE.text, constants_1.SOAP_CONSTS.ACCEPT_TYPE.value.XML);
            req_1.setRequestHeader(constants_1.SOAP_CONSTS.CONTENT_TYPE.text, constants_1.SOAP_CONSTS.CONTENT_TYPE.value.XML);
            req_1.setRequestHeader(constants_1.SOAP_CONSTS.SOAP_ACTION.text, constants_1.SOAP_CONSTS.SOAP_ACTION.value);
            req_1.onreadystatechange = function () {
                if (req_1.readyState == 4) {
                    if (req_1.status == 200) {
                        if (successCallback) {
                            var resultsNode = req_1.responseXML.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1];
                            var responseParams = common_1.getChildNodes(resultsNode, "a:KeyValuePairOfstringanyType");
                            var outputParams = {};
                            for (var i = 0; i < responseParams.length; i++) {
                                var attrNameNode = common_1.getChildNode(responseParams[i], "b:key");
                                var attrValueNode = common_1.getChildNode(responseParams[i], "b:value");
                                var attributeName = common_1.getNodeTextValue(attrNameNode);
                                var attributeValue = common_1.getValue(attrValueNode);
                                outputParams[attributeName] = attributeValue.value;
                            }
                            successCallback(outputParams);
                        }
                    }
                    else {
                        if (errorCallback) {
                            var message = null;
                            var traceText = null;
                            try {
                                message = common_1.getNodeTextValueNotNull(req_1.responseXML.getElementsByTagName("Message"));
                                traceText = common_1.getNodeTextValueNotNull(req_1.responseXML.getElementsByTagName("TraceText"));
                            }
                            catch (e) { }
                            if (message == null) {
                                message = "Error executing Action. Check input parameters or contact your CRM Administrator";
                            }
                            errorCallback(message, traceText);
                        }
                    }
                }
            };
            req_1.send(requestXml);
        }
        catch (e) {
        }
    };
    Process.prototype.callAction = function (actionName, inputParams, successCallback, errorCallback, asyn) {
        try {
            var ns = {
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
            };
            var requestXml = "<s:Envelope";
            for (var i in ns) {
                requestXml += " xmlns" + i + "='" + ns[i] + "'";
            }
            requestXml += ">" +
                "<s:Body>" +
                "<Execute>" +
                "<request>";
            if (inputParams != null && inputParams.length > 0) {
                requestXml += "<a:Parameters>";
                for (var i_1 = 0; i_1 < inputParams.length; i_1++) {
                    var param = inputParams[i_1];
                    var value = common_1.getXmlValue(param.key, param.type, param.value);
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
        }
    };
    Process.prototype.callWorkflow = function (workflowId, recordId, successCallback, errorCallback, asyn) {
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
            req.open(constants_1.SOAP_CONSTS.HTTP_METHOD.POST, this.getClientUrl() + constants_1.SOAP_CONSTS.SOAP_ENDPOINT, asyn != false);
            req.setRequestHeader(constants_1.SOAP_CONSTS.ACCEPT_TYPE.text, constants_1.SOAP_CONSTS.ACCEPT_TYPE.value.XML);
            req.setRequestHeader(constants_1.SOAP_CONSTS.CONTENT_TYPE.text, constants_1.SOAP_CONSTS.CONTENT_TYPE.value.XML);
            req.setRequestHeader(constants_1.SOAP_CONSTS.SOAP_ACTION.text, constants_1.SOAP_CONSTS.SOAP_ACTION.value);
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
        }
    };
    return Process;
}(globalcontext_1.GlobalContext));
exports.Process = Process;


/***/ }),

/***/ 876:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOAP = void 0;
var entityBase_1 = __webpack_require__(479);
var fetchKit_1 = __webpack_require__(182);
var objectType_1 = __webpack_require__(662);
var process_1 = __webpack_require__(114);
var SOAP = (function () {
    function SOAP() {
        var _this = this;
        this._FetchKit = new fetchKit_1.FetchKit();
        this._Process = new process_1.Process();
        this._EntityBase = new entityBase_1.EntityBase();
        this.BusinessEntity = function (logicalName, id) {
            return new objectType_1.BusinessEntity(logicalName, id);
        };
        this.fetch = function (fetchXml, async) {
            return _this._FetchKit.fetch(fetchXml, async);
        };
        this.fetchAll = function (fetchXml, async) {
            return _this._FetchKit.fetchAll(fetchXml, async);
        };
        this.fetchMore = function (fetchXml, async) {
            return _this._FetchKit.fetchMore(fetchXml, async);
        };
        this.callAction = function (actionName, inputParams, successCallBack, errorCallback, async) {
            _this._Process.callAction(actionName, inputParams, successCallBack, errorCallback, async);
        };
        this.callWorkflow = function (workflowId, recordId, successCallBack, errorCallback, async) {
            _this._Process.callWorkflow(workflowId, recordId, successCallBack, errorCallback, async);
        };
        this.retrieve = function (entityName, id, columnSet, async, internalCallback) {
            _this._EntityBase.retrieve(entityName, id, columnSet, async, internalCallback);
        };
        this.create = function (be, internalCallback) {
            _this._EntityBase.create(be, internalCallback);
        };
        this.update = function (be, internalCallback) {
            _this._EntityBase.update(be, internalCallback);
        };
        this.delete = function (entityName, id, internalCallback) {
            _this._EntityBase.delete(entityName, id, internalCallback);
        };
        this.retrieveMultiple = function (query, internalCallback) {
            _this._EntityBase.retrieveMultiple(query, internalCallback);
        };
        this.associate = function (relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, internalCallback) {
            _this._EntityBase.associate(relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, internalCallback);
        };
        this.disassociate = function (relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, internalCallback) {
            _this._EntityBase.disassociate(relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, internalCallback);
        };
    }
    SOAP.prototype.setState = function (entityName, recordId, stateCode, statusCode, async, internalCallback) {
        this._EntityBase.setState(entityName, recordId, stateCode, statusCode, async, internalCallback);
    };
    SOAP.prototype.assign = function (id, entityname, assigneeid, async) {
        return this._EntityBase.assign(id, entityname, assigneeid, async);
    };
    return SOAP;
}());
exports.SOAP = SOAP;


/***/ }),

/***/ 926:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Utilities = void 0;
var entity_1 = __webpack_require__(999);
var constants_1 = __webpack_require__(431);
var attributes_1 = __webpack_require__(234);
var globalcontext_1 = __webpack_require__(713);
var validation_1 = __webpack_require__(641);
var odata_1 = __webpack_require__(504);
var navigate_1 = __webpack_require__(977);
var messages_1 = __webpack_require__(818);
var logger_1 = __webpack_require__(218);
var controls_1 = __webpack_require__(960);
var constants_2 = __webpack_require__(431);
var helpers_1 = __webpack_require__(623);
var Utility = (function () {
    function Utility() {
        var _this = this;
        this.getQueryStringParameter = function (paramToRetrieve) {
            var _a;
            if (location.search != '') {
                var params = (_a = window.location.search) === null || _a === void 0 ? void 0 : _a.split('?')[1].split('&');
                if (Array.isArray(params)) {
                    for (var i = 0; i < params.length; i = i + 1) {
                        var singleParam = params[i].split('=');
                        if (singleParam[0] === paramToRetrieve) {
                            return decodeURIComponent(singleParam[1]);
                        }
                    }
                }
            }
            return '';
        };
        this.queryStringParameterToObject = function (paramToRetrieve) {
            var query = _this.getQueryStringParameter(paramToRetrieve);
            if (query) {
                var obj = {};
                var vals = query.split('&');
                for (var i in vals) {
                    var item = vals[i].replace(/\+/g, ' ').split('=');
                    for (var i_1 = 0; i_1 < item.length; i_1++) {
                        obj[item[i_1]] = item[i_1 + 1];
                        break;
                    }
                }
                return obj;
            }
            return {};
        };
        this.createFetchXml = function (fetchXml, pagingCookie, page, count) {
            var _a;
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
                    var innerPagingCookie = domParser.parseFromString(decodeURIComponent(decodeURIComponent((_a = cookieDoc.getElementsByTagName('cookie')[0].getAttribute('pagingcookie')) !== null && _a !== void 0 ? _a : '')), 'text/xml');
                    fetchXmlDocument.getElementsByTagName('fetch')[0].setAttribute('paging-cookie', xmlSerializer.serializeToString(innerPagingCookie));
                }
            }
            return xmlSerializer.serializeToString(fetchXmlDocument);
        };
        this.initLookup = function (entityType, id, name) { return [{ entityType: entityType, id: id, name: name }]; };
        this.guidEmpty = function () { return '00000000-0000-0000-0000-000000000000'; };
        this.removeBrackets = function (guid) { return guid.replace(/[{}]/gi, ''); };
        this.autoMappingValue = function (entityLogicalName, fetchXml, lookupName) { return __awaiter(_this, void 0, void 0, function () {
            var result, entity, keys, fields, _i, fields_1, field, attrName, attr, type, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof lookupName === 'string') {
                        }
                        if (fetchXml && !validation_1._Validation.isFetchXml(fetchXml))
                            return [2];
                        return [4, odata_1._OData.retrieveMultipleRecords(entityLogicalName, fetchXml)];
                    case 1:
                        result = _a.sent();
                        if (result && result.entities && result.entities[0]) {
                            entity = result.entities[0];
                            keys = Object.keys(entity);
                            fields = keys.filter(function (k) { return k.indexOf('@') < 0; });
                            for (_i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                                field = fields_1[_i];
                                attrName = field;
                                try {
                                    if (field.startsWith('_') && field.endsWith('_value'))
                                        attrName = field.substring(1, field.length - 6);
                                    attr = attributes_1._Attributes.getAttribute(attrName);
                                    type = attr.getAttributeType();
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
                                            attr.setValue(this.initLookup(entity[field + constants_1.Constants.ODataLookupLogicalName], entity[field], entity[field + constants_1.Constants.ODataFormattedValue]));
                                            break;
                                        case 'multiselectoptionset':
                                            options = entity[field].split(',');
                                            attr.setValue(options.map(function (op) { return parseInt(op); }));
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                catch (ex) {
                                    console.log("[Error]: " + attrName + "\n" + ex.message);
                                }
                            }
                        }
                        return [2, result];
                }
            });
        }); };
        this.calculateAge = function (dob, exactDate) {
            if (exactDate === void 0) { exactDate = true; }
            var age = 0;
            var birthDate = new Date(dob);
            if (birthDate) {
                var currentDate = new Date();
                var date = birthDate.getDate();
                var month = birthDate.getMonth();
                var year = birthDate.getFullYear();
                age = currentDate.getFullYear() - year;
                if (exactDate) {
                    if (month > currentDate.getMonth() || (month === currentDate.getMonth() && date < currentDate.getDate()))
                        age -= 1;
                }
            }
            return age;
        };
        this.getCurrentUserRoles = function () {
            return globalcontext_1._GlobalContext.userSettings.roles.get();
        };
        this.checkUserHaveRoles = function (roleNames) {
            if (!Array.isArray(roleNames))
                return false;
            var roles = _this.getCurrentUserRoles();
            return roleNames.some(function (roleName) { return roles.some(function (role) { return role.name === roleName; }); });
        };
        this.getEntityMetadata = function (entityName, attributes) {
            return constants_2.Xrm.Utility.getEntityMetadata(entityName, attributes);
        };
        this.clickRibbonButton = function (text, title) { return __awaiter(_this, void 0, void 0, function () {
            var _Entity, alertStrings, confirmStrings;
            return __generator(this, function (_a) {
                _Entity = new entity_1.Entity();
                if (_Entity.getIsDirty()) {
                    alertStrings = {};
                    alertStrings.text = messages_1.Messages.get('MS003');
                    navigate_1._Navigate.openAlertDialog(alertStrings);
                    return [2, false];
                }
                confirmStrings = {};
                confirmStrings.text = text;
                confirmStrings.title = title;
                return [2, navigate_1._Navigate.openConfirmDialog(confirmStrings)];
            });
        }); };
        this.isSameGuId = function (guid1, guid2) {
            try {
                return _this.removeBrackets(guid1).toUpperCase() === _this.removeBrackets(guid2).toUpperCase();
            }
            catch (ex) {
                logger_1.logger.Warn(ex.message);
                return false;
            }
        };
        this.showProgressIndicator = function (message) { return constants_2.Xrm.Utility.showProgressIndicator(message); };
        this.closeProgressIndicator = function () { return constants_2.Xrm.Utility.closeProgressIndicator(); };
        this.reFreshIframe = function (controlName) {
            var subgrid = controls_1._Controls.getControl(controlName);
            if (subgrid) {
                var src = subgrid.getSrc();
                subgrid.setSrc("_blank");
                subgrid.setSrc(src);
            }
        };
        this.getLookupValue = function (fieldName) {
            var value = null;
            var attr = attributes_1._Attributes.getAttribute(fieldName);
            if (attr != null) {
                value = attr.getValue();
                if (value && value.length > 0)
                    value = value[0];
                else
                    value = null;
            }
            return value;
        };
        this.setLookUp = function (id, name, entityType, attribute) {
            var object = new Array();
            object[0] = new Object();
            object[0].id = id;
            object[0].name = name;
            object[0].entityType = entityType;
            attributes_1._Attributes.getAttribute(attribute).setValue(object);
        };
        this.setOptionSetValueByText = function (fieldname, optionText) {
            var options = attributes_1._Attributes.getAttribute(fieldname).getOptions();
            for (var i = 0; i < options.length; i++) {
                if (options[i].text === optionText) {
                    attributes_1._Attributes.getAttribute(fieldname).setValue(options[i].value);
                    break;
                }
            }
        };
        this.setOptionSetFieldByText = function (field, optionText) {
            var options = field.getOptions();
            for (var i = 0; i < options.length; i++) {
                if (options[i].text === optionText) {
                    field.setValue(options[i].value);
                    break;
                }
            }
        };
        this.setValueByText = function (fieldname, value) {
            var getField = attributes_1._Attributes.getAttribute(fieldname);
            if (getField) {
                getField.setValue(value);
            }
        };
        this.removeOptionSetItem = function (fieldName, fieldValue) {
            controls_1._Controls.getControl(fieldName).removeOption(fieldValue);
        };
        this.findOption = function (list, value) {
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
        };
        this.getParameterByName = function (name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };
        this.QueryString = function (url) {
            var query_string = {};
            var query = url;
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = pair[1];
                }
                else if (typeof query_string[pair[0]] === "string") {
                    var arr = [query_string[pair[0]], pair[1]];
                    query_string[pair[0]] = arr;
                }
                else {
                    query_string[pair[0]].push(pair[1]);
                }
            }
            return query_string;
        };
        this.updateQueryString = function (uri, key, value) {
            var re = new RegExp("([?|&])" + key + "=.*?(&|#|$)", "i");
            if (uri.match(re)) {
                return uri.replace(re, '$1' + key + "=" + value + '$2');
            }
            else {
                var hash = '';
                var separator = uri.indexOf('?') !== -1 ? "&" : "?";
                if (uri.indexOf('#') !== -1) {
                    hash = uri.replace(/.*#/, '#');
                    uri = uri.replace(/#.*/, '');
                }
                return uri + separator + key + "=" + value + hash;
            }
        };
        this.openPopupLookup = function (fieldNames) {
            try {
                var navigationOptions = {
                    target: 2,
                    height: { value: 80, unit: "%" },
                    width: { value: 80, unit: "%" },
                    position: 1
                };
                fieldNames.forEach(function (fieldName) {
                    var control = controls_1._Controls.getControl(fieldName);
                    control.addOnLookupTagClick(function (e) {
                        e.getEventArgs().preventDefault();
                        var lookupRecord = e.getEventArgs().getTagValue();
                        var pageInput = {
                            pageType: "entityrecord",
                            entityName: lookupRecord.entityType,
                            entityId: lookupRecord.id,
                        };
                        navigate_1._Navigate.navigateTo(pageInput, navigationOptions);
                    });
                });
            }
            catch (e) {
                logger_1.logger.Error(e.message, 'Utilitiy.openPopupLookup');
            }
        };
        this.openNewWindowLookup = function (fieldNames) {
            try {
                fieldNames.forEach(function (fieldName) {
                    var control = controls_1._Controls.getControl(fieldName);
                    control.addOnLookupTagClick(function (e) {
                        e.getEventArgs().preventDefault();
                        var lookupRecord = e.getEventArgs().getTagValue();
                        var url = window.location.href;
                        var index = url.indexOf("etn=");
                        var uri = url.slice(0, index);
                        uri += "etn=" + lookupRecord.entityType + "&id=" + lookupRecord.id;
                        window.open(uri);
                    });
                });
            }
            catch (e) {
                logger_1.logger.Error(e.message, 'Utilitiy.openNewWindowLookup');
            }
        };
        this.sendLog = function (message, logerLevel, mod) { return __awaiter(_this, void 0, void 0, function () {
            var $, url, ipAddress, logData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $ = window.$ ? window.$ : window.parent.$;
                        url = constants_2.Xrm.Utility.getGlobalContext().getClientUrl();
                        return [4, $.getJSON('https://api.ipify.org?format=json', function () { })];
                    case 1:
                        ipAddress = _a.sent();
                        logData = {
                            name: (mod ? mod + '| ' : '') + new Date().toISOString(),
                            url: url,
                            logerLevel: logerLevel,
                            ip: ipAddress ? ipAddress.ip : '',
                            func: mod,
                            message: message,
                        };
                        if (constants_2.Xrm != null && constants_2.Xrm.Page.ui != null)
                            logData.form = constants_2.Xrm.Page.ui.formSelector.getCurrentItem().getLabel();
                        if (constants_2.Xrm != null && constants_2.Xrm.Page.data != null) {
                            logData.entity = constants_2.Xrm.Page.data.entity.getEntityName();
                            logData.entityId = constants_2.Xrm.Page.data.entity.getId();
                        }
                        helpers_1.Helpers.Send(logData);
                        return [2];
                }
            });
        }); };
    }
    Utility.prototype.removeThousandsSeparator = function (value, decimals) {
        if (decimals == undefined || isNaN(decimals))
            decimals = 0;
        if (isNaN(value)) {
            var decimal_sep = ',';
            var thousands_sep = '.';
            if (window.navigator.systemLanguage == 'en-us') {
                var decimal_sep = '.';
                var thousands_sep = ',';
            }
            var n = value.toString();
            n = eval('n.replace(/\\' + thousands_sep + '/g,"")');
            n = eval('n.replace(/\\' + decimal_sep + '/g,".")');
            return n;
        }
        return value;
    };
    return Utility;
}());
exports.Utilities = new Utility();


/***/ }),

/***/ 641:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._Validation = void 0;
var Validation = (function () {
    function Validation() {
    }
    Validation.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    Validation.prototype.isFetchXml = function (fetchXml) {
        try {
            if (typeof fetchXml !== 'string')
                return false;
            var parser = new DOMParser();
            var dom = parser.parseFromString(fetchXml, 'text/xml');
            return dom.documentElement.nodeName === 'fetch';
        }
        catch (ex) {
            console.log(ex.message);
            return false;
        }
    };
    Validation.prototype.isEmail = function (email) {
        try {
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
        }
        catch (ex) {
            console.log(ex.message);
            return false;
        }
    };
    Validation.prototype.isPhoneNumber = function (str) {
        try {
            return /^\d+$/.test(str);
        }
        catch (ex) {
            console.log(ex.message);
            return false;
        }
    };
    return Validation;
}());
exports._Validation = Validation.getInstance();


/***/ }),

/***/ 748:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Lib = void 0;
var attributes_1 = __webpack_require__(234);
var controls_1 = __webpack_require__(960);
var entity_1 = __webpack_require__(999);
var formcontext_1 = __webpack_require__(416);
var globalcontext_1 = __webpack_require__(713);
var gridcontext_1 = __webpack_require__(826);
var logger_1 = __webpack_require__(218);
var navigate_1 = __webpack_require__(977);
var odata_1 = __webpack_require__(852);
var process_1 = __webpack_require__(262);
var soap_1 = __webpack_require__(876);
var utility_1 = __webpack_require__(926);
var validation_1 = __webpack_require__(641);
var Lib = (function () {
    function Lib() {
        this.Attributes = attributes_1._Attributes;
        this.Controls = controls_1._Controls;
        this.Entity = new entity_1.Entity();
        this.FormContext = new formcontext_1.FormContext();
        this.GlobalContext = new globalcontext_1.GlobalContext();
        this.GridContext = new gridcontext_1.GridContext();
        this.Logger = logger_1.logger;
        this.Navigate = navigate_1._Navigate;
        this.OData = odata_1._OData;
        this.Process = new process_1.Process();
        this.SOAP = new soap_1.SOAP();
        this.Utility = utility_1.Utilities;
        this.Validation = validation_1._Validation;
    }
    return Lib;
}());
exports.Lib = Lib;


/***/ }),

/***/ 818:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Messages = void 0;
var Messages = (function () {
    function Messages() {
    }
    Messages.get = function (msgId) {
        var _a;
        try {
            var languageId = Xrm.Utility.getGlobalContext().userSettings.languageId;
            if (this.messages === undefined)
                Messages.messages = ANT.Caching.getData('Message-' + languageId);
            return (_a = Messages.messages[msgId]) !== null && _a !== void 0 ? _a : msgId;
        }
        catch (ex) {
            console.log(ex.message);
            return msgId;
        }
    };
    return Messages;
}());
exports.Messages = Messages;


/***/ }),

/***/ 838:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Webresource = void 0;
var Webresource = (function () {
    function Webresource() {
    }
    return Webresource;
}());
exports.Webresource = Webresource;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Messages = exports.Webresource = exports.Lib = exports.Constants = void 0;
var constants_1 = __webpack_require__(431);
var lib_1 = __webpack_require__(748);
var webresource_1 = __webpack_require__(838);
var messages_1 = __webpack_require__(818);
exports.Constants = constants_1.Constants;
exports.Lib = new lib_1.Lib();
exports.Webresource = new webresource_1.Webresource();
exports.Messages = messages_1.Messages;

})();

var __webpack_export_target__ = (ANT = typeof ANT === "undefined" ? {} : ANT);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;