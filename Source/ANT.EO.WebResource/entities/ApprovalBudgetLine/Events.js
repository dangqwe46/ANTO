/// <reference path="../../node_modules/@types/xrm/index.d.ts" />
"use strict";
//import * as ANT from "../../ANT.RE.Lib.Webresources/src/index";
//import * as ANT from "../../ANT.RE.Lib.Webresources/src/global";
var BudgetLine = BudgetLine || {};
BudgetLine.Events = BudgetLine.Events || {};

BudgetLine.Events.FormInfor = (() => {
  /* VARIABLES */
  var ERROR_MSG = {
    MSG01: "Sample message",
  };
  /**
   * @type {Xrm.FormContext}
   */
  var formContext;
  var filterLookup;

  /* PRIVATE */
  function _private() {}

  /**
   *  Current Budget Line's Amount must be less than or equal to Parent Budget Line's Amount
   * @returns True or False
   */
  function _getParentBudgetAmount() {
    let parentLine = ANT.Attributes.getAttribute(
      "ant_parentapprovalbudgetline"
    ).getValue();
    if (parentLine == undefined) {
      return null; // no parent Budget Line
    }

    let rec = ANT.SOAP._EntityBase.retrieve(
      parentLine[0].entityType,
      parentLine[0].id,
      ["ant_amount"],
      false
    );
    if (rec != undefined) {
      return rec.getValue("ant_amount");
    }
    return null;
  }

  function _isValidBudgetAmount() {
    let parentAmount = _getParentBudgetAmount();
    let currentAmount = ANT.Attributes.getAttribute("ant_amount").getValue();
    if (
      parentAmount != undefined &&
      currentAmount != undefined &&
      currentAmount > parentAmount
    ) {
      return false;
    }
    return true;
  }
  function retriveChildBU(budgetHeader) {
    debugger;
    let options =
      "?$select=ant_name,ant_businessunit&$expand=ant_businessunit($select=businessunitid)";
    ANT.OData.retrieveRecord(
      budgetHeader[0].entityType,
      budgetHeader[0].id,
      options
    ).then(function (record) {
      if (record.ant_businessunit != null) {
        let businessunitid = record.ant_businessunit.businessunitid;
        filterLookup = `<filter typpe='and'>
                  <condition attribute='parentbusinessunitid' operator='eq' value='${businessunitid}' />
                  </filter>`;
      }
    });
    ANT.Controls.getControl("ant_businesunit").addPreSearch(filterChildBU); //add Lookup filter
  }
  function filterChildBU(executionContext) {
    debugger;
    formContext = executionContext.getFormContext();
    if (filterLookup != undefined || filterLookup != null) {
      formContext
        .getControl("ant_businesunit")
        .addCustomFilter(filterLookup, "businessunit");
    }
  }
  async function _IsDuplicateRecord() {
    debugger;
    let business = ANT.Attributes.getAttribute("ant_businesunit").getValue();
    let approvalType =
      ANT.Attributes.getAttribute("ant_dimensionvalue").getValue();
    let fromDate =
      ANT.Attributes.getAttribute("ant_fromdate") == undefined
        ? null
        : ANT.Attributes.getAttribute("ant_fromdate").getValue();
    let toDate =
      ANT.Attributes.getAttribute("ant_todate") == undefined
        ? null
        : ANT.Attributes.getAttribute("ant_todate").getValue();
    if (
      business != null &&
      approvalType != null &&
      fromDate != null &&
      toDate != null
    ) {
      let fetchXml = `<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
      <entity name='ant_approvalbudgetline'>
        <attribute name='ant_businesunit' />
        <attribute name='ant_dimensionvalue' />
        <attribute name='ant_fromdate' />
        <attribute name='ant_todate' />
        <attribute name='ant_approvalbudgetlineid' />
        <attribute name='ant_name' />
        <filter type='and'>
          <condition attribute='ant_businesunit' operator='eq' value='${
            business[0].id
          }'/>
          <condition attribute='ant_dimensionvalue' operator='eq' value='${
            approvalType[0].id
          }'/>
          <condition attribute='ant_fromdate' operator='eq' value='${fromDate.toLocaleDateString()}' />
          <condition attribute='ant_todate' operator='eq' value='${toDate.toLocaleDateString()}' />
        </filter>
      </entity>
    </fetch>`;
      let records = await ANT.Lib.SOAP.fetch(fetchXml);
      if (records.length > 1) {
        return true;
      } else return false;
    }
  }
  async function ValidateFromToDate() {
    debugger;
    let budgetHeader =
      ANT.Attributes.getAttribute("ant_approvalbudget").getValue();
    let ant_fromdateLine =
      ANT.Attributes.getAttribute("ant_fromdate").getValue();
    let ant_todateLine = ANT.Attributes.getAttribute("ant_todate").getValue();
    if (budgetHeader != null) {
      let options = "?$select=ant_name,ant_fromdate,ant_todate";
      let data = await ANT.OData.retrieveRecord(
        budgetHeader[0].entityType,
        budgetHeader[0].id,
        options
      );
      let ant_fromdateHeader = new Date(data.ant_fromdate);
      let ant_todateHeader = new Date(data.ant_todate);
      if (
        ant_fromdateLine != null &&
        ant_todateLine != null &&
        (ant_fromdateLine < ant_fromdateHeader ||
          ant_todateLine > ant_todateHeader ||
          ant_fromdateLine > ant_todateHeader ||
          ant_todateLine < ant_fromdateHeader)
      ) {
        return true;
      } else return false;
    }
  }

  /* PUBLIC */
  /**
   * @param {Xrm.Events.EventContext} executionContext
   */
  function OnLoad(executionContext) {
    debugger;
    // formContext = executionContext.getFormContext();
    //let formType = formContext.ui.getFormType();
    let formType = ANT.FormContext.getFormType();
    if (formType == ANT.Constants.FormType.Update) {
      let usedAmount = ANT.Attributes.getAttribute("ant_usedamount").getValue();
      if (usedAmount != undefined && usedAmount > 0) {
        // Disable Amount if Used Amount > 0
        ANT.Controls.getControl("ant_amount").setDisabled(true);
      }
    }
    let budgetHeader =
      ANT.Attributes.getAttribute("ant_approvalbudget") == undefined
        ? null
        : ANT.Attributes.getAttribute("ant_approvalbudget").getValue();
    if (budgetHeader != null) {
      retriveChildBU(budgetHeader);
    }
  }

  /**
   * @param {Xrm.Events.EventContext} executionContext
   */
  async function OnSave(executionContext) {
    debugger;
    var data;
    let formType = ANT.FormContext.getFormType();
    if (formType === ANT.Constants.FormType.Create) {
      // Set default value for Used Amount & Balance Amount
      ANT.Attributes.getAttribute("ant_usedamount").setValue(0);
      ANT.Attributes.getAttribute("ant_balanceamount").setValue(
        ANT.Attributes.getAttribute("ant_amount").getValue()
      );
    }

    let validAmount = _isValidBudgetAmount();
    if (validAmount == false) {
      var alertStrings = {
        confirmButtonLabel: "OK",
        text: "Amount cannot be greater than Parent Budget Line's Amount.",
        title: "ALERT",
      };
      ANT.Navigate.openAlertDialog(alertStrings);
      executionContext.getEventArgs().preventDefault();
    }
    let validFromToDate = await ValidateFromToDate();
    if (validFromToDate == true) {
      var alertStrings = {
        confirmButtonLabel: "OK",
        text: "From/To phải nằm trong khoảng From/To của Budget Header.",
        title: "ALERT",
      };
      ANT.Navigate.openAlertDialog(alertStrings);
      executionContext.getEventArgs().preventDefault();
    }
    let checkDuplicateBudgetLine = await _IsDuplicateRecord();
    if (checkDuplicateBudgetLine) {
      var alertStrings = {
        confirmButtonLabel: "OK",
        text: "Duplicate Budget Line.",
        title: "ALERT",
      };
      ANT.Navigate.openAlertDialog(alertStrings);
      executionContext.getEventArgs().preventDefault();
    }
  }

  /**
   * @param {Xrm.Events.EventContext} executionContext
   */
  function Amount_OnChange(executionContext) {
    // Re-calculate Balance Amount
    let amount = ANT.Attributes.getAttribute("ant_amount").getValue();
    let usedAmount = ANT.Attributes.getAttribute("ant_usedamount").getValue();
    let balanceAmount =
      (amount == undefined ? 0 : amount) -
      (usedAmount == undefined ? 0 : usedAmount);
    ANT.Attributes.getAttribute("ant_balanceamount").setValue(balanceAmount);
  }

  /* RETURN */
  return {
    OnLoad: OnLoad,
    OnSave: OnSave,
    Amount_OnChange: Amount_OnChange,
  };
})();
