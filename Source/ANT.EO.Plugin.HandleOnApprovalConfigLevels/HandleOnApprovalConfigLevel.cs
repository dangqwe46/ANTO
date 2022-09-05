using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANT.EO.Plugin.HandleOnApprovalConfigLevels
{
    public class HandleOnApprovalConfigLevel : IPlugin
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
                ////=>Handle Error: pre Status Reason Draf,Publish,Inactive
                Entity entity = (Entity)context.InputParameters["Target"];
                Entity preData = context.PreEntityImages["PreImage"];
                int levelType = entity.Contains("ant_leveltype")
                ? entity.GetAttributeValue<OptionSetValue>("ant_leveltype").Value
                : preData.GetAttributeValue<OptionSetValue>("ant_leveltype").Value;
                int approvalType = entity.Contains("ant_approvaltype")
                                ? entity.GetAttributeValue<OptionSetValue>("ant_approvaltype").Value
                                : preData.GetAttributeValue<OptionSetValue>("ant_approvaltype").Value;
                OptionSetValue entStatusReason = entity.GetAttributeValue<OptionSetValue>("statuscode");
                OptionSetValue entState = entity.GetAttributeValue<OptionSetValue>("statecode");
                OptionSetValue preStatusReason = preData.GetAttributeValue<OptionSetValue>("statuscode");
                OptionSetValue preState = preData.GetAttributeValue<OptionSetValue>("statecode");
                ////=>Handle Error: pre Status Reason Draf,Publish,Inactive
                CheckPreStatusReason(context, service, entity);
                #region Level only 1 Final Approve published
                bool overLap = IsOverLapFinalApprove(context, service, preData, entity);
                if (levelType == (int)Business.LEVEL_TYPE.FINAL_APPROVER && overLap)
                {
                    throw new InvalidPluginExecutionException(Business.ERR_MSG_05);
                }
                #endregion                
                #region  Level can publish when approver not blank
                bool isNotExistingApprover = IsNotExistingApprover(context, service, preData, entity);
                if (
                    (approvalType == (int)Business.APPROVAL_TYPE.TEAM || approvalType == (int)Business.APPROVAL_TYPE.USERS)
                    && (
                        entity.Contains("statuscode")
                        && entStatusReason.Value == (int)Business.STATUS_REASON.Published
                        && preStatusReason.Value == (int)Business.STATUS_REASON.Draft
                        )
                    && isNotExistingApprover)
                {
                    throw new InvalidPluginExecutionException(Business.ERR_MSG_11);
                }
                #endregion
                #region Action when Deactive success
                if (entity.Contains("statecode") && entState.Value == (int)Business.STATUS.Inactive && preStatusReason.Value == (int)Business.STATUS_REASON.Published)
                {
                    DeactiveLevel(context, service, preData, entity);
                }
                #endregion

            }
            else if (context.MessageName.ToUpper() == "DELETE")
            {
                //=> Handle Delete
                EntityReference entityRef = (EntityReference)context.InputParameters["Target"];
                Entity entity = service.Retrieve(entityRef.LogicalName, entityRef.Id, new ColumnSet("statuscode"));
                bool isExist = IsExistingTransaction(context, service, entity);
                if (entity.GetAttributeValue<OptionSetValue>("statuscode").Value != (int)Business.STATUS_REASON.Draft)
                {
                    throw new InvalidPluginExecutionException(Business.ERR_MSG_08);
                }
                if (isExist)
                {
                    throw new InvalidPluginExecutionException(Business.ERR_MSG_07);
                }
            }
        }
        private static bool IsOverLapFinalApprove(IPluginExecutionContext context, IOrganizationService service, Entity preData, Entity entity)
        {
            Guid configLineId = entity.Contains("ant_approvalconfiglineid")
                            ? entity.GetAttributeValue<EntityReference>("ant_approvalconfiglineid").Id
                            : preData.GetAttributeValue<EntityReference>("ant_approvalconfiglineid").Id;
            Guid levelId = entity.Id;
            string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                  <entity name='ant_approvallevelconfiguration'>
                                    <attribute name='ant_approvallevelconfigurationid' />
                                    <attribute name='ant_approvalconfiglineid' />
                                    <attribute name='statuscode' />
                                    <attribute name='ant_leveltype' />
                                    <filter>
                                      <condition attribute='ant_approvalconfiglineid' operator='eq' value='{configLineId}' />
                                      <condition attribute='statuscode' operator='eq' value='{(int)Business.STATUS_REASON.Published}' />
                                      <condition attribute='ant_leveltype' operator='eq' value='{(int)Business.LEVEL_TYPE.FINAL_APPROVER}' />
                                      <condition attribute='ant_approvallevelconfigurationid' operator='ne' value='{levelId}' />
                                    </filter>
                                  </entity>
                                </fetch>";
            var rows = service.RetrieveMultiple(new FetchExpression(fetchXml));
            if (rows.Entities.Count >= 1)
            {
                return true;
            }
            return false;
        }
        private void CheckPreStatusReason(IPluginExecutionContext context, IOrganizationService service, Entity entity)
        {
            Entity preData = context.PreEntityImages["PreImage"];
            OptionSetValue entStatusReason = entity.GetAttributeValue<OptionSetValue>("statuscode");
            OptionSetValue entState = entity.GetAttributeValue<OptionSetValue>("statecode");
            OptionSetValue preStatusReason = preData.GetAttributeValue<OptionSetValue>("statuscode");
            OptionSetValue preState = preData.GetAttributeValue<OptionSetValue>("statecode");
            /*            int conditionType = entity.Contains("ant_conditiontype")
                                            ? entity.GetAttributeValue<OptionSetValue>("ant_conditiontype").Value
                                            : preData.GetAttributeValue<OptionSetValue>("ant_conditiontype").Value;*/

            //throw new InvalidPluginExecutionException($"{preStartDate.ToString()} | {currentDate.ToLocalTime().ToString("dd/MM/yyyy hh:mm:ss")}");
            //Draf can Publish, else can not
            if (entity.Contains("statuscode")
                && entStatusReason.Value == (int)Business.STATUS_REASON.Published
                && preStatusReason.Value != (int)Business.STATUS_REASON.Draft)
            {
                throw new InvalidPluginExecutionException(Business.ERR_MSG_01);
            }
            /*            if (conditionType == (int)Business.CONDITION_TYPE.SIMPLE)
                        {
                            DateTime preStartDate = (entity.Contains("ant_datemin")) ? entity.GetAttributeValue<DateTime>("ant_datemin") : preData.GetAttributeValue<DateTime>("ant_datemin");
                            DateTime currentDate = DateTime.Now;
                            //Draf can Publish but StartDate >= current date, else can not
                            TimeSpan ts = new TimeSpan(0, 0, 0);
                            currentDate = currentDate.Date + ts;
                            preStartDate = preStartDate.Date + ts;
                            if (entity.Contains("statuscode")
                                && entStatusReason.Value == (int)Business.STATUS_REASON.Published
                                && preStatusReason.Value == (int)Business.STATUS_REASON.Draft
                                && preStartDate < currentDate)
                            {
                                throw new InvalidPluginExecutionException(Business.ERR_MSG_02);
                            }
                        }*/
            // Draft & Inactive can Active, else can not
            if (entity.Contains("statecode") && entity.Contains("statuscode")
                && entState.Value == (int)Business.STATUS.Active
                && preState.Value != (int)Business.STATUS.Inactive
                && preStatusReason.Value != (int)Business.STATUS_REASON.Draft)
            {
                throw new InvalidPluginExecutionException(Business.ERR_MSG_03);
            }
            if (entity.Contains("statecode")
                && entState.Value == (int)Business.STATUS.Inactive
                && preStatusReason.Value != (int)Business.STATUS_REASON.Published)
            {
                throw new InvalidPluginExecutionException(Business.ERR_MSG_04);
            }
        }
        private static bool IsExistingTransaction(IPluginExecutionContext context, IOrganizationService service, Entity entity)
        {
            OptionSetValue entStatusCode = entity.GetAttributeValue<OptionSetValue>("statuscode");
            Guid recordId = entity.Id;
            //fecth Approval record use Config Line
            string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                  <entity name='ant_approvallevel'>
                                    <attribute name='ant_approvallevelconfig' />
                                    <filter>
                                      <condition attribute='ant_approvallevelconfig' operator='eq' value='{recordId}' />
                                    </filter>
                                  </entity>
                                </fetch>";
            var rows = service.RetrieveMultiple(new FetchExpression(fetchXml));
            if (rows.Entities.Count >= 1)
            {
                return true;
            }
            return false;
        }
        private static void DeactiveLevel(IPluginExecutionContext context, IOrganizationService service, Entity preData, Entity entity)
        {
            //Retrive parent Config Line => Update Deactive State
            Guid configLineId = entity.Contains("ant_approvalconfiglineid")
                        ? entity.GetAttributeValue<EntityReference>("ant_approvalconfiglineid").Id
                        : preData.GetAttributeValue<EntityReference>("ant_approvalconfiglineid").Id;
            Entity configLine = service.Retrieve("ant_approvalconfigline", configLineId, new ColumnSet("statuscode", "statecode", "ant_approvalconfiglineid"));
            if (configLine.GetAttributeValue<OptionSetValue>("statuscode").Value == (int)Business.STATUS_REASON.Published)
            {
                configLine["statecode"] = new OptionSetValue(1);
                configLine["statuscode"] = new OptionSetValue(100000003);
                service.Update(configLine);
                CancelRequest(context, service, preData, entity);
            }
        }
        private static void CancelRequest(IPluginExecutionContext context, IOrganizationService service, Entity preData, Entity entity)
        {
            Guid configLineId = entity.Contains("ant_approvalconfiglineid")
            ? entity.GetAttributeValue<EntityReference>("ant_approvalconfiglineid").Id
            : preData.GetAttributeValue<EntityReference>("ant_approvalconfiglineid").Id;
            //Retrieve Approval Records
            string fetchXmlRecords = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                              <entity name='ant_approval'>
                                <attribute name='ant_approvalconfiguration' />
                                <attribute name='ant_approvalconfiglineid' />
                                <attribute name='ant_approvalid' />
                                <attribute name='ant_recordid' />
                                <attribute name='statuscode' />
                                <attribute name='statecode' />
                                <attribute name='ant_approvalfinishresponse' />
                                <filter>
                                  <condition attribute='ant_approvalconfiglineid' operator='eq' value='{configLineId}'/>
                                  <condition attribute='statecode' operator='eq' value='0'/>
                                  <filter type='or'>
                                    <condition attribute='ant_approvalfinishresponse' operator='null' />
                                  </filter>
                                </filter>
                              </entity>
                            </fetch>";
            var approvalRecords = service.RetrieveMultiple(new FetchExpression(fetchXmlRecords));
            if (approvalRecords.Entities.Count >= 1)
            {
                foreach (Entity approvalRecord in approvalRecords.Entities)
                {
                    // Cancel All Approval Record lookup Config Line => Status Canceled
                    approvalRecord["statecode"] = new OptionSetValue(1);
                    approvalRecord["statuscode"] = new OptionSetValue(100000004); //Canceled
                    service.Update(approvalRecord);
                    //Retrieve Approval Levels
                    string fetchXmlApprovalLevels = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                                      <entity name='ant_approvallevel'>
                                                        <attribute name='ant_approval' />
                                                        <attribute name='statecode' />
                                                        <attribute name='statuscode' />
                                                        <filter>
                                                          <condition attribute='ant_approval' operator='eq' value='{approvalRecord.Id}' />
                                                          <condition attribute='statecode' operator='eq' value='0'/>
                                                        </filter>
                                                      </entity>
                                                    </fetch>";
                    var approvalLevels = service.RetrieveMultiple(new FetchExpression(fetchXmlApprovalLevels));
                    if (approvalLevels.Entities.Count >= 1)
                    {
                        foreach (Entity approvalLevel in approvalLevels.Entities)
                        {
                            //Cancel All Approval Level look to Approval Record => Status Canceled
                            approvalLevel["statecode"] = new OptionSetValue(1);
                            approvalLevel["statuscode"] = new OptionSetValue(100000005); //Canceled
                            service.Update(approvalLevel);
                            // Retrieve Approval Level Detail
                            string fetchXmlApprovalDetails = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                                          <entity name='ant_approvalleveldetail'>
                                                            <attribute name='ant_approvallevel' />
                                                            <attribute name='statuscode' />
                                                            <attribute name='statecode' />
                                                            <filter>
                                                              <condition attribute='ant_approvallevel' operator='eq' value='{approvalLevel.Id}' />
                                                              <condition attribute='statecode' operator='eq' value='0'/>
                                                            </filter>
                                                          </entity>
                                                        </fetch>";
                            var approvalDetails = service.RetrieveMultiple(new FetchExpression(fetchXmlApprovalDetails));
                            if (approvalLevels.Entities.Count >= 1)
                            {
                                foreach (Entity approvalDetail in approvalDetails.Entities)
                                {   //Cancel All Approval Level Detail in Config Level => Status Canceled
                                    approvalDetail["statecode"] = new OptionSetValue(1);
                                    approvalDetail["statuscode"] = new OptionSetValue(100000004);//Canceled
                                    service.Update(approvalDetail);
                                }
                            }
                        }
                    }
                    // Cancel All Approval Request same Approval Record => Status Canceled
                    Guid requestId = new Guid(approvalRecord.GetAttributeValue<String>("ant_recordid"));
                    Entity request = service.Retrieve("ant_approvalrequest", requestId, new ColumnSet("statuscode", "statecode"));
                    request["statecode"] = new OptionSetValue(1);
                    request["statuscode"] = new OptionSetValue(100000004); //Canceled
                    service.Update(request);
                }
            }
        }
        private static bool IsNotExistingApprover(IPluginExecutionContext context, IOrganizationService service, Entity preData, Entity entity)
        {
            string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                <entity name='ant_approvallevelconfig_systemuser'>
                                <all-attributes/>
                                <filter type='and'>
                                    <condition attribute = 'ant_approvallevelconfigurationid' operator= 'eq' value = '{entity.Id}'/>
                                </filter>
                                <link-entity name='systemuser' from='systemuserid' to='systemuserid'>
                                  <all-attributes />
                                  <filter>
                                    <condition attribute='isdisabled' operator='ne' value='1' />
                                  </filter>
                                </link-entity>
                                </entity>
                                </fetch>";
            var rows = service.RetrieveMultiple(new FetchExpression(fetchXml));
            if (rows.Entities.Count >= 1)
            {
                return false;
            }
            else
                return true;
        }
    }
}
