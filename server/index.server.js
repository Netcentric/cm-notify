const app = require('./app');
const { createHttpServer } = require('./createHttpServer');

const startApp = () => {
  return createHttpServer(app);
}

module.exports = { startApp };
