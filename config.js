const { CMUtils } = require('@netcentric/cm-notify-core');

const DEFAULT_CONFIG = {
  fromEmail: CMUtils.getDefaultConfig().fromEmail,
  ngrokDomain: process.env.NGROK_DOMAIN,
  port: process.env.PORT || 4000,
}

module.exports = {
  DEFAULT_CONFIG
};
