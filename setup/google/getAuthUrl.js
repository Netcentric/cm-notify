function getAuthUrl(state) {
  const oAuth2Client = require('./authClient');
  // Get URL to manually authorize (one-time)
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline', // Needed to get refresh token
    scope: ['https://www.googleapis.com/auth/gmail.send'],
    login_hint: process.env.EMAIL_FROM,
    state: state
  });
  console.log('Authorize this app by visiting this URL:', authUrl);
  return authUrl;
}

module.exports = { getAuthUrl };
