const { CMUtils } = require('../../utils/index');

const getOrg = (pipelinesJson) => {
  const pageUrl = pipelinesJson._links.page;
  const match = pageUrl.match(/\/api\/program\/(\d+)/);
  return match ? match[1] : null;
}

const setupAdobe = () => {
  let data = [];
  const list = CMUtils.getJsonData('pipelines.json');
  const pipelines = list?._embedded?.pipelines;
  if (!pipelines) {
    console.error('No pipelines found in the list.');
    return;
  } else {
    data.list = pipelines.map((pipeline) => {
      return {
        name: pipeline.name,
        id: pipeline.id,
        buildTarget: pipeline.buildTarget,
        status: pipeline.status,
        type: pipeline.type,
      }
    }).filter((item) => {
      return item.buildTarget !== 'CODE_QUALITY';
    });
  }
  console.log('Pipelines List: ', data.length);
  const pipelinesFile = CMUtils.getJsonDataFilePath('pipelines-data.json');
  CMUtils.saveJsonData(pipelinesFile, data);
}

module.exports = { setupAdobe };
