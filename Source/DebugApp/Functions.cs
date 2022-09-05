using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DebugApp
{
    static class Functions
    {
        public static EntityCollection getApprovalConfiguration(IOrganizationService sv, ApplyTo condition)
        {
            string filter = "";
            //Filter by Transaction Date
            filter += $@"<filter type='and' >
                              <filter type='or' >
                                <condition attribute='ant_startdate' operator='null' />
                                <condition attribute='ant_startdate' operator='on-or-before' value='{condition.TransactionDate}' />
                              </filter>
                              <filter type='or' >
                                <condition attribute='ant_enddate' operator='null' />
                                <condition attribute='ant_enddate' operator='on-or-after' value='{condition.TransactionDate}' />
                              </filter>
                            </filter>";

            //Filter by Dimension Value
            if (condition.DimensionValue != null)
            {
                filter += $@"<filter type='or'>
                              <condition attribute='ant_dimensionvalue' operator='eq' value='{condition.DimensionValue.Id}' />
                              <condition attribute='ant_dimensionvalue' operator='null' />
                            </filter>";
            }
            else
            {
                filter += "<condition attribute='ant_dimensionvalue' operator='null' />";
            }

            //Filter By BU
            if (condition.BusinessUnit != null)
            {
                filter += $@"<filter type='or'>
                              <condition attribute='ant_businessunit' operator='eq' value='{condition.BusinessUnit.Id}' />
                              <condition attribute='ant_businessunit' operator='null' />
                            </filter>";
            }
            else
            {
                filter += "<condition attribute='ant_businessunit' operator='null' />";
            }

            //Filter By Project
            if (condition.Project != null)
            {
                filter += $@"<filter type='or'>
                              <condition attribute='ant_project' operator='eq' value='{condition.Project.Id}' />
                              <condition attribute='ant_project' operator='null' />
                            </filter>";
            }
            else
            {
                filter += "<condition attribute='ant_project' operator='null' />";
            }
            //Filter By Approval Code
            if (string.IsNullOrEmpty(condition.ApprovalCode) == false)
            {
                filter += $@"<filter type='or'>
                              <condition attribute='ant_approvalcode' operator='eq' value='{condition.ApprovalCode}' />
                              <condition attribute='ant_approvalcode' operator='null' />
                            </filter>";
            }
            else
            {
                filter += "<condition attribute='ant_approvalcode' operator='null' />";
            }

            string fetchXml = string.Empty;
            fetchXml =
             $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                  <entity name='ant_approvalconfiguration'>
                    <all-attributes />                   
                    <filter type='and'>
                      <condition attribute='ant_entity' operator='eq' value='{condition.EntityName}' />
                      <condition attribute='statecode' operator='eq' value='{0}' />
                      {filter}
                    </filter>
                    <order attribute='ant_order' />
                  </entity>
                </fetch>";


            EntityCollection relatedConfigs = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            return relatedConfigs;
        }
    }
}
