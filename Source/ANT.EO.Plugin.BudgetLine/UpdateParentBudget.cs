using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANT.EO.Plugin.BudgetLine
{
    public class UpdateParentBudget : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);

            if (context.Depth <= 1 && context.MessageName.ToUpper() != "DELETE")
            {
                Entity entity = (Entity)context.InputParameters["Target"];
                UpdateBudgetLine(context, service, entity);
            }
            else
            {
                EntityReference recordRef = (EntityReference)context.InputParameters["Target"];
                Entity entity = service.Retrieve(recordRef.LogicalName, recordRef.Id, new ColumnSet("ant_approvalbudgetlineid", "ant_parentapprovalbudgetline", "ant_haschildbudgetline"));
                UpdateBudgetLine(context, service, entity);
            }
            
        }

        private void UpdateBudgetLine(IPluginExecutionContext context, IOrganizationService service, Entity entity)
        {
            if (context.MessageName.ToUpper() == "CREATE")
            {
                entity["ant_haschildbudgetline"] = false;
            }

            if (entity.Contains("ant_parentapprovalbudgetline"))
            {
                if (context.MessageName.ToUpper() != "DELETE")
                {
                    // Update Parent Budget Line
                    if (entity.GetAttributeValue<EntityReference>("ant_parentapprovalbudgetline") != null)
                    {
                        Entity parentLine = service.Retrieve(entity.LogicalName, entity.GetAttributeValue<EntityReference>("ant_parentapprovalbudgetline").Id, new ColumnSet("ant_haschildbudgetline"));
                        parentLine["ant_haschildbudgetline"] = true;
                        service.Update(parentLine);
                    } 
                }
                if (context.MessageName.ToUpper() == "UPDATE" || (context.MessageName.ToUpper() == "DELETE" && entity.Contains("ant_parentapprovalbudgetline")))
                {
                    // Check old parent budget line and update if there is no other child
                    Entity preData = (context.MessageName.ToUpper() == "UPDATE") ? context.PreEntityImages["PreImage"] : entity;
                    if (preData.Contains("ant_parentapprovalbudgetline") && preData.GetAttributeValue<EntityReference>("ant_parentapprovalbudgetline") != null)
                    {
                        string fetchXml =
                            $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                          <entity name='ant_approvalbudgetline'>
                            <attribute name='ant_approvalbudgetlineid' />
                            <attribute name='ant_name' />
                            <order attribute='ant_name' descending='false' />
                            <filter type='and'>
                              <condition attribute='ant_parentapprovalbudgetline' operator='eq' value='{preData.GetAttributeValue<EntityReference>("ant_parentapprovalbudgetline").Id}' />
                              <condition attribute='ant_approvalbudgetlineid' operator='ne' value='{entity.Id}' />
                            </filter>
                          </entity>
                        </fetch>";
                        var rows = service.RetrieveMultiple(new FetchExpression(fetchXml));
                        // If there is no other child budget line => update has child budget line = false
                        if (rows.Entities.Count == 0)
                        {
                            Entity oldParentBudgetLine = new Entity(entity.LogicalName, preData.GetAttributeValue<EntityReference>("ant_parentapprovalbudgetline").Id);
                            oldParentBudgetLine.Attributes.Add("ant_haschildbudgetline", false);
                            service.Update(oldParentBudgetLine);
                        }
                    } 
                }
            }
        }
    }
}
