using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANT.EO.Plugin.HandleOnApprovalConfigLine
{
    public class HandleOnApprovalConfigLine : IPlugin
    {

        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);
            if (context.MessageName.ToUpper() == "CREATE")
            {
                ////Check OverLap Date, Amount if condition type is Simple => Prevent Save
                /*                Entity entity = (Entity)context.InputParameters["Target"];
                                Entity preData = entity;
                                var conditionType = entity.GetAttributeValue<OptionSetValue>("ant_conditiontype").Value;
                                if (conditionType==(int)Business.CONDITION_TYPE.SIMPLE)
                                {
                                    CheckOverLapTypeSimple(context, service, preData, entity, out isOverlap, out overlapRecordName);
                                    if (isOverlap)
                                    {
                                        throw new InvalidPluginExecutionException(Business.ERR_MSG_05 + overlapRecordName);
                                    }
                                }*/

                //// Check existed Overlap condition type None not published record => Waring, Save Success

            }
            else if (context.MessageName.ToUpper() == "UPDATE")
            {
                ////=>Handle Error: pre Status Reason Draf,Publish,Inactive
                Entity entity = (Entity)context.InputParameters["Target"];
                Entity preData = context.PreEntityImages["PreImage"];
                int conditionType = entity.Contains("ant_conditiontype")
                                    ? entity.GetAttributeValue<OptionSetValue>("ant_conditiontype").Value
                                    : preData.GetAttributeValue<OptionSetValue>("ant_conditiontype").Value;
                OptionSetValue entStatusReason = entity.GetAttributeValue<OptionSetValue>("statuscode");
                OptionSetValue entState = entity.GetAttributeValue<OptionSetValue>("statecode");
                OptionSetValue preStatusReason = preData.GetAttributeValue<OptionSetValue>("statuscode");
                OptionSetValue preState = preData.GetAttributeValue<OptionSetValue>("statecode");
                ////=>Handle Error: pre Status Reason Draf,Publish,Inactive
                CheckPreStatusReason(context, service, entity);
                #region Check Overlap Date, Amount
                OverLap overLap = CheckOverLap(context, service, preData, entity);
                if (overLap.isOverlap)
                {
                    ////Check Over Lap Date, Amount if condition type is Simple => Prevent Save
                    if (conditionType == ((int)Business.CONDITION_TYPE.SIMPLE))
                        throw new InvalidPluginExecutionException(string.Format(Business.ERR_MSG_05, overLap.overlapRecordName));
                    //// Check existing Overlap condition type None 
                    else if (conditionType == ((int)Business.CONDITION_TYPE.NONE))
                        throw new InvalidPluginExecutionException(Business.ERR_MSG_09);
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
                bool isExistNotDraft = IsExistingNotDraftLevels(context, service, entity);
                if (isExistNotDraft)
                {
                    throw new InvalidPluginExecutionException(Business.ERR_MSG_10);
                }
                else //All Levels in Line is Draft
                {
                    //Delete Level
                    DeleteLevels(context, service, entity);
                }

            }
        }
        private static OverLap CheckOverLap(IPluginExecutionContext context, IOrganizationService service, Entity preData, Entity entity)
        {
            TimeSpan ts = new TimeSpan(0, 0, 0);
            OverLap overlap = new OverLap();
            Guid configId = entity.Contains("ant_approvalconfigid")
                ? entity.GetAttributeValue<EntityReference>("ant_approvalconfigid").Id
                : preData.GetAttributeValue<EntityReference>("ant_approvalconfigid").Id;
            int statuscode = entity.Contains("statuscode")
                ? entity.GetAttributeValue<OptionSetValue>("statuscode").Value
                : preData.GetAttributeValue<OptionSetValue>("statuscode").Value;
            int conditionType = entity.Contains("ant_conditiontype")
                ? entity.GetAttributeValue<OptionSetValue>("ant_conditiontype").Value
                : preData.GetAttributeValue<OptionSetValue>("ant_conditiontype").Value;
            string condition = "";
            DateTime startdate = default;
            DateTime enddate = default;
            decimal maxamount = default;
            decimal minamount = default;
            if (conditionType == (int)Business.CONDITION_TYPE.SIMPLE)
            {
                startdate = entity.Contains("ant_datemin")
                ? entity.GetAttributeValue<DateTime>("ant_datemin")
                : preData.GetAttributeValue<DateTime>("ant_datemin");
                enddate = entity.Contains("ant_datemax")
                    ? entity.GetAttributeValue<DateTime>("ant_datemax")
                    : preData.Contains("ant_datemax") ? preData.GetAttributeValue<DateTime>("ant_datemax") : DateTime.Now + ts;
                maxamount = entity.Contains("ant_amountmax")
                    ? entity.GetAttributeValue<Money>("ant_amountmax").Value
                    : preData.Contains("ant_amountmax") ? preData.GetAttributeValue<Money>("ant_amountmax").Value : 922337203685477;
                minamount = entity.Contains("ant_amountmin")
                    ? entity.GetAttributeValue<Money>("ant_amountmin").Value
                    : preData.Contains("ant_amountmin") ? preData.GetAttributeValue<Money>("ant_amountmin").Value : 0;
                condition += $@"<condition attribute='statuscode' operator='eq' value='{(int)Business.STATUS_REASON.Published}'/>
                                  <condition attribute='ant_conditiontype' operator='eq' value='{(int)Business.CONDITION_TYPE.SIMPLE}'/>
                                  <condition attribute='ant_approvalconfigid' operator='eq' value='{configId}'/>
                                  <condition attribute='ant_approvalconfiglineid' operator='ne' value='{preData.Id}'/>";
            }
            else if (conditionType == (int)Business.CONDITION_TYPE.NONE)
            {
                condition += $@"<condition attribute='statuscode' operator='eq' value='{(int)Business.STATUS_REASON.Published}'/>
                                  <condition attribute='ant_conditiontype' operator='eq' value='{(int)Business.CONDITION_TYPE.NONE}'/>
                                  <condition attribute='ant_approvalconfigid' operator='eq' value='{configId}'/>
                                  <condition attribute='ant_approvalconfiglineid' operator='ne' value='{preData.Id}'/>";
            }
            string fetchXml =
                          $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                  <entity name='ant_approvalconfigline'>
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
                switch (conditionType)
                {
                    case (int)Business.CONDITION_TYPE.NONE:
                        foreach (var ent in rows.Entities)
                        {
                            overlap.isOverlap = true;
                            overlap.overlapRecordName = ent.GetAttributeValue<string>("ant_code");
                            return overlap;
                        }
                        break;
                    case (int)Business.CONDITION_TYPE.SIMPLE:
                        foreach (var ent in rows.Entities)
                        {
                            var itemStartDate = ent.GetAttributeValue<DateTime>("ant_datemin");
                            var itemEndDate = ent.Contains("ant_datemax")
                                            ? ent.GetAttributeValue<DateTime>("ant_datemax")
                                            : DateTime.Now + ts;
                            var itemMinAmount = ent.GetAttributeValue<Money>("ant_amountmin") != null ? ent.GetAttributeValue<Money>("ant_amountmin").Value : 0;
                            var itemMaxAmount = ent.GetAttributeValue<Money>("ant_amountmax") != null ? ent.GetAttributeValue<Money>("ant_amountmax").Value : 922337203685477;
                            if (
                                 (itemStartDate < startdate && enddate < itemEndDate)
                                ||
                                (startdate > itemStartDate && itemStartDate < enddate && itemEndDate < enddate && itemEndDate > startdate)
                                || !(preData.Contains("ant_datemax") && startdate > itemEndDate)
                            )
                            {
                                if (
                                        (
                                        (itemMinAmount <= minamount && maxamount <= itemMaxAmount)
                                        ||
                                        (minamount >= itemMinAmount && itemMinAmount <= maxamount && itemMaxAmount <= maxamount && itemMaxAmount >= minamount)
                                        )
                                   )
                                {
                                    overlap.isOverlap = true;
                                    overlap.overlapRecordName = ent.GetAttributeValue<string>("ant_code");
                                    return overlap;
                                }
                                else
                                    return overlap;
                            }
                            else
                            {
                                overlap.isOverlap = false;
                                overlap.overlapRecordName = "";
                                return overlap;
                            }
                        }
                        break;
                }
            }
            return overlap;
        }
        private void CheckPreStatusReason(IPluginExecutionContext context, IOrganizationService service, Entity entity)
        {

            Entity preData = context.PreEntityImages["PreImage"];
            OptionSetValue entStatusReason = entity.GetAttributeValue<OptionSetValue>("statuscode");
            OptionSetValue entState = entity.GetAttributeValue<OptionSetValue>("statecode");
            OptionSetValue preStatusReason = preData.GetAttributeValue<OptionSetValue>("statuscode");
            OptionSetValue preState = preData.GetAttributeValue<OptionSetValue>("statecode");
            int conditionType = entity.Contains("ant_conditiontype")
                                ? entity.GetAttributeValue<OptionSetValue>("ant_conditiontype").Value
                                : preData.GetAttributeValue<OptionSetValue>("ant_conditiontype").Value;

            //throw new InvalidPluginExecutionException($"{preStartDate.ToString()} | {currentDate.ToLocalTime().ToString("dd/MM/yyyy hh:mm:ss")}");
            //Draf can Publish, else can not
            if (entity.Contains("statuscode")
                && entStatusReason.Value == (int)Business.STATUS_REASON.Published
                && preStatusReason.Value != (int)Business.STATUS_REASON.Draft)
            {
                throw new InvalidPluginExecutionException(Business.ERR_MSG_01);
            }
            if (conditionType == (int)Business.CONDITION_TYPE.SIMPLE)
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
        private static bool IsExistingTransaction(IPluginExecutionContext context, IOrganizationService service, Entity entity)
        {
            OptionSetValue entStatusCode = entity.GetAttributeValue<OptionSetValue>("statuscode");
            Guid recordId = entity.Id;
            //fecth Approval record use Config Line
            string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                          <entity name='ant_approval'>
                            <attribute name='ant_approvalid' />
                            <attribute name='statecode' />
                            <attribute name='ant_approvalconfiguration' />
                            <attribute name='ant_recordid' />
                            <attribute name='ant_approvalconfiglineid' />
                            <attribute name='statuscode' />
                            <filter>
                              <condition attribute='ant_approvalconfiglineid' operator='eq' value='{recordId}' />
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
        private static bool IsExistingNotDraftLevels(IPluginExecutionContext context, IOrganizationService service, Entity entity)
        {
            Guid recordId = entity.Id;
            string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                          <entity name='ant_approvallevelconfiguration'>
                                            <attribute name='statuscode' />
                                            <attribute name='ant_approvalconfiglineid' />
                                            <filter>
                                              <condition attribute='ant_approvalconfiglineid' operator='eq' value='{recordId}'/>
                                              <condition attribute='statuscode' operator='ne' value='{(int)Business.STATUS_REASON.Draft}'/>
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
        private static void DeleteLevels(IPluginExecutionContext context, IOrganizationService service, Entity entity)
        {
            Guid recordId = entity.Id;
            string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                          <entity name='ant_approvallevelconfiguration'>
                                            <attribute name='statuscode' />
                                            <attribute name='ant_approvalconfiglineid' />
                                            <filter>
                                              <condition attribute='ant_approvalconfiglineid' operator='eq' value='{recordId}'/>
                                            </filter>
                                          </entity>
                                        </fetch>";
            var rows = service.RetrieveMultiple(new FetchExpression(fetchXml));
            if (rows.Entities.Count >= 1)
            {
                foreach (Entity row in rows.Entities)
                {
                    service.Delete(row.LogicalName,row.Id);
                }
            }
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
                                  <condition attribute='ant_approvalconfiglineid' operator='eq' value='{entity.Id}'/>
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

    }
}
