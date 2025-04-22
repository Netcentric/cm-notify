require('dotenv').config();

const DEFAULT_CONFIG = {
  fromEmail: process.env.EMAIL_FROM,
  ngrokDomain: process.env.NGROK_DOMAIN,
  port: process.env.PORT || 4000,
}

module.exports = {
  DEFAULT_CONFIG
};
