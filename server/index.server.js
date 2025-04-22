const app = require('./app');
const { createHttpServer } = require('./createHttpServer');
const { DEFAULT_CONFIG } = require('../config');

const startApp = (port) => {
  return createHttpServer(app, port || DEFAULT_CONFIG.port);
}

module.exports = { startApp };
