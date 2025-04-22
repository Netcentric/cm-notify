const { exec } = require('child_process');
const { CMUtils } = require('@netcentric/cm-notify-core');

function getCredentials() {
  const credentials = CMUtils.getJsonData('google-credentials.json');
  if (!credentials || !credentials?.installed?.client_id) {
    return {};
  }
  const { client_id, client_secret, redirect_uris } = credentials.installed;
  return { client_id, client_secret, redirect_uris };
}

const openUrl = (url) => {
  let command;
  // For macOS
  if (process.platform === 'darwin') {
    // command = `open -a "Google Chrome" --args --auto-open-devtools-for-tabs ${url}`;
    command = `open ${url}`;
  }
  // For Windows
  else if (process.platform === 'win32') {
    command = `start ${url}`;
  }
  // For Linux
  else {
    command = `xdg-open ${url}`;
  }

  exec(command, (err) => {
    if (err) {
      console.error('Error opening URL:', err);
    } else {
      console.log(`Opening ${url}`);
    }
  });
};

function handleErrorSimple(message, res, next, code = 400) {
  console.warn(message);
  res.status(code);
  next(message);
  return '';
}

const stopServer = (req, runningServer) => {
  console.log('Stopping server...');
  if (!runningServer && !req) {
    console.log('Server Not running. Exiting...');
    process.exit(0);
  }
  const server = runningServer || req?.app?.get('server');
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}


module.exports = { getCredentials, openUrl, handleErrorSimple, stopServer };
