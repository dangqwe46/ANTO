!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ANT=e():t.ANT=e()}(self,(function(){return(()=>{"use strict";var t={472:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Attribute=void 0;var i=function(){function t(t){this.name=t,this.name=t,this._attribute=formContext.getAttribute(t)}return t.prototype.addOnChange=function(t){var e,i;(null===(e=this._attribute)||void 0===e?void 0:e.addOnChange)&&(null===(i=this._attribute)||void 0===i||i.addOnChange(t))},t.prototype.fireOnChange=function(){var t,e;(null===(t=this._attribute)||void 0===t?void 0:t.fireOnChange)&&(null===(e=this._attribute)||void 0===e||e.fireOnChange())},t.prototype.getAttributeType=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getAttributeType)&&(null===(e=this._attribute)||void 0===e?void 0:e.getAttributeType())},t.prototype.getFormat=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getFormat)&&(null===(e=this._attribute)||void 0===e?void 0:e.getFormat())},t.prototype.getInitialValue=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getInitialValue)&&(null===(e=this._attribute)||void 0===e?void 0:e.getInitialValue())},t.prototype.getIsDirty=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getIsDirty)&&(null===(e=this._attribute)||void 0===e?void 0:e.getIsDirty())},t.prototype.getIsPartyList=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getIsPartyList)&&(null===(e=this._attribute)||void 0===e?void 0:e.getIsPartyList())},t.prototype.getMax=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getMax)&&(null===(e=this._attribute)||void 0===e?void 0:e.getMax())},t.prototype.getMaxLength=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getMaxLength)&&(null===(e=this._attribute)||void 0===e?void 0:e.getMaxLength())},t.prototype.getMin=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getMin)&&(null===(e=this._attribute)||void 0===e?void 0:e.getMin())},t.prototype.getName=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getName)&&(null===(e=this._attribute)||void 0===e?void 0:e.getName())},t.prototype.getOption=function(t){var e,i;return(null===(e=this._attribute)||void 0===e?void 0:e.getOption)&&(null===(i=this._attribute)||void 0===i?void 0:i.getOption(t))},t.prototype.getOptions=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getOptions)&&(null===(e=this._attribute)||void 0===e?void 0:e.getOptions())},t.prototype.getParent=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getParent)&&(null===(e=this._attribute)||void 0===e?void 0:e.getParent())},t.prototype.getPrecision=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getPrecision)&&(null===(e=this._attribute)||void 0===e?void 0:e.getPrecision())},t.prototype.getRequiredLevel=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getRequiredLevel)&&(null===(e=this._attribute)||void 0===e?void 0:e.getRequiredLevel())},t.prototype.getSelectedOption=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getSelectedOption)&&(null===(e=this._attribute)||void 0===e?void 0:e.getSelectedOption())},t.prototype.getSubmitMode=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getSubmitMode)&&(null===(e=this._attribute)||void 0===e?void 0:e.getSubmitMode())},t.prototype.getText=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getText)&&(null===(e=this._attribute)||void 0===e?void 0:e.getText())},t.prototype.getUserPrivilege=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getUserPrivilege)&&(null===(e=this._attribute)||void 0===e?void 0:e.getUserPrivilege())},t.prototype.getValue=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.getValue)&&(null===(e=this._attribute)||void 0===e?void 0:e.getValue())},t.prototype.isValid=function(){var t,e;return(null===(t=this._attribute)||void 0===t?void 0:t.isValid)&&(null===(e=this._attribute)||void 0===e?void 0:e.isValid())},t.prototype.removeOnChange=function(t){var e,i;(null===(e=this._attribute)||void 0===e?void 0:e.removeOnChange)&&(null===(i=this._attribute)||void 0===i||i.removeOnChange(t))},t.prototype.setIsValid=function(t,e){var i,o;(null===(i=this._attribute)||void 0===i?void 0:i.setIsValid)&&(null===(o=this._attribute)||void 0===o||o.setIsValid(t,e))},t.prototype.setPrecision=function(t){var e,i;(null===(e=this._attribute)||void 0===e?void 0:e.setPrecision)&&(null===(i=this._attribute)||void 0===i||i.setPrecision(t))},t.prototype.setRequiredLevel=function(t){var e,i;(null===(e=this._attribute)||void 0===e?void 0:e.setRequiredLevel)&&(null===(i=this._attribute)||void 0===i||i.setRequiredLevel(t))},t.prototype.setSubmitMode=function(t){var e,i;(null===(e=this._attribute)||void 0===e?void 0:e.setSubmitMode)&&(null===(i=this._attribute)||void 0===i||i.setSubmitMode(t))},t.prototype.setValue=function(t){var e,i;(null===(e=this._attribute)||void 0===e?void 0:e.setValue)&&(null===(i=this._attribute)||void 0===i||i.setValue(t))},t}();e.Attribute=i},234:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Attributes=void 0;var o=i(472),r=function(){function t(){}return t.prototype.getAttribute=function(t){return new o.Attribute(t)},t.prototype.setRequiredLevels=function(t,e){for(var i,o=0,r=t;o<r.length;o++){var n=r[o];null===(i=this.getAttribute(n))||void 0===i||i.setRequiredLevel(e)}},t.prototype.setSubmitModes=function(t,e){for(var i,o=0,r=t;o<r.length;o++){var n=r[o];null===(i=this.getAttribute(n))||void 0===i||i.setSubmitMode(e)}},t}();e.Attributes=r},960:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Controls=void 0;e.Controls=function(){}},198:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Dialog=void 0;e.Dialog=function(){}},999:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Entity=void 0;e.Entity=function(){}},157:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.FormContext=void 0;var i=function(){function t(){}return t.prototype.getFormContext=function(t,e){e?void 0===top.formContext&&(top.formContext=t):void 0===window.formContext&&(window.formContext=t)},t}();e.FormContext=i},397:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.GlobalContext=void 0;e.GlobalContext=function(){}},145:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.GridContext=void 0;e.GridContext=function(){}},218:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Logger=void 0;e.Logger=function(){}},977:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Navigate=void 0;e.Navigate=function(){}},852:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.OData=void 0;e.OData=function(){}},262:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Process=void 0;e.Process=function(){}},876:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.SOAP=void 0;e.SOAP=function(){}},926:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Utility=void 0;e.Utility=function(){}},641:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Validation=void 0;e.Validation=function(){}},748:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Lib=void 0;var o=i(641),r=i(926),n=i(876),u=i(262),l=i(852),d=i(977),a=i(218),v=i(145),s=i(397),b=i(234),p=i(960),c=i(198),g=i(999),f=i(157),_=function(){function t(){}return t.Attributes=new b.Attributes,t.Controls=new p.Controls,t.Dialog=new c.Dialog,t.Entity=new g.Entity,t.FormContext=new f.FormContext,t.GlobalContext=new s.GlobalContext,t.GridContext=new v.GridContext,t.Logger=new a.Logger,t.Navigate=new d.Navigate,t.OData=new l.OData,t.Process=new u.Process,t.SOAP=new n.SOAP,t.Utility=new r.Utility,t.Validation=new o.Validation,t}();e.Lib=_},501:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Message=void 0;e.Message=function(){}},838:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Webresource=void 0;e.Webresource=function(){}}},e={};function i(o){var r=e[o];if(void 0!==r)return r.exports;var n=e[o]={exports:{}};return t[o](n,n.exports,i),n.exports}var o={};return(()=>{var t=o;Object.defineProperty(t,"__esModule",{value:!0}),t.Message=t.Webresource=t.Lib=void 0;var e=i(748);Object.defineProperty(t,"Lib",{enumerable:!0,get:function(){return e.Lib}});var r=i(838);Object.defineProperty(t,"Webresource",{enumerable:!0,get:function(){return r.Webresource}});var n=i(501);Object.defineProperty(t,"Message",{enumerable:!0,get:function(){return n.Message}})})(),o})()}));