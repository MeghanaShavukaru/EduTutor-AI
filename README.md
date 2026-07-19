# EduTutor AI

EduTutor has a React web client, an Express API, and a Streamlit tutor interface.

## Run the Streamlit tutor

1. Start the API in one terminal:

   ```bash
   cd edututor-ai/server
   npm install
   npm start
   ```

2. In a second terminal, from the repository root, install the Python packages and run Streamlit:

   ```bash
   pip install -r requirements.txt
   streamlit run streamlit_app.py
   ```

   Open the local URL Streamlit prints (normally `http://localhost:8501`).

The Streamlit app sends questions to `http://localhost:5000/api/tutor` by default. To use a deployed API or a different port, set `EDUTUTOR_API_BASE` before starting Streamlit:

```bash
EDUTUTOR_API_BASE=https://your-api.example.com/api streamlit run streamlit_app.py
```

## Enable AI answers

Set `OPENAI_API_KEY` in the environment where the Express server runs, then restart that server. You can optionally set `OPENAI_MODEL` (it defaults to `gpt-4o-mini`). The key remains on the server and is never exposed to either the React or Streamlit user interface.

Without an AI key, the API returns its built-in educational fallback answers.

## Deploy the API with Vercel

`localhost` only works when the API and Streamlit are running on the same computer. A Streamlit Cloud app needs a public API URL.

1. In Vercel, import this GitHub repository and set the **Root Directory** to `edututor-ai/server`.
2. Deploy it. Vercel will create a URL such as `https://edututor-api.vercel.app`.
3. In Vercel → **Settings → Environment Variables**, add `OPENAI_API_KEY` if you want live AI answers, then redeploy.
4. In Streamlit Cloud, open **App settings → Secrets** and add:

   ```toml
   EDUTUTOR_API_BASE = "https://your-vercel-project.vercel.app/api"
   ```

5. Save the secret and reboot the Streamlit app.

Never use `http://localhost:5000/api` in Streamlit Cloud: it points to the Streamlit Cloud container, where the Express API is not running.
