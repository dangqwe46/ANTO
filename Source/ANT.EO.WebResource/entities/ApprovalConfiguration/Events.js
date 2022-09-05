/// <reference path="../../node_modules/@types/xrm/index.d.ts" />
// import * as ANT from "../../ANT.RE.Lib.Webresources/src/index";
// import * as ANT from "../../ANT.RE.Lib.Webresources/src/global";
("use strict");
var ApprovalConfig = ApprovalConfig || {};
ApprovalConfig.Events = ApprovalConfig.Events || {};
ApprovalConfig.Events.FormInfor = (() => {
  /* VARIABLES */
  var OPTIONS = {
    //Range_Type: {
    //    Amount: 100000000,
    //    Date: 100000001,
    //    Quantity: 100000002,
    //    Custom_Query: 100000003
    //}
  };
  var STATUSCODES = {
    DRAFT: 100000001,
    PUBLISHED: 100000002,
    INACTIVATED: 100000003,
  };
  var STATECODE = {
    ACTIVE: 0,
    INACTIVATED: 1,
  };

  var RequirementLevel = {
    NONE: "none",
    RECOMMENDED: "recommended",
    REQUIRED: "required",
  };
  var ERROR_MSG = {
    MSG01: "Sample message",
  };
  var DATATYPE = {
    OPTIONSET: "optionset",
    TEXT: "text",
  };
  var ListFieldCopy = [
    {
      primaryname: "ant_entity",
      datatype: DATATYPE.TEXT,
    },
    {
      primaryname: "ant_entitynameplural",
      datatype: DATATYPE.TEXT,
    },
    {
      primaryname: "ant_fieldnameentity",
      datatype: DATATYPE.TEXT,
    },
    {
      primaryname: "ant_statusfield",
      datatype: DATATYPE.TEXT,
    },
    {
      primaryname: "ant_attachmenturlfield",
      datatype: DATATYPE.TEXT,
    },
    {
      primaryname: "ant_buttoncreateapprovalname",
      datatype: DATATYPE.TEXT,
    },
    {
      primaryname: "ant_buttonsubmittriggerfield",
      datatype: DATATYPE.TEXT,
    },
    {
      primaryname: "ant_buttonsubmitapprovalname",
      datatype: DATATYPE.TEXT,
    },
    {
      primaryname: "ant_datatype",
      datatype: DATATYPE.OPTIONSET,
    },
    {
      primaryname: "ant_statusapprovedreturnedvalue",
      datatype: DATATYPE.TEXT,
    },
    {
      primaryname: "ant_statusrejectedreturnedvalue",
      datatype: DATATYPE.TEXT,
    },
    {
      primaryname: "ant_approvedstringreturnedvalue",
      datatype: DATATYPE.TEXT,
    },
    {
      primaryname: "ant_rejectedstringreturnedvalue",
      datatype: DATATYPE.TEXT,
    },
  ];
  /**
   * @type {Xrm.FormContext}
   */
  var formContext;

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
  /* PUBLIC */
  /**
   * @param {Xrm.Events.EventContext} executionContext
   */
  function OnLoad(executionContext) {
    debugger;
    formContext = executionContext.getFormContext();
    let formType = formContext.ui.getFormType();
    let statuscode = ANT.Attributes.getAttribute("statuscode").getValue();
    let startdate = ANT.Attributes.getAttribute("ant_startdate").getValue();
    let currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    if (formType == 1 || formType == 5) {
      //Create | Quick Create
      formContext.getAttribute("ant_order").setValue(1);
      //ANT.Controls.getControl("ant_chooseatemplate").setVisible(false);
    } else {
      //LogicShowHideField_TemplateSection();
      ANT.Lib.Controls.setDisableds(
        [
          "ant_chooseatemplate",
          "ant_defineasatemplate",
          //"ant_copyfromtemplate",
        ],
        true
      );
      if (statuscode != STATUSCODES.DRAFT) {
        ANT.Controls.setDisabledAll();
      } else if (statuscode == STATUSCODES.DRAFT && startdate < currentdate) {
        var alertStrings = {
          confirmButtonLabel: "OK",
          text: "Please make sure your Start Date is the current date or in the future before publishing this configuration.",
          title: "ALERT",
        };
        ANT.Navigate.openAlertDialog(alertStrings);
      }
    }
    formContext
      .getControl("ant_chooseatemplate")
      .addPreSearch(FilterChooseATemplate); //Add custom filter field lookup ant_chooseatemplate
  }
  /**
   * @param {Xrm.Events.EventContext} executionContext
   */
  async function OnSave(executionContext) {
    /*debugger;
    var formContext = executionContext.getFormContext();
    let formType = formContext.ui.getFormType();
    let ant_code = ANT.Attributes.getAttribute("ant_code").getValue();
    //---Check duplicate Code
    var fetchXml = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
      <entity name="ant_approvalconfiguration">
        <attribute name="ant_code" />
        <attribute name="statuscode" />
        <attribute name="ant_approvalconfigurationid" />
        <filter>
          <condition attribute="ant_code" operator="eq" value="${ant_code}" />
        </filter>
      </entity>
    </fetch>`;
    if (formType == 1 || formType == 5) {
      //Create | Quick Create
      let req = await ANT.Lib.SOAP.fetch(fetchXml);
      if (req.length != 0) {
        ANT.Navigate.openAlertDialog(
          "Existed the Code. Please input other value"
        );
        executionContext.getEventArgs().preventDefault();
      }
    } else {
      let req = await ANT.Lib.SOAP.fetch(fetchXml);
      if (req.length > 1) {
        ANT.Navigate.openAlertDialog(
          "Existed the Code. Please input other value"
        );
        executionContext.getEventArgs().preventDefault();
      }
    }*/
    //-------------------------------------------
  }
  /**
   * @param {Xrm.Events.EventContext} executionContext
   */
  function Entity_OnChange(executionContext) {
    formContext = formContext || executionContext.getFormContext();
    let entityName = ANT.Attributes.getAttribute("ant_entity").getValue();
    if (entityName == undefined) {
      ANT.Attributes.getAttribute("ant_entitynameplural").setValue(null);
    } else {
      Xrm.Utility.getEntityMetadata(entityName).then(function (metadata) {
        let entitySetName = metadata.EntitySetName;
        ANT.Attributes.getAttribute("ant_entitynameplural").setValue(
          entitySetName
        );
        ANT.Attributes.getAttribute("ant_entitynameplural").setSubmitMode(
          ANT.Constants.SubmitMode.Always
        );
      });
    }
  }
  /**
   * @param {Xrm.Events.EventContext} executionContext
   * dang.vh
   */
  function DefineTemplate_OnChange(executionContext) {
    debugger;
    formContext = executionContext.getFormContext();
    var ant_defineasatemplate = ANT.Attributes.getAttribute(
      "ant_defineasatemplate"
    ).getValue();
    if (ant_defineasatemplate) {
      ANT.Attributes.setRequiredLevels(
        [
          "ant_code",
          "ant_title",
          "ant_description",
          "ant_order",
          "ant_startdate",
          "ant_dimensionvalue",
        ],
        RequirementLevel.NONE
      );
      ANT.Attributes.setRequiredLevels(
        ["ant_fieldnameentity", "ant_statusfield", "ant_datatype"],
        RequirementLevel.REQUIRED
      );
    } else {
      ANT.Attributes.setRequiredLevels(
        [
          "ant_code",
          "ant_title",
          "ant_description",
          "ant_order",
          "ant_startdate",
          "ant_dimensionvalue",
        ],
        RequirementLevel.REQUIRED
      );
      ANT.Attributes.setRequiredLevels(
        ["ant_fieldnameentity", "ant_statusfield", "ant_datatype"],
        RequirementLevel.NONE
      );
    }
  }
  async function ChooseATemplate_Onchange(executionContext) {
    debugger;
    formContext = executionContext.getFormContext();
    var ant_chooseatemplate = ANT.Attributes.getAttribute(
      "ant_chooseatemplate"
    ).getValue();
    var stringAttribute = StringAttributesForListFieldCopy(ListFieldCopy);
    if (ant_chooseatemplate != undefined || ant_chooseatemplate != null) {
      let recordId = ant_chooseatemplate[0].id;
      var fetchXml = `<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
        <entity name='ant_approvalconfiguration'>
          <attribute name='ant_approvalconfigurationid' />
          <attribute name='ant_name' />
          <attribute name='createdon' />`;
      fetchXml += stringAttribute;
      fetchXml += `<order attribute='ant_name' descending='false' />
          <filter type='and'>
            <condition attribute='statecode' operator='eq' value='0' />
            <condition attribute='ant_approvalconfigurationid' operator='eq' value='${recordId}' />
          </filter>
        </entity>
      </fetch>`;
      let req = await ANT.Lib.SOAP.fetch(fetchXml);
      if (req.length > 0) {
        for (var i in ListFieldCopy) {
          if (ListFieldCopy[i].datatype == DATATYPE.TEXT) {
            ANT.Attributes.getAttribute(ListFieldCopy[i].primaryname).setValue(
              req[0].getValue(ListFieldCopy[i].primaryname)
            );
          } else if (ListFieldCopy[i].datatype == DATATYPE.OPTIONSET) {
            ANT.Attributes.getAttribute(ListFieldCopy[i].primaryname).setValue(
              Number(req[0].getValue(ListFieldCopy[i].primaryname))
            );
          }
        }
      }
    } else {
      var arrayNames = ArrayFieldNameForListField(ListFieldCopy);
      ANT.Attributes.clearAttributeValues(arrayNames);
    }
  }
  function StringAttributesForListFieldCopy(ListFieldCopy) {
    //return string fetchxml attributes with field name from ListFieldCopy
    debugger;
    var attributes = "";
    var stringAttributeNext = "";
    var ListField = ListFieldCopy;
    for (var i = 0; i < ListField.length; i++) {
      attributes = `<attribute name='${ListField[i].primaryname}'/>`;
      stringAttributeNext += attributes;
      attributes += stringAttributeNext;
    }
    return attributes;
  }
  function ArrayFieldNameForListField(ListFieldCopy) {
    //return list field name in ListFieldCopy
    debugger;
    var arrayNames = [];
    var ListField = ListFieldCopy;
    for (var i = 0; i < ListField.length; i++) {
      arrayNames.push(ListField[i].primaryname);
    }
    return arrayNames;
  }
  function FilterChooseATemplate() {
    debugger;
    var entity = ANT.Attributes.getAttribute("ant_entity").getValue();
    var filter;
    if (entity != undefined || entity != null) {
      filter = `<filter type='and'>
        <condition attribute='statecode' operator='eq' value='0' />
        <condition attribute='ant_defineasatemplate' operator='eq' value='1' />
        <condition attribute='ant_entity' operator='eq' value='${entity}' />
    </filter>`;
    } else {
      filter = `<filter type='and'>
        <condition attribute='statecode' operator='eq' value='0' />
        <condition attribute='ant_defineasatemplate' operator='eq' value='1' />
    </filter>`;
    }
    formContext
      .getControl("ant_chooseatemplate")
      .addCustomFilter(filter, "ant_approvalconfiguration");
  }
  /* RETURN */
  return {
    OnLoad: OnLoad,
    OnSave: OnSave,

    Entity_OnChange: Entity_OnChange,
    ChooseATemplate_Onchange: ChooseATemplate_Onchange,
    DefineTemplate_OnChange: DefineTemplate_OnChange,
  };
})();
