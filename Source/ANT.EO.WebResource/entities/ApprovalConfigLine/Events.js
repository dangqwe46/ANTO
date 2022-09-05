/// <reference path="../../node_modules/@types/xrm/index.d.ts" />
// import * as ANT from "../../ANT.RE.Lib.Webresources/src/index";
// import * as ANT from "../../ANT.RE.Lib.Webresources/src/global";
("use strict");
var ApprovalConfigLine = ApprovalConfigLine || {};
ApprovalConfigLine.Events = ApprovalConfigLine.Events || {};

ApprovalConfigLine.Events.FormInfor = (() => {
  /* VARIABLES */
  var OPTIONS = {
    Range_Type: {
      Amount: 100000000,
      Date: 100000001,
      Quantity: 100000002,
      Custom_Query: 100000003,
    },
    Condition_Type: {
      Simple: 100000000,
      Complex: 100000001,
      None: 100000002,
    },
  };
  var RequirementLevel = {
    NONE: "none",
    RECOMMENDED: "recommended",
    REQUIRED: "required",
  };
  var ERROR_MSG = {
    MSG01: "Amount Min must not be greater than Amount Max",
    MSG02: "Date From must not be greater than Date To",
    MSG03: "Quantity Min must not be greater than Quantity Max",
    MSG04: "Please enter at least one value (Min/Max or From/To)",
  };
  /**
   * @type {Xrm.FormContext}
   */
  var formContext;
  var saveFromConfirmDialog = false;

  /* PRIVATE */
  function _private() {}
  function _showHideFields(arrFields, isShow, isClearField) {
    if (Array.isArray(arrFields)) {
      // Set Visible
      for (var i in arrFields) {
        formContext.getControl(arrFields[i]).setVisible(isShow);
      }
      if (isClearField == true && isShow == false) {
        for (var i in arrFields) {
          formContext.getAttribute(arrFields[i]).setValue(null);
        }
      }
    }
  }
  /**
   * @param {Xrm.FormContext} formContext
   */
  function _checkMinMaxValue(formContext) {
    let conditionType =
      ANT.Attributes.getAttribute("ant_conditiontype").getValue();
    let minValue, maxValue;
    let errorMsg = "";

    switch (conditionType) {
      case OPTIONS.Condition_Type.Simple:
        minValue = ANT.Attributes.getAttribute("ant_quantitymin").getValue();
        maxValue = ANT.Attributes.getAttribute("ant_quantitymax").getValue();
        if (
          minValue != undefined &&
          maxValue != undefined &&
          minValue > maxValue
        ) {
          errorMsg = ERROR_MSG.MSG03;
        }
        minValue = ANT.Attributes.getAttribute("ant_datemin").getValue();
        maxValue = ANT.Attributes.getAttribute("ant_datemax").getValue();
        if (
          minValue != undefined &&
          maxValue != undefined &&
          minValue > maxValue
        ) {
          errorMsg = ERROR_MSG.MSG02;
        }
        minValue = ANT.Attributes.getAttribute("ant_amountmin").getValue();
        maxValue = ANT.Attributes.getAttribute("ant_amountmax").getValue();
        if (
          minValue != undefined &&
          maxValue != undefined &&
          minValue > maxValue
        ) {
          errorMsg = ERROR_MSG.MSG01;
        }
        break;
      case OPTIONS.Condition_Type.Complex:
        break;
      default:
        break;
    }

    return errorMsg;
  }
  const ClearNotifications = (arrayFields) => {
    for (let i = 0; i <= arrayFields.length; i++) {
      ANT.Controls.getControl(arrayFields[i]).clearNotification();
    }
  };
  /**
   * @param {Xrm.FormContext} formContext
   */
  function _validateForm(formContext) {
    formContext.ui.clearFormNotification("FormValidation");

    let success = true;
    let errorMsg = "";
    let messages = new Array();
    try {
      ///#region At least 1 value (Min/Max) should have value, apply for Date|Quantity
      let conditionType =
        ANT.Attributes.getAttribute("ant_conditiontype").getValue();
      let fields = [];

      if (conditionType == OPTIONS.Condition_Type.Simple) {
        fields = [
          "ant_amountmin",
          "ant_amountmax",
          "ant_datemin",
          "ant_datemax",
          // "ant_quantitymin",
          // "ant_quantitymax",
        ];
        let hasValue = false;
        if (fields.length > 0) {
          for (var i in fields) {
            if (formContext.getAttribute(fields[i]).getValue() != undefined)
              hasValue = true;
          }

          if (hasValue == false) {
            success = false;
            messages.push(ERROR_MSG.MSG04);
          }
        }

        // Check Min Max value (if any)
        errorMsg = _checkMinMaxValue(formContext);
        if (errorMsg != undefined && errorMsg != "") {
          messages.push(errorMsg);
        }
      }
      ///#endregion

      ///#region Collect errors (if any) and show Form error notification
      if (messages.length > 0) {
        let errors = messages.join("\r\n");
        success = false;
        formContext.ui.setFormNotification(
          errors,
          Xrm.Constants.FormNotificationLevels.error,
          "FormValidation"
        );
      }
      ///#endregion

      return success;
    } catch (e) {
      formContext.ui.setFormNotification(
        e.messages,
        Xrm.Constants.FormNotificationLevels.error,
        "FormValidation"
      );
      return false;
    }
  }

  /**
   * @param {Xrm.FormContext} formContext
   */
  function _showHideApprovalBudgetType(formContext) {
    debugger;
    let approvalConfig = ANT.Attributes.getAttribute(
      "ant_approvalconfigid"
    ).getValue();
    /**
     * dang.vh
     * show/hide field Approval Budget Type follow Item Attribute "Using Budget" Yes/No
     */
    if (approvalConfig != undefined) {
      let options =
        "?$select=ant_name,ant_dimensionvalue&$expand=ant_dimensionvalue($select=ant_dimensionvalueid)";
      ANT.OData.retrieveRecord(
        approvalConfig[0].entityType,
        approvalConfig[0].id,
        options
      ).then(async function (data) {
        if (data.ant_dimensionvalue != undefined) {
          var ant_dimensionvalueid =
            data.ant_dimensionvalue.ant_dimensionvalueid;
          var record = await RetriveDimensionValueItemAttribute(
            "APPROVAL02-Using Budget",
            "ant_dimensionvalue",
            ant_dimensionvalueid
          );
          if (record != null) {
            let value = record.getValue("ant_value");
            if (value.toUpperCase() == "YES") {
              ANT.Controls.getControl("ant_approvalbudgettype").setVisible(
                true
              );
              ANT.Attributes.getAttribute(
                "ant_approvalbudgettype"
              ).setRequiredLevels(ANT.Constants.RequiredLevel.Required);
              //formContext.getControl("ant_approvalbudgettype").setVisible(true);
              //formContext.getAttribute("ant_approvalbudgettype").setRequiredLevel(ANT.Constants.RequiredLevel.Required);
            } else {
              ANT.Controls.getControl("ant_approvalbudgettype").setVisible(
                false
              );
              ANT.Attributes.getAttribute(
                "ant_approvalbudgettype"
              ).setRequiredLevels(ANT.Constants.RequiredLevel.None);
              //formContext.getControl("ant_approvalbudgettype").setVisible(false);
              //formContext.getAttribute("ant_approvalbudgettype").setRequiredLevel(ANT.Constants.RequiredLevel.None);
            }
          }
        }
      });
    }
  }
  var findNameFieldInForm = function (field) {
    var nameField = null;
    var headerField = "header_" + field;
    var footerField = "footer_" + field;
    var processField = "header_process_" + field;
    if (formContext.getControl(field) != null) {
      nameField = field;
    } else {
      if (formContext.getControl(headerField) != null) {
        nameField = headerField;
      } else {
        if (formContext.getControl(footerField) != null) {
          nameField = footerField;
        } else {
          if (formContext.getControl(processField) != null) {
            nameField = processField;
          }
        }
      }
    }
    return nameField;
  };
  var setNotification = function (field, message) {
    var key = findNameFieldInForm(field);
    if (key != null) {
      formContext.getControl(field).setNotification(message);
    }
  };
  var clearNotification = function (field) {
    var key = findNameFieldInForm(field);
    if (key != null) {
      formContext.getControl(field).clearNotification();
    }
  };
  var RetriveDimensionValueItemAttribute = async function (
    itemAttributeName,
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
                      <attribute name='ant_name' />
                      <attribute name='ant_applyfor' />
                      <filter>
                          <condition attribute='statecode' operator='eq' value='0' />
                          <condition attribute="ant_name" operator="eq" value="${itemAttributeName}" />
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
  /* PUBLIC */

  /**
   * @param {Xrm.Events.EventContext} executionContext
   */
  function onChange_ConditionType(executionContext, isFormLoad) {
    debugger;
    var formType = ANT.FormContext.getFormType();
    // Default: isFormLoad = false
    // Base on Condition Type => Show/Hide fields and clear values (if isFormLoad == false)
    // Set date follow Approval Configuration.Condition Type
    let approvalConfig = ANT.Attributes.getAttribute(
      "ant_approvalconfigid"
    ).getValue();
    let clearField = isFormLoad == true ? false : true;
    var showFields = [];
    var hideFields = [
      "ant_amountmin",
      "ant_amountmax",
      "ant_datemin",
      "ant_datemax",
      // "ant_quantitymin",
      // "ant_quantitymax",
      "ant_advancedcondition",
    ];
    formContext = formContext || executionContext.getFormContext();
    var conditionType = formContext
      .getAttribute("ant_conditiontype")
      .getValue();
    switch (conditionType) {
      case OPTIONS.Condition_Type.Simple:
        showFields = [
          "ant_amountmin",
          "ant_amountmax",
          "ant_datemin",
          "ant_datemax",
          // "ant_quantitymin",
          // "ant_quantitymax",
        ];
        hideFields = ["ant_advancedcondition"];
        if (approvalConfig != undefined) {
          let options = "?$select=ant_startdate,ant_enddate";
          ANT.OData.retrieveRecord(
            approvalConfig[0].entityType,
            approvalConfig[0].id,
            options
          ).then((data) => {
            debugger;
            if (
              !isFormLoad &&
              data.ant_startdate != undefined &&
              data.ant_startdate != null
            ) {
              let ant_datemin = new Date(data.ant_startdate);
              ANT.Attributes.getAttribute("ant_datemin").setValue(ant_datemin);
            }
            if (
              !isFormLoad &&
              data.ant_enddate != undefined &&
              data.ant_enddate != null
            ) {
              let ant_datemax = new Date(data.ant_enddate);
              ANT.Attributes.getAttribute("ant_datemax").setValue(ant_datemax);
            }
          });
        }
        break;
      case OPTIONS.Condition_Type.Complex:
        showFields = ["ant_advancedcondition"];
        hideFields = [
          "ant_amountmin",
          "ant_amountmax",
          "ant_datemin",
          "ant_datemax",
          // "ant_quantitymin",
          // "ant_quantitymax",
        ];
        ClearNotifications(hideFields);
        break;
      case OPTIONS.Condition_Type.None:
        hideFields = [
          "ant_amountmin",
          "ant_amountmax",
          "ant_datemin",
          "ant_datemax",
          // "ant_quantitymin",
          // "ant_quantitymax",
          "ant_advancedcondition",
        ];
        ClearNotifications(hideFields);
        break;
      default:
        break;
    }

    // Additional: Require advance condition if Condition Type = Complex
    if (conditionType == OPTIONS.Condition_Type.Complex) {
      formContext
        .getAttribute("ant_advancedcondition")
        .setRequiredLevel(RequirementLevel.REQUIRED);
    } else {
      formContext
        .getAttribute("ant_advancedcondition")
        .setRequiredLevel(RequirementLevel.NONE);
    }

    _showHideFields(showFields, true, false); // If show field => no need to clear field
    _showHideFields(hideFields, false, clearField);
  }
  /**
   * @param {Xrm.Events.EventContext} executionContext
   */
  function OnLoad(executionContext) {
    debugger;
    console.log("Form Event - On Load");
    formContext = formContext || executionContext.getFormContext();
    _showHideApprovalBudgetType(formContext);
    onChange_ConditionType(executionContext, true);

    let formType = formContext.ui.getFormType();
    if (formType == 1 || formType == 5) {
      //Create | Quick Create
    }
  }

  /**
   * @param {Xrm.Events.EventContext} executionContext
   */
  async function OnSave(executionContext) {
    debugger;
    console.log("Form Event - On Save");
    formContext = formContext || executionContext.getFormContext();
    var formType = formContext.ui.getFormType();

    let isValid = _validateForm(formContext);
    if (isValid == false) {
      executionContext.getEventArgs().preventDefault();
    }
    var conditionType =
      ANT.Attributes.getAttribute("ant_conditiontype").getValue();
    var statuscode = ANT.Attributes.getAttribute("statuscode").getValue();
    var config = ANT.Attributes.getAttribute("ant_approvalconfigid").getValue();
    var configId = config != null ? config[0].id : null;
    var getSaveMod = executionContext.getEventArgs().getSaveMode();
    if (
      (formType == 1 ||
        formType == 5 ||
        (formType == 2 &&
          statuscode == 100000001 &&
          getSaveMod != 5 &&
          getSaveMod != 6)) &&
      conditionType == OPTIONS.Condition_Type.None
    ) {
      let checkRecord = await confirmSaveConditionTypeNone(configId);
      if (checkRecord != null) {
        if (!saveFromConfirmDialog) {
          executionContext.getEventArgs().preventDefault();
          var confirmString = {
            text: `System's only allowed to exist 1 published Line with the Condition Type is "None" in 1 Configuration. System found the Line name "${checkRecord.attributes.ant_code.value}" in the current Configuration. Do you still want to save?`,
            title: "Save Configuration Line",
            cancelButtonLabel: "Cancel",
            confirmButtonLabel: "Confirm",
          };
          var confirmOptions = { height: 200, width: 500 };
          ANT.Navigate.openConfirmDialog(
            confirmString,
            confirmOptions,
            ConfirmCallback,
            CancelCallback(executionContext)
          );
        }
        saveFromConfirmDialog = false;
      }
    }
  }
  function ConfirmCallback() {
    saveFromConfirmDialog = true;
    ANT.FormContext.save();
  }
  function CancelCallback(executionContext) {
    saveFromConfirmDialog = false;
    //executionContext.getEventArgs().preventDefault();
  }
  async function confirmSaveConditionTypeNone(configId) {
    debugger;
    var fetchXml = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
                <entity name="ant_approvalconfigline">
                  <attribute name="statuscode" />
                  <attribute name="ant_code" />
                  <attribute name="ant_approvalconfiglineid" />
                  <attribute name="ant_conditiontype" />
                  <attribute name="ant_approvalconfigid" />
                  <filter>
                  <condition attribute="ant_conditiontype" operator="eq" value="${OPTIONS.Condition_Type.None}" />
                  <condition attribute="statuscode" operator="eq" value="100000002"/>
                  <condition attribute="ant_approvalconfigid" operator="eq" value="${configId}"/>
                  </filter>
                </entity>
              </fetch>`;
    let req = await ANT.Lib.SOAP.fetch(fetchXml);
    if (req.length > 0) {
      return req[0];
    } else return null;
  }
  /* RETURN */
  return {
    OnLoad: OnLoad,
    OnSave: OnSave,

    onChange_ConditionType: onChange_ConditionType,
  };
})();
