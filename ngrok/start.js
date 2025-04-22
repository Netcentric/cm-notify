const ngrok = require('@ngrok/ngrok');

async function startNgrok(port, domain) {
  try {
    const listener = await ngrok.connect({
      addr: port,
      domain,
      authtoken_from_env: true,
      request_header_add: ['ngrok-skip-browser-warning: true'],
      onLogRequest: (req) => {
        console.log(`${req.method} ${req.uri} - ${req.status}`);
      },
      onLogError: (err) => {
        console.error('Ngrok error:', err);
      }
    });

    const url = listener.url();
    console.log('Ngrok connection established');
    console.log(`Domain: ${domain}`);
    console.log(`URL: ${url}`);
  } catch (error) {
    console.error('Ngrok startup error:', error.message);
    console.error('Stack:', error.stack);
  }
}

module.exports = { startNgrok };
