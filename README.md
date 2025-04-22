# cm-notify
[![Version](https://img.shields.io/npm/v/@netcentric/cm-notify.svg)](https://npmjs.org/package/@netcentric/cm-notify)
[![Release Status](https://github.com/Netcentric/cm-notify-core/actions/workflows/release.yml/badge.svg)](https://github.com/Netcentric/cm-notify-core/actions/workflows/release.yml)
[![CodeQL Analysis](https://github.com/netcentric/cm-notify/workflows/CodeQL/badge.svg?branch=main)](https://github.com/netcentric/cm-notify/actions)
[![semver: semantic-release](https://img.shields.io/badge/semver-semantic--release-blue.svg)](https://github.com/semantic-release/semantic-release)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Cloud Manager Notify is a Node.js application that listens for Cloud Manager events and sends notifications to Slack and Microsoft Teams.

# Installation
- Global installation:
```
npm i -g @netcentric/cm-notify
```
- Local installation:
```
npm i @netcentric/cm-notify
```

# Usage
- If installed globally:
```
cm-notify [COMMAND]
```
- If installed locally:
```
./node_modules/.bin/cm-notify [COMMAND]
```
- Usage as a library:
```javascript
const {
  startApp,
  startNgrok,
  setupGoogle,
  setupAdobe
} = require('@netcentric/cm-notify');

startApp();
````
## Commands

- `start:app` - Start the application server to listen for Cloud Manager events
- `start:ngrok` - Start ngrok
- `setup:adobe` - Setup Adobe Cloud Manager pipelines data
- `setup:google` - Setup Google Auth Token

# Setup

## Cloud Manager pipelines data

1. Get Cloud Manager list of pipelines
2. Generate valid Cloud Manager list of pipelines
- Details in the [ADOBE.md](docs/setup/ADOBE.md) file.

## Google Auth Token

1. Get Google Auth Credentials
2. Generate Google Auth Token
- Details in the [GMAIL.md](docs/setup/GMAIL.md) file.

## Environment Variables
- Create a `.env` file in the root folder with the following variables:

Minimal required envs:
```
# Cloud Manager envs
ORGANIZATION_NAME=orgname# used to build the URL for the Pipeline
# Messanger apps env
SLACK_WEBHOOK=webhook_url
```
All envs:
```
# Cloud Manager envs
ORGANIZATION_NAME=orgname# used to build the URL for the Pipeline
CLIENT_ID=e231#used to validate CM event
# Messanger apps env
SLACK_WEBHOOK=https://hooks.slack.com/services/123
# Teams webhook URL
TEAMS_WEBHOOK=https://prod-123.westus.logic.azure.com:443/workflows/123
# Teams email, alternative approach, if Webhook is disabled
TEAMS_EMAIL=email.onmicrosoft.com@amer.teams.ms
# Email sender env
# Only needed if Teams email approach is used
EMAIL_FROM=gmailuser@googleworkspacedomain.com
# App env (optional)
PORT=4000# port to run the application, default is 4000
DATA_PATH=./data# path to the data folder wher tokens are stored, default is ./data
# Ngrok env (optional)
# Only needed if ngrok is used for local testing
NGROK_AUTHTOKEN=123
NGROK_DOMAIN=domain-name.ngrok-free.app
```

## Cloud Manager Webhook

1. Go to https://developer.adobe.com/console
2. Create a new project
3. Add Events to the project
4. Select `Cloud Manager Events`
5. Configure Webhook URL as `this-application-URL/webhook`.

- Optional: For local testing, you can use ngrok to expose your local server to the internet.
- Optional: For exploring the events in developer console you need to add `OAuth credentials` and `I/O Management API`

# Testing
0. Setup testing slack/teams channel
1. Start the application and ngrok in separate terminals:
```
cm-notify start:app
```
```
cm-notify start:ngrok
```

2. Post a test event to the ngrok URL:
```
curl -X POST https://<ngrok-url>/webhook \
-H "Content-Type: application/json" \
-d '<event-json>'
```


