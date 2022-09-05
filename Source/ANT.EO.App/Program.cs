using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Tooling.Connector;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.ServiceModel;
using System.Text;

namespace ANT.EO.App
{
    class Program
    {
        private static CrmServiceClient _client;
        private static IOrganizationService service;
        //private static ITracingService tracing;

        public static void Main(string[] args)
        {
            try
            {
                using (_client = new CrmServiceClient(ConfigurationManager.ConnectionStrings["CRMConnectionString"].ConnectionString))
                {
                    if (!_client.IsReady)
                        throw new Exception("connect ConnStr fail!" + _client.LastCrmError);
                    else
                        Console.WriteLine($"Program connected to Dynamics 365/Power Apps Environmental Science {_client.ConnectedOrgFriendlyName } success!");
                    service = _client.OrganizationServiceProxy;

                    Test_SendApproval();
                }
            }
            catch (FaultException<OrganizationServiceFault> ex)
            {
                string message = ex.Message;
                throw;
            }
        }
        static void Test_SendApproval()
        {
            Entity target = service.Retrieve("ant_approvalrequest", new Guid("142F162E-9D5A-EC11-8F8F-000D3A07BF11"), new ColumnSet(true));
            string EntityName = "";
            Guid EntityId = target.Id;
            Guid ApprovalId = target.Id;
            string APCode = "";

            Action.Approval.ExecuteApproval _dis = new Action.Approval.ExecuteApproval();
            _dis.SendApproval(EntityName, EntityId, ApprovalId, APCode);
        }
    }
}