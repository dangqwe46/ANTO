/// <reference path="../../node_modules/@types/xrm/index.d.ts" />
"use strict";
var ApprovalLevelConfig = ApprovalLevelConfig || {};
ApprovalLevelConfig.Events = ApprovalLevelConfig.Events || {};

ApprovalLevelConfig.Events.FormInfor = (() => {
  /* VARIABLES */
  var OPTIONS = {
    Approval_Type: {
      Users: 118950000,
      Team: 118950001,
      Manager: 100000000,
      Security_Matrix: 100000001,
      Position: 100000002,
    },
  };
  var RequirementLevel = {
    NONE: "none",
    RECOMMENDED: "recommended",
    REQUIRED: "required",
  };
  var ERROR_MSG = {
    MSG01: "Email is invalid. Please check data again",
    MSG02:
      "Auto Bypass cannot be applied for Final Approver. Please check data again",
  };

  /**
   * @type {Xrm.FormContext}
   */
  var formContext;
  var saveFromConfirmDialog = false;

  /* PRIVATE */
  function _private() {}
  function _isValidEmail(value) {
    if (value == undefined) {
      return true;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      return true;
    }
    return false;
  }
  /**
   * Check if current level is final approver
   * @returns true or false
   * */
  async function _isFinalApprover() {
    let lineId = ANT.Attributes.getAttribute(
      "ant_approvalconfiglineid"
    ).getValue();
    let currLevel = ANT.Attributes.getAttribute("ant_place").getValue();
    if (lineId == undefined) {
      return false;
    }
    let fetchXml = `<fetch aggregate='true'>
              <entity name='ant_approvallevelconfiguration'>
                <attribute name='ant_place' alias='level_max' aggregate='max' />
                <filter>
                  <condition attribute='ant_approvalconfiglineid' operator='eq' value='${lineId[0].id}' />
                </filter>
              </entity>
            </fetch>`;
    //let rec = ANT.SOAP._EntityBase.retrieve(parentLine[0].entityType, parentLine[0].id, ["ant_amount"], false);
    let req = await ANT.Lib.SOAP.fetch(fetchXml);
    if (req.length > 0 && req[0].getValue("level_max") == currLevel) {
      return true;
    }
    console.log(req);
    return false;
  }
  /**
   * @param {Xrm.Events.EventContext} executionContext
   */
  async function _validateForm(executionContext) {
    //formContext.ui.clearFormNotification("FormValidation");
    ANT.FormContext.clearFormNotification("FormValidation");

    let success = true;
    let errorMsg = "";
    let messages = new Array();
    try {
      //let email = formContext.getAttribute("ant_email").getValue();
      //if (_isValidEmail(email) == false) {
      //    messages.push(ERROR_MSG.MSG01);
      //}

      ///#region Check Auto ByPass if the current level is final approver
      let autopass =
        ANT.Attributes.getAttribute("ant_approvalbypass").getValue();
      if (autopass == true) {
        let result = await _isFinalApprover();
        if (result) {
          messages.push(ERROR_MSG.MSG02);
        }

        //_isFinalApprover().then(function (r) {
        //    if (r == false) {
        //        messages.push(ERROR_MSG.MSG02);
        //    }
        //});
      }
      ///#endregion

      ///#region Collect errors (if any) and show Form error notification
      if (messages.length > 0) {
        let errors = messages.join("\r\n");
        success = false;
        ANT.FormContext.setFormNotification(
          errors,
          Xrm.Constants.FormNotificationLevels.error,
          "FormValidation"
        );
      }
      ///#endregion

      //if (success == false) {
      //    executionContext.getEventArgs().preventDefault();
      //}
      return success;
    } catch (e) {
      ANT.FormContext.setFormNotification(
        e.messages,
        Xrm.Constants.FormNotificationLevels.error,
        "FormValidation"
      );
      return false;
    }
  }

  /* PUBLIC */
  /**
   * @param {Xrm.Events.EventContext} executionContext
   */
  function onChange_ApprovalType(executionContext, isFormLoad) {
    //ant_approvaltype, ant_team
    formContext = formContext || executionContext.getFormContext();
    let approvalType = formContext.getAttribute("ant_approvaltype").getValue();
    if (approvalType == OPTIONS.Approval_Type.Team) {
      formContext
        .getAttribute("ant_team")
        .setRequiredLevel(RequirementLevel.REQUIRED);
      formContext.getControl("ant_team").setVisible(true);
    } else {
      formContext
        .getAttribute("ant_team")
        .setRequiredLevel(RequirementLevel.NONE);
      formContext.getControl("ant_team").setVisible(false);
      if (isFormLoad != true) {
        // Clear field value if not form load
        formContext.getAttribute("ant_team").setValue(null);
      }
    }

    // Show/Hide approver subgrid
    let section = ANT.Controls.getSection("section_approvers", "tab_general");
    if (section != undefined) {
      if (
        approvalType == OPTIONS.Approval_Type.Users ||
        approvalType == OPTIONS.Approval_Type.Team
      ) {
        section.setVisible(true);
      } else {
        section.setVisible(false);
      }
    }

    // Show/Hide Security matrix lookup
    // ant_securitymatrix
    if (approvalType == OPTIONS.Approval_Type.Security_Matrix) {
      ANT.Controls.getControl("ant_securitymatrix").setVisible(true);
      ANT.Attributes.getAttribute("ant_securitymatrix").setRequiredLevel(
        RequirementLevel.REQUIRED
      );
    } else {
      ANT.Controls.getControl("ant_securitymatrix").setVisible(false);
      ANT.Attributes.getAttribute("ant_securitymatrix").setRequiredLevel(
        RequirementLevel.NONE
      );
      if (isFormLoad != true) {
        ANT.Attributes.getAttribute("ant_securitymatrix").setValue(null);
      }
    }

    // Show/Hide Position lookup
    if (approvalType == OPTIONS.Approval_Type.Position) {
      ANT.Controls.getControl("ant_position").setVisible(true);
      ANT.Attributes.getAttribute("ant_position").setRequiredLevel(
        RequirementLevel.REQUIRED
      );
    } else {
      ANT.Controls.getControl("ant_position").setVisible(false);
      ANT.Attributes.getAttribute("ant_position").setRequiredLevel(
        RequirementLevel.NONE
      );
      if (isFormLoad != true) {
        ANT.Attributes.getAttribute("ant_position").setValue(null);
      }
    }
  }
  /**
   * @param {Xrm.Events.EventContext} executionContext
   */
  function OnLoad(executionContext) {
    console.log("Form Event - On Load");
    formContext = formContext || executionContext.getFormContext();
    onChange_ApprovalType(executionContext, true);

    let formType = formContext.ui.getFormType();
    if (formType == 1 || formType == 5) {
      //Create | Quick Create
    }
  }

  /**
   * @param {Xrm.Events.EventContext} executionContext
   */
  async function OnSave(executionContext) {
    /* console.log("Form Event - On Save");
        formContext = formContext || executionContext.getFormContext();

        //_validateForm(executionContext);
        let isValid = await _validateForm(executionContext);
        if (isValid == false) {
            console.log("Prevent from saving");
            executionContext.getEventArgs().preventDefault();
        }*/
    debugger;
    console.log("Form Event - On Save");
    formContext = formContext || executionContext.getFormContext();
    var formType = formContext.ui.getFormType();
    var ant_leveltype = ANT.Attributes.getAttribute("ant_leveltype").getValue();
    var statuscode = ANT.Attributes.getAttribute("statuscode").getValue();
    var configLine = ANT.Attributes.getAttribute(
      "ant_approvalconfiglineid"
    ).getValue();
    var configLineId = configLine != null ? configLine[0].id : null;
    var getSaveMod = executionContext.getEventArgs().getSaveMode();
    if (
      (formType == 1 ||
        formType == 5 ||
        (formType == 2 &&
          statuscode == 100000001 &&
          getSaveMod != 5 &&
          getSaveMod != 6)) &&
      ant_leveltype == 100000001 //Final Approver
    ) {
      let checkRecord = await confirmSaveFinalApprover(configLineId);
      if (checkRecord != null) {
        if (!saveFromConfirmDialog) {
          executionContext.getEventArgs().preventDefault();
          var confirmString = {
            text: `System's only allowed to exist 1 published Level with the Level Type is "Final Approval" in 1 Configuration Line. System found the Level "${checkRecord.attributes.ant_place.value}" in the current Configuration Line. Do you still want to save?`,
            title: "Save Approval Level Configuration",
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
  async function confirmSaveFinalApprover(configLineId) {
    debugger;
    var fetchXml = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
                <entity name="ant_approvallevelconfiguration">
                <attribute name="ant_approvalconfiglineid" />
                <attribute name="statuscode" />
                <attribute name="ant_leveltype" />
                <attribute name="ant_place" />
                  <filter>
                  <condition attribute="ant_leveltype" operator="eq" value="100000001" />
                  <condition attribute="statuscode" operator="eq" value="100000002"/>
                  <condition attribute="ant_approvalconfiglineid" operator="eq" value="${configLineId}"/>
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

    onChange_ApprovalType: onChange_ApprovalType,
  };
})();
