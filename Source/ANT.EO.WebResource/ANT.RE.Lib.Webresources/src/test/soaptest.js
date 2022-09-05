
//Create Record
var createAccount = new ANT.SOAP.BusinessEntity("account");
createAccount.attributes["name"] = "Test Account Name";
createAccount.attributes["preferredcontactmethodcode"] = { value: 2, type: "OptionSetValue" };
createAccount.attributes["revenue"] = { value: 2000.00, type: "Money" };
createAccount.attributes["donotphone"] = false;
accountId = ANT.SOAP.EntityBase.Create(createAccount);

//Update Record
var updateContact = new ANT.SOAP.BusinessEntity("contact", contactId);
updateContact.attributes["firstname"] = "Diane";
updateContact.attributes["lastname"] = "Lopez";
updateContact.attributes["donotpostalmail"] = null;
updateContact.attributes["familystatuscode"] = { value: 2, type: "OptionSetValue" }; // Married
var updateResponse = ANT.SOAP.Update(updateContact);

//Delete
var deleteResponse = XrmServiceToolkit.Soap.Delete("contact", contactId);

//Retrieve Record
var cols = ["firstname", "lastname", "middlename"];
var retrievedContact = ANT.SOAP.Retrieve("contact", contactId, cols);

//Retrieve Multiple
var query =
    "<a:ColumnSet>" +
    "<a:AllColumns>false</a:AllColumns>" +
    "<a:Columns xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>" +
    "<c:string>firstname</c:string>" +
    "<c:string>lastname</c:string>" +
    "<c:string>middlename</c:string>" +
    "<c:string>familystatuscode</c:string>" +
    "<c:string>ownerid</c:string>" +
    "<c:string>creditlimit</c:string>" +
    "<c:string>birthdate</c:string>" +
    "<c:string>donotemail</c:string>" +
    "<c:string>donotphone</c:string>" +
    "</a:Columns>" +
    "</a:ColumnSet>" +
    "<a:Criteria>" +
    "<a:Conditions />" +
    "<a:FilterOperator>And</a:FilterOperator>" +
    "<a:Filters>" +
    "<a:FilterExpression>" +
    "<a:Conditions>" +
    "<a:ConditionExpression>" +
    "<a:AttributeName>contactid</a:AttributeName>" +
    "<a:Operator>Equal</a:Operator>" +
    "<a:Values xmlns:b='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>" +
    "<b:anyType i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>" + contactId + "</b:anyType>" +
    "</a:Values>" +
    "</a:ConditionExpression>" +
    "</a:Conditions>" +
    "<a:FilterOperator>And</a:FilterOperator>" +
    "<a:Filters />" +
    "</a:FilterExpression>" +
    "</a:Filters>" +
    "</a:Criteria>" +
    "<a:Distinct>false</a:Distinct>" +
    "<a:EntityName>contact</a:EntityName>" +
    "<a:LinkEntities />" +
    "<a:Orders />" +
    "<a:PageInfo>" +
    "<a:Count>0</a:Count>" +
    "<a:PageNumber>0</a:PageNumber>" +
    "<a:PagingCookie i:nil='true' />" +
    "<a:ReturnTotalRecordCount>false</a:ReturnTotalRecordCount>" +
    "</a:PageInfo>" +
    "<a:NoLock>false</a:NoLock>";

var retrievedContacts = ANT.SOAP.RetrieveMultiple(query);

//Fetch 
var fetchXml =
    "<fetch mapping='logical'>" +
    "<entity name='contact'>" +
    "<attribute name='contactid' />" +
    "<attribute name='firstname' />" +
    "<attribute name='lastname' />" +
    "<attribute name='middlename' />" +
    "<attribute name='familystatuscode' />" +
    "<attribute name='ownerid' />" +
    "<attribute name='creditlimit' />" +
    "<attribute name='birthdate' />" +
    "<attribute name='accountrolecode' />" +
    "<attribute name='donotemail' />" +
    "<attribute name='donotphone' />" +
    "<filter>" +
    "<condition attribute='contactid' operator='eq' value='" + contactId + "' />" +
    "</filter>" +
    "</entity>" +
    "</fetch>";

var retrievedContacts = ANT.SOAP.FetchKit.Fetch(fetchXml)
    .then(rs => {

    }).catch(er => {

    });

//Set State
var response = ANT.SOAP.SetState("contact", contactId, 1, 2);

//Associate
var account = new ANT.SOAP.BusinessEntity("account", accountId);
var relatedAccounts = new Array();
relatedAccounts[0] = account;
var response = ANT.SOAP.Associate("account_primary_contact", "contact", contactId, "account", relatedAccounts);

//Disassociate
var account = new ANT.SOAP.BusinessEntity("account", accountId);
var relatedAccounts = new Array();
relatedAccounts[0] = account;
var response = ANT.SOAP.Disassociate("account_primary_contact", "contact", contactId, "account", relatedAccounts);

//Assign
var assignResponse = XrmServiceToolkit.Soap.Assign("contact", contactId, "systemuser", currentUserId);




