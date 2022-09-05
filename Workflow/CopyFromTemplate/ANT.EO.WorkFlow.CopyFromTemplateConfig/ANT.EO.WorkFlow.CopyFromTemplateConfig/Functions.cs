using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk.Workflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANT.EO.WorkFlow.CopyFromTemplateConfig
{
    public class Functions
    {
        public void Clone(IOrganizationService service, Entity target, IWorkflowContext context)
        {
            Entity entConfig = service.Retrieve(target.LogicalName, target.Id, new ColumnSet("ant_approvalconfigurationid", "ant_chooseatemplate", "ant_copyfromtemplate"));
            var approvalConfigId = entConfig.GetAttributeValue<Guid>("ant_approvalconfigurationid");
            var approvalConfigTemplateId = entConfig.GetAttributeValue<EntityReference>("ant_chooseatemplate")?.Id ?? Guid.Empty;
            if (approvalConfigTemplateId != Guid.Empty)
            {
                EntityCollection configLineRecords = QueryRecordConfigLine(service, approvalConfigTemplateId);
                CloneConfigLine(service, configLineRecords, approvalConfigId);
            }
        }
        public void CloneConfigLine(IOrganizationService service, EntityCollection configLineRecords, Guid approvalConfigId)
        {
            try
            {
                if (configLineRecords != null)
                {
                    foreach (Entity retrieve in configLineRecords.Entities)
                    {
                        var old_approvalConfigLineId = retrieve.GetAttributeValue<Guid>("ant_approvalconfiglineid");
                        //var old_approvalconfiglinename = retrieve.GetAttributeValue<String>("ant_name");
                        //Remove the primary key of the retrieved associated record
                        retrieve.Attributes.Remove("ant_approvalconfiglineid");
                        //Set the primary key value to Guid.NewGuid()
                        retrieve.Id = Guid.NewGuid();
                        //retrieve.Attributes.Remove("ant_name");
                        //retrieve.Attributes.Add("ant_name", old_approvalconfiglinename + "- COPY");
                        //Remove the parent record id of the retrieved associated record
                        retrieve.Attributes.Remove("ant_approvalconfigid");
                        EntityReference newConfigId = SetRefrence("ant_approvalconfigline", approvalConfigId);
                        retrieve.Attributes.Add("ant_approvalconfigid", newConfigId);
                        service.Create(retrieve);
                        // Clone Config Level follow Config Line 
                        EntityCollection configLevelRecords = QueryRecordConfigLevel(service, old_approvalConfigLineId);
                        CloneConfigLevel(service, configLevelRecords, retrieve.Id, approvalConfigId);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new InvalidPluginExecutionException("Error while trying to clone Line Record: " + ex.Message);
            }
        }
        public void CloneConfigLevel(IOrganizationService service, EntityCollection configLevelRecords, Guid configLineId, Guid configId)
        {
            try
            {
                if (configLevelRecords != null)
                {
                    foreach (Entity retrieve in configLevelRecords.Entities)
                    {
                        var old_approvalConfigLevelId = retrieve.GetAttributeValue<Guid>("ant_approvallevelconfigurationid");
                        //var old_approvalconfiglevelname = retrieve.GetAttributeValue<String>("ant_name");
                        //Remove the primary key of the retrieved associated record
                        retrieve.Attributes.Remove("ant_approvallevelconfigurationid");
                        //Set the primary key value to Guid.NewGuid()
                        retrieve.Id = Guid.NewGuid();
                        //retrieve.Attributes.Remove("ant_name");
                        //retrieve.Attributes.Add("ant_name", old_approvalconfiglevelname + "- COPY");
                        //Remove the parent record id of the retrieved associated record
                        retrieve.Attributes.Remove("ant_approvalconfiglineid");
                        retrieve.Attributes.Remove("ant_approvalconfiguration");
                        //init new referen ConfigLineId
                        EntityReference newConfigLineId = SetRefrence("ant_approvallevelconfiguration", configLineId);
                        //init new referen ConfigId
                        EntityReference newConfigId = SetRefrence("ant_approvallevelconfiguration", configId);

                        retrieve.Attributes.Add("ant_approvalconfiglineid", newConfigLineId);
                        retrieve.Attributes.Add("ant_approvalconfiguration", newConfigId);
                        service.Create(retrieve);
                        EntityCollection approverInConfigLevel = QueryApproverInConfigLevel(service, old_approvalConfigLevelId);
                        MappingApproverBetweenNewConfigLevel(service, approverInConfigLevel, retrieve.Id);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new InvalidPluginExecutionException("Error while trying to clone Level Record: " + ex.Message);
            }
        }
        public void MappingApproverBetweenNewConfigLevel(IOrganizationService service, EntityCollection queryApproverInConfigLevel, Guid configLevelId)
        {
            try
            {
                if (queryApproverInConfigLevel != null)
                {
                    var relatedEntities = new EntityReferenceCollection();
                    //Mapping N:N Config Line with Approver
                    foreach (Entity entity in queryApproverInConfigLevel.Entities)
                    {
                        relatedEntities.Add(new EntityReference("systemuser", entity.GetAttributeValue<Guid>("systemuserid")));
                    }
                    Relationship relationship = new Relationship("ant_approvallevelconfiguration_SystemUser");
                    service.Associate("ant_approvallevelconfiguration", configLevelId, relationship, relatedEntities);

                    /*AssociateRequest associate = new AssociateRequest()
                    {
                        Target = new EntityReference("ant_approvallevelconfiguration", configLevelId),
                        RelatedEntities = related,
                        Relationship = new Relationship("ant_approvallevelconfiguration_SystemUser")
                    };
                    service.Execute(associate);*/
                    /*foreach (Entity entity in queryApproverInConfigLevel.Entities)
                    {
                        AssociateRequest associate = new AssociateRequest()
                        {
                            Target = new EntityReference("ant_approvallevelconfiguration", configLevelId),
                            RelatedEntities = new EntityReferenceCollection()
                            {
                                new EntityReference("systemuser", entity.GetAttributeValue<Guid>("systemuserid"))
                            },
                            Relationship = new Relationship("ant_approvallevelconfiguration_SystemUser")
                        };
                        service.Execute(associate);
                    }*/

                }
            }
            catch (Exception ex)
            {
                throw new InvalidPluginExecutionException("Error while trying to clone Approver in Level Record: " + ex.Message);
            }
        }
        public EntityCollection QueryApproverInConfigLevel(IOrganizationService service, Guid configLevelId)
        {
            string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                <entity name='ant_approvallevelconfig_systemuser'>
                                <all-attributes/>
                                <filter type='and'>
                                    <condition attribute = 'ant_approvallevelconfigurationid' operator= 'eq' value = '{configLevelId}'/>
                                </filter>
                                </entity>
                                </fetch>";
            EntityCollection approversConfigLevel = service.RetrieveMultiple(new FetchExpression(fetchXml));
            if (approversConfigLevel.Entities.Count == 0) return null;
            return approversConfigLevel;
        }
        public EntityCollection QueryRecordConfigLine(IOrganizationService service, Guid approvalConfigTemplateId)
        {
            if (approvalConfigTemplateId != Guid.Empty)
            {
                string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                    <entity name='ant_approvalconfigline'>
                                    <all-attributes/>
                                    <filter type='and'>
                                        <condition attribute='statecode' operator='eq' value='0' />
                                        <condition attribute = 'ant_approvalconfigid' operator= 'eq' value = '{approvalConfigTemplateId}'/>
                                    </filter>
                                    </entity>
                                    </fetch>";
                EntityCollection approvalConfigLine = service.RetrieveMultiple(new FetchExpression(fetchXml));
                if (approvalConfigLine.Entities.Count == 0) return null;
                return approvalConfigLine;
            }
            else
            {
                return null;
            }
        }
        public EntityCollection QueryRecordConfigLevel(IOrganizationService service, Guid approvalConfigLineId)
        {
            if (approvalConfigLineId != Guid.Empty)
            {
                string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                    <entity name='ant_approvallevelconfiguration'>
                                    <all-attributes/>
                                <filter type='and'>
                                 <condition attribute='statecode' operator='eq' value='0' />
                                 <condition attribute = 'ant_approvalconfiglineid' operator= 'eq' value = '{approvalConfigLineId}'/>
                                 </filter>
                                 </entity>
                               </fetch>";
                EntityCollection approvalConfigLevel = service.RetrieveMultiple(new FetchExpression(fetchXml));
                if (approvalConfigLevel.Entities.Count == 0) return null;
                return approvalConfigLevel;
            }
            else
                return null;
        }
        public static EntityReference SetRefrence(string Ent, Guid entRef)
        {
            EntityReference r_EntRef = null;
            if (entRef != null) r_EntRef = new EntityReference(Ent, entRef);
            return r_EntRef;
        }
    }
}
