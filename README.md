# LQTM Audit Hub

Local, self-hosted laboratory audit prototype with:

- an LQTM-based questionnaire;
- an audit analysis dashboard;
- clickable red nonconformities;
- CAPA and SMART-objective pages;
- an animated, interactive 6M fishbone diagram.

## Run locally

Install Node.js 20 or newer, then run:

```powershell
npm run start:local
```

Open <http://127.0.0.1:4173>.

The local server does not require ChatGPT, an OpenAI account, or an internet
connection.

## Pages

- `/` — audit questionnaire
- `/dashboard` — overall analysis
- `/capa/2` — example CAPA with interactive fishbone

The current information is prototype data. A later version can add a database,
authentication, persistent answers, attachments, audit history, and exports.
