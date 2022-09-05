using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANT.EO.Action.ApproveReject
{
    public static class Funtions
    {
        public static Entity ApprovalRecord(IOrganizationService sv, Guid requestId)
        {
            string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                              <entity name='ant_approval'>
                                <attribute name='ant_name' />
                                <attribute name='ant_approvalid' />
                                <attribute name='ant_currentset' />
                                <attribute name='ant_recordid' />
                                <attribute name='ant_approvalfinishresponse' />
                                <attribute name='statuscode' />
                                <filter type='and'>
                                  <condition attribute='ant_recordid' operator='eq' value='{requestId.ToString().Replace("{", "").Replace("}", "")}' />                                    
                                </filter>
                                <order attribute='ant_requestedon' descending='true' />
                              </entity>
                            </fetch>";
            var rows = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            if (rows.Entities.Count > 0)
            {
                return rows[0];
            }
            else
            {
                return null;
            }
        }
        public static Entity CurrentApprovalLevel(IOrganizationService sv, Guid recordId, int currentLevel, string action)
        {
            string condition = $@"<condition attribute='statecode' operator='eq' value='0' />
                              <condition attribute='ant_approval' operator='eq' value='{recordId}' />";
            if (action.ToUpper() != "CANCEL")
            {
                condition += $@"<condition attribute='ant_place' operator='eq' value='{currentLevel}' />";
            }
            string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                          <entity name='ant_approvallevel'>
                            <attribute name='ant_approvallevelid' />
                            <attribute name='ant_place' />
                            <attribute name='ant_approval' />
                            <attribute name='statecode' />
                            <filter type='and'>
                             {condition}                              
                            </filter>
                          </entity>
                        </fetch>";
            var rows = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            if (rows.Entities.Count > 0)
            {
                return rows[0];
            }
            else
            {
                return null;
            }
        }
        public static Entity CurrentApprovalLevelDetail(IOrganizationService sv, Guid levelId, Guid userId, string action)
        {
            string condition = $@"<condition attribute='statecode' operator='eq' value='0' />
                                  <condition attribute='ant_approvallevel' operator='eq' value='{levelId}' />";
            if (action.ToUpper() != "CANCEL")
            {
                condition += $@"<condition attribute='ant_user' operator='eq' value='{userId}'/>";
            }
            string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                              <entity name='ant_approvalleveldetail'>
                                <attribute name='ant_approvalleveldetailid' />
                                <attribute name='ant_approvallevel' />
                                <attribute name='ant_user' />
                                <attribute name='statecode' />
                                <filter type='and'>
                                {condition}
                                </filter>
                              </entity>
                            </fetch>";
            var rows = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            if (rows.Entities.Count > 0)
            {
                return rows[0];
            }
            else
            {
                return null;
            }
        }
        public static string DoubleCheckUserInLevelDetail(IOrganizationService sv, Guid levelId, Guid userId)
        {
            string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                              <entity name='ant_approvalleveldetail'>
                                <attribute name='ant_approvalleveldetailid' />
                                <attribute name='ant_approvallevel' />
                                <attribute name='ant_user' />
                                <attribute name='statecode' />
                                <filter type='and'>
                                  <condition attribute='ant_approvallevel' operator='eq' value='{levelId}' />
                                  <condition attribute='ant_user' operator='eq' value='{userId}' />
                                </filter>
                              </entity>
                            </fetch>";
            var rows = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            if (rows.Entities.Count > 0)
            {
                string err = "";
                return err;
            }
            else
            {
                string err = "No assigned in current level";
                return err;
            }
        }
    }
}
