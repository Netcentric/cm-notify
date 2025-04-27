const { randomBytes} = require('node:crypto');
const express = require('express');
const { AuthClient } = require('../auth');

const router = express.Router();

router.get('/', function(req, res, next) {
  const oAuth2Client = new AuthClient();
  // Generate a secure random state value.
  const state = randomBytes(32).toString('hex');
  // Store state in the session
  req.session.state = state;
  const authUrl = oAuth2Client.getAuthUrl(state);
  req.session.authUrl = authUrl;
  res.redirect(authUrl);
});

module.exports = router;
