import * as ANT from "../../ANT.RE.Lib.Webresources/src/index";
import * as ANT from "../../ANT.RE.Lib.Webresources/src/global";


function ShowHideButtonRevise() {
  debugger;
  var currentUserId = ANT.FormContext.globalContext
    .getUserId()
    .replace("{", "")
    .replace("}", "");
var formtype=ANT.FormContext.getFormType();
  var statuscode = ANT.Attributes.getAttribute("statuscode").getValue();
  if ((statuscode === 100000000 && formtype!=1) || statuscode === 100000001) {
    var ownerRequest=ANT.Attributes.getAttribute("ownerid").getValue()[0].id.replace("{", "").replace("}", "");
    if(currentUserId==ownerRequest){
      return true;
    }
  } else false;
}

function ShowHideButtonRevise() {
  debugger;
  var currentUserId = ANT.FormContext.globalContext
  .getUserId()
  .replace("{", "")
  .replace("}", "");
  var statuscode = ANT.Attributes.getAttribute("statuscode").getValue();
  if (statuscode === 100000003||statuscode ===100000004) {
    var ownerRequest=ANT.Attributes.getAttribute("ownerid").getValue()[0].id.replace("{", "").replace("}", "");
    if(currentUserId==ownerRequest){
      return true;
    }
  } else false;
}
