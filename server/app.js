const { join } = require('node:path');
const express = require('express');

const indexRouter = require('./routes');
const webhookRouter = require('./routes/webhook');

require('dotenv').config()

const app = express();

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/webhook', webhookRouter);

// Global error-handling middleware for 400 errors
app.use((err, req, res, next) => {
  if (res.statusCode === 400) {
    res.render('400', { error: err?.error });
  } else {
    next(err);
  }
});

module.exports = app;
