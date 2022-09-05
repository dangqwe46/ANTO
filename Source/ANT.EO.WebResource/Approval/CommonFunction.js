/// <reference path="../node_modules/@types/xrm/index.d.ts" />
/* Sample Code For Record JS */
/// .211220  - Phuong.T
/// .261220  - Phuong.T
// Variables
/**
 * @type {Xrm.FormContext}
 */
var formContext;

const SampleApprovalConfigurationId = "{9152DFAD-6533-EC11-B6E6-002248580D8E}";
const ProcessStatus_Draft = 118950000;
const ProcessStatus_Process = 118950001;
const ProcessStatus_Done = 118950002;
const ProcessStatus_Reject = 118950003;

/*var OPTIONS = {
    Approval_Request: {
        Draft: 118950000,
        Processing: 118950001,
        Approved: 118950002,
        Rejected: 118950003
    }
};*/
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
// Load Form Context
function onloadForm(source) {
  formContext = source.getFormContext();
}

// Create Approval
/**
 * @param {Xrm.FormContext} primaryControl
 */
function onClickCreateApproval(primaryControl) {
  debugger;
  // var formContext = primaryControl;
  onClickSubmitApproval();

  //console.log(formContext);

  // if Approval Existed => Move else Create
  // var FormType = formContext.ui.getFormType();
  // var EntityName = formContext.data.entity.getEntityName();
  // var RecordId = formContext.data.entity.getId();
  // var RecordIdString = RecordId.replace("{", "").replace("}", "");

  // if (FormType == 2) {
  //     var fetchxml = "<fetch>" +
  //         "  <entity name='ant_approval'>" +
  //         "  <attribute name='ant_entity' />" +
  //         "    <filter type='and'>" +
  //         "    <condition attribute='ant_entity' operator='eq' value='" + EntityName + "' />" +
  //         "    <condition attribute='ant_recordid' operator='eq' value='" + RecordIdString + "' />" +
  //         "    <condition attribute='ant_processstatus' operator='ne' value='" + ProcessStatus_Done + "' />" +
  //         "    </filter>" +
  //         "  </entity>" +
  //         "</fetch>";
  //     var result = XrmServiceToolkit.Soap.Fetch(fetchxml);
  //     if (result.length > 0) {

  //         // Navigate to Existing Record
  //         var Record = result[0];
  //         navigate("{" + Record.id + "}", "ant_approval");

  //     } else {
  //         // Find Configuration Template
  //         var ConfigurationTemplate = findApprovalConfigurationForEntity(EntityName);
  //         var RecordName = getNameRecord(ConfigurationTemplate.attributes.ant_fieldnameentity.value, EntityName, RecordId);
  //         // Create New Approval
  //         var Approval = new XrmServiceToolkit.Soap.BusinessEntity("ant_approval");
  //         Approval.attributes["ant_name"] = "Approval For " + RecordName;
  //         Approval.attributes["ant_statusfield"] = ConfigurationTemplate.attributes.ant_statusfield.value;
  //         Approval.attributes["ant_statusapprovedreturnedvalue"] = { value: ConfigurationTemplate.attributes.ant_statusapprovedreturnedvalue.value, type: "int" };
  //         Approval.attributes["ant_statusrejectedreturnedvalue"] = { value: ConfigurationTemplate.attributes.ant_statusrejectedreturnedvalue.value, type: "int" };
  //         Approval.attributes["ant_entity"] = EntityName;
  //         Approval.attributes["ant_recordid"] = RecordId;
  //         Approval.attributes["ant_fieldnameentity"] = ConfigurationTemplate.attributes.ant_fieldnameentity.value;
  //         var ApprovalCreatedId = XrmServiceToolkit.Soap.Create(Approval);

  //         // Create Approval Level
  //         var ApprovalLevels = findAllApprovalLevelConfiguraiton(ConfigurationTemplate.id);

  //         ApprovalLevels.forEach(record => {

  //             debugger;

  //             var ApprovalLevel = new XrmServiceToolkit.Soap.BusinessEntity("ant_approvallevel");

  //             // Place
  //             if (record.attributes.ant_place != null)
  //                 ApprovalLevel.attributes["ant_place"] = { value: record.attributes.ant_place.value, type: "int" };

  //             // Email
  //             if (record.attributes.ant_email != null)
  //                 ApprovalLevel.attributes["ant_email"] = record.attributes.ant_email.value;

  //             // User
  //             if (record.attributes.ant_user != null)
  //                 ApprovalLevel.attributes["ant_user"] = { id: record.attributes.ant_user.id, logicalName: "systemuser", type: 'EntityReference' };

  //             // Team
  //             if (record.attributes.ant_team != null)
  //                 ApprovalLevel.attributes["ant_team"] = { id: record.attributes.ant_team.id, logicalName: "team", type: 'EntityReference' };

  //             // Approval Type
  //             if (record.attributes.ant_approvaltype != null)
  //                 ApprovalLevel.attributes["ant_approvaltype"] = { value: record.attributes.ant_approvaltype.value, type: "OptionSetValue" };

  //             // Multiple Approval Type
  //             if (record.attributes.ant_multipleapprovaltype != null)
  //                 ApprovalLevel.attributes["ant_multipleapprovaltype"] = { value: record.attributes.ant_multipleapprovaltype.value, type: "OptionSetValue" };

  //             // Guids
  //             if (record.attributes.ant_guids != null)
  //                 ApprovalLevel.attributes["ant_guids"] = record.attributes.ant_guids.value;

  //             // Approval
  //             ApprovalLevel.attributes["ant_approval"] = { id: ApprovalCreatedId, logicalName: "ant_approval", type: 'EntityReference' };

  //             // Create Record
  //             XrmServiceToolkit.Soap.Create(ApprovalLevel);

  //         });

  //         // Submit Approval
  //         onClickSubmitApproval();

  //         // Navigate To Created Record
  //         navigate(ApprovalCreatedId, "ant_approval");
  //     }
  // }
}
async function PublishConfigRecord() {
  debugger;
  ANT.Attributes.getAttribute("statuscode").setValue(100000002);
  var res = ANT.FormContext.context.data.save().then(
    (success) => {
      debugger;
      ANT.Controls.setDisabledAll();
      ANT.FormContext.refreshData(true);
    },
    (reject) => {
      debugger;
      ANT.Attributes.getAttribute("statuscode").setValue(100000001);
      let controls = ANT.Controls.getAllControls();
      for (let control of controls)
        if (control.getDisabled && !control.getDisabled())
          control.setDisabled(false);
    }
  );
}
function RequestForApproval() {
  debugger;

  // save form
  formContext.data.save().then(
    function (success) {
      //retrieve data param for action
      //var serverURL = formContext.context.getClientUrl();
      var actionName = "ant_ANTApprovalApprovalSubmission";
      var ApprovalType =
        ANT.Attributes.getAttribute("ant_dimensionvalueid").getValue() ==
        undefined
          ? null
          : ANT.Attributes.getAttribute("ant_dimensionvalueid").getValue()[0];
      var BusinessUnit =
        ANT.Attributes.getAttribute("ant_businessunitid").getValue() ==
        undefined
          ? null
          : ANT.Attributes.getAttribute("ant_businessunitid").getValue()[0];
      var Project =
        ANT.Attributes.getAttribute("ant_projectid").getValue() == undefined
          ? null
          : ANT.Attributes.getAttribute("ant_projectid").getValue()[0];
      var CostCenter =
        ANT.Attributes.getAttribute("ant_costcenterid").getValue() == undefined
          ? null
          : ANT.Attributes.getAttribute("ant_costcenterid").getValue()[0];
      var ApprovalCode =
        ANT.Attributes.getAttribute("ant_approvalcode").getValue();
      var EntityName = ANT.Entity.getEntityName();
      var RecordId = ANT.Entity.getId();
      var ExtraParams = getExtraParams();
      var Budget =
        ANT.Attributes.getAttribute("ant_approvalbudget").getValue() ==
        undefined
          ? null
          : ANT.Attributes.getAttribute("ant_approvalbudget").getValue()[0];
      var inputParams = {
        EntityName: EntityName,
        RecordId: RecordId,
        ...(ApprovalType != null && {
          ApprovalType: {
            "@odata.type": `Microsoft.Dynamics.CRM.${ApprovalType.entityType}`,
            ant_dimensionvalueid: ApprovalType.id,
            //ant_name: ApprovalType.name,
          },
        }),
        ...(BusinessUnit != null && {
          BusinessUnit: {
            "@odata.type": `Microsoft.Dynamics.CRM.${BusinessUnit.entityType}`,
            businessunitid: BusinessUnit.id,
            //ant_name: BusinessUnit.name,
          },
        }),
        ...(Project != null && {
          Project: {
            "@odata.type": `Microsoft.Dynamics.CRM.${Project.entityType}`,
            ant_projectid: Project.id,
            //ant_name: Project.name,
          },
        }),
        ...(CostCenter != null && {
          CostCenter: {
            "@odata.type": `Microsoft.Dynamics.CRM.${CostCenter.entityType}`,
            ant_costcenterid: CostCenter.id,
            //ant_name: CostCenter.name,
          },
        }),
        ...(Budget != null && {
          Budget: {
            "@odata.type": `Microsoft.Dynamics.CRM.${Budget.entityType}`,
            ant_budgetid: Budget.id,
            //ant_name: Budget.name,
          },
        }),
        ApprovalCode: ApprovalCode,
        ExtraParams: ExtraParams,
      };
      try {
        console.log(inputParams);
        // ANT.SOAP.callAction(
        //   actionName,
        //   inputParams,
        //   approvalSuccessCallback,
        //   approvalFailedCallback,
        //   true
        // );
        ANT.Utility.showProgressIndicator("Please wait a moment...");
        var callAction = ANT.OData.callAction(
          null,
          null,
          actionName,
          inputParams
        );
        callAction.then(
          function (response) {
            approvalSuccessCallback();
          },
          function (error) {
            approvalFailedCallback(error);
          }
        );
      } catch (e) {
        ANT.Navigate.openAlertDialog(e.message);
      }
    },
    function (error) {
      console.log(error.message);
    }
  );
}
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
function approvalSuccessCallback() {
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
    ANT.Utility.closeProgressIndicator();
    ANT.Navigate.openAlertDialog(alertStrings, alertOptions).then(
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
    ANT.Navigate.openErrorDialog(dialogOptions).then(
      function (success) {},
      function (error) {
        console.error(error.message);
      }
    );
  }
  console.log("oke");
}
function approvalFailedCallback(result) {
  debugger;
  console.log("error");
  let dialogOptions = { message: result.message };
  ANT.Utility.closeProgressIndicator();
  ANT.Navigate.openErrorDialog(dialogOptions).then(
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
}
// Submit Approval - sample For Status[NOT IN USE]
function onClickSubmitApproval() {
  debugger;

  // Call Action - Approval Action - Create Approval Set
  // Action - ant_ANTApprovalApprovalSubmission
  var EntityName = formContext.data.entity.getEntityName();
  var RecordId = formContext.data.entity.getId();
  var RecordIdString = RecordId.replace("{", "").replace("}", "");
  var ApprovalCode = "";
  //get the current organization name
  var serverURL = formContext.context.getClientUrl();
  var ApprovalCodeAttribute = formContext.getAttribute("ant_approvalcode");
  if (ApprovalCodeAttribute != null)
    ApprovalCode = formContext.getAttribute("ant_approvalcode").getValue();

  //query to send the request to the global Action
  var actionName = "ant_ANTApprovalApprovalSubmission"; // Global Action Unique Name

  //Pass the input parameters of action
  var data = {
    EntityName: EntityName,
    RecordId: RecordIdString,
    ApprovalCode: ApprovalCode,
  };

  //Create the HttpRequestObject to send WEB API Request
  var req = new XMLHttpRequest();
  //Post the WEB API Request
  req.open("POST", serverURL + "/api/data/v9.0/" + actionName, true);
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");

  req.onreadystatechange = function () {
    if (this.readyState == 4 /* complete */) {
      req.onreadystatechange = null;

      if (this.status == 200 || this.status == 204) {
        var alertStrings = {
          confirmButtonLabel: "Ok",
          text: "Approval has been sent successfully",
          title: "Information",
        };
        var alertOptions = { height: 120, width: 260 };
        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
          function (success) {
            console.log("Alert dialog closed");
          },
          function (error) {
            console.log(error.message);
          }
        );
      } else {
        var error = JSON.parse(this.response).error;
        Xrm.Navigation.openErrorDialog({
          message: `"Error in Action: " + ${error.message}`,
        });
      }
    }
  };
  //Execute request passing the input parameter of the action
  req.send(window.JSON.stringify(data));

  // var FormType = formContext.ui.getFormType();

  // if (FormType == 2) {
  //     var fetchxml = "<fetch>" +
  //         "  <entity name='ant_approval'>" +
  //         "  <attribute name='ant_entity' />" +
  //         "    <filter type='and'>" +
  //         "    <condition attribute='ant_entity' operator='eq' value='" + EntityName + "' />" +
  //         "    <condition attribute='ant_recordid' operator='eq' value='" + RecordIdString + "' />" +
  //         "    <condition attribute='ant_processstatus' operator='ne' value='" + ProcessStatus_Done + "' />" +
  //         "    </filter>" +
  //         "  </entity>" +
  //         "</fetch>";
  //     var templateFound = XrmServiceToolkit.Soap.Fetch(fetchxml);
  //     if (templateFound.length > 0) {

  //     } else {
  //         alert("You need to create approvers for this record first!!!");
  //     }
  //}
}

// Enable Rule Submit Function
// Field - ant_requeststatus
// Draft Status - 118950000
function enableSubmitFunction() {
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
}
function getExtraParams() {
  debugger;
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
}
// Enable Rule Submit Function
// Field - ant_requeststatus
// Draft Status - 118950000
// function enableReSubmitFunction() {
//   return false; // Moved to Submit function

//   var FormType = formContext.ui.getFormType();
//   if (FormType == 1) return false;

//   var RequestStatus = formContext.getAttribute("ant_requeststatus");
//   if (RequestStatus == null) return false;

//   // approved - hide
//   if (RequestStatus.getValue() == ProcessStatus_Done) return false;

//   // rejected - show
//   if (RequestStatus.getValue() == ProcessStatus_Reject) return true;

//   return false;
// }

// Submit Field
function onClickSubmitField(primaryControl) {
  debugger;

  var FormType = formContext.ui.getFormType();
  var EntityName = formContext.data.entity.getEntityName();
  var RecordId = formContext.data.entity.getId();
  var RecordIdString = RecordId.replace("{", "").replace("}", "");

  if (FormType == 2) {
    var fetchxml =
      "<fetch>" +
      "  <entity name='ant_approval'>" +
      "  <attribute name='ant_entity' />" +
      "    <filter type='and'>" +
      "    <condition attribute='ant_entity' operator='eq' value='" +
      EntityName +
      "' />" +
      "    <condition attribute='ant_recordid' operator='eq' value='" +
      RecordIdString +
      "' />" +
      "    <condition attribute='ant_processstatus' operator='ne' value='" +
      ProcessStatus_Done +
      "' />" +
      "    </filter>" +
      "  </entity>" +
      "</fetch>";
    var templateFound = XrmServiceToolkit.Soap.Fetch(fetchxml);
    if (templateFound.length > 0) {
      // Navigate to Existing Record
      var ApprovalUpdate = new XrmServiceToolkit.Soap.BusinessEntity(
        "ant_approval",
        "{" + templateFound[0].id + "}"
      );
      ApprovalUpdate.attributes["ant_approvalsignal"] = {
        value: true,
        type: "boolean",
      };
      ApprovalUpdate.attributes["ant_processstatus"] = {
        value: ProcessStatus_Process,
        type: "OptionSetValue",
      };
      XrmServiceToolkit.Soap.Update(ApprovalUpdate);

      // Update Record's Status Field To Processing
      formContext.getAttribute("ant_status").setValue(118950001);
      formContext.data.save();
    } else {
      alert("You need to create approvers for this record first!!!");
    }
  }
}

// Sub Function
function findApprovalConfigurationForEntity(Entity) {
  var fetchxml =
    "<fetch>" +
    "  <entity name='ant_approvalconfiguration'>" +
    "  <attribute name='ant_entity' />" +
    "  <attribute name='ant_statusfield' />" +
    "  <attribute name='ant_statusapprovedreturnedvalue' />" +
    "  <attribute name='ant_statusrejectedreturnedvalue' />" +
    "  <attribute name='ant_fieldnameentity' />" +
    "    <filter type='and'>" +
    "    <condition attribute='ant_entity' operator='eq' value='" +
    Entity +
    "' />" +
    "    <condition attribute='statecode' operator='eq' value='" +
    0 +
    "' />" +
    "    </filter>" +
    "  </entity>" +
    "</fetch>";
  var templateFound = XrmServiceToolkit.Soap.Fetch(fetchxml);
  return templateFound[0];
}

function findAllApprovalLevelConfiguraiton(approvalConfiguration) {
  var fetchxml =
    "<fetch>" +
    "  <entity name='ant_approvallevelconfiguration'>" +
    "  <all-attributes />" +
    "    <filter type='and'>" +
    "    <condition attribute='ant_approvalconfiguration' operator='eq' value='" +
    approvalConfiguration +
    "' />" +
    "    </filter>" +
    "  </entity>" +
    "</fetch>";
  var templateFound = XrmServiceToolkit.Soap.Fetch(fetchxml);
  return templateFound;
}

function navigate(EntityId, EntityName) {
  var pageInput = {
    pageType: "entityrecord",
    entityName: EntityName,
    entityId: EntityId, //replace with actual ID
  };
  Xrm.Navigation.navigateTo(pageInput);
}

function getNameRecord(fiendName, Entity, RecordId) {
  var fetchxml =
    "<fetch>" +
    "  <entity name='" +
    Entity +
    "'>" +
    "  <attribute name='" +
    fiendName +
    "' />" +
    "    <filter type='and'>" +
    "    <condition attribute='" +
    Entity +
    "id' operator='eq' value='" +
    RecordId +
    "' />" +
    "    </filter>" +
    "  </entity>" +
    "</fetch>";
  var result = XrmServiceToolkit.Soap.Fetch(fetchxml);
  return result[0].attributes[fiendName].value;
}

function viewApproval() {
  var RecordId = formContext.data.entity.getId();
  var RecordIdString = RecordId.replace("{", "").replace("}", "");
  var Entity = formContext.data.entity.getEntityName();

  var Url =
    "https://apps.powerapps.com/play/ccde73f3-ff9e-49b5-a971-c569fa479856?tenantId=6ba76517-0700-4532-a9a1-414139f50dc2?";
  var Filter = "RecordId=" + RecordIdString + "&Entity=" + Entity;
  var AppString = Url + Filter;

  window.open(AppString);
}
async function ShowHideButtonApproveReject() {
  debugger;
  var approvalRequestId = ANT.Entity.getId().replace("{", "").replace("}", "");
  var currentUserId = ANT.FormContext.globalContext
    .getUserId()
    .replace("{", "")
    .replace("}", "");
  var approvalRecord = await RetriveApprovalRecord(approvalRequestId);
  if (approvalRecord != null) {
    var isCurrentApprover = await IsCurrentApprover(
      approvalRecord,
      currentUserId
    );
    if (isCurrentApprover) {
      return true;
    } else false;
  }
}
function ShowHideButtonPushNoti() {
  debugger;
  let approvalRequestId = ANT.Entity.getId().replace("{", "").replace("}", "");
  let currentUserId = ANT.FormContext.globalContext
    .getUserId()
    .replace("{", "")
    .replace("}", "");
  let statusReason = ANT.Attributes.getAttribute("statuscode").getValue();
  let priority = ANT.Attributes.getAttribute("ant_priority").getValue();
  let ownerRequest = ANT.Attributes.getAttribute("ownerid").getValue();
  let ownerRequestId = ownerRequest[0].id.replace("{", "").replace("}", "");
  if (
    ownerRequestId === currentUserId &&
    statusReason === OPTIONS.Approval_Request.Active.Processing &&
    priority === 100000001 /*Urgent*/
  ) {
    return true;
  } else {
    return false;
  }
}
async function RetriveApprovalRecord(approvalRequestId) {
  debugger;
  var fetchXmlRecord = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
                    <entity name="ant_approval">
                        <attribute name="statecode" />
                        <attribute name="ant_recordid" />
                        <attribute name="ant_approvalid" />
                        <attribute name="ant_currentset" />
                        <attribute name="ant_lastset" />
                        <attribute name="createdon" />
                        <filter type="and">
                        <condition attribute="statecode" operator="eq" value="0" />
                        <condition attribute="ant_recordid" operator="eq" value="${approvalRequestId}" />
                        </filter>
                        <order attribute="createdon" descending="true" />
                    </entity>
                    </fetch>`;
  let req = await ANT.Lib.SOAP.fetch(fetchXmlRecord);
  if (req.length >= 1) {
    return req[0];
  } else return null;
}
async function IsCurrentApprover(approvalRecord, userId) {
  debugger;
  var approvalRecordId = approvalRecord.getValue("ant_approvalid");
  var approvalRecordCurrentPlace = approvalRecord.getValue("ant_currentset");
  var approvalRecordLasttPlace = approvalRecord.getValue("ant_lastset");
  if (approvalRecordCurrentPlace <= approvalRecordLasttPlace) {
    var fetchXmlLevel = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="ant_approvallevel">
      <attribute name="ant_approval" />
      <attribute name="ant_place" />
      <attribute name="statuscode" />
      <attribute name="ant_approvallevelid" />
      <filter>
        <condition attribute="ant_approval" operator="eq" value="${approvalRecordId}"/>
        <condition attribute="ant_place" operator="eq" value="${approvalRecordCurrentPlace}" />
        <condition attribute="statuscode" operator="eq" value="100000001" />
      </filter>
      <link-entity name="ant_approvalleveldetail" from="ant_approvallevel" to="ant_approvallevelid">
        <attribute name="ant_user" />
        <attribute name="ant_approvalleveldetailid" />
        <attribute name="statecode" />
        <filter>
          <condition attribute="ant_user" operator="eq" value="${userId}" />
          <condition attribute="statuscode" operator="eq" value="1" />
        </filter>
      </link-entity>
    </entity>
  </fetch>`;
    let req = await ANT.Lib.SOAP.fetch(fetchXmlLevel);
    if (req.length >= 1) {
      return true;
    } else return false;
  } else return false;
}
function Revise() {
  debugger;
  var confirmString = {
    text: `Do you want to revise this record?`,
    title: "Revise Approval Request",
    cancelButtonLabel: "Cancel",
    confirmButtonLabel: "Confirm",
  };
  var confirmOptions = { height: 200, width: 500 };
  ANT.Navigate.openConfirmDialog(
    confirmString,
    confirmOptions,
    ConfirmCallbackRevise,
    () => {}
  );
}
function ConfirmCallbackRevise() {
  let entity = ANT.Entity.getEntityName();
  let recordId = ANT.Entity.getId();
  debugger;
  ANT.OData.setStateReocord(
    entity,
    recordId,
    0,
    100000000 /*Draft*/,
    function (success) {
      var alertStrings = {
        confirmButtonLabel: "OK",
        text: "Revise record successfully",
        title: "Information",
      };
      var alertOptions = { height: 120, width: 260 };
      ANT.Navigate.openAlertDialog(alertStrings, alertOptions).then(() => {
        ANT.FormContext.refreshData(false);
      });
    },
    function (error) {}
  );
}
function ShowHideButtonAddNew(primaryControl) {
  debugger;
  var formContext = primaryControl;
  var statuscode = formContext.getAttribute("statuscode").getValue();
  if (statuscode == 100000002) {
    //Publish
    return false;
  } else {
    return true;
  }
}
function ShowHideButtonAddExistingUser(primaryControl) {
  //SystemUser
  debugger;
  var formContext = primaryControl;
  var statuscode =
    formContext.getAttribute("statuscode") == null ||
    formContext.getAttribute("statuscode") == undefined
      ? null
      : formContext.getAttribute("statuscode").getValue();
  var entityName = formContext.data.entity.getEntityName();
  if (
    statuscode == 100000002 &&
    entityName == "ant_approvallevelconfiguration"
  ) {
    //Publish
    return false;
  }
}
function showHideButtonInDocument(primaryControl) {
  //
  debugger;
  var formContext = primaryControl;
  var statuscode =
    formContext.getAttribute("statuscode") == null ||
    formContext.getAttribute("statuscode") == undefined
      ? null
      : formContext.getAttribute("statuscode").getValue();
  var entityName = formContext.data.entity.getEntityName();
  let ownerRequest = formContext.getAttribute("ownerid").getValue();
  let ownerRequestId = ownerRequest[0].id.replace("{", "").replace("}", "");
  var userId = formContext._globalContext
    .getUserId()
    .replace("{", "")
    .replace("}", "");
  if (
    (entityName == "ant_approvalrequest" && userId != ownerRequestId) ||
    (statuscode != 100000000 &&
      entityName == "ant_approvalrequest" &&
      userId == ownerRequestId)
  )
    return false;
}
