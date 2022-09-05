using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANT.EO.Plugin.HandleOnApprovalRequest
{
    public class HandleOnApprovalRequest : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);
            if (context.MessageName.ToUpper() == "CREATE")
            {

            }
            else if (context.MessageName.ToUpper() == "UPDATE")
            {

            }
            else if (context.MessageName.ToUpper() == "DELETE")
            {
                //=> Handle Delete
                EntityReference entityRef = (EntityReference)context.InputParameters["Target"];
                Entity entity = service.Retrieve(entityRef.LogicalName, entityRef.Id, new ColumnSet("statuscode"));
                bool isExist = IsExistingTransaction(context, service, entity);
                if (entity.GetAttributeValue<OptionSetValue>("statuscode").Value != (int)Business.STATUS_REASON.Draft)
                {
                    throw new InvalidPluginExecutionException(Business.ERR_MSG_01);
                }
                if (isExist)
                {
                    throw new InvalidPluginExecutionException(Business.ERR_MSG_02);
                }
            }
        }
        private static bool IsExistingTransaction(IPluginExecutionContext context, IOrganizationService service, Entity entity)
        {
            OptionSetValue entStatusCode = entity.GetAttributeValue<OptionSetValue>("statuscode");
            Guid recordId = entity.Id;
            //fecth Approval record use Config
            string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                      <entity name='ant_approval'>
                        <attribute name='ant_approvalid' />
                        <attribute name='statecode'/>
                        <attribute name='ant_approvalconfiguration'/>
                        <attribute name='ant_recordid'/>
                        <attribute name='ant_approvalconfiglineid'/>
                        <attribute name='statuscode'/>
                        <filter>
                          <condition attribute='ant_recordid' operator='eq' value='{recordId.ToString().Replace("{", "").Replace("}", "")}'/>
                        </filter>
                      </entity>
                    </fetch>";
            var rows = service.RetrieveMultiple(new FetchExpression(fetchXml));
            if (rows.Entities.Count >= 1)
            {
                return true;
            }
            else return false;
        }
    }
}
