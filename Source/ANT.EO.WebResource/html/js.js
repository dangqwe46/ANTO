function ShowRelatedContacts(primaryControl)
{
    var formContext = primaryControl;
    var accountID = formContext.data.entity.getId();
    var webresourceName = "crcfa_contactsws.html";
    var windowOptions = { height: 600, width: 700 };

    Xrm.Navigation.openWebResource(webresourceName, windowOptions, accountID);
}