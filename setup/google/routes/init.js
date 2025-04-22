const { randomBytes} = require('node:crypto');
const express = require('express');
const { getAuthUrl } = require('../getAuthUrl');

const router = express.Router();

router.get('/', function(req, res, next) {
  console.log('GET init');
  // Generate a secure random state value.
  const state = randomBytes(32).toString('hex');
  // Store state in the session
  req.session.state = state;
  const authUrl = getAuthUrl(state);
  req.session.authUrl = authUrl;
  res.redirect(authUrl);
});

module.exports = router;
