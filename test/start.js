const { DEFAULT_CONFIG } = require('../config');
const { TEST_EVENT } = require('./config');

const postTestEvent = (event = {}) => {
  fetch(`http://localhost:${DEFAULT_CONFIG.port}/webhook`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...TEST_EVENT, ...event })
  }).then(response => {
    if (response.ok) {
      console.log('Event posted successfully');
    } else {
      console.error('Error posting event. Not ok:', response.statusText);
    }
    return response.text();
  }).then((text) => {
    console.log(text);
  }).catch(error => {
    console.error('Error posting event:', error);
  });
}

module.exports = { postTestEvent };
