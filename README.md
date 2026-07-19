# EduTutor AI

EduTutor AI is deployed as one Vercel project: the React client is the frontend and the `/api` folder contains Vercel serverless backend functions.

## Deploy on Vercel

Import this repository into Vercel with the **Root Directory** set to the repository root. Vercel runs the root `build` command and serves the generated React app together with the API routes.

To enable live AI answers, add `OPENAI_API_KEY` in **Vercel → Project → Settings → Environment Variables**, then redeploy. Without a key, the tutor uses built-in educational fallback answers.

## Run locally

```bash
cd edututor-ai/client
npm install
npm run dev
```

For local API routes, run `vercel dev` from the repository root after installing the Vercel CLI.
