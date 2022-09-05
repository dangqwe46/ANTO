export namespace Constants {
    export const ODataFormattedValue = '@OData.Community.Display.V1.FormattedValue';
    export const ODataLookupLogicalName = '@Microsoft.Dynamics.CRM.lookuplogicalname';
    export const ODataAssociatedNavigationProperty = '@Microsoft.Dynamics.CRM.associatednavigationproperty';

    export enum BoundParameter {
        CRUD = 'undefined',
        Global = 'null',
        Entity = 'entity',
    }

    export enum OperationType {
        Action,
        Function,
        CRUD,
    }
    export enum StructuralProperty {
        Unknown,
        PrimitiveType,
        ComplexType,
        EnumerationType,
        Collection,
        EntityType,
    }

    export enum RequiredLevel {
        None = 'none',
        Required = 'required',
        Recommended = 'recommended',
    }
    export enum SubmitMode {
        Always = 'always',
        Never = 'never',
        Dirty = 'dirty',
    }
    export enum TabDisplayState {
        Expanded = 'expanded',
        Collapsed = 'collapsed',
    }
    export enum NotificationLevel {
        ERROR = 'RECOMMENDATION',
        RECOMMENDATION = 'ERROR',
    }

    export enum FormType {
        Undefined,
        Create,
        Update,
        ReadOnly,
        Disabled,
        BulkEdit,
    }

    export enum LogerLevel {
        Warning = 100000000,
        Error = 100000001,
        Critical = 100000002,
    }

    export enum LogLevel {
        None = 0,
        Critical = 1 << 0,
        Error = 1 << 1,
        Warning = 1 << 2,
        Information = 1 << 3,
        Debug = 1 << 4,
        Trace = 1 << 5
    }

    export const Logger = {
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

    export enum TimerControlStateEnum {
        NotSet = 1,
        InProgress = 2,
        Warning = 3,
        Violated = 4,
        Success = 5,
        Expired = 6,
        Canceled = 7,
        Paused = 8,
    }


    export const EmptyGuid = '00000000-0000-0000-0000-000000000000';

    export type Option = { text: string; value: number };

    export enum LangCode {
        English = 1033,
        Vietnam = 1066
    }
}

export enum FormType {
    Undefined,
    Create,
    Update,
    ReadOnly,
    Disabled,
    BulkEdit = 6,
}

export const SaveOption = {
    // This is the equivalent of using the Save and Close command.
    SaveAndClose: 'saveandclose',
    //This is the equivalent of the using the Save and New command.
    SaveAndNew: 'saveandnew',
};

export const SOAP_CONSTS = {
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

export enum SOAP_TYPE {
    Bool = 'c:boolean',
    Float = 'c:double',
    Decimal = 'c:decimal',
    Int = 'c:int',
    String = 'c:string',
    DateTime = 'c:dateTime',
    Guid = 'c:guid',
    EntityReference = 'a:EntityReference',
    OptionSet = 'a:OptionSetValue',
    Money = 'a:Money',
    Entity = 'a:Entity',
    EntityCollection = 'a:EntityCollection',
}

export const $ = (window as any).$ ? (window as any).$ : (window as any).parent.$;

export const Xrm = (window.parent as any)['Xrm'];
