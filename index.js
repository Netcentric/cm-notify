const { startApp } = require('./server/index.server');
const { startNgrok } = require('./ngrok/start');
const { setupGoogle, setupAdobe } = require('./setup/index.setup');

module.exports = {
  startApp,
  startNgrok,
  setupGoogle,
  setupAdobe
}
