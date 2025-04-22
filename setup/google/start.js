require('dotenv').config();
const app = require('./app');
const { createHttpServer } = require('../../server/createHttpServer');
const { openUrl } = require('./utils');

const setupGoogle = () => {
  const server = createHttpServer(app, 80);
  server.on('listening', () => {
    const addr = server.address();
    const protocol = 'http';
    const host = addr.address === '::' ? 'localhost' : addr.address;
    const port = addr.port;
    const url = `${protocol}://${host}:${port}/init`;

    console.log('server is running, start auth');
    openUrl(url);
  });

  return server;
};

module.exports = { setupGoogle };
