const { startApp } = require('./server/index.server');
const { startNgrok } = require('./ngrok/start');
const { setupGoogle, setupAdobe } = require('./setup/index.setup');
const { postTestEvent } = require('./test/start');
const { initAioAppTemplate } = require('./aio-app/start');

module.exports = {
  startApp,
  startNgrok,
  setupGoogle,
  setupAdobe,
  postTestEvent,
  initAioAppTemplate
}
