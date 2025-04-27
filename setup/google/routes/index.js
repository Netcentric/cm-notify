const express = require('express');
const { AuthClient } = require('../auth');
const { handleErrorSimple, stopServer } = require('../utils');

const router = express.Router();

router.get('/', function(req, res, next) {
  // Verify state to prevent CSRF attacks
  if (req.query.state !== req.session.state) {
    return handleErrorSimple('Invalid state parameter', res, next);
  }

  if (req.query.error) {
    let message = req.query.error;
    if (req.query.error === 'interaction_required') {
      message = message + '. visit: ' + req.session.authUrl;
    }
    return handleErrorSimple(message, res, next);
  }

  if (!req.query.code) {
    return handleErrorSimple('No code', res, next);
  }

  console.log('Code received: ', req.query.code.length);
  const oAuth2Client = new AuthClient();
  oAuth2Client.saveTokenFromCode(req.query.code)
    .then((token) => {
      if (!token) {
        return handleErrorSimple('Empty token', res, next);
      }
      console.log('Token received. expires_at: ', token.expires_at);
      return token;
    })
    .then(() => {
      delete req.session.state;
      delete req.session.authUrl;

      res.set('Content-Type', 'text/plain');
      res.send('Token received. You can close this window.');
    })
    .catch((err) => {
      console.error('Error getting token', err);
      return handleErrorSimple('Error getting token', res, next);
    })
    .finally(() => {;
      // Shutdown after saving token
      setTimeout(() => {
        stopServer(req);
      }, 1000);
    });
});

module.exports = router;
