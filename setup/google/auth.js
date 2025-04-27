const { CMUtils, OAuth2Client } = require('@netcentric/cm-notify-core');

class AuthClient {
  constructor() {
    const DEFAULT_CONFIG = CMUtils.getDefaultConfig();
    this.client = new OAuth2Client(DEFAULT_CONFIG.fromEmail, DEFAULT_CONFIG.dataPath);
  }

  getAuthUrl(state) {
    return this.client.getAuthUrl(state);
  }

  async saveTokenFromCode(code) {
    return this.client.saveTokenFromCode(code);
  }
}

module.exports = { AuthClient };
