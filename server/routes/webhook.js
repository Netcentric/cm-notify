const express = require('express');
const { CMNotify } = require('@netcentric/cm-notify-core');

const router = express.Router();
const cmNotify = new CMNotify();

/**
 * Handles GET requests to the /webhook endpoint.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.get('/', (req, res, next) => {
  if (req.query['challenge']) {
    res.set('Content-Type', 'text/plain');
    res.send(req.query['challenge']);
    console.log('challenge received');
  } else {
    res.status(400);
    next({ error: 'No challenge' });
  }
})

/**
 * Handles POST requests to the /webhook endpoint.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.post('/', async (req, res, next) => {
  let isValidEvent;
  try {
    isValidEvent = await cmNotify.post(req);
  } catch (error) {
    res.status(400);
    next({ error: error.message });
    return '';
  }

  if (!isValidEvent) {
    res.status(400);
    next({ error: 'Not a valid event' });
    return '';
  }

  res.set('Content-Type', 'text/plain');
  res.send('Events received');
});

module.exports = router;
