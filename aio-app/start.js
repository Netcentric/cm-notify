const { spawn } = require('node:child_process');
const { resolve } = require('node:path');

function runAioAppCli(params = []) {
  const child = spawn('aio', ['app', ...params], { stdio: 'inherit', shell: true });

  child.on('close', (code) => {
    if (code === 0) {
      console.log(`Script executed successfully.`);
    } else {
      console.error(`Script failed with exit code ${code}.`);
    }
  });
}

function initAioAppTemplate(appPath) {
  const template = resolve(__dirname, './template');
  const cliParams = ['init'];
  if (appPath) {
    cliParams.push(appPath);
  }
  cliParams.push(`--template ${template}`);
  runAioAppCli(cliParams)
}

module.exports = { runAioAppCli, initAioAppTemplate };
