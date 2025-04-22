#!/usr/bin/env node

const {
  startApp,
  startNgrok,
  setupGoogle,
  setupAdobe
} = require('../index');

console.log('Starting cli...');

/** Parse the command line */
const args = process.argv.slice(2);

// Validate input
if (!args.length) {
  console.log("Warning: argument is missing.");
  process.exit();
}

const scriptName = args[0];

switch (scriptName) {
  case 'start':
  case 'start:app':
    console.log('Starting app...');
    startApp();
    break;
  case 'start:ngrok':
    console.log('Starting ngrok...');
    startNgrok().catch(console.error);
    process.stdin.resume();
    break;
  case 'setup:google':
    console.log('Setup Google Auth...');
    setupGoogle();
    break;
  case 'setup:adobe':
    console.log('Setup Adobe ...');
    setupAdobe();
    break;
  default:
    console.log(`Unknown command: ${scriptName}`);
}

