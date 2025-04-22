const ngrok = require('@ngrok/ngrok');

/**
 * Start ngrok
 * @param port
 * @param domain
 */
async function startNgrok(port, domain) {
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
}

module.exports = { startNgrok };
