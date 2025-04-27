const { CMUtils } = require('@netcentric/cm-notify-core');

const TEST_EVENT = {
  "recipient_client_id": CMUtils.getDefaultConfig().clientId,
  "event": {
    "@id": "urn:oeid:cloudmanager:123",
    "@type": "https://ns.adobe.com/experience/cloudmanager/event/ended",
    "activitystreams:published": `${new Date().toISOString()}`,
    "activitystreams:to": {
      "@type": "xdmImsOrg",
      "xdmImsOrg:id": "123@AdobeOrg"
    },
    "activitystreams:object": {
      "@id": "https://cloudmanager.adobe.io/api/program/123/pipeline/456/execution/789",
      "@type": "https://ns.adobe.com/experience/cloudmanager/pipeline-execution"
    },
    "xdmEventEnvelope:objectType": "https://ns.adobe.com/experience/cloudmanager/pipeline-execution"
  }
};

module.exports = { TEST_EVENT }
