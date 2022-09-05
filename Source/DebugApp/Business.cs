using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace DebugApp
{
    static class Business
    {
        public static EntityCollection FindApprovalConfig(IOrganizationService sv, ApplyTo condition)
        {
            EntityCollection configs = Functions.getApprovalConfiguration(sv, condition);

            return configs;
        }
    }
    public class ApplyTo
    {
        public string EntityName { get; set; }
        public DateTime? TransactionDate { get; set; }
        public EntityReference DimensionValue { get; set; }
        public EntityReference BusinessUnit { get; set; }
        public EntityReference Project { get; set; }
        public EntityReference CostCenter { get; set; }
        public string ApprovalCode { get; set; }

        //public ApplyTo() { }
        // Entity name and Transaction Date are requried
        public ApplyTo(string _entityName, DateTime _transactionDate)
        {
            this.EntityName = _entityName;
            this.TransactionDate = _transactionDate;
        }
    }

    [DataContract]
    public class ExtraParameters
    {
        [DataMember(Name = "NumberValue", IsRequired = false)]
        public decimal? NumberValue { get; set; }
        [DataMember(Name = "DateValue", IsRequired = false)]
        public DateTime? DateValue { get; set; }

        public ExtraParameters(string json)
        {
            ExtraParameters result = JSONParser.Deserializer<ExtraParameters>(json);
            this.DateValue = result.DateValue;
            this.NumberValue = result.NumberValue;
        }
    }
}
