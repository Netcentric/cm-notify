const { CMNotify } = require('@netcentric/cm-notify-core');

const cmNotify = new CMNotify();

exports.main = async function (params) {
  console.log('Received event:', JSON.stringify(params, null, 2));
  try {
    const res = await cmNotify.post(params);
    console.log('Response:', res);
    return {
      statusCode: 200,
      body: {
        message: 'Event received successfully',
        receivedData: res
      }
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 400,
      body: error.messsage
    };
  }
};
