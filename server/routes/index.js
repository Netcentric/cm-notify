const express = require('express');

const router = express.Router();

router.get('/', function(req, res, next) {
  res.set('Content-Type', 'text/plain');
  res.send('Server Home Page');
});

module.exports = router;
