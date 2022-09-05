using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ANT.Action.Approval
{
    static class Business
    {
        public enum APPROVAL_TYPE
        {
            User = 118950000,
            Team = 118950001,
            Line_Manager = 100000000,
            Security_Matrix = 100000001,
            Position = 100000002
        }
        public enum APPROVAL_LEVEL_STATUS
        {
            Created = 100000000,
            Pending = 100000001,
            Suspended = 100000003,
            
            Completed = 100000002,
            Expired = 100000004,
            Canceled = 100000005,
            Abandoned = 100000006
        }
        public enum STATUS
        {
            Active = 0,
            Inactive = 1
        }

        public const string ERR_MSG_01 = "System cannot find any Approval Configuration for the specific record";
        public const string ERR_MSG_02 = "System cannot find any Approval Configuration Line for the specific record";
        public const string ERR_MSG_03 = "System cannot find any Approval Configuration Line with corresponding Budget Line";
        public const string ERR_MSG_04 = "Error while trying to create Approval Level Record: {0}";
        public const string ERR_MSG_05 = "Approval Level creation error. Details: Cannot Approval Type with value {0}";
        public const string ERR_MSG_06 = "Requested By cannot be found. Please check data again";
        public const string ERR_MSG_07 = "Cannot find specific record with Id = {0} from table {1}";
        public const string ERR_MSG_08 = "Cannot find requester's manager (UserId = {0})";
        public const string ERR_MSG_09 = "Cannot find any approver (Level: {0}, Approval Level ID: {1})";
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
        public string DimensionValueCode { get; set; }
        public EntityReference BusinessUnit { get; set; }
        public string BUCode { get; set; }
        public EntityReference Project { get; set; }
        public EntityReference CostCenter { get; set; }
        public EntityReference Budget { get; set; }
        public EntityReference BudgetLine { get; set; }
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
        [DataMember(Name = "AmountValue", IsRequired = false)]
        public decimal? AmountValue { get; set; }
        [DataMember(Name = "NumberValue", IsRequired = false)]
        public decimal? NumberValue { get; set; }
        [DataMember(Name = "DateValue", IsRequired = false)]
        public DateTime? DateValue { get; set; }
        [DataMember(Name = "RequestedBy", IsRequired = false)]
        public string RequestedBy { get; set; }
        [DataMember(Name = "RequestedOn", IsRequired = false)]
        public DateTime? RequestedOn { get; set; }
        public ExtraParameters()
        {

        }
        public static ExtraParameters FromJSON(string json)
        {
            ExtraParameters result = JSONParser.Deserializer<ExtraParameters>(json);
            return result;
        }
    }
}
