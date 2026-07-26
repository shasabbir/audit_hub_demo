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

This repository includes an automatic deployment workflow for a repository
named `audit_hub_demo`.

1. Use the GitHub repository `shasabbir/audit_hub_demo`.
2. Push this repository's `main` branch to GitHub.
3. Open **Settings → Pages** in GitHub.
4. Under **Build and deployment**, select **GitHub Actions**.
5. Open the repository's **Actions** tab and wait for
   **Deploy GitHub Pages** to complete.

The published address will have this form:

`https://shasabbir.github.io/audit_hub_demo/`

The workflow runs `npm run build:pages`, which generates the GitHub
Pages-compatible site under `docs/`. To generate it manually:

```powershell
npm run build:pages
```

## Pages

- `/` — audit questionnaire
- `/dashboard` — overall analysis
- `/capa/2` — example CAPA with interactive fishbone

The current information is prototype data. A later version can add a database,
authentication, persistent answers, attachments, audit history, and exports.
