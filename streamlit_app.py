import os
import requests
import streamlit as st

API_BASE = os.getenv("VITE_API_BASE", "http://localhost:5000/api").rstrip("/")

st.set_page_config(page_title="EduTutor AI (Streamlit)", layout="centered")

st.title("EduTutor AI")
st.caption(f"Backend: {API_BASE}")

# Health check
with st.sidebar:
    st.subheader("Health")
    if st.button("Check /api/health"):
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
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        with st.spinner("Getting answer..."):
            try:
                resp = requests.post(
                    f"{API_BASE}/tutor",
                    json={"question": prompt},
                    timeout=20,
                    headers={"Content-Type": "application/json"},
                )
                data = resp.json() if resp.content else {}
                answer = data.get("answer")

                if not answer:
                    answer = "I couldn't generate an answer right now. Please try again."
            except Exception as e:
                answer = f"❌ Tutor API error: {e}"

            st.markdown(answer)
            st.session_state.messages.append({"role": "assistant", "content": answer})

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
        st.session_state.messages.append({"role": "user", "content": examples[i]})
        st.rerun()

