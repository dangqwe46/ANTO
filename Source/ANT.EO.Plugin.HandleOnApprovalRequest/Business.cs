using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANT.EO.Plugin.HandleOnApprovalRequest
{
    class Business
    {
        public enum STATUS_REASON
        {
            Draft = 100000000,
            Published = 100000001,
            Approved= 100000002,
            Rejected= 100000003,
            Canceled= 100000004,
        }
        public enum STATUS
        {
            Active = 0,
            Inactive = 1
        }
        public const string ERR_MSG_01 = "System only allows to delete when the Status Reason is Draft. Please check again.";
        public const string ERR_MSG_02 = "This request was submitted before. Cannot delete, please check again.";

    }
}
