import os
import requests
import streamlit as st

# This is intentionally a server-side environment variable. Do not put an
# OpenAI key in Streamlit or in the React client; the Express API owns it.
# Streamlit Cloud reads this value from App settings > Secrets.
API_BASE = (
    st.secrets.get("EDUTUTOR_API_BASE")
    or os.getenv("EDUTUTOR_API_BASE")
    or ""
).rstrip("/")
IS_CONFIGURED = bool(API_BASE)

st.set_page_config(page_title="EduTutor AI (Streamlit)", layout="centered")

st.title("EduTutor AI")
st.caption("Ask a question and get an answer from the EduTutor backend.")


def get_tutor_answer(question: str) -> str:
    """Send a question to the shared EduTutor backend."""
    if not IS_CONFIGURED:
        raise RuntimeError("The deployed tutor API has not been configured.")
    response = requests.post(
        f"{API_BASE}/tutor",
        json={"question": question},
        timeout=30,
    )
    response.raise_for_status()
    data = response.json()
    return data.get("answer") or "I couldn't generate an answer right now. Please try again."


def submit_question(question: str) -> None:
    """Store and display one user/assistant exchange."""
    question = question.strip()
    if not question:
        return

    st.session_state.messages.append({"role": "user", "content": question})
    with st.chat_message("user"):
        st.markdown(question)

    with st.chat_message("assistant"):
        with st.spinner("Getting answer..."):
            try:
                answer = get_tutor_answer(question)
            except RuntimeError as error:
                answer = (
                    "⚙️ The tutor API URL is not configured. In Streamlit Cloud, open "
                    "**App settings → Secrets** and add `EDUTUTOR_API_BASE` with your "
                    "deployed API URL followed by `/api`."
                )
            except requests.RequestException as error:
                answer = (
                    "❌ I could not reach the tutor service. The public Streamlit app "
                    "cannot use `localhost`; set `EDUTUTOR_API_BASE` to a deployed API.\n\n"
                    f"Details: `{error}`"
                )
            except ValueError:
                answer = "❌ The tutor service returned an invalid response."

        st.markdown(answer)
        st.session_state.messages.append({"role": "assistant", "content": answer})

# Health check
with st.sidebar:
    st.subheader("Health")
    st.caption(API_BASE or "Tutor API not configured")
    if st.button("Check /api/health"):
        if not IS_CONFIGURED:
            st.warning("Add EDUTUTOR_API_BASE in Streamlit Cloud Secrets first.")
            st.stop()
        try:
            r = requests.get(f"{API_BASE}/health", timeout=10)
            st.success(r.status_code == 200 and "✅ Connected" or f"⚠️ Status: {r.status_code}")
            if r.headers.get("content-type", "").startswith("application/json"):
                st.json(r.json())
            else:
                st.write(r.text[:500])
        except Exception as e:
            st.error(str(e))

# Chat UI
if "messages" not in st.session_state:
    st.session_state.messages = []

for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

prompt = st.chat_input("Ask the tutor...")

if prompt:
    submit_question(prompt)

# Quick actions
st.divider()
cols = st.columns(3)
examples = [
    "Explain time complexity with an example.",
    "Help me understand React props vs state.",
    "Give me a short Python code example for BFS.",
]
for i, col in enumerate(cols):
    if col.button(examples[i]):
        submit_question(examples[i])
