const fs = require('node:fs');
const express = require('express');
const { CMUtils } = require('@netcentric/cm-notify-core');
const { getCredentials, handleErrorSimple, stopServer } = require('../utils');

const router = express.Router();

router.get('/', function(req, res, next) {
  const oAuth2Client = require('../authClient');
  console.log('GET callback');
  const { client_id } = getCredentials();
  if (!client_id) {
    return handleErrorSimple('No credentials', res, next);
  }
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
  oAuth2Client.getToken(req.query.code, (err, token) => {
    if (err) {
      console.error('Error getting token', err);
      return handleErrorSimple('Error getting token', res, next);
    }
    if (!token) {
      return handleErrorSimple('Empty token', res, next);
    }
    console.log('Token:', token.expiry_date);
    delete req.session.state;
    delete req.session.authUrl;
    const tokenPath = CMUtils.getJsonDataFilePath('google-token.json');
    try {
      fs.writeFileSync(tokenPath, JSON.stringify(token), 'utf-8');
      console.log('Token saved:', tokenPath);
    } catch (e) {
      console.error('Error saving token', e);
      return handleErrorSimple('Error saving token', res, next);
    }
    res.set('Content-Type', 'text/plain');
    res.send('Token received. You can close this window.');

    // Shutdown after saving token
    setTimeout(() => {
      stopServer(req);
    }, 1000);
  });
});

module.exports = router;
