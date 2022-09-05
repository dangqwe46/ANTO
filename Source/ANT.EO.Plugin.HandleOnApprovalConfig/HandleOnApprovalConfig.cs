using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANT.EO.Plugin.HandleOnApprovalConfig
{
    public class HandleOnApprovalConfig : IPlugin
    {
        bool isOverlap;
        string overlapRecordName;
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);
            if (context.MessageName.ToUpper() == "CREATE")
            {
                Entity entity = (Entity)context.InputParameters["Target"];
                Entity preData = entity;
                //bool isExistingCode = CheckExistingCode(context, service, preData, entity);
                //if (isExistingCode)
                //{
                //    throw new InvalidPluginExecutionException(Bussiness.ERR_MSG_06);
                //}
                //CheckOverlap
                CheckOverLap(context, service, preData, entity, out isOverlap, out overlapRecordName);
                if (isOverlap)
                {
                    throw new InvalidPluginExecutionException(string.Format(Business.ERR_MSG_05, overlapRecordName));
                }
            }
            else if (context.MessageName.ToUpper() == "UPDATE")
            {
                Entity entity = (Entity)context.InputParameters["Target"];
                Entity preData = context.PreEntityImages["PreImage"];
                OptionSetValue entStatusReason = entity.GetAttributeValue<OptionSetValue>("statuscode");
                OptionSetValue entState = entity.GetAttributeValue<OptionSetValue>("statecode");
                OptionSetValue preStatusReason = preData.GetAttributeValue<OptionSetValue>("statuscode");
                OptionSetValue preState = preData.GetAttributeValue<OptionSetValue>("statecode");
                ////=>Handle Error: pre Status Reason Draf,Publish,Inactive
                CheckPreStatusReason(context, service, preData, entity);
                #region Check Over Lap Order,Date,Apply To
                CheckOverLap(context, service, preData, entity, out isOverlap, out overlapRecordName);
                if (isOverlap)
                {
                    throw new InvalidPluginExecutionException(string.Format(Business.ERR_MSG_05, overlapRecordName));
                }
                #endregion
                #region Action when Deactive success
                if (entity.Contains("statecode") && entState.Value == (int)Business.STATUS.Inactive && preStatusReason.Value == (int)Business.STATUS_REASON.Published)
                {
                    CancelRequest(context, service, entity);
                }
                #endregion
            }
            else if (context.MessageName.ToUpper() == "DELETE")
            {
                EntityReference entityRef = (EntityReference)context.InputParameters["Target"];
                Entity entity = service.Retrieve(entityRef.LogicalName, entityRef.Id, new ColumnSet("statuscode"));
                bool isExist = IsExistingTransaction(context, service, entity);
                //TODO: Handle Delete
                if (entity.GetAttributeValue<OptionSetValue>("statuscode").Value != (int)Business.STATUS_REASON.Draft)
                {
                    throw new InvalidPluginExecutionException(Business.ERR_MSG_08);
                }
                if (isExist)
                {
                    throw new InvalidPluginExecutionException(Business.ERR_MSG_07);
                }
                bool isExistNotDraft = IsExistingNotDraftLinesAndLevels(context, service, entity);
                if (isExistNotDraft)
                {
                    throw new InvalidPluginExecutionException(Business.ERR_MSG_09);
                }
                else // All Lines and Levels in Config is Draft
                {
                    //Deleted all Lines and Levels
                    DeleteLinesAndLevels(context, service, entity);
                }
            }
        }
        private void CheckPreStatusReason(IPluginExecutionContext context, IOrganizationService service, Entity preData, Entity entity)
        {
            OptionSetValue entStatusReason = entity.GetAttributeValue<OptionSetValue>("statuscode");
            OptionSetValue entState = entity.GetAttributeValue<OptionSetValue>("statecode");
            OptionSetValue preStatusReason = preData.GetAttributeValue<OptionSetValue>("statuscode");
            OptionSetValue preState = preData.GetAttributeValue<OptionSetValue>("statecode");
            DateTime preStartDate = (entity.Contains("ant_startdate")) ? entity.GetAttributeValue<DateTime>("ant_startdate") : preData.GetAttributeValue<DateTime>("ant_startdate");
            DateTime currentDate = DateTime.Now;

            //throw new InvalidPluginExecutionException($"{preStartDate.ToString()} | {currentDate.ToLocalTime().ToString("dd/MM/yyyy hh:mm:ss")}");
            TimeSpan ts = new TimeSpan(0, 0, 0);
            currentDate = currentDate.Date + ts;
            preStartDate = preStartDate.Date + ts;
            //Draf can Publish, else can not
            if (entity.Contains("statuscode")
                && entStatusReason.Value == (int)Business.STATUS_REASON.Published
                && preStatusReason.Value != (int)Business.STATUS_REASON.Draft)
            {
                throw new InvalidPluginExecutionException(Business.ERR_MSG_01);
            }
            //Draf can Publish but StartDate >= current date, else can not

            if (entity.Contains("statuscode")
                && entStatusReason.Value == (int)Business.STATUS_REASON.Published
                && preStatusReason.Value == (int)Business.STATUS_REASON.Draft
                && preStartDate < currentDate)
            {
                throw new InvalidPluginExecutionException(Business.ERR_MSG_02);
            }
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
        private static void CheckOverLap(IPluginExecutionContext context, IOrganizationService service, Entity preData, Entity entity, out bool isOverlap, out string overlapRecordName)
        {
            isOverlap = false;
            overlapRecordName = "";
            TimeSpan ts = new TimeSpan(0, 0, 0);
            int statuscode = entity.Contains("statuscode")
                ? entity.GetAttributeValue<OptionSetValue>("statuscode").Value
                : preData.GetAttributeValue<OptionSetValue>("statuscode").Value;
            DateTime startdate = entity.Contains("ant_startdate")
                ? entity.GetAttributeValue<DateTime>("ant_startdate")
                : preData.GetAttributeValue<DateTime>("ant_startdate");
            DateTime enddate = entity.Contains("ant_enddate")
                ? entity.GetAttributeValue<DateTime>("ant_enddate")
                : preData.Contains("ant_enddate") ? preData.GetAttributeValue<DateTime>("ant_enddate") : DateTime.Now + ts;
            EntityReference approvaltype = entity.Contains("ant_dimensionvalue")
                ? entity.GetAttributeValue<EntityReference>("ant_dimensionvalue")
                : preData.GetAttributeValue<EntityReference>("ant_dimensionvalue");
            Guid approvaltypeId = (approvaltype != null)
                ? approvaltype.Id : Guid.Empty;
            EntityReference businessunit = entity.Contains("ant_businessunit")
                ? entity.GetAttributeValue<EntityReference>("ant_businessunit")
                : preData.GetAttributeValue<EntityReference>("ant_businessunit");
            Guid businessunitId = (businessunit != null)
                ? businessunit.Id : Guid.Empty;
            string entitynameplural = entity.Contains("ant_entitynameplural")
                ? entity.GetAttributeValue<String>("ant_entitynameplural")
                : preData.GetAttributeValue<String>("ant_entitynameplural");
            int order = entity.Contains("ant_order")
                ? entity.GetAttributeValue<int>("ant_order")
                : preData.GetAttributeValue<int>("ant_order");
            EntityReference project = entity.Contains("ant_project")
                ? entity.GetAttributeValue<EntityReference>("ant_project")
                : preData.GetAttributeValue<EntityReference>("ant_project");
            Guid projectId = (project != null)
                ? project.Id : Guid.Empty;
            EntityReference costcenter = entity.Contains("ant_costcenter")
                ? entity.GetAttributeValue<EntityReference>("ant_costcenter")
                : preData.GetAttributeValue<EntityReference>("ant_costcenter");
            Guid costcenterId = (costcenter != null)
                ? costcenter.Id
                : Guid.Empty;
            string approvalcode = entity.Contains("ant_approvalcode")
                ? entity.GetAttributeValue<string>("ant_approvalcode")
                : preData.GetAttributeValue<string>("ant_approvalcode");
            string condition = $@"<condition attribute='ant_dimensionvalue' operator='eq' value='{approvaltypeId}' />
                              <condition attribute='ant_entitynameplural' operator='eq' value='{entitynameplural}' />
                              <condition attribute='statuscode' operator='eq' value='{(int)Business.STATUS_REASON.Published}' />";
            if (context.MessageName.ToUpper() == "UPDATE")
            {
                condition += $@"<condition attribute='ant_approvalconfigurationid' operator='ne' value='{preData.Id}'/>";
            }
            if (businessunit != null)
            {
                condition += $@"<condition attribute='ant_businessunit' operator='eq' value='{businessunitId}' />";
            }
            if (project != null)
            {
                condition += $@"<condition attribute='ant_project' operator='eq' value='{projectId}' />";
            }
            if (costcenter != null)
            {
                condition += $@"<condition attribute='ant_costcenter' operator='eq' value='{costcenterId}' />";
            }
            if (approvalcode != null)
            {
                condition += $@"<condition attribute='ant_approvalcode' operator='eq' value='{approvalcode}' />";
            }
            string fetchXml =
                          $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                  <entity name='ant_approvalconfiguration'>
                                  <all-attributes />
                                    <filter>
                                        {condition} 
                                    </filter> 
                                    <order attribute='createdon' descending='false' />
                                    </entity>
                                     </fetch>";
            var rows = service.RetrieveMultiple(new FetchExpression(fetchXml));
            //throw new InvalidPluginExecutionException(statuscode.Value.ToString());
            if (statuscode == (int)Business.STATUS_REASON.Published && rows.Entities.Count >= 1)
            {
                foreach (var ent in rows.Entities)
                {
                    var itemStartDate = ent.GetAttributeValue<DateTime>("ant_startdate");
                    var itemEndDate = ent.Contains("ant_enddate")
                                    ? ent.GetAttributeValue<DateTime>("ant_enddate")
                                    : DateTime.Now + ts;
                    var itemOrder = ent.GetAttributeValue<int>("ant_order");
                    var itemStatusCode = ent.GetAttributeValue<EntityReference>("ant_statuscode");

                    switch (itemOrder == order)
                    {
                        case true:
                            if (preData.Contains("ant_enddate") && startdate > itemEndDate)
                            {
                                isOverlap = false;
                                overlapRecordName = "";
                                break;
                            }
                            else
                            {
                                isOverlap = true;
                                overlapRecordName = ent.GetAttributeValue<string>("ant_code");
                                break;
                            }
                        case false:
                            if (
                                (itemStartDate < startdate && enddate < itemEndDate)
                                ||
                                (startdate > itemStartDate && itemStartDate < enddate && itemEndDate < enddate && itemEndDate > startdate)
                                )
                            {
                                isOverlap = true;
                                overlapRecordName = ent.GetAttributeValue<string>("ant_code");
                                break;
                            }
                            else
                            {
                                isOverlap = false;
                                overlapRecordName = "";
                                break;
                            }
                    }
                }
            }
        }
        //private static bool CheckExistingCode(IPluginExecutionContext context, IOrganizationService service, Entity preData, Entity entity)
        //{
        //    bool isExistingCode = false;
        //    int preStatuscode = preData.GetAttributeValue<OptionSetValue>("statuscode").Value;
        //    int statuscode = entity.Contains("statuscode") ? entity.GetAttributeValue<OptionSetValue>("statuscode").Value : 0;
        //    string code = entity.Contains("ant_code") ? entity.GetAttributeValue<String>("ant_code") : null;
        //    string preCode = preData.Contains("ant_code") ? preData.GetAttributeValue<String>("ant_code") : null;
        //    string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
        //                      <entity name='ant_approvalconfiguration'>
        //                        <attribute name='ant_code' />
        //                        <attribute name='statuscode' />
        //                        <attribute name='ant_approvalconfigurationid' />
        //                        <filter>
        //                          <condition attribute='ant_code' operator='eq' value='{code}' />
        //                        </filter>
        //                      </entity>
        //                    </fetch>";
        //    var rows = service.RetrieveMultiple(new FetchExpression(fetchXml));
        //    if (code != preCode && rows.Entities.Count >= 1)
        //    {
        //        isExistingCode = true;
        //        return isExistingCode;
        //    }
        //    return isExistingCode;
        //}
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
                          <condition attribute='ant_approvalconfiguration' operator='eq' value='{recordId}'/>
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
        private static bool IsExistingNotDraftLinesAndLevels(IPluginExecutionContext context, IOrganizationService service, Entity entity)
        {
            Guid recordId = entity.Id;
            string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                              <entity name='ant_approvalconfigline'>
                                <attribute name='statuscode' />
                                <attribute name='ant_approvalconfiglineid' />
                                <attribute name='ant_approvalconfigid' />
                                <filter>
                                  <condition attribute='ant_approvalconfigid' operator='eq' value='{recordId}'/>
                                  <condition attribute='statuscode' operator='ne' value='{(int)Business.STATUS_REASON.Draft}'/>
                                </filter>
                              </entity>
                            </fetch>";
            var rows = service.RetrieveMultiple(new FetchExpression(fetchXml));
            if (rows.Entities.Count >= 1)
            {
                foreach (Entity row in rows.Entities)
                {
                    string fetchXmlLevel = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                          <entity name='ant_approvallevelconfiguration'>
                                            <attribute name='statuscode' />
                                            <attribute name='ant_approvalconfiglineid' />
                                            <filter>
                                              <condition attribute='ant_approvalconfiglineid' operator='eq' value='{row.Id}'/>
                                              <condition attribute='statuscode' operator='ne' value='{(int)Business.STATUS_REASON.Draft}'/>
                                            </filter>
                                          </entity>
                                        </fetch>";
                    var rowLevels = service.RetrieveMultiple(new FetchExpression(fetchXmlLevel));
                    if (rowLevels.Entities.Count >= 1)
                    {
                        return true;
                    }
                }
                return true;
            }
            return false;
        }
        private static void CancelRequest(IPluginExecutionContext context, IOrganizationService service, Entity entity)
        {
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
                                  <condition attribute='ant_approvalconfiguration' operator='eq' value='{entity.Id}'/>
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
        private static void DeleteLinesAndLevels(IPluginExecutionContext context, IOrganizationService service, Entity entity)
        {
            Guid recordId = entity.Id;
            string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                              <entity name='ant_approvalconfigline'>
                                <attribute name='statuscode' />
                                <attribute name='ant_approvalconfiglineid' />
                                <attribute name='ant_approvalconfigid' />
                                <filter>
                                  <condition attribute='ant_approvalconfigid' operator='eq' value='{recordId}'/>
                                </filter>
                              </entity>
                            </fetch>";
            var rowLines = service.RetrieveMultiple(new FetchExpression(fetchXml));
            if (rowLines.Entities.Count >= 1)
            {
                foreach (Entity line in rowLines.Entities)
                {
                    string fetchXmlLevel = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                          <entity name='ant_approvallevelconfiguration'>
                                            <attribute name='statuscode' />
                                            <attribute name='ant_approvalconfiglineid' />
                                            <filter>
                                              <condition attribute='ant_approvalconfiglineid' operator='eq' value='{line.Id}'/>
                                            </filter>
                                          </entity>
                                        </fetch>";
                    var rowLevels = service.RetrieveMultiple(new FetchExpression(fetchXmlLevel));
                    if (rowLevels.Entities.Count >= 1)
                    {
                        foreach (Entity level in rowLevels.Entities)
                        {
                            service.Delete(level.LogicalName, level.Id);
                        }
                    }
                    service.Delete(line.LogicalName, line.Id);
                }                
            }     
        }
    }
}
