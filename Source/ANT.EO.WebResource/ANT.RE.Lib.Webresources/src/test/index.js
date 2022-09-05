import { ANT } from '../../dist';

function retrieveTest() {
  var fetct = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="ant_testentity">
    <attribute name="ant_testentityid" />
    <attribute name="ant_name" />
    <attribute name="createdon" />
    <order attribute="ant_name" descending="false" />
    </entity>
    </fetch>
        `;
  ANT.Lib.SOAP.FetchKit.fetch(fetct)
    .then((rs) => {
      debugger;
    })
    .catch((e) => {
      debugger;
    });
  debugger;
  var cols = ['ant_name'];
  ANT.Lib.SOAP.BusinessEntity.retrieve(
    'ant_testentity',
    '68a80ff1-c9ef-eb11-94ef-000d3ac87da1',
    cols,
    function (a) {
      debugger;
    },
    function (e) {
      debugger;
    },
    false
  );
  debugger;
}

function onLoad(executionContext) {
  ANT.Lib.FormContext.init(executionContext);

  ANT.Lib.Controls.setSectionVisibles(false, ['ADDRESS']);
  ANT.Lib.Controls.getAllSections();
  ANT.Lib.Controls.setVisibles(['name', 'lastname', 'firstname'], false);
}

async function test_OData() {
  var fetchXml = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
    <entity name="ant_testentity">
    <attribute name="ant_testentityid" />
    <attribute name="ant_name" />
    <attribute name="createdon" />
    <order attribute="ant_name" descending="false" />
    </entity>
    </fetch>
        `;
  fetchXml = '?fetchXml=' + fetchXml;
  var result = await ANT.Lib.OData.retrieveMultipleRecords('ant_testentity', fetchXml);
  console.log(result);
}
