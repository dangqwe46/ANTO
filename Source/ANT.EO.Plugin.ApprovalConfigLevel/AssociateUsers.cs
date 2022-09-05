using ANT.EO.Plugin.ApprovalLevelConfig;
using CrmEarlyBound;
using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANT.EO.Plugin.ApprovalConfigLevel
{
    public class AssociateUsers : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);

            ant_approvallevelconfiguration entity = ((Entity)context.InputParameters["Target"]).ToEntity<ant_approvallevelconfiguration>();


            if (entity.Contains("ant_team") && entity.ant_team != null)
            {
                // If message = UPDATE => disassocciate first
                if (context.MessageName.ToUpper() == "UPDATE")
                {
                    Functions.DisassociateUsers(service, entity);
                }

                Functions.LinkUsersToConfigLevel(service, entity);
            }

        }
    }
}
