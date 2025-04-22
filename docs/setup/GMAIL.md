# Setup Google auth token for sending emails

## Get Google Auth Token

### 1. Get Google Auth Credentials:

1. Create Google APi Project
2. Enable Gmail API
3. Create OAuth 2.0 client
4. Use Desktop client
4. Add the following scopes:
   - https://www.googleapis.com/auth/gmail.send
4. Download the credentials JSON file and add it to the `.data/google-credentials.json`

### 2. Generate Google Auth Token:
```
cm-notify setup:google
```
- Script will open a browser window to authenticate the user.
- After authentication, the token will be saved in the `google-token.json` file.

### 3. Environment Variables

```
# Email sender env
# Only needed if Teams email approach is used
EMAIL_FROM=gmailuser@googleworkspacedomain.com
```



