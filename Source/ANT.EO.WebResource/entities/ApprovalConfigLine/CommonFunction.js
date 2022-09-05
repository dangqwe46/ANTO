// Approval Form Function

// Variables
var formContext;
var Msg1 = "Amount min must be greater than 0";
var IdMsg1 = "msg1";
var Msg2 = "Amount max must be greater than 0";
var IdMsg2 = "msg2";
var Msg3 = "Amount min must not be greater than Amount Max";
var IdMsg3 = "msg3";
//

function onLoadForm(source) {

    formContext = source.getFormContext();
    hideTabApprovallevelConfig();
};

// tab_approvalconfiglevel
// Hide in create form
function hideTabApprovallevelConfig() {
    var formType = formContext.ui.getFormType();
    if (formType == 1) {
        formContext.ui.tabs.get("tab_approvalconfiglevel").setVisible(false);
    } else formContext.ui.tabs.get("tab_approvalconfiglevel").setVisible(true);
};
