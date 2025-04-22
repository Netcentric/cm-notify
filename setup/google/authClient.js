const { OAuth2Client } = require('google-auth-library');
const { getCredentials } = require('./utils');

function generateAuthClient() {
  const { client_id, client_secret, redirect_uris } = getCredentials();
  if (!client_id) {
    throw new Error('Credentials not found');
  }
  const client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
  console.log('OAuth Client Created: ', client._clientId);
  return client;
}

const oAuth2Client = generateAuthClient();

module.exports = oAuth2Client;
