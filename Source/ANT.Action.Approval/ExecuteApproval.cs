/*
 .211203 - PhuongT - Use Approval Record instead of Approval Instance
 .211206 - PhuongT - Apply Approval Config line before creating Approval Record (check approval range)
 
 */
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Metadata;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk.Workflow;
using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ANT.Action.Approval.Business;

namespace ANT.Action.Approval
{
    /// <summary>
    ///  Approval Submission
    ///  Action to start an Approval
    ///  Entity
    ///  Code
    /// </summary>
    public class ExecuteApproval : CodeActivity
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
        public enum APPROVAL_BUDGET_TYPE
        {
            Over_Budget = 100000002,
            Under_Budget = 100000001
        }
        //public enum APPROVAL_TYPE
        //{
        //    User = 118950000,
        //    Team = 118950001,
        //    Line_Manager = 100000000,
        //    Security_Matrix = 100000001,
        //    Position = 100000002
        //}


        [Input("EntityName")]
        public InArgument<string> EntityName { get; set; }

        [Input("RecordId")] // GuidId
        public InArgument<string> RecordId { get; set; }
        [Input("ApprovalType")]
        [ReferenceTarget("ant_dimensionvalue")]
        public InArgument<EntityReference> ApprovalType { get; set; }
        [Input("BusinessUnit")]
        [ReferenceTarget("businessunit")]
        public InArgument<EntityReference> BusinessUnit { get; set; }
        [Input("Project")]
        [ReferenceTarget("ant_project")]
        public InArgument<EntityReference> Project { get; set; }
        [Input("CostCenter")]
        [ReferenceTarget("ant_costcenter")]
        public InArgument<EntityReference> CostCenter { get; set; }
        [Input("Budget")]
        [ReferenceTarget("ant_approvalbudget")]
        public InArgument<EntityReference> Budget { get; set; }
        [Input("ApprovalCode")]
        public InArgument<string> ApprovalCode { get; set; }
        [Input("ExtraParams")]
        public InArgument<string> ExtraParams { get; set; }
        [Output("ErrorMessage")]
        public OutArgument<string> ErrorMessage { get; set; }
        IOrganizationService sv;

        protected override void Execute(CodeActivityContext executionContext)
        {
            ITracingService tracer = executionContext.GetExtension<ITracingService>();
            IWorkflowContext context = executionContext.GetExtension<IWorkflowContext>();
            IOrganizationServiceFactory serviceFactory = executionContext.GetExtension<IOrganizationServiceFactory>();
            sv = serviceFactory.CreateOrganizationService(context.UserId);
            string entName = EntityName.Get(executionContext);
            Guid EntityId = Guid.Parse(RecordId.Get(executionContext));
            string approvalCode = ApprovalCode.Get(executionContext) == null ? string.Empty : ApprovalCode.Get(executionContext);
            EntityReference approvalTypeId = ApprovalType.Get(executionContext);
            EntityReference busineesUnitId = BusinessUnit.Get(executionContext);
            EntityReference projectId = Project.Get(executionContext);
            EntityReference costCenterId = CostCenter.Get(executionContext);
            EntityReference budget = Budget.Get(executionContext);
            string extraParams = ExtraParams.Get(executionContext);
            TimeSpan ts = new TimeSpan(0, 0, 0);
            DateTime _TransactionDate = DateTime.Now + ts;
            ApplyTo condition = new ApplyTo(entName, _TransactionDate);
            condition.DimensionValue = approvalTypeId;
            condition.BusinessUnit = busineesUnitId;
            condition.Project = projectId;
            condition.CostCenter = costCenterId;
            condition.ApprovalCode = approvalCode;
            condition.Budget = budget;
            SendApproval(entName, EntityId, condition, extraParams);
        }
        public void SendApproval(string entityName, Guid recordId, ApplyTo condition, string extraParams)
        {
            // 0. Get Target, TO DO, convert to params
            Entity Target = sv.Retrieve(entityName, recordId, new ColumnSet(true));

            ExtraParameters param = ExtraParameters.FromJSON(extraParams);
            // Retrieve BU Code (if any)
            if (condition.BusinessUnit != null)
            {
                Entity buEntity = sv.Retrieve(condition.BusinessUnit.LogicalName, condition.BusinessUnit.Id, new ColumnSet("businessunitid", "ant_code"));
                condition.BUCode = buEntity.Contains("ant_code") ? buEntity.GetAttributeValue<string>("ant_code") : null;
            }
            // Retrieve Dimension Value Code (if any)
            if (condition.DimensionValue != null)
            {
                Entity approvalTypeRec = sv.Retrieve(condition.DimensionValue.LogicalName, condition.DimensionValue.Id, new ColumnSet("ant_dimensionvalueid", "ant_code"));
                condition.DimensionValueCode = approvalTypeRec.Contains("ant_code") ? approvalTypeRec.GetAttributeValue<string>("ant_code") : null;
            }

            // 1. Find Config By Entity Name (1 entity may have more than 1 approval config)

            EntityCollection configs = Business.FindApprovalConfig(sv, condition);
            if (configs.Entities.Count == 0)
            {
                throw new InvalidPluginExecutionException(ERR_MSG_01);
            }
            //throw new InvalidPluginExecutionException($"Found {configs.Entities.Count.ToString()} Approval Config(s) ");
            // 2. Get correct Approval Config Line base on the record data
            EntityCollection configLines = getApprovalConfigLines(configs, param);
            //throw new InvalidPluginExecutionException($"Found {configLines.Entities.Count.ToString()} Approval Config Line(s) ");
            Entity configLine;
            if (configLines == null || configLines.Entities.Count == 0)
            {
                throw new InvalidPluginExecutionException(ERR_MSG_02);
            }
            if (condition.Budget != null)
            {
                //configLine = getConfigLineByBudget(condition, configLines, param);
                // Get All budget lines base on Budget value
                EntityCollection allBudgetLines = Functions.GetAllBudgetLines(sv, condition.Budget);
                //throw new InvalidPluginExecutionException($"Found {allBudgetLines.Entities.Count.ToString()} Budget Line(s) ");
                // Find config line
                configLine = Functions.GetConfigLineByBudget(sv, configLines, allBudgetLines, condition, param);
                //throw new InvalidPluginExecutionException($"Found Config Line matched condition: {(configLine == null ? "No" : "Yes")} ");
                if (configLine == null)
                {
                    throw new InvalidPluginExecutionException(ERR_MSG_03);
                }
            }
            else
            {
                /*
                 * get configLine with ant_dimensionlevel highest, this is near to dimension in request
                 */
                configLine = (Entity)configLines.Entities.ToList().OrderByDescending(t => t.GetAttributeValue<int>("ant_dimensionlevel")).First();
            }
            // 3. Create Approval Record
            // get Record Name
            string RecordName = getNameRecord(entityName, recordId);
            string DataType = string.Empty;
            #region Create Approval Record
            var Approval = new Entity("ant_approval");

            Approval["ant_name"] = "Approval For " + RecordName;
            Approval["ant_entity"] = entityName;
            Approval["ant_recordid"] = recordId.ToString();
            //Approval["ant_fieldnameentity"] = approvalConfig["ant_fieldnameentity"];
            Approval["ant_fieldnamevalue"] = RecordName;
            //Approval["ant_type"] = ""; // TODO: What value to input?
            Approval["ant_currentset"] = 1;
            //Approval["ant_nextset"] = 0;
            Approval["ant_approvalconfiguration"] = configLine.GetAttributeValue<EntityReference>("ant_approvalconfigid");
            Approval["ant_lastset"] = countApprovalConfigLevel(sv, configLine.Id);
            Approval["ant_approvalcode"] = condition.ApprovalCode;//configLine.GetAttributeValue<string>("ant_code");
            Approval["ant_approvalconfiglineid"] = configLine.ToEntityReference();
            //Apply To
            Approval["ant_businessunit"] = condition.BusinessUnit;
            Approval["ant_dimensionvalue"] = condition.DimensionValue;
            Approval["ant_project"] = condition.Project;
            Approval["ant_costcenter"] = condition.CostCenter;
            Approval["ant_budget"] = condition.Budget;
            Approval["ant_budgetline"] = (configLine.Contains("_approvalbudgetline")) ? configLine.GetAttributeValue<EntityReference>("_approvalbudgetline") : null;
            // Extra Params
            Approval["ant_amount"] = param.AmountValue.HasValue ? new Money(param.AmountValue.Value) : null;
            Approval["ant_date"] = param.DateValue ?? null;
            Approval["ant_number"] = param.NumberValue ?? null;
            if (!string.IsNullOrEmpty(param.RequestedBy))
            {
                Approval["ant_requestedby"] = new EntityReference("systemuser", Guid.Parse(param.RequestedBy));
            }
            Approval["ant_requestedon"] = (param.RequestedOn.HasValue) ? param.RequestedOn.Value : DateTime.UtcNow;
            var approvalId = sv.Create(Approval);
            Approval.Id = approvalId; // Set ID after creation
            #endregion Create Approval Record

            #region Create Approval Level records
            Functions.GenerateApprovalLevels(sv, Approval, configLine.Id);

            #endregion Create Approval Level records
            //throw new InvalidPluginExecutionException("10");
        }

        /// <summary>
        /// Get the correct Approval Code
        /// </summary>
        private EntityCollection getApprovalConfigLines(EntityCollection configs, ExtraParameters extraParams)
        {
            string fetchXml = string.Empty;
            string addCondition = string.Empty;
            TimeSpan ts = new TimeSpan(0, 0, 0);
            if (configs == null || configs.Entities.Count == 0)
            {
                throw new InvalidPluginExecutionException(ERR_MSG_01);
            }

            foreach (Entity config in configs.Entities)
            {
                addCondition += $"<condition attribute='ant_approvalconfigid' operator='eq' value='{config.Id}' />";
            }
            addCondition = "<filter type='or'>" + addCondition + "</filter>";
            if (extraParams.RequestedOn.HasValue || extraParams.NumberValue.HasValue || extraParams.AmountValue.HasValue)
            {
                addCondition += "<filter type='or'>";
                addCondition += "<filter type='and'>";
                addCondition += "<condition attribute='ant_conditiontype' operator='eq' value='100000000' />"; // Simple
                if (extraParams.RequestedOn.HasValue)
                {
                    addCondition +=
                        $@"<filter>
                        <condition attribute='ant_datemin' operator='on-or-before' value='{extraParams.RequestedOn.Value + ts}' />
                      </filter>
                      <filter type='or'>
                        <condition attribute='ant_datemax' operator='on-or-after' value='{extraParams.RequestedOn.Value + ts}' />
                        <condition attribute='ant_datemax' operator='null' />
                      </filter>";
                }
                if (extraParams.NumberValue.HasValue)
                {
                    addCondition +=
                        $@"<filter type='or'>
                        <condition attribute='ant_quantitymin' operator='le' value='{extraParams.NumberValue.Value}' />
                        <condition attribute='ant_quantitymin' operator='null' />
                      </filter>
                      <filter type='or'>
                        <condition attribute='ant_quantitymax' operator='ge' value='{extraParams.NumberValue.Value}' />
                        <condition attribute='ant_quantitymax' operator='null' />
                      </filter>";
                }
                if (extraParams.AmountValue.HasValue)
                {
                    addCondition +=
                        $@"<filter type='or'>
                        <condition attribute='ant_amountmin' operator='le' value='{extraParams.AmountValue.Value}' />
                        <condition attribute='ant_amountmin' operator='null' />
                      </filter>
                      <filter type='or'>
                        <condition attribute='ant_amountmax' operator='ge' value='{extraParams.AmountValue.Value}' />
                        <condition attribute='ant_amountmax' operator='null' />
                      </filter>";
                }
                addCondition += "</filter>"; // Close filter 'and'
                addCondition += "<condition attribute='ant_conditiontype' operator='ne' value='100000000' />"; // <> Simple
                addCondition += "</filter>"; // Close filter 'or'
            }
            else
            {
                addCondition += "<condition attribute='ant_conditiontype' operator='ne' value='100000000' />"; // <> Simple
            }
            fetchXml =
                $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                      <entity name='ant_approvalconfigline'>
                        <attribute name='ant_approvalconfiglineid' />
                        <attribute name='ant_name' />
                        <attribute name='ant_code' />
                        <attribute name='ant_approvalconfigid' />
                        <attribute name='ant_conditiontype' />
                        <attribute name='ant_approvalbudgettype' />
                        <attribute name='ant_amountmin' />
                        <attribute name='ant_amountmax' />
                        <attribute name='ant_quantitymin' />
                        <attribute name='ant_quantitymax' />
                        <attribute name='ant_datemin' />
                        <attribute name='ant_datemax' />
                        <order attribute='ant_amountmax' descending='true' />
                        <order attribute='ant_amountmin' descending='true' />
                        <order attribute='ant_quantitymin' descending='true' />
                        <order attribute='ant_quantitymax' descending='true' />
                        <order attribute='ant_datemin' descending='true' />
                        <order attribute='ant_datemax' descending='true' />
                        <filter type='and'>
                            {addCondition}
                            <condition attribute='statuscode' operator='eq' value='100000002' />
                        </filter>
                        <link-entity name='ant_approvalconfiguration' from='ant_approvalconfigurationid' to='ant_approvalconfigid' visible='false' link-type='outer' alias='ac'>
                            <attribute name='ant_project' />
                            <attribute name='ant_entity' />
                            <attribute name='ant_costcenter' />
                            <attribute name='ant_businessunit' />
                            <attribute name='ant_approvalcode' />
                            <attribute name='ant_dimensionvalue' />
                        </link-entity>
                      </entity>
                    </fetch>";
            //TO DO: delete ant_approvalbudget and ant_approvalbudgetline in fetchxml 
            /*                            <attribute name='ant_approvalbudgetline' />
                            <attribute name='ant_approvalbudget' />*/

            var configLines = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            if (configLines.Entities.Count > 0)
            {
                //approvalConfig = sv.Retrieve("ant_approvalconfiguration", configLines[0].GetAttributeValue<EntityReference>("ant_approvalconfigid").Id, new ColumnSet("ant_name"));
                //return configLines;

                foreach (Entity configLine in configLines.Entities)
                {
                    /*
                     * get config parent of configLine
                     * configs.Entities.Where(x=>x.Id==parent.Id).First() => filter config is parent configLine in "configs" (configs contain ant_dimensionlevel link-entity)
                     * return: configLines contain ant_dimensionlevel inherit from parent
                     */
                    var parent = sv.Retrieve(configs.EntityName, configLine.GetAttributeValue<EntityReference>("ant_approvalconfigid").Id, new ColumnSet());
                    configLine["ant_dimensionlevel"] = configs.Entities.Where(x => x.Id == parent.Id).First().GetAttributeValue<AliasedValue>("ant_dimensionlevel").Value;
                }
                return configLines;
            }
            else
            {
                // cannot find any config line
                throw new InvalidPluginExecutionException(ERR_MSG_02);
            }
        }

        private EntityCollection GetBudgetLines(ApplyTo condition, ExtraParameters extraParams, EntityReference budgetLine = null)
        {
            EntityCollection result = new EntityCollection();

            string addCondition = string.Empty;
            if (condition.BusinessUnit != null)
            {
                addCondition +=
                    $@"<filter type='or'>
                        <condition attribute='ant_businesunit' operator='eq' value='{condition.BusinessUnit.Id}' />
                        <condition attribute='ant_businesunit' operator='null' />
                      </filter>";
            }
            if (condition.DimensionValue != null)
            {
                addCondition +=
                    $@"<filter type='or'>
                        <condition attribute='ant_dimensionvalue' operator='eq' value='{condition.DimensionValue.Id}' />
                        <condition attribute='ant_dimensionvalue' operator='null' />
                      </filter>";
            }
            if (condition.Project != null)
            {
                addCondition +=
                    $@"<filter type='or'>
                        <condition attribute='ant_project' operator='eq' value='{condition.Project.Id}' />
                        <condition attribute='ant_project' operator='null' />
                      </filter>";
            }

            if (budgetLine == null)
            {
                // Retrieve all budget lines base on Budget lookup value
                string fetchXml =
                    $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                          <entity name='ant_approvalbudgetline'>
                            <attribute name='ant_approvalbudgetlineid' />
                            <attribute name='ant_name' />
                            <order attribute='ant_name' descending='false' />
                            <filter type='and'>
                              <condition attribute='ant_approvalbudget' operator='eq' value='{condition.Budget.Id}' />
                                {addCondition}
                            </filter>
                          </entity>
                        </fetch>";

                var rows = sv.RetrieveMultiple(new FetchExpression(fetchXml));
                return rows;
            }
            else
            {
                // Retrieve budget lines base on Budget lookup value and Parent Budget Line
                string fetchXml =
                    $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                          <entity name='ant_approvalbudgetline'>
                            <attribute name='ant_approvalbudgetlineid' />
                            <attribute name='ant_name' />
                            <order attribute='ant_name' descending='false' />
                            <filter type='and'>
                                <condition attribute='ant_approvalbudget' operator='eq' value='{condition.Budget.Id}' />
                                <condition attribute='ant_parentapprovalbudgetline' operator='eq' value='{budgetLine.Id}' />
                                {addCondition}
                            </filter>
                          </entity>
                        </fetch>";

                var rows = sv.RetrieveMultiple(new FetchExpression(fetchXml));
                result.Entities.AddRange(rows.Entities);
                foreach (var ent in rows.Entities)
                {
                    result.Entities.AddRange(GetBudgetLines(condition, extraParams, ent.ToEntityReference()).Entities);
                }
            }

            return result;
        }
        private EntityCollection getCurrentApprovalRecord(string EntityName, Guid RecordId)
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

        private string getNameRecord(string EntityName, Guid RecordId)
        {
            RetrieveEntityRequest retrieveEntityRequest = new RetrieveEntityRequest
            {
                EntityFilters = EntityFilters.Default,
                LogicalName = EntityName
            };
            RetrieveEntityResponse retrieveAccountEntityResponse = (RetrieveEntityResponse)sv.Execute(retrieveEntityRequest);
            EntityMetadata entityMetadata = retrieveAccountEntityResponse.EntityMetadata;


            string RecordIdField = EntityName + "id";
            string fetchXml =
              $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                  <entity name='{EntityName}'>
                    <attribute name='{RecordIdField}' />           
                    <attribute name='{entityMetadata.PrimaryNameAttribute}' />    
                    <filter type='and'>
                      <condition attribute='{RecordIdField}' operator='eq' value='{RecordId}' />                     
                    </filter>
                  </entity>
                </fetch>";
            var Result = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            return Result.Entities[0][entityMetadata.PrimaryNameAttribute].ToString();
        }

        private EntityCollection getApprovalLevels(Guid configLineId)
        {
            string fetchXml =
              $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                  <entity name='ant_approvallevelconfiguration'>
                    <all-attributes />                   
                    <filter type='and'>
                      <condition attribute='ant_approvalconfiglineid' operator='eq' value='{configLineId}' />
                      <condition attribute='statecode' operator='eq' value='0' />
                    </filter>
                  </entity>
                </fetch>";
            var Result = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            return Result;
        }
        private int countApprovalConfigLevel(IOrganizationService service, Guid configLineId)
        {
            var fetch = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                          <entity name='ant_approvallevelconfiguration'>
                            <attribute name='ant_approvallevelconfigurationid' />
                            <attribute name='ant_name' />
                            <order attribute='ant_name' descending='false' />
                            <filter type='and'>
                              <condition attribute='ant_approvalconfiglineid' operator='eq' value='{configLineId}' />
                              <condition attribute='statecode' operator='eq' value='0' />
                            </filter>
                          </entity>
                        </fetch>";
            var result = service.RetrieveMultiple(new FetchExpression(fetch));
            return result.Entities.Count;
        }
    }
}
