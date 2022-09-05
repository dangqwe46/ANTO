using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
// NOT IN USE
namespace ANT.Plugin.ApproverList
{
    /// <summary>
    /// Approver List Creation
    /// Apply User Email Case User
    /// </summary>
    public class Create : IPlugin
    {
        IOrganizationService service;
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            service = factory.CreateOrganizationService(context.UserId);

            // Init Approval Entity Variables
            Entity Target = (Entity)context.InputParameters["Target"];
            string Email = string.Empty;
            string Guid = string.Empty;

            // Email
            if (Target.Attributes.ContainsKey("ant_email"))
            {
                Email = Target.GetAttributeValue<string>("ant_email");
            }
            else
            {
                // User
                var ApprovalType = Target.GetAttributeValue<OptionSetValue>("ant_approvaltype").Value;
                if (ApprovalType == 118950000)
                {
                    var User = Target.GetAttributeValue<EntityReference>("ant_user");
                    Email = getUserEmail(User.Id) + ";";
                    Guid = User.Id.ToString();
                }
                // Team
                else
                {
                    var Team = Target.GetAttributeValue<EntityReference>("ant_team");
                    var UserList = getUserFromTeam(Team.Id);
                    if (UserList.Entities.Count > 0)
                    {
                        foreach (var record in UserList.Entities)
                        {
                            string recordEmail = getUserEmail(record.GetAttributeValue<Guid>("systemuserid"));
                            Email += recordEmail + ";";
                            Guid += record.GetAttributeValue<Guid>("systemuserid").ToString() + ";";
                        }
                    }
                    else
                    {
                        Email = "Dummy@antsolution.vn";
                    }
                }
            }

            // Follow Emails          

            Target["ant_name"] = "Level " + Target.GetAttributeValue<int>("ant_place").ToString() + " Approval";
            Target["ant_email"] = Email;
            Target["ant_guids"] = Guid;
        }

        // Todo Add Target and Move to Class Helper
        public string getUserEmail(Guid SystemuserId)
        {
            var User = service.Retrieve("systemuser", SystemuserId, new ColumnSet("internalemailaddress"));
            return User.GetAttributeValue<string>("internalemailaddress");
        }

        public EntityCollection getUserFromTeam(Guid TeamId)
        {
            var fetch = $@"
                            <fetch no-lock='true'>
                            <entity name='teammembership'>                      
                            <attribute name='systemuserid'/>                          
                            <filter type='and'>
                            <condition attribute='teamid' operator='eq' value='{TeamId}'/>                           
                            </filter>
                            </entity>
                            </fetch>";
            var Userlist = service.RetrieveMultiple(new FetchExpression(fetch));
            return Userlist;
        }
    }
}
