const crypto = require('crypto');
const express = require('express');
const session = require('express-session');
const indexRouter = require('./routes/index');
const initRouter = require('./routes/init');

const app = express();

// Session middleware setup
app.use(session({
  secret: crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/init', initRouter);

module.exports = app;
