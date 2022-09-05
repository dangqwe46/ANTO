/// <reference path="../../lib/ant_lib.js" />
/// <reference path="../../node_modules/@types/xrm/index.d.ts" />

// import * as ANT from "../../ANT.RE.Lib.Webresources/src/index";
// import * as ANT from "../../ANT.RE.Lib.Webresources/src/global";

// const { ANT } = require("../../lib/ant_lib");
if (typeof ApprovalRequest == "undefined") {
  ApprovalRequest = {};
}
if (typeof ApprovalRequest.Events == "undefined") {
  ApprovalRequest.Events = {};
}
if (typeof ApprovalRequest.Events.FormInfor == "undefined") {
  ApprovalRequest.Events.FormInfor = {};
}

(function () {
  /*------------------ Begin: Variables -------------------------*/
  /**
   * @type {Xrm.FormContext}
   */
  var formContext;
  /*------------------ Begin: Privates Variables -------------------------*/
  var FORMTYPE = {
    UNDEFINED: 0,
    CREATE: 1,
    UPDATE: 2,
    READONLY: 3,
    DISABLED: 4,
    BULKEDIT: 6,
  };
  var REQUIREDLEVEL = {
    REQUIRED: "required",
    NONE: "none",
    RECOMMENDED: "recommended",
  };
  var OPTIONS = {
    Approval_Request: {
      Active: { Draft: 100000000, Processing: 100000001 },
      InActive: {
        Approved: 100000002,
        Rejected: 100000003,
        Canceled: 100000004,
      },
    },
  };
  var SOAP_TYPE = {
    Bool: "c:boolean",
    Float: "c:double",
    Decimal: "c:decimal",
    Int: "c:int",
    String: "c:string",
    DateTime: "c:dateTime",
    Guid: "c:guid",
    EntityReference: "a:EntityReference",
    OptionSet: "a:OptionSetValue",
    Money: "a:Money",
    Entity: "a:Entity",
    EntityCollection: "a:EntityCollection",
  };
  // Codes that require project data
  var Dimensions_Project = ["05.03", "10."];
  // Codes thay require Budget Data
  var Dimensions_Budget = ["05.01", "05.02"];
  /*------------------ End: Privates Variables -------------------------*/
  /*------------------ Begin: Public Variables -------------------------*/
  this.publicVariable = {
    FORMTYPE: FORMTYPE,
    REQUIREDLEVEL: REQUIREDLEVEL,
  };
  /*------------------ End: Public Variables -------------------------*/
  /*------------------ End: Variables ----------------------------*/
  /*------------------ Begin: Methods --------------------*/
  /*------------------ Begin: Private Methods --------------------*/
  var getUserId = function (formContext) {
    var userId = formContext.context.getUserId();
    return userId;
  };
    function setDefaultBusinessUnitUser(formContext, userId) {
        if (userId == undefined) {
            userId = getUserId(formContext);
        }
    
    ANT.Lib.SOAP.retrieve(
      "systemuser",
      userId,
      ["businessunitid"],
      function nothing(result) {},
      function success(data) {
        if (data.attributes.businessunitid != undefined) {
          var lookupValue = [];
          lookupValue[0] = {};
          lookupValue[0].id = data.attributes.businessunitid.id; // GUID of the lookup id
          lookupValue[0].name = data.attributes.businessunitid.name; // Name of the lookup
          lookupValue[0].entityType =
            data.attributes.businessunitid.logicalName; //Entity Type of the lookup entity
            formContext.getAttribute("ant_businessunitid").setValue(lookupValue);

            ANT.Attributes.getAttribute("ant_businessunitid").setSubmitMode(ANT.Constants.SubmitMode.Always);
        }
      }
    );
  }
  var getFormType = function (formContext) {
    var formType = formContext.ui.getFormType();
    return formType;
  };
  var checkAttributeInForm = function (field) {
    var attribute = formContext.getAttribute(field);
    if (attribute != null) {
      return true;
    }
    return false;
  };
  var converStringToNumber = function (str) {
    var value = Number(str);
    return value;
  };
  /*var checkDimensionValue = function (approvalRequestTypeId) {
        if (approvalRequestTypeId == undefined) {
            formContext.getAttribute("ant_projectid").setRequiredLevel(REQUIREDLEVEL.NONE);
            formContext.getAttribute("ant_amount").setRequiredLevel(REQUIREDLEVEL.NONE);
        }
        let dimensionCodes = new Array();
        dimensionCodes.push(Dimensions_Project);
        dimensionCodes.push(Dimensions_Budget);

        // Retrieve record (Dimension Value)
        let rec = ANT.OData.retrieveRecord("ant_dimensionvalue", approvalRequestTypeId, "?$select=ant_code",
            function (record) {
                //console.log(arguments);
                let isRequired = false;
                if (record.ant_code != undefined) {
                    // 1. Check by Project
                    for (var i in Dimensions_Project) {
                        if (record.ant_code.startsWith(Dimensions_Project[i])) {
                            isRequired = true;
                            break;
                        }
                    }
                    formContext.getAttribute("ant_projectid").setRequiredLevel((isRequired == true) ? REQUIREDLEVEL.REQUIRED : REQUIREDLEVEL.NONE);
                    // 2. Check by Budget
                    isRequired = false;
                    for (var i in Dimensions_Budget) {
                        if (record.ant_code.startsWith(Dimensions_Budget[i])) {
                            isRequired = true;
                            break;
                        }
                    }
                    formContext.getAttribute("ant_amount").setRequiredLevel((isRequired == true) ? REQUIREDLEVEL.REQUIRED : REQUIREDLEVEL.NONE);


                }
            },
            function () {
                console.log("error");
                console.log(arguments);
            });
        console.log(rec);

    }*/
  /*var checkApprovalRequestType = function (formContext) {
        var attribute = checkAttributeInForm("ant_dimensionvalueid");
        var attributeKey = checkAttributeInForm("ant_projectid");
        if (attribute && attributeKey) {
            let approvalRequestType = formContext.getAttribute("ant_dimensionvalueid").getValue();
            if (approvalRequestType != null) {
                //check selected Request Type to set require
                checkDimensionValue(approvalRequestType[0].id);

                //if (DAUTUDUAN.indexOf(approvalRequestType[0].name) != -1 || converStringToNumber(approvalRequestType[0].name.slice(0, 2)) == 10) {
                //    formContext.getAttribute("ant_projectid").setRequiredLevel(REQUIREDLEVEL.REQUIRED);
                //} else {
                //    formContext.getAttribute("ant_projectid").setRequiredLevel(REQUIREDLEVEL.NONE);
                //}
            }
        }
    };*/
  var RetriveDimensionValueItemAttribute = async function (
    itemAttributeCode,
    sourceEntity,
    approvalTypeId
  ) {
    var fetchXml = `<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                      <entity name="ant_itemattributevalue">
                          <all-attributes />
                          <filter>
                              <condition attribute='statecode' operator='eq' value='0' />
                              <condition attribute="ant_sourceentityname" operator="eq" value="${sourceEntity}" />
                              <condition attribute="ant_sourceid" operator="eq" value="${approvalTypeId}"/>  
                          </filter>
                      <link-entity name="ant_itemattribute" from="ant_itemattributeid" to="ant_itemattribute">
                          <attribute name='ant_code' />
                          <attribute name='ant_applyfor' />
                          <filter>
                              <condition attribute='statecode' operator='eq' value='0' />
                              <condition attribute="ant_name" operator="eq" value="${itemAttributeCode}" />
                              <condition attribute="ant_applyfor" operator="eq" value="${sourceEntity}" />
                          </filter>
                      </link-entity>
                      </entity>
                      </fetch>`;
    let req = await ANT.Lib.SOAP.fetch(fetchXml);
    if (req.length >= 1) {
      return req[0];
    } else return null;
  };
  var requiredAmount = async function () {
    let ant_approval_request_type = ANT.Attributes.getAttribute(
      "ant_dimensionvalueid"
    ).getValue();
    if (ant_approval_request_type != null) {
      let itemAttributeValue = await RetriveDimensionValueItemAttribute(
        "APPROVAL01",
        "ant_dimensionvalue",
        ant_approval_request_type[0].id.replace("{", "").replace("}", "")
      );
      if (itemAttributeValue != null) {
        let value = itemAttributeValue.getValue("ant_value");
        if (value.toUpperCase() == "YES") {
          ANT.Attributes.getAttribute("ant_amount").setRequiredLevel(
            REQUIREDLEVEL.REQUIRED
          );
        } else {
          ANT.Attributes.getAttribute("ant_amount").setRequiredLevel(
            REQUIREDLEVEL.NONE
          );
        }
      }
    } else {
      ANT.Attributes.getAttribute("ant_amount").setRequiredLevel(
        REQUIREDLEVEL.NONE
      );
    }
  };
  function setStateRecord(entity, recordId, statecode, statuscode) {
    debugger;
    ANT.OData.setStateReocord(
      entity,
      recordId,
      statecode,
      statuscode,
      function (success) {
        ANT.Controls.setDisabledAll();
        ANT.FormContext.refreshData(true);
      },
      function (error) {}
    );
  }
  var checkReadOnlyForm = function (formContext) {
    var attribute = checkAttributeInForm("statuscode");
    if (attribute) {
      var requestStatus = formContext.getAttribute("statuscode").getValue();
      if (
        requestStatus == OPTIONS.Approval_Request.Active.Processing ||
        requestStatus == OPTIONS.Approval_Request.InActive.Approved
      ) {
        var controls = formContext.ui.controls;
        controls.forEach(function (element) {
          if (
            element.getControlType() == "subgrid" ||
            element.getControlType() == "webresource"
          ) {
          } else {
            element.setDisabled(true);
          }
        });
      }
    }
  };
  /**
   * Set require Approval Budget if Amount has value
   */
  var checkRequireBudget = function () {
    let amount = ANT.Attributes.getAttribute("ant_amount").getValue();
    if (amount != undefined && amount > 0) {
      ANT.Attributes.getAttribute("ant_approvalbudget").setRequiredLevel(
        ANT.Constants.RequiredLevel.Required
      );
    } else {
      ANT.Attributes.getAttribute("ant_approvalbudget").setRequiredLevel(
        ANT.Constants.RequiredLevel.None
      );
    }
  };
    var setDefaultRequestor = function () {
        //if (ANT.Attributes.getAttribute("ant_requestor").getValue() == undefined) {
            let lookupValue = [];
            lookupValue[0] = {};
            lookupValue[0].id = ANT.GlobalContext.globalContext.getUserId(); // GUID of the lookup id
            lookupValue[0].name = ANT.GlobalContext.globalContext.getUserName(); // Name of the lookup
            lookupValue[0].entityType = "systemuser";
            formContext.getAttribute("ant_requestor").setValue(lookupValue);

            ANT.Attributes.getAttribute("ant_requestor").setSubmitMode(ANT.Constants.SubmitMode.Always);
        //}
    }
  /*------------------ End: Private Methods --------------------*/
  /*------------------ Begin: Public Methods --------------------*/
  this.onLoad = function (executionContext) {
    debugger;
    formContext = executionContext.getFormContext();
    var formType = getFormType(formContext);
    if (formType == FORMTYPE.CREATE) {
        setDefaultBusinessUnitUser(formContext);
        setDefaultRequestor();
    } else {
      //checkRequireBudget();
        this.CreateForOther_OnChange(true);
      requiredAmount();
    }
    //checkApprovalRequestType(formContext);
    checkReadOnlyForm(formContext);
    // let section = ANT.Controls.getSection("section_approvalhistory");
    // let requestStatus =
    //   ANT.Attributes.getAttribute("statuscode").getValue();
    // // If Request Status = Draft or NULL => hide Approval history section
    // if (requestStatus == undefined || requestStatus == OPTIONS.Approval_Request.Active.Draft) {
    //   section.setVisible(false);
    // } else {
    //   section.setVisible(true);
    // }
    ApprovalRequest.formContext = formContext;
  };
  parent.getContext = function () {
    return ApprovalRequest.formContext;
  };
  this.onSave = function (executionContext) {
    formContext = executionContext.getFormContext();
    var formType = getFormType(formContext);
    if (formType == FORMTYPE.CREATE) {
      ANT.Attributes.getAttribute("ant_notificationtrigger").setValue(0);
    }
    checkReadOnlyForm(formContext);
  };
  this.ApprovalRequestTypeOnChange = function (executionContext) {
    debugger;
    formContext = executionContext.getFormContext();
    //checkApprovalRequestType(formContext);
    requiredAmount();
  };

  this.BusinessUnit_OnChange = function (executionContext) {};
  this.getExtraParams = function () {
    let amount = ANT.Attributes.getAttribute("ant_amount").getValue();
    let date = ANT.Attributes.getAttribute("ant_effectivedate").getValue();
    let requestedby = ANT.GlobalContext.globalContext.getUserId();
    let requestedon = new Date();

    // Sample Data: { "AmountValue": amount, "NumberValue": amount, "DateValue": date }
    //let obj = { "AmountValue": amount, "DateValue": "/Date(" + date.toJSON() + ")/"};
    let obj = {
      AmountValue: amount,
      DateValue: date,
      RequestedBy: requestedby,
      RequestedOn: requestedon,
    };
    return JSON.stringify(obj);
  };

  this.CancelSuccessCallback = function () {
    debugger;
    let outputs = arguments.length > 0 ? arguments[0].ErrorMessage : null;
    let entity = ANT.Entity.getEntityName();
    let recordId = ANT.Entity.getId();
    if (outputs == undefined) {
      var alertStrings = {
        confirmButtonLabel: "OK",
        text: "Cancel request successfully",
        title: "Information",
      };
      var alertOptions = { height: 120, width: 260 };
      Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
        function (success) {
          formContext.ui.refreshRibbon(false);
          ANT.FormContext.refreshData(false);
        },
        function (error) {
          console.error(error.message);
        }
      );
    }
  };
  this.CancelFailedCallback = function (result) {
    debugger;
    console.log("error");
    let dialogOptions = { message: result.message };
    Xrm.Navigation.openErrorDialog(dialogOptions).then(
      function () {},
      function (error) {
        console.error(error.message);
      }
    );
  };
  this.approvalSuccessCallback = function () {
    debugger;
    let outputs = arguments.length > 0 ? arguments[0].ErrorMessage : null;
    let entity = ANT.Entity.getEntityName();
    let recordId = ANT.Entity.getId();
    if (outputs == undefined) {
      // No handled error
      var alertStrings = {
        confirmButtonLabel: "OK",
        text: "Approval has been sent successfully",
        title: "Information",
      };
      var alertOptions = { height: 120, width: 260 };
      Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
        function (success) {
          // update approval request status  => Processing
          /*ANT.Attributes.getAttribute("ant_requeststatus").setValue(
            OPTIONS.Approval_Request.Processing
          );*/
          setStateRecord(
            entity,
            recordId,
            0,
            OPTIONS.Approval_Request.Active.Processing
          );
          ANT.Attributes.getAttribute("ant_requestdate").setValue(new Date());
          ANT.Attributes.getAttribute("ant_lastnotified").setValue(new Date());
          formContext.data.save().then(
            function () {
              // Success => Refresh command bar
              formContext.ui.refreshRibbon(false);
            },
            function () {
              // Failed
            }
          );
        },
        function (error) {
          console.error(error.message);
        }
      );
    } else {
      let dialogOptions = { messsage: outputs };
      Xrm.Navigation.openErrorDialog(dialogOptions).then(
        function (success) {},
        function (error) {
          console.error(error.message);
        }
      );
    }
    console.log("oke");
  };
  this.approvalFailedCallback = function (result) {
    debugger;
    console.log("error");
    let dialogOptions = { message: result.message };
    Xrm.Navigation.openErrorDialog(dialogOptions).then(
      function () {},
      function (error) {
        console.error(error.message);
      }
    );
    // TODO: Show error message
    //var alertStrings = { confirmButtonLabel: "OK", text: "Approval has been sent successfully", title: "Information" };
    //var alertOptions = { height: 120, width: 260 };
    //Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
    //    function () {
    //    },
    //    function (error) { console.error(error.message); }
    //);
  };
  this.AmountOnChange = function (executionContext) {
    console.log("OnChange");
    //checkRequireBudget();
  };
  this.CreateForOther_OnChange = function (isFormLoad) {
      let createForOther = ANT.Attributes.getAttribute("ant_createforother").getValue();
      let ctl = ANT.Controls.getControl("ant_requestor");
      if (ctl != undefined) {
          if (createForOther == true) {
              if (isFormLoad != true) {
                  ANT.Attributes.getAttribute("ant_requestor").setValue(null);
                  ANT.Attributes.getAttribute("ant_businessunitid").setValue(null);
              }
              ANT.Attributes.getAttribute("ant_requestor").setRequiredLevel(ANT.Constants.RequiredLevel.Required);
              ctl.setDisabled(false);
          }
          else {
              if (isFormLoad != true) {
                  setDefaultRequestor();
                  setDefaultBusinessUnitUser(formContext);
              }
              ANT.Attributes.getAttribute("ant_requestor").setRequiredLevel(ANT.Constants.RequiredLevel.None);
              ctl.setDisabled(true);
          }
      }
    };
    this.Requestor_OnChange = function () {
        let user = ANT.Attributes.getAttribute("ant_requestor").getValue();
        if (user != undefined) {
            let userId = user[0].id;
            setDefaultBusinessUnitUser(formContext, userId);
        }
        
    }
  this.enableSubmitFunction = function () {
    var FormType = formContext.ui.getFormType();
    if (FormType == 1) return false;

    var RequestStatus = formContext.getAttribute("statuscode");
    if (RequestStatus == null) return false;

    if (
      RequestStatus.getValue() != OPTIONS.Approval_Request.Active.Draft &&
      RequestStatus.getValue() != OPTIONS.Approval_Request.InActive.Rejected
    )
      return false;

    return true;
  };
  /*------------------ End: Public Methods --------------------*/
  /*------------------ End: Methods --------------------*/
}.call(ApprovalRequest.Events.FormInfor));
