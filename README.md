# Injection Bench

Score canary disclosure and unauthorized tool assertions alongside benign-task completion.

**Field:** AI application security  
**Relevant roles:** AI Security Intern · Product Security Engineer, AI  
**Status:** working prototype; hosting status is tracked separately.

## Run

Requires Node.js 22 or newer. The core prototype has no npm dependencies.

```sh
npm test
npm run build
npm start
```

Open `http://127.0.0.1:8767`. Use `PORT=8770 npm start` for another port.
To run analysis without a browser:

```sh
npm run analyze
node run.mjs input.json
```

## Explore

1. Compare baseline and hardened fixture responses. Inspect the exact strings that change the score.
2. Read the benign-task cases, including a legitimate question that mentions prompt injection.
3. Use the local live runner with your own model endpoint to record actual outputs. Import those results and keep provenance with every report.

## What is implemented

- A project-specific analysis engine shared by the browser and CLI.
- Guided controls plus editable/importable JSON input (maximum 1 MB).
- Computed decisions, supporting records, explicit empty/error states, and
  downloadable evidence containing the input and limitations.
- Self-hosted Space Grotesk headings and DM Sans text; 18px body text,
  16px supporting text, 15px technical labels, keyboard focus, reduced motion,
  and responsive evidence rows.
- Independent boundary and regression tests in `tests/`.

## Scope and limitations

Default results are illustrative response fixtures, not live-model findings. Scoring uses exact canaries, asserted tool actions, and substring completion. Live calls require a separately configured endpoint and may incur provider costs.

All bundled identities, documents, logs, and advisories are fictional. Browser
inputs are visitor-controlled; this public demo is not a trusted security
boundary. Do not use it with private production data. Local enforcement or
provider runners, where provided, have their own documented setup and limits.
Do not report fixture outcomes as production results or live-model findings.

## Publish independently

This directory is a complete, separate GitHub/Vercel project. After creating a
repository, push this directory as its root. Import that repository in Vercel:
framework **Other**, build command **npm run build**, output **public**.
There are no required secrets for the public demo. Do not include `public/`,
`.env`, provider credentials, or actual investigation evidence in Git.

## Structure

- `web/engine.js`: domain-specific analysis and validation
- `web/runtime.js`: input validation, canonicalization, and hashing utilities
- `web/app.js`: accessible controls, result views, imports, and exports
- `tests/`: independently asserted security and behavior tests
- `docs/THREAT-MODEL.md`: trust boundaries and claims
- `scripts/`: optional local integrations, if applicable

## Validation

Run `npm test` for current results. Browser viewport checks and performance
metrics must be measured separately; passing engine tests does not establish
visual accessibility or production readiness.

Font notices are included in `web/fonts/`. Source code is MIT licensed.

## Optional live-model evaluation

The public demo makes no model calls. To opt in locally, configure
`MODEL_ENDPOINT` (full HTTPS chat-completion URL), `MODEL_API_KEY`, and
`MODEL_NAME` in your shell, then run:

```sh
node scripts/live-run.mjs
node scripts/live-run.mjs --baseline
```

The endpoint must accept OpenAI-compatible chat-completion JSON. The runner
makes one sequential provider call per case, with a timeout, no redirect
following, and no exposed executable tools. Provider charges may apply.
The runner has not been executed against a paid provider in this build.
It writes ignored `artifacts/live-input.json` and an evaluation report; import
the input file in the browser to inspect actual responses. Tool-action scoring
is disabled for live runs because no actual tool trace exists. Exact canary
matching does not detect paraphrased, encoded, or partial disclosures.
