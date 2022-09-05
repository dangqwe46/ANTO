using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Activities;
using Microsoft.Xrm.Sdk.Workflow;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace ANT.EO.Action.ApproveReject
{
    public class ApproveReject : CodeActivity
    {
        [Input("ApprovalRequestId")] // GuidId
        public InArgument<string> ApprovalRequestId { get; set; }
        [Input("Action")]
        public InArgument<string> Action { get; set; }
        [Input("Comment")]
        public InArgument<string> Comment { get; set; }
        [Output("ErrorMessage")]
        public OutArgument<string> ErrorMessage { get; set; }
        IOrganizationService sv;
        protected override void Execute(CodeActivityContext executionContext)
        {
            ITracingService tracer = executionContext.GetExtension<ITracingService>();
            IWorkflowContext context = executionContext.GetExtension<IWorkflowContext>();
            IOrganizationServiceFactory serviceFactory = executionContext.GetExtension<IOrganizationServiceFactory>();
            sv = serviceFactory.CreateOrganizationService(context.UserId);
            string requestId = ApprovalRequestId.Get(executionContext);
            string action = Action.Get(executionContext);
            string comment = Comment.Get(executionContext);
            Guid userId = context.UserId;
            Actions(context, sv, Guid.Parse(requestId), userId, action, comment);
        }
        public void Actions(IWorkflowContext context, IOrganizationService sv, Guid requestId, Guid userId, string action, string comment)
        {
            //Retrieve Approval Record
            Entity approvalrecord = Funtions.ApprovalRecord(sv, requestId);
            if (approvalrecord != null)
            {
                Guid approvalrecordId = approvalrecord.Id;
                int currentset = approvalrecord.GetAttributeValue<int>("ant_currentset");
                Entity currentlevel = Funtions.CurrentApprovalLevel(sv, approvalrecordId, currentset, action);
                if (currentlevel != null)
                {
                    string err = "";
                    Guid currentlevelId = currentlevel.Id;
                    err = Funtions.DoubleCheckUserInLevelDetail(sv, currentlevelId, userId);
                    if (err != "" && (action.ToUpper() == "APPROVE" || action.ToUpper() == "REJECT"))
                    {
                        throw new Exception(err);
                    }
                    else if (err == "")
                    {
                        Entity currentleveldetail = Funtions.CurrentApprovalLevelDetail(sv, currentlevelId, userId, action);

                        if (currentleveldetail != null)
                        {
                            UpdateApprovalLevelDetail(sv, currentleveldetail, action, comment);
                        }
                        else if (currentleveldetail == null && (action.ToUpper() == "APPROVE" || action.ToUpper() == "REJECT"))
                        { throw new Exception("Not get current approval level detail"); }

                    }
/*                    if (action.ToUpper() == "CANCEL")
                    {
                        UpdateApprovalLevel(sv, currentlevel);
                    }*/
                }
                else if (currentlevel == null && (action.ToUpper() == "APPROVE" || action.ToUpper() == "REJECT"))
                { throw new Exception("Not get current approval level"); }
                if (action.ToUpper() == "CANCEL")
                {
                    UpdateApprovalRecord(sv, approvalrecord);
                }
            }
            else if (approvalrecord == null && (action.ToUpper() == "APPROVE" || action.ToUpper() == "REJECT"))
            {
                throw new Exception("Not get current approval record");
            }
            if (action.ToUpper() == "CANCEL")
            {
                Entity request = sv.Retrieve("ant_approvalrequest", requestId, new ColumnSet("statecode", "statuscode"));
                UpdateApprovalRequest(sv, request);
            }
        }
        public static void UpdateApprovalLevelDetail(IOrganizationService sv, Entity levelDetail, string action, string comment)
        {

            //Action Using MS Approval is No
            levelDetail.Attributes["ant_actionusingmsapproval"] = false;
            if (action.ToUpper() == "APPROVE")
            {
                //100000001: Pending
                levelDetail.Attributes["statecode"] = new OptionSetValue(0);
                levelDetail.Attributes["statuscode"] = new OptionSetValue(100000001);
                levelDetail.Attributes["ant_action"] = "Approve";
                levelDetail.Attributes["ant_actiondate"] = DateTime.Now;
                levelDetail.Attributes["ant_comment"] = comment;
            }
            else if (action.ToUpper() == "REJECT")
            {
                //100000001: Pending
                levelDetail.Attributes["statecode"] = new OptionSetValue(0);
                levelDetail.Attributes["statuscode"] = new OptionSetValue(100000001);
                levelDetail.Attributes["ant_action"] = "Reject";
                levelDetail.Attributes["ant_actiondate"] = DateTime.Now;
                levelDetail.Attributes["ant_comment"] = comment;
            }
            /*            else if (action.ToUpper() == "CANCEL")
                        {
                            //Cancel by requester
                            //Cancel current level detail
                            //100000004: Cancel
                            levelDetail.Attributes["statecode"] = new OptionSetValue(1);
                            levelDetail.Attributes["statuscode"] = new OptionSetValue(100000004);              
                        }*/
            sv.Update(levelDetail);
        }
        public static void UpdateApprovalLevel(IOrganizationService sv, Entity level)
        {
            //Cancel by requester
            //Cancel current level
            //100000005: Cancel
            level.Attributes["statecode"] = new OptionSetValue(1);
            level.Attributes["statuscode"] = new OptionSetValue(100000005);
            sv.Update(level);
        }
        public static void UpdateApprovalRecord(IOrganizationService sv, Entity record)
        {
            //Cancel by requester
            //Cancel current record
            //100000004: Cancel
            record.Attributes["statecode"] = new OptionSetValue(1);
            record.Attributes["statuscode"] = new OptionSetValue(100000004);
            record.Attributes["ant_approvalfinishresponse"] = "CANCELED";
            sv.Update(record);
        }
        public static void UpdateApprovalRequest(IOrganizationService sv, Entity request)
        {
            //Cancel by requester
            //Cancel current request
            //100000004: Cancel
            request.Attributes["statecode"] = new OptionSetValue(1);
            request.Attributes["statuscode"] = new OptionSetValue(100000004);
            sv.Update(request);
        }
    }
}
