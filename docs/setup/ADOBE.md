# Get Cloud Manager pipelines data

## Cloud Manager pipelines data

### 1. Get Cloud Manager list of pipelines:

1. Go to: https://experience.adobe.com/#/@[ORG]/cloud-manager/pipelines.html/program/[PROGRAM_ID]
 - Replace `[ORG]` with your organization name
 - Replace `[PROGRAM_ID]` with your program ID
2. Open the developer tools in your browser (F12)
3. Go to the "Network" tab
 - Filter by "XHR"
 - Filter by word "pipelines"
 - Refresh the page
4. Find the request that has the URL `https://cm.adobe.io/api/program/[PROGRAM_ID]/pipelines`
 - Right-click on the request and select "Copy" -> "Copy Response"
5. Paste the response in a file called `pipelines.json` in the `.data` folder

### 2. Generate valid Cloud Manager list of pipelines:
```
cm-notify setup:adobe
```
- This script will remove CODE_QUALITY pipelines.
- This approach is used to avoid the need of using the Adobe API / Auth to get the list of pipelines.

### Environment Variables

```
# Cloud Manager envs
ORGANIZATION_NAME=orgname# used to build the URL for the Pipeline
CLIENT_ID=e231#used to validate CM event
```
