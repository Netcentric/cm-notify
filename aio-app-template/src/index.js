const { CMNotify } = require('@netcentric/cm-notify-core');

const cmNotify = new CMNotify();

exports.main = async function (params) {
  console.log('Received event:', JSON.stringify(params, null, 2));
  const eventData = params?.event?.payload || {};
  const isValidEvent = await cmNotify.post(params);
  if (!isValidEvent) {
    return {
      statusCode: 400,
      body: 'Not a valid event'
    };
  }

  return {
    statusCode: 200,
    body: {
      message: 'Event received successfully',
      receivedData: eventData
    }
  };
};
