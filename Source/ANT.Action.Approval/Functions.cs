using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using static ANT.Action.Approval.Business;

namespace ANT.Action.Approval
{
    static class Functions
    {
        const char DELIMITER = '.';
        #region Retrive position - dang.vh
        public static EntityCollection RetrivePosition(IOrganizationService sv, Guid userId)
        {
            //Fetch user's positon follow userId
            var fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                <entity name='systemuser'>
                                <attribute name='businessunitid'/>
                                <attribute name='positionid'/>
                                <attribute name='systemuserid'/>
                                <filter type='and'>
                                    <condition attribute ='systemuserid' operator= 'eq' value = '{userId}'/>
                                </filter>
                                </entity>
                                </fetch>";
            EntityCollection userRecord = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            if (userRecord.Entities.Count <= 0) return null;
            return userRecord;
        }

        #endregion
        public static EntityCollection getApprovalConfiguration(IOrganizationService sv, ApplyTo condition)
        {
            string filter = "";
            string linkedEntityFilter = "";
            //Filter by Transaction Date
            filter += $@"<filter type='and' >
                              <filter>
                                <condition attribute='ant_startdate' operator='on-or-before' value='{condition.TransactionDate}' />
                              </filter>
                              <filter type='or' >
                                <condition attribute='ant_enddate' operator='null' />
                                <condition attribute='ant_enddate' operator='on-or-after' value='{condition.TransactionDate}' />
                              </filter>
                            </filter>";

            // Filter by Dimension Value (filter by parent - child)
            if (condition.DimensionValue != null && condition.DimensionValueCode != null)
            {
                string[] arr = condition.DimensionValueCode.Split(DELIMITER);
                string tmp = "";
                if (arr.Length > 0)
                {
                    string approvalTypeCond = string.Empty;
                    for (int i = 0; i < arr.Length; i++)
                    {
                        tmp += (i == 0) ? arr[i] : DELIMITER + arr[i];
                        approvalTypeCond += $"<condition entityname='dimension' attribute='ant_code' operator='eq' value='{tmp}' />";
                    }
                    filter +=
                        $@"<filter type='or'>
                            {approvalTypeCond}
                            <condition attribute='ant_dimensionvalue' operator='null' />
                          </filter>";
                    linkedEntityFilter +=
                        $@"<link-entity name='ant_dimensionvalue' from='ant_dimensionvalueid' to='ant_dimensionvalue' link-type='outer' alias='dimension'>
                            <attribute name='ant_level' alias='ant_dimensionlevel'/> 
                           </link-entity>";//<attribute name='ant_level'/> add ant_level of dimensionvalue using level of config
                }
                else
                {
                    filter += "<condition attribute='ant_dimensionvalue' operator='null' />";
                }
                //filter += $@"<filter type='or'>
                //              <condition attribute='ant_dimensionvalue' operator='eq' value='{condition.DimensionValue.Id}' />
                //              <condition attribute='ant_dimensionvalue' operator='null' />
                //            </filter>";
            }
            else
            {
                filter += "<condition attribute='ant_dimensionvalue' operator='null' />";
            }

            //Filter By BU by parent-child
            if (condition.BusinessUnit != null && condition.BUCode != null)
            {
                string[] arr = condition.BUCode.Split(DELIMITER);
                string tmp = "";
                if (arr.Length > 0)
                {
                    string buCond = string.Empty;

                    for (int i = 0; i < arr.Length; i++)
                    {
                        tmp += (i == 0) ? arr[i] : DELIMITER + arr[i];
                        buCond += $"<condition entityname='bu' attribute='ant_code' operator='eq' value='{tmp}' />";
                    }
                    filter +=
                        $@"<filter type='or'>
                            {buCond}
                            <condition attribute='ant_businessunit' operator='null' />
                          </filter>";
                    linkedEntityFilter +=
                        $@"<link-entity name='businessunit' from='businessunitid' to='ant_businessunit' link-type='outer' alias='bu'>
                        </link-entity>";
                }
                else
                {
                    filter += "<condition attribute='ant_businessunit' operator='null' />";
                }
                //filter += $@"<filter type='or'>
                //              <condition attribute='ant_businessunit' operator='eq' value='{condition.BusinessUnit.Id}' />
                //              <condition attribute='ant_businessunit' operator='null' />
                //            </filter>";
            }
            else
            {
                filter += "<condition attribute='ant_businessunit' operator='null' />";
            }

            //Filter By Project


            if (condition.Project != null)
            {
                filter += $@"<filter type='or'>
                              <condition attribute='ant_project' operator='eq' value='{condition.Project.Id}' />
                              <condition attribute='ant_project' operator='null' />
                            </filter>";
            }
            else
            {
                filter += "<condition attribute='ant_project' operator='null' />";
            }
            //--------TODO
            //Filter By Budget
            /*if (condition.Budget != null)
            {
                filter += $@"<filter type='or'>
                              <condition attribute='ant_approvalbudget' operator='eq' value='{condition.Budget.Id}' />
                              <condition attribute='ant_approvalbudget' operator='null' />
                            </filter>";
                //TODO: deleted field ant_approvalbudget & ant_approvalbudgetline
            }
            else
            {
                filter += "<condition attribute='ant_approvalbudget' operator='null' />";
            }*/
            //----------------------------
            //Filter By Approval Code
            if (string.IsNullOrEmpty(condition.ApprovalCode) == false)
            {
                filter += $@"<condition attribute='ant_approvalcode' operator='eq' value='{condition.ApprovalCode}' />";
            }
            else
            {
                filter += "<condition attribute='ant_approvalcode' operator='null' />";
            }

            string fetchXml = string.Empty;
            fetchXml =
             $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                  <entity name='ant_approvalconfiguration'>
                    <all-attributes />                   
                    <filter type='and'>
                      <condition attribute='ant_entity' operator='eq' value='{condition.EntityName}' />
                      <condition attribute='statecode' operator='eq' value='{0}' />
                      <condition attribute='statuscode' operator='eq' value='100000002' /> 
                      <condition attribute='ant_defineasatemplate' operator='ne' value='1' />
                      {filter}
                    </filter>
                    {linkedEntityFilter}
                    <order attribute='ant_order' />
                    <order attribute='ant_businessunit' descending='true' />
                    <order attribute='ant_dimensionvalue' descending='true' />
                    <order attribute='ant_project' descending='true' />
                  </entity>
                </fetch>";
            // TODO: deleted field ant_approvalbudget & ant_approvalbudgetline in entity <order attribute='ant_approvalbudget' descending='true' />
            EntityCollection relatedConfigs = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            return relatedConfigs;
        }

        /// <summary>
        /// Get all Approval Budget Lines base on Budget value
        /// </summary>
        /// <param name="budget"></param>
        /// <returns></returns>
        public static EntityCollection GetAllBudgetLines(IOrganizationService sv, EntityReference budget)
        {
            //string BudgetLineId = null;// "{53EDF055-A88F-EC11-B400-0022485AA7E1}";
            EntityCollection lines = new EntityCollection();
            EntityCollection childLines = new EntityCollection();

            // Find and add child lines
            childLines = GetBudgetLines(sv, budget);
            lines.Entities.AddRange(childLines.Entities);

            return lines;
        }
        private static EntityCollection GetBudgetLines(IOrganizationService sv, EntityReference budget, EntityReference budgetLine = null)
        {
            EntityCollection result = new EntityCollection();

            string budgetLineCondition = (budgetLine == null) ?
                "<condition attribute='ant_parentapprovalbudgetline' operator='null' />" :
                $"<condition attribute='ant_parentapprovalbudgetline' operator='eq' value='{budgetLine.Id}' />";

            // Retrieve all budget lines base on Budget lookup value (and Parent Budget Line - if any)
            string fetchXml =
                $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                          <entity name='ant_approvalbudgetline'>
                            <attribute name='ant_approvalbudgetlineid' />
                            <attribute name='ant_approvalbudget' />
                            <attribute name='ant_businesunit' />
                            <attribute name='ant_dimensionvalue' />
                            <attribute name='ant_project' />
                            <attribute name='ant_name' />
                            <attribute name='ant_balanceamount' />
                            <attribute name='ant_parentapprovalbudgetline' />
                            <filter type='and'>
                                <condition attribute='ant_approvalbudget' operator='eq' value='{budget.Id}' />
                                {budgetLineCondition}
                            </filter>
                            <link-entity name='businessunit' from='businessunitid' to='ant_businesunit' visible='false' link-type='outer' alias='bu'>
                                <attribute name='ant_code' />
                            </link-entity>
                            <link-entity name='ant_dimensionvalue' from='ant_dimensionvalueid' to='ant_dimensionvalue' visible='false' link-type='outer' alias='dimension'>
                                <attribute name='ant_code' />
                            </link-entity>
                          </entity>
                        </fetch>";

            var rows = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            result.Entities.AddRange(rows.Entities);

            foreach (var ent in rows.Entities)
            {
                var childLines = GetBudgetLines(sv, budget, ent.ToEntityReference());
                bool hasChild = (childLines.Entities.Count > 0) ? true : false;
                ent.Attributes.Add("_hasChild", hasChild);
                if (childLines.Entities.Count > 0)
                {
                    result.Entities.AddRange(childLines.Entities);
                }
            }

            return result;
        }
        public static Entity GetConfigLineByBudget(IOrganizationService sv, EntityCollection configLines, EntityCollection allBudgetLines, ApplyTo condition, ExtraParameters extraParams)
        {
            Entity budgetLine = null;
            decimal amount = extraParams.AmountValue.Value;

            foreach (Entity cfgLine in configLines.Entities)
            {
                /*// 1. Get 1 budget line that match condition
                if (cfgLine.Contains("ac.ant_approvalbudgetline"))
                {
                    EntityReference rootBudgetLine = (EntityReference)cfgLine.GetAttributeValue<AliasedValue>("ac.ant_approvalbudgetline").Value;
                    // Filter by condition and select leaf nodes only
                    EntityCollection filteredLines = FilterBudgetLines(condition, allBudgetLines, rootBudgetLine);
                    budgetLine = (filteredLines.Entities.Count > 0) ? filteredLines[0] : null;
                }
                else
                {
                    // Filter by condition and select leaf nodes only
                    EntityCollection filteredLines = FilterBudgetLines(condition, allBudgetLines);
                    budgetLine = (filteredLines.Entities.Count > 0) ? filteredLines[0] : null;
                }

                // 2. Check Over/Under budget
                if (budgetLine != null)
                {

                    if (budgetLine.Contains("ant_balanceamount") &&
                            (
                                // Over Budget
                                (amount > budgetLine.GetAttributeValue<Money>("ant_balanceamount").Value && cfgLine.GetAttributeValue<OptionSetValue>("ant_approvalbudgettype").Value == 100000002) ||
                                // or Under Budget
                                (amount <= budgetLine.GetAttributeValue<Money>("ant_balanceamount").Value && cfgLine.GetAttributeValue<OptionSetValue>("ant_approvalbudgettype").Value == 100000001)
                            )
                        )
                    {
                        cfgLine["_approvalbudgetline"] = budgetLine.ToEntityReference();
                        return cfgLine;
                    }
                }*/

            }

            return null;
        }
        public static EntityCollection FilterBudgetLines(ApplyTo condition, EntityCollection budgetLines)
        {
            EntityCollection filteredLines = new EntityCollection();
            EntityCollection leafNodes = new EntityCollection();

            // 1. Only get leaf nodes (_hasChild = false)
            leafNodes.Entities.AddRange(budgetLines.Entities.Where(t => t.GetAttributeValue<bool>("_hasChild") == false));

            // 2. Filter by condition
            foreach (Entity ent in leafNodes.Entities)
            {

                // Only include if match the condition
                if (MatchCondition(condition, ent))
                {
                    filteredLines.Entities.Add(ent);
                }
            }

            return filteredLines;
        }
        public static EntityCollection FilterBudgetLines(ApplyTo condition, EntityCollection budgetLines, EntityReference rootBudgetLine)
        {
            EntityCollection lines = new EntityCollection();
            if (rootBudgetLine == null)
            {
                return FilterBudgetLines(condition, budgetLines);
            }
            Entity rootNode = budgetLines.Entities.FirstOrDefault(e => e.Id == rootBudgetLine.Id);
            if (rootNode == null)
            {
                return null;
            }
            if (rootNode.GetAttributeValue<bool>("_hasChild") == true)
            {
                // TODO: Continue to find child nodes
                var childNodes = budgetLines.Entities.Where(e => e.Contains("ant_parentapprovalbudgetline") && e.GetAttributeValue<EntityReference>("ant_parentapprovalbudgetline").Id == rootBudgetLine.Id);
                foreach (Entity child in childNodes)
                {
                    lines.Entities.AddRange(FilterBudgetLines(condition, budgetLines, child.ToEntityReference()).Entities);
                }
            }
            else
            {
                // If Leaf node => check condition and add into lines
                if (MatchCondition(condition, rootNode))
                {
                    lines.Entities.Add(rootNode);
                }
            }
            return lines;
        }

        public static void GenerateApprovalLevels(IOrganizationService sv, Entity approvalRecord, Guid configLineId)
        {
            var apprLevelConfigs = getApprovalLevelConfigs(sv, configLineId);

            foreach (var record in apprLevelConfigs.Entities)
            {
                var ApprovalLevel = new Entity("ant_approvallevel");
                if (record.Attributes.ContainsKey("ant_name"))
                    ApprovalLevel["ant_name"] = record["ant_name"];

                if (record.Attributes.ContainsKey("ant_place"))
                    ApprovalLevel["ant_place"] = record["ant_place"];

                // Team
                if (record.Attributes.ContainsKey("ant_team"))
                    ApprovalLevel["ant_team"] = new EntityReference("team", record.GetAttributeValue<EntityReference>("ant_team").Id);

                if (record.Attributes.ContainsKey("ant_approvaltype"))
                    ApprovalLevel["ant_approvaltype"] = record["ant_approvaltype"];

                if (record.Attributes.ContainsKey("ant_multipleapprovaltype"))
                    ApprovalLevel["ant_multipleapprovaltype"] = record["ant_multipleapprovaltype"];

                if (record.Attributes.ContainsKey("ant_durationsla"))
                    ApprovalLevel["ant_durationsla"] = record["ant_durationsla"];
                switch (record.GetAttributeValue<OptionSetValue>("ant_durationsla").Value)
                {
                    case 100000004: // 1 hour
                        ApprovalLevel["ant_duration"] = 60 * 1; //minutes
                        break;
                    case 100000000: // 4 hours
                        ApprovalLevel["ant_duration"] = 60 * 4; //minutes
                        break;
                    case 100000001: // 1 day
                        ApprovalLevel["ant_duration"] = 60 * 24; //minutes
                        break;
                    case 100000002: // 2 days
                        ApprovalLevel["ant_duration"] = 60 * 24 * 2; //minutes
                        break;
                    case 100000003: // 3 days
                        ApprovalLevel["ant_duration"] = 60 * 24 * 3; //minutes
                        break;
                    case 100000005: // 5 minutes
                        ApprovalLevel["ant_duration"] = 5; //minutes
                        break;
                }
                if (record.Attributes.ContainsKey("ant_approvalbypass"))
                    ApprovalLevel["ant_approvalbypass"] = record["ant_approvalbypass"];
                if (record.Attributes.ContainsKey("ant_securitymatrix"))
                    ApprovalLevel["ant_securitymatrix"] = record["ant_securitymatrix"];
                if (record.Attributes.ContainsKey("ant_position"))
                    ApprovalLevel["ant_position"] = record["ant_position"];

                ApprovalLevel["ant_approvallevelconfig"] = record.ToEntityReference();

                // Guids
                if (record.Attributes.ContainsKey("ant_guids"))
                    ApprovalLevel["ant_guids"] = record["ant_guids"];
                /*                //Config Line
                                ApprovalLevel["ant_approvallevelconfig"] = new EntityReference("ant_approvallevelconfig", record.Id);*/
                // Approval
                ApprovalLevel["ant_approval"] = new EntityReference("ant_approval", approvalRecord.Id);
                ApprovalLevel["statuscode"] = new OptionSetValue((int)APPROVAL_LEVEL_STATUS.Created);

                Guid approvalLevelId = sv.Create(ApprovalLevel);
                ApprovalLevel.Id = approvalLevelId;

                #region Create Approval Level Details
                // TODO: move to another plugin that runs async, trigger on Create - ant_approvallevel
                GenerateApprovalLevelDetails(sv, approvalRecord, ApprovalLevel, record);
                #endregion

                if (ApprovalLevel.GetAttributeValue<int>("ant_place") <= 1)
                {
                    SetStateRequest req = new SetStateRequest()
                    {
                        EntityMoniker = new EntityReference(ApprovalLevel.LogicalName, approvalLevelId),
                        State = new OptionSetValue((int)STATUS.Active),
                        Status = new OptionSetValue((int)APPROVAL_LEVEL_STATUS.Pending)
                    };
                    SetStateResponse response = (SetStateResponse)sv.Execute(req);
                }
            }
        }

        private static void GenerateApprovalLevelDetails(IOrganizationService sv, Entity approvalRecord, Entity approvalLevel, Entity approvalLevelConfig)
        {
            var ant_approvaltypeValue = approvalLevelConfig.GetAttributeValue<OptionSetValue>("ant_approvaltype").Value;
            EntityReferenceCollection approvers = new EntityReferenceCollection();
            // For approval types that not using User list
            switch (ant_approvaltypeValue)
            {
                // Requested By's Manager
                case (int)APPROVAL_TYPE.Line_Manager:
                    if (!approvalRecord.Contains("ant_requestedby"))
                    {
                        throw new InvalidPluginExecutionException(ERR_MSG_06);
                    }
                    EntityReference manager = GetLineManager(sv, approvalRecord.GetAttributeValue<EntityReference>("ant_requestedby").Id);
                    approvers.Add(manager);
                    break;
                // By Position (based on Requested By's BU)
                case (int)APPROVAL_TYPE.Position:
                    if (!approvalRecord.Contains("ant_requestedby"))
                    {
                        throw new InvalidPluginExecutionException(ERR_MSG_06);
                    }

                    var positionId = approvalLevelConfig.GetAttributeValue<EntityReference>("ant_position").Id;
                    EntityReferenceCollection usersByPosition = GetUsersByPosition(sv, approvalRecord.GetAttributeValue<EntityReference>("ant_requestedby").Id, positionId);
                    if (usersByPosition != null && usersByPosition.Count > 0)
                    {
                        approvers.AddRange(usersByPosition);
                    }
                    break;
                case (int)APPROVAL_TYPE.Security_Matrix:
                    var securityMatrixId = approvalLevelConfig.GetAttributeValue<EntityReference>("ant_securitymatrix").Id;
                    EntityReferenceCollection usersByMaxtrix = GetUsersBySecurityMatrix(sv, securityMatrixId);
                    if (usersByMaxtrix != null && usersByMaxtrix.Count > 0)
                    {
                        approvers.AddRange(usersByMaxtrix);
                    }
                    break;
                case (int)APPROVAL_TYPE.User:
                case (int)APPROVAL_TYPE.Team:
                    EntityReferenceCollection users = QueryApproverInConfigLevel(sv, approvalLevelConfig.Id);
                    if (users != null && users.Count > 0)
                    {
                        approvers.AddRange(users);
                    }
                    break;
                default:
                    throw new InvalidPluginExecutionException(string.Format(ERR_MSG_05, ant_approvaltypeValue.ToString()));
            }

            if (approvers.Count > 0)
            {
                // TODO: use execute multiple requests
                foreach (var item in approvers)
                {
                    // Create Approval Level Detail (1 record per approver)
                    Entity levelDetail = new Entity("ant_approvalleveldetail");
                    levelDetail.Attributes.Add("ant_name", $"Level {approvalLevel["ant_place"].ToString()} - {item.Id}");
                    levelDetail.Attributes.Add("ant_approvallevel", approvalLevel.ToEntityReference());
                    levelDetail.Attributes.Add("ant_lookupkey", null);
                    levelDetail.Attributes.Add("ant_user", new EntityReference("systemuser", item.Id));

                    // Create Record
                    sv.Create(levelDetail);
                }
            }
            else
            {
                throw new InvalidPluginExecutionException(string.Format(ERR_MSG_09, approvalLevel["ant_place"], approvalLevel.Id));
                // TODO: will log error into Approval Error Log entity later
            }
        }

        private static EntityReference GetLineManager(IOrganizationService sv, Guid requestedById)
        {
            string fetchXml =
                $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                      <entity name='systemuser'>
                        <attribute name='fullname' />
                        <attribute name='businessunitid' />
                        <attribute name='systemuserid' />
                        <attribute name='parentsystemuserid' />
                        <order attribute='fullname' descending='false' />
                        <filter type='and'>
                            <condition attribute='systemuserid' operator='eq' value='{requestedById}' />
                        </filter>
                      </entity>
                    </fetch>";

            var rows = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            if (rows.Entities.Count > 0)
            {
                if (rows[0].Contains("parentsystemuserid"))
                {
                    return rows[0].GetAttributeValue<EntityReference>("parentsystemuserid");
                }
                else
                {
                    throw new InvalidPluginExecutionException(string.Format(ERR_MSG_08, requestedById));
                }
            }
            else
            {
                throw new InvalidPluginExecutionException(string.Format(ERR_MSG_07, requestedById, "User"));
            }
        }
        private static EntityReferenceCollection GetUsersByPosition(IOrganizationService sv, Guid requestedById, Guid positionId)
        {
            EntityReferenceCollection result = new EntityReferenceCollection();
            // Get Requested By's BU
            Entity requestedBy = sv.Retrieve("systemuser", requestedById, new ColumnSet("systemuserid", "businessunitid"));
            Guid buId = requestedBy.GetAttributeValue<EntityReference>("businessunitid").Id;
            string fetchXml =
                $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                  <entity name='systemuser'>
                    <attribute name='fullname' />
                    <attribute name='businessunitid' />
                    <attribute name='positionid' />
                    <attribute name='systemuserid' />
                    <order attribute='fullname' descending='false' />
                    <filter type='and'>
                        <condition attribute='businessunitid' operator='eq' value='{buId}' />
                        <condition attribute='positionid' operator='eq' value='{positionId}' />
                        <condition attribute='isdisabled' operator='eq' value='0' />                    
                    </filter>
                  </entity>
                </fetch>";
            EntityCollection rows = sv.RetrieveMultiple(new FetchExpression(fetchXml));

            if (rows.Entities.Count <= 0) return null;
            foreach (Entity item in rows.Entities)
            {
                result.Add(item.ToEntityReference());
            }
            return result;
        }
        //
        private static EntityReferenceCollection GetUsersBySecurityMatrix(IOrganizationService sv, Guid securityMatrixId)
        {
            EntityReferenceCollection result = new EntityReferenceCollection();
            string fetchXml =
                $@"<fetch>
                  <entity name='ant_securitymatrix_systemuser'>
                    <attribute name='ant_securitymatrix_systemuserid' />
                    <attribute name='ant_securitymatrixid' />
                    <attribute name='systemuserid' />
                    <filter>
                      <condition attribute='ant_securitymatrixid' operator='eq' value='{securityMatrixId}' />
                    </filter>
                  </entity>
                </fetch>";
            EntityCollection rows = sv.RetrieveMultiple(new FetchExpression(fetchXml));

            if (rows.Entities.Count <= 0) return null;
            foreach (Entity item in rows.Entities)
            {
                result.Add(new EntityReference("systemuser", item.GetAttributeValue<Guid>("systemuserid")));
            }
            return result;
        }
        private static EntityReferenceCollection QueryApproverInConfigLevel(IOrganizationService service, Guid configLevelId)
        {
            EntityReferenceCollection result = new EntityReferenceCollection();
            // return list approvers associate N:N with Config Level record
            string fetchXml = $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                <entity name='ant_approvallevelconfig_systemuser'>
                                <all-attributes/>
                                <filter type='and'>
                                    <condition attribute = 'ant_approvallevelconfigurationid' operator= 'eq' value = '{configLevelId}'/>
                                </filter>
                                </entity>
                                </fetch>";
            EntityCollection rows = service.RetrieveMultiple(new FetchExpression(fetchXml));

            if (rows.Entities.Count <= 0) return null;
            foreach (Entity item in rows.Entities)
            {
                result.Add(new EntityReference("systemuser", item.GetAttributeValue<Guid>("systemuserid")));
            }
            return result;
        }
        private static bool MatchCondition(ApplyTo condition, Entity budgetLine)
        {
            bool isMatch = true;

            if (condition.Budget == null/*(condition.Budget == null && budgetLine.Contains("ant_approvalbudget")) || (budgetLine.Contains("ant_approvalbudget") && budgetLine.GetAttributeValue<EntityReference>("ant_approvalbudget").Id != condition.Budget.Id)*/)
            {
                isMatch = false;
            }
            // Check Business Unit (check theo parent-child)
            if (condition.BUCode == null && budgetLine.Contains("bu.ant_code"))
            {
                isMatch = false;
            }
            if (condition.BUCode != null && budgetLine.Contains("bu.ant_code"))
            {
                string buCode = budgetLine.GetAttributeValue<AliasedValue>("bu.ant_code").Value.ToString();
                if (!condition.BUCode.StartsWith(buCode))
                {
                    isMatch = false;
                }
            }
            // Check Dimension Value (check theo parent-child)
            if (condition.DimensionValueCode == null && budgetLine.Contains("dimension.ant_code"))
            {
                isMatch = false;
            }
            if (condition.DimensionValueCode != null && budgetLine.Contains("dimension.ant_code"))
            {
                string dimensionCode = budgetLine.GetAttributeValue<AliasedValue>("dimension.ant_code").Value.ToString();
                if (!condition.DimensionValueCode.StartsWith(dimensionCode))
                {
                    isMatch = false;
                }
            }

            if ((condition.Project == null && budgetLine.Contains("ant_project")) || (budgetLine.Contains("ant_project") && budgetLine.GetAttributeValue<EntityReference>("ant_project").Id != condition.Project.Id))
            {
                isMatch = false;
            }

            return isMatch;
        }

        private static EntityCollection getApprovalLevelConfigs(IOrganizationService sv, Guid configLineId)
        {
            string fetchXml =
              $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                  <entity name='ant_approvallevelconfiguration'>
                    <all-attributes />                   
                    <filter type='and'>
                      <condition attribute='ant_approvalconfiglineid' operator='eq' value='{configLineId}' />
                      <condition attribute='statuscode' operator='eq' value='100000002' />
                    </filter>
                  </entity>
                </fetch>";
            var Result = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            return Result;
        }
    }

    static class JSONParser
    {
        public static string Serialize<T>(T obj)
        {
            string result = string.Empty;
            using (MemoryStream stream = new MemoryStream())
            {
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(T));
                serializer.WriteObject(stream, serializer);

                result = Encoding.Default.GetString(stream.ToArray());
            }

            return result;
        }
        public static T Deserializer<T>(string jsonString)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(T),
                    new DataContractJsonSerializerSettings
                    {
                        DateTimeFormat = new DateTimeFormat("yyyy-MM-dd'T'HH:mm:ss.fffZ")
                    });
                StreamWriter writer = new StreamWriter(stream);
                writer.Write(jsonString);
                writer.Flush();
                stream.Position = 0;

                T obj = (T)serializer.ReadObject(stream);
                return obj;
            }

        }
    }
}
