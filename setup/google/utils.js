const { exec } = require('child_process');

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


module.exports = { openUrl, handleErrorSimple, stopServer };
