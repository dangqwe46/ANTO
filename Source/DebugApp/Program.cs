using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Metadata;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Tooling.Connector;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using static DebugApp.JSONParser;

namespace DebugApp
{
    class Program
    {
        public enum PROCESS_STATUS
        {
            Draft = 118950000,
            Process = 118950001,
            Done = 118950002
        }
        public enum APPROVAL_RANGE_TYPE
        {
            Amount = 100000000,
            Date = 100000001,
            Quantity = 100000002,
            Custom_Query = 100000003
        }
        const string ERR_MSG_01 = "System cannot find any Approval Configuration for the specific record";
        const string ERR_MSG_02 = "System cannot find any Approval Configuration Line for the specific record";
        static CrmServiceClient sv;
        static void Main(string[] args)
        {

            // e.g. https://yourorg.crm.dynamics.com
            string url = "https://antdev.crm5.dynamics.com/";
            // e.g. you@yourorg.onmicrosoft.com
            string userName = "phuong.t@antsolution.vn";
            // e.g. y0urp455w0rd 
            string password = "September1234$#@!";

            string conn = $@"
                  AuthType=Office365;
                  Username={userName}; 
                  Password={password};
                  Url={url}";

            sv = new CrmServiceClient(conn);
            {

                WhoAmIRequest request = new WhoAmIRequest();

                WhoAmIResponse response = (WhoAmIResponse)sv.Execute(request);

                Console.WriteLine("Your UserId is {0}", response.UserId);

                string entName = "ant_approvalrequest";
                Guid EntityId = Guid.Parse("{252F45AD-205B-EC11-8F8F-0022485999DC}");
                string approvalCode = "TKH";
                EntityReference approvalTypeId = new EntityReference("ant_dimensionvalue", new Guid("{C2187175-2558-EC11-8F8F-002248587463}"));
                EntityReference busineesUnitId = new EntityReference("businessunit", new Guid("{282FCC05-980F-EC11-B6E6-000D3AC73347}"));
                EntityReference projectId = new EntityReference("ant_project", new Guid("{6D2A2491-2729-EC11-B6E6-00224858A22F}"));
                EntityReference costCenterId = new EntityReference("ant_costcenter", new Guid("{EA830815-D25C-EC11-8F8F-0022485995FB}"));
                
                string extraParams = "";

                string fetchXml = 
                    @"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                      <entity name='ant_approvalconfigline'>
                        <attribute name='ant_approvalconfiglineid' />
                        <attribute name='ant_name' />
                        <attribute name='createdon' />
                        <order attribute='ant_name' descending='false' />
    
                      </entity>
                    </fetch>";
                var res = sv.RetrieveMultiple(new FetchExpression(fetchXml));
                var ent = res[0];
                
                RetrieveEntityRequest retrieveEntityRequest = new RetrieveEntityRequest
                {
                    EntityFilters = EntityFilters.Default,
                    LogicalName = "ant_approvalconfigline"
                };
                RetrieveEntityResponse retrieveAccountEntityResponse = (RetrieveEntityResponse)sv.Execute(retrieveEntityRequest);
                EntityMetadata entityMetadata = retrieveAccountEntityResponse.EntityMetadata;
                string nameField = entityMetadata.PrimaryNameAttribute;
                //SendApproval(entName, EntityId, approvalTypeId, busineesUnitId, projectId, costCenterId, approvalCode, extraParams);

                Console.ReadLine();
            }
        }

        public static void SendApproval(string entityName, Guid recordId, EntityReference approvalType, EntityReference businessUnit, EntityReference project, EntityReference costCenter, string approvalCode, string extraParams)
        {
            // 0. Get Target, TO DO, convert to params
            Entity Target = sv.Retrieve(entityName, recordId, new ColumnSet(true));
            DateTime _TransactionDate = DateTime.Now;
            ApplyTo condition = new ApplyTo(entityName, _TransactionDate);
            condition.DimensionValue = approvalType;
            condition.BusinessUnit = businessUnit;
            condition.Project = project;
            condition.CostCenter = costCenter;
            condition.ApprovalCode = approvalCode;

            ExtraParameters param = new ExtraParameters(extraParams);

            // 1. Find Config By Entity Name (1 entity may have more than 1 approval config)
            EntityCollection configs = Business.FindApprovalConfig(sv, condition);
            if (configs.Entities.Count == 0)
            {
                throw new InvalidPluginExecutionException(ERR_MSG_01);
            }

            // 2. Get correct Approval Config Line base on the record data
            Entity configLine = getApprovalConfigLine(configs, param);
            if (configLine == null)
            {
                throw new InvalidPluginExecutionException(ERR_MSG_02);
            }

            // 3. Create Approval Record
            // get Record Name
            string RecordName = getNameRecord(entityName, recordId);
            string DataType = string.Empty;

            var Approval = new Entity("ant_approval");
            Approval["ant_name"] = "Approval For " + RecordName;
            Approval["ant_entity"] = entityName;
            Approval["ant_recordid"] = recordId.ToString();
            //Approval["ant_fieldnameentity"] = approvalConfig["ant_fieldnameentity"];
            Approval["ant_fieldnamevalue"] = RecordName;
            //Approval["ant_type"] = ""; // TODO: What value to input?
            Approval["ant_currentset"] = 1;
            Approval["ant_nextset"] = 0;
            Approval["ant_approvalconfiguration"] = configLine.GetAttributeValue<EntityReference>("ant_approvalconfigid");
            Approval["ant_lastset"] = countApprovalConfigLevel(sv, configLine.Id);
            Approval["ant_approvalcode"] = configLine.GetAttributeValue<string>("ant_code");
            Approval["ant_approvalconfiglineid"] = configLine.ToEntityReference();
            var ApprovalId = sv.Create(Approval);

            var ApprovalLevels = getApprovalLevels(configLine.Id);

            foreach (var record in ApprovalLevels.Entities)
            {

                var ApprovalLevel = new Entity("ant_approvallevel");
                // Name
                if (record.Attributes.ContainsKey("ant_name"))
                    ApprovalLevel["ant_name"] = record["ant_name"];

                // Place
                if (record.Attributes.ContainsKey("ant_place"))
                    ApprovalLevel["ant_place"] = record["ant_place"];

                // Email 
                if (record.Attributes.ContainsKey("ant_email"))
                    ApprovalLevel["ant_email"] = record["ant_email"];

                // User
                if (record.Attributes.ContainsKey("ant_user"))
                    ApprovalLevel["ant_user"] = new EntityReference("systemuser", record.GetAttributeValue<EntityReference>("ant_user").Id);

                // Team
                if (record.Attributes.ContainsKey("ant_team"))
                    ApprovalLevel["ant_team"] = new EntityReference("team", record.GetAttributeValue<EntityReference>("ant_team").Id);

                // Approval Type
                if (record.Attributes.ContainsKey("ant_approvaltype"))
                    ApprovalLevel["ant_approvaltype"] = record["ant_approvaltype"];

                // Multiple Approval Type
                if (record.Attributes.ContainsKey("ant_multipleapprovaltype"))
                    ApprovalLevel["ant_multipleapprovaltype"] = record["ant_multipleapprovaltype"];

                // Guids
                if (record.Attributes.ContainsKey("ant_guids"))
                    ApprovalLevel["ant_guids"] = record["ant_guids"];

                // Follow Emails
                if (record.Attributes.ContainsKey("ant_followemails"))
                    ApprovalLevel["ant_followemails"] = record["ant_followemails"];

                // Approval
                ApprovalLevel["ant_approval"] = new EntityReference("ant_approval", ApprovalId);

                // Create Record
                sv.Create(ApprovalLevel);
            }

            // Submit Approval
            var ApprovalUpdate = new Entity("ant_approval", ApprovalId);
            ApprovalUpdate["ant_approvalsignal"] = true;
            ApprovalUpdate["ant_processstatus"] = new OptionSetValue((int)PROCESS_STATUS.Process);
            sv.Update(ApprovalUpdate);
        }

        /// <summary>
        /// Get the correct Approval Code
        /// </summary>
        static private Entity getApprovalConfigLine(EntityCollection configs, ExtraParameters extraParams)
        {
            string fetchXml = string.Empty;
            string addCondition = string.Empty;

            if (configs == null || configs.Entities.Count == 0)
            {
                throw new InvalidPluginExecutionException(ERR_MSG_01);
            }

            foreach (Entity config in configs.Entities)
            {
                addCondition += $"<value>{config.Id}</value>";
            }
            addCondition = "<condition attribute='ant_approvalconfigid' operator='in'>" + addCondition + "</condition>";
            //if (extraParams.DateValue.HasValue)
            //{
            //    addCondition +=
            //        $@"<filter type='or'>
            //            <condition attribute='ant_datemin' operator='on-or-before' value='{extraParams.DateValue.Value}' />
            //            <condition attribute='ant_datemin' operator='null' />
            //          </filter>
            //          <filter type='or'>
            //            <condition attribute='ant_datemax' operator='on-or-after' value='{extraParams.DateValue.Value}' />
            //            <condition attribute='ant_datemax' operator='null' />
            //          </filter>";
            //}
            //if (extraParams.NumberValue.HasValue)
            //{
            //    addCondition +=
            //        $@"<filter type='or'>
            //            <condition attribute='ant_quantitymin' operator='le' value='{extraParams.NumberValue.Value}' />
            //            <condition attribute='ant_quantitymin' operator='null' />
            //          </filter>
            //          <filter type='or'>
            //            <condition attribute='ant_quantitymax' operator='ge' value='{extraParams.NumberValue.Value}' />
            //            <condition attribute='ant_quantitymax' operator='null' />
            //          </filter>";
            //}
            fetchXml =
                $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                      <entity name='ant_approvalconfigline'>
                        <attribute name='ant_approvalconfiglineid' />
                        <attribute name='ant_name' />
                        <attribute name='ant_code' />
                        <attribute name='ant_approvalconfigid' />
                        <order attribute='ant_name' descending='false' />
                        <filter type='and'>
                          {addCondition}
                        </filter>
                      </entity>
                    </fetch>";

            var configLines = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            if (configLines.Entities.Count > 0)
            {
                //approvalConfig = sv.Retrieve("ant_approvalconfiguration", configLines[0].GetAttributeValue<EntityReference>("ant_approvalconfigid").Id, new ColumnSet("ant_name"));
                return configLines[0];
            }
            else
            {
                // cannot find any config line
                throw new InvalidPluginExecutionException(ERR_MSG_02);
            }
        }

        static private Entity getConfigLine(Guid approvalConfigId, int rangeType, string rangeField, Entity record)
        {
            string additionalCondition = string.Empty;
            // Depends on Range Type => get data from corresponding condition
            switch (rangeType)
            {
                case (int)APPROVAL_RANGE_TYPE.Amount:
                    decimal amountValue = record.GetAttributeValue<Money>(rangeField).Value;
                    additionalCondition =
                        $@"<condition attribute='ant_rangetype' operator='eq' value='100000000' />
                          <filter type='or'>
                            <filter type='and'>
                              <condition attribute='ant_amountmax' operator='ge' value='{amountValue}' />
                              <condition attribute='ant_amountmin' operator='null' />
                            </filter>
                            <filter type='and'>
                              <condition attribute='ant_amountmin' operator='le' value='{amountValue}' />
                              <condition attribute='ant_amountmax' operator='null' />
                            </filter>
                            <filter type='and'>
                              <condition attribute='ant_amountmin' operator='lt' value='{amountValue}' />
                              <condition attribute='ant_amountmax' operator='gt' value='{amountValue}' />
                              <condition attribute='ant_amountmin' operator='not-null' />
                              <condition attribute='ant_amountmax' operator='not-null' />
                            </filter>
                          </filter>";
                    break;
                case (int)APPROVAL_RANGE_TYPE.Date:

                    break;
                case (int)APPROVAL_RANGE_TYPE.Quantity:

                    break;
                case (int)APPROVAL_RANGE_TYPE.Custom_Query:

                    break;
                default:
                    // Default Approval Config (Range Type = NULL)
                    additionalCondition = string.Empty;
                    break;
            }

            string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
              <entity name='ant_approvalconfigline'>
                <attribute name='ant_approvalconfiglineid' />
                <attribute name='ant_approvalconfigid' />
                <attribute name='ant_name' />
                <attribute name='ant_rangetype' />
                <attribute name='ant_quantitymin' />
                <attribute name='ant_quantitymax' />
                <attribute name='ant_datemin' />
                <attribute name='ant_datemax' />
                <attribute name='ant_code' />
                <attribute name='ant_approvalrangefield' />
                <attribute name='ant_amountmin' />
                <attribute name='ant_amountmax' />
                <attribute name='ant_advancedcondition' />
                <order attribute='ant_name' descending='false' />
                <filter type='and'>
                  <condition attribute='ant_approvalconfigid' operator='eq' value='{approvalConfigId}' />
                  <condition attribute='statecode' operator='eq' value='0' />
                  {additionalCondition}
                </filter>
              </entity>
            </fetch>";

            EntityCollection result = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            return (result.Entities.Count > 0) ? result[0] : null;
        }

        static private Entity getRecordData(string entityName, Guid entityId)
        {
            return null;
        }
        static private EntityCollection getCurrentApprovalRecord(string EntityName, Guid RecordId)
        {
            string fetchXml =
              $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                  <entity name='ant_approval'>
                    <all-attributes />                   
                    <filter type='and'>
                      <condition attribute='ant_entity' operator='eq' value='{EntityName}' />
                      <condition attribute='ant_recordid' operator='eq' value='{RecordId.ToString().Replace("{", "").Replace("}", "")}' />
                      <condition attribute='ant_processstatus' operator='ne' value='{(int)PROCESS_STATUS.Done}' />
                    </filter>
                  </entity>
                </fetch>";

            EntityCollection relatedAp = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            return relatedAp;
        }

        static string getNameRecord(string EntityName, Guid RecordId)
        {
            string RecordIdField = EntityName + "id";
            string fetchXml =
              $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                  <entity name='{EntityName}'>
                    <attribute name='{RecordIdField}' />                   
                    <filter type='and'>
                      <condition attribute='{RecordIdField}' operator='eq' value='{RecordId}' />                     
                    </filter>
                  </entity>
                </fetch>";

            var Result = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            return Result.Entities[0].ToEntityReference().Name;
        }

        static private EntityCollection getApprovalLevels(Guid configLineId)
        {
            string fetchXml =
              $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                  <entity name='ant_approvallevelconfiguration'>
                    <all-attributes />                   
                    <filter type='and'>
                      <condition attribute='ant_approvalconfiglineid' operator='eq' value='{configLineId}' />                 
                    </filter>
                  </entity>
                </fetch>";
            var Result = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            return Result;
        }
        static private int countApprovalConfigLevel(IOrganizationService service, Guid configLineId)
        {
            var fetch = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                          <entity name='ant_approvallevelconfiguration'>
                            <attribute name='ant_approvallevelconfigurationid' />
                            <attribute name='ant_name' />
                            <order attribute='ant_name' descending='false' />
                            <filter type='and'>
                              <condition attribute='ant_approvalconfiglineid' operator='eq' value='{configLineId}' />
                            </filter>
                          </entity>
                        </fetch>";
            var result = service.RetrieveMultiple(new FetchExpression(fetch));
            return result.Entities.Count;
        }
    }
}
