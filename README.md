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

## Deploy to GitHub Pages

This repository includes a generated static website under `docs/` for the
`audit_hub_demo` GitHub Pages project.

1. Use the GitHub repository `shasabbir/audit_hub_demo`.
2. Push this repository's `main` branch to GitHub.
3. Open **Settings → Pages** in GitHub.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/docs` folder, then save.

The published address will have this form:

`https://shasabbir.github.io/audit_hub_demo/`

The command below generates the GitHub Pages-compatible site under `docs/`:

```powershell
npm run build:pages
```

## Pages

- `/` — audit questionnaire
- `/dashboard` — overall analysis
- `/capa/2` — example CAPA with interactive fishbone

The current information is prototype data. A later version can add a database,
authentication, persistent answers, attachments, audit history, and exports.
