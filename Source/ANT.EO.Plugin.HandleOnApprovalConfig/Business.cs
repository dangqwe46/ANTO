using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANT.EO.Plugin.HandleOnApprovalConfig
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
        public const string ERR_MSG_01 = "System only allow to publish when the Status Reason is Draft.";
        public const string ERR_MSG_02 = "Start Date not greater than or equal to current date";
        public const string ERR_MSG_03 = "System only allow to active when the status reason is Draft & Inactive";
        public const string ERR_MSG_04 = "System only allow to deactive when the status reason is Publish";
        public const string ERR_MSG_05 = "This Configuration overlaps with other published Configuration as below: {0}. Please check again.";
        public const string ERR_MSG_06 = "Existed the Code. Please input other value.";
        public const string ERR_MSG_07 = "This Configuration was used for some request before so system only allow to deactivate. Please check again.";
        public const string ERR_MSG_08 = "System only allows to delete when the Status Reason is Draft. Please check again.";
        public const string ERR_MSG_09 = "System found some related Lines & Levels which haven’t have the status as Draft. Please check again.";
    }
}
