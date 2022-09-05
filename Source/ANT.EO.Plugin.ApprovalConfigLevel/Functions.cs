using CrmEarlyBound;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANT.EO.Plugin.ApprovalLevelConfig
{
    static class Functions
    {
        public static void LinkUsersToConfigLevel(IOrganizationService service, ant_approvallevelconfiguration entity)
        {
            EntityReference team = entity.ant_team;
            EntityReferenceCollection users = GetListUsers(service, team.Id);
            if (users != null && users.Count > 0)
            {
                //Table name: ant_approvallevelconfig_systemuser
                Relationship relationship = new Relationship("ant_approvallevelconfiguration_SystemUser");
                service.Associate(entity.LogicalName, entity.Id, relationship, users);
            }
        }
        public static void DisassociateUsers(IOrganizationService service, ant_approvallevelconfiguration entity)
        {
            // Retrieve List users
            // table name: ant_approvallevelconfig_systemuser
            EntityReferenceCollection listUsers = GetAssociatedUsers(service, entity.Id);
            if (listUsers.Count > 0)
            {
                Relationship relationship = new Relationship("ant_approvallevelconfiguration_SystemUser");
                service.Disassociate(entity.LogicalName, entity.Id, relationship, listUsers);
            }
        }

        private static EntityReferenceCollection GetListUsers(IOrganizationService service, Guid teamId)
        {
            EntityReferenceCollection users = new EntityReferenceCollection();
            string fetchXml = 
                $@"<fetch>
                  <entity name='teammembership'>
                    <attribute name='systemuserid' />
                    <filter>
                      <condition attribute='teamid' operator='eq' value='{teamId}' />
                    </filter>
                  </entity>
                </fetch>";

            var results = service.RetrieveMultiple(new FetchExpression(fetchXml));
            foreach (Entity item in results.Entities)
            {
                users.Add(new EntityReference("systemuser", item.GetAttributeValue<Guid>("systemuserid")));
            }
            return users;
        }

        private static EntityReferenceCollection GetAssociatedUsers(IOrganizationService service, Guid approvallevelconfigurationId)
        {
            EntityReferenceCollection users = new EntityReferenceCollection();
            string fetchXml =
                $@"<fetch>
                  <entity name='ant_approvallevelconfig_systemuser'>
                    <attribute name='ant_approvallevelconfigurationid' />
                    <attribute name='systemuserid' />
                    <filter>
                      <condition attribute='ant_approvallevelconfigurationid' operator='eq' value='{approvallevelconfigurationId}' />
                    </filter>
                  </entity>
                </fetch>";

            var results = service.RetrieveMultiple(new FetchExpression(fetchXml));
            foreach (Entity item in results.Entities)
            {
                users.Add(new EntityReference("systemuser", item.GetAttributeValue<Guid>("systemuserid")));
            }
            return users;
        }
    }
}
