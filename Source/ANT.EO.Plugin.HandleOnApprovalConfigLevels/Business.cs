using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANT.EO.Plugin.HandleOnApprovalConfigLevels
{
    static class Business
    {
        public enum STATUS_REASON
        {
            Draft = 100000001,
            Published = 100000002,
            Inactive = 100000003
        }
        public enum STATUS
        {
            Active = 0,
            Inactive = 1
        }
        public enum CONDITION_TYPE
        {
            SIMPLE = 100000000,
            COMPLEX = 100000001,
            NONE = 100000002

        }
        public enum LEVEL_TYPE
        {
            APPROVER = 100000000,
            FINAL_APPROVER = 100000001
        }
        public enum APPROVAL_TYPE
        {
            USERS = 118950000,
            TEAM = 118950001,
            LINE_MANAGER = 100000000,
            SECURITY_MATRIX = 100000001,
            POSITION = 100000002
        }

        public const string ERR_MSG_01 = "System only allow to publish when the Status Reason is Draft";
        public const string ERR_MSG_02 = "Start Date not greater than or equal to current date";
        public const string ERR_MSG_03 = "Only allow to active when the status reason is Draft & Inactive";
        public const string ERR_MSG_04 = "System only allows to deactivate when the Status Reason is Published. Please check again.";
        public const string ERR_MSG_05 = "Please make sure that the current Line only exists 1 Published Level which has Level Type is “Final Approver”.";
        public const string ERR_MSG_06 = "Existed the Code. Please input other value.";
        public const string ERR_MSG_07 = "This Line was used for some request before so system only allow to deactivate. Please check again.";
        public const string ERR_MSG_08 = "System only allows to delete when the Status Reason is Draft. Please check again.";
        public const string ERR_MSG_09 = "Please make sure that your Configuration exist 1 published Line which has the Condition Type is None.";
        public const string ERR_MSG_10 = "System found some related Levels which haven’t have the status as Draft. Please check again.";
        public const string ERR_MSG_11 = "System cannot published if the Approver is blank. Please check again.";
    }
}
