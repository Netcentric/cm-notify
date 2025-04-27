const { join } = require('node:path');
const express = require('express');

const indexRouter = require('./routes');
const webhookRouter = require('./routes/webhook');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/webhook', webhookRouter);

// Global error-handling middleware for 400 errors
app.use((err, req, res, next) => {
  console.log('Error handler. ', err);
  if (res.statusCode === 400) {
    res.set('Content-Type', 'text/plain');
    res.send('Error: ' + err.error);
  } else {
    next(err);
  }
});

module.exports = app;
