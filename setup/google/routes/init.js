const { randomBytes} = require('node:crypto');
const express = require('express');
const { OAuth2Client } = require('@netcentric/cm-notify-core/core/auth');

const router = express.Router();

router.get('/', function(req, res, next) {
  const oauth2Client = new OAuth2Client();
  // Generate a secure random state value.
  const state = randomBytes(32).toString('hex');
  // Store state in the session
  req.session.state = state;
  const authUrl = oauth2Client.getAuthUrl(state);
  req.session.authUrl = authUrl;
  res.redirect(authUrl);
});

module.exports = router;
