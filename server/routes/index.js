const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('get index');
  res.render('index', { title: 'Home' });
});

module.exports = router;
