using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANT.EO.Plugin.ApprovalRequest
{
    static class Business
    {
        public enum PROCESS_STATUS
        {
            Draft = 118950000,
            Process = 118950001,
            Done = 118950002
        }
        public enum REQUEST_STATUS
        {
            Draft = 118950000,
            Processing = 118950001,
            Approved = 118950002,
            Rejected = 118950003
        }
        public enum APPROVAL_RANGE_TYPE
        {
            Amount = 100000000,
            Date = 100000001,
            Quantity = 100000002,
            Custom_Query = 100000003
        }
        public static string ERR_MSG_01 = "System cannot find any Approval Configuration for the specific record";

        public static EntityCollection FindApprovalConfig(IOrganizationService sv, string _entityName, DateTime? _TransactionDate, EntityReference _DV, EntityReference _BU, EntityReference _Project)
        {
            string filter = "";
            if (!string.IsNullOrEmpty(_entityName))
            {
                //Filter by Entity name
                filter += $@"<filter type='and' >
                              <filter type='or' >
                                <condition attribute='ant_entity' operator='null' />
                                <condition attribute='ant_entity' operator='eq' value='{_entityName}' />
                              </filter>
                            </filter>";
            }
            if (_TransactionDate != null)
            {
                //Filter by Transaction Date
                filter += $@"<filter type='and' >
                              <filter type='or' >
                                <condition attribute='ant_startdate' operator='null' />
                                <condition attribute='ant_startdate' operator='on-or-before' value='{_TransactionDate}' />
                              </filter>
                              <filter type='or' >
                                <condition attribute='ant_enddate' operator='null' />
                                <condition attribute='ant_enddate' operator='on-or-after' value='{_TransactionDate}' />
                              </filter>
                            </filter>";
            }

            //Filter by Dimension Value
            if (_DV != null)
            {
                filter += $@"<filter type='or'>
                              <condition attribute='ant_dimensionvalue' operator='eq' value='{_DV.Id}' />
                              <condition attribute='ant_dimensionvalue' operator='null' />
                            </filter>";
            }

            //Filter By BU
            if (_BU != null)
            {
                filter += $@"<filter type='or'>
                              <condition attribute='ant_businessunit' operator='eq' value='{_BU.Id}' />
                              <condition attribute='ant_businessunit' operator='null' />
                            </filter>";
            }

            //Filter By Project
            if (_Project != null)
            {
                filter += $@"<filter type='or'>
                              <condition attribute='ant_project' operator='eq' value='{_Project.Id}' />
                              <condition attribute='ant_project' operator='null' />
                            </filter>";
            }


            string fetchXml = string.Empty;
            fetchXml =
             $@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                  <entity name='ant_approvalconfiguration'>
                    <all-attributes />                   
                    <filter type='and'>
                      <condition attribute='statecode' operator='eq' value='{0}' />
                    </filter>
                    {filter}
                    <order attribute='ant_order' />
                  </entity>
                </fetch>";


            EntityCollection relatedConfigs = sv.RetrieveMultiple(new FetchExpression(fetchXml));
            return relatedConfigs;
        }
        public static int CountApprovalConfigLevel(IOrganizationService service, Guid configLineId)
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
        public static EntityCollection GetApprovalLevels(IOrganizationService sv, Guid configLineId)
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
        public static Entity GetApprovalConfigLine(IOrganizationService sv, EntityCollection configs, Guid approvalRequestId, out Entity selectedConfig)
        {
            Entity configLine = null;
            Entity defaultConfig = null;
            Entity defaultConfigLine = null;
            Entity levelConfig = new Entity("ant_approvallevelconfiguration");
            // Check if there is any configuration with a range field or not
            string rangeField = string.Empty;
            int rangeType = -1;
            string fetchXml = string.Empty;
            if (configs == null || configs.Entities.Count == 0)
            {
                throw new InvalidPluginExecutionException(ERR_MSG_01);
            }
            foreach (Entity config in configs.Entities)
            {
                // Duyet theo han muc
                if (config.Contains("ant_approvalrangefield") && config.Contains("ant_rangetype") &&
                    config.GetAttributeValue<OptionSetValue>("ant_rangetype").Value != (int)APPROVAL_RANGE_TYPE.Custom_Query)
                {
                    rangeField = config.GetAttributeValue<string>("ant_approvalrangefield");
                    rangeType = config.GetAttributeValue<OptionSetValue>("ant_rangetype").Value;

                    Entity record = sv.Retrieve("ant_approvalrequest", approvalRequestId, new ColumnSet(rangeField));
                    if (record.Contains(rangeField) == false)
                        continue;
                    // Get list of Config Line for each Approval Config
                    configLine = getConfigLine(sv, config.Id, rangeType, rangeField, record);
                    if (configLine != null)
                    {
                        selectedConfig = config;
                        return configLine;
                    }
                }
                // Duyet theo Custom Query
                if (config.Contains("ant_approvalrangefield") && config.Contains("ant_rangetype") &&
                    config.GetAttributeValue<OptionSetValue>("ant_rangetype").Value == (int)APPROVAL_RANGE_TYPE.Custom_Query)
                {
                    // TODO: add logic here to set value for <selectedConfig> and return configLine
                    // throw new InvalidPluginExecutionException("Configuration for Custom Query is under development");
                    continue; // to remove after finish development
                }
                // Duyet theo default
                if (!config.Contains("ant_approvalrangefield") && !config.Contains("ant_rangetype"))
                {
                    defaultConfig = config;
                    // Get list of Config Line for each Approval Config
                    defaultConfigLine = getConfigLine(sv, config.Id, -1, null, null);
                }
            }

            // Check if there is any default config & config line
            if (defaultConfigLine != null)
            {
                selectedConfig = defaultConfig;
                return defaultConfigLine;
            }

            // cannot find any config
            throw new InvalidPluginExecutionException(ERR_MSG_01);

        }

        private static Entity getConfigLine(IOrganizationService sv, Guid approvalConfigId, int rangeType, string rangeField, Entity record)
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
    }
}
