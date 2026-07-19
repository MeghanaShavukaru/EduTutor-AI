import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

const AskTutor = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { transcript, resetTranscript } = useSpeechRecognition();

  // Sync mic transcript into input
  useEffect(() => {
    if (transcript) setQuestion(transcript);
  }, [transcript]);

  const handleAsk = async () => {
    const q = question.trim();
    if (!q) return;

    setAnswer('');
    try {
      // Use backend tutor AI so no frontend API key is needed
      const res = await axios.post(`${API_BASE}/tutor`, { question: q }, { timeout: 20000 });
      setAnswer(res.data?.answer || 'Sorry, I could not fetch an answer.');
    } catch (err) {
      // Show error message in UI to debug quickly
      console.error(err);
      const msg = err?.response?.data?.error || err?.message || 'Unknown error';
      setAnswer(`Sorry, I could not fetch an answer. (${msg})`);
    }
  };

  const handleMic = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  return (
    <div className="text-center my-8 px-4">
      <img src="/default-avatar.png" className="mx-auto w-20" alt="Tutor Avatar" />
      <h2 className="text-green-400 font-bold text-2xl mb-4">EduTutor AI 🎓</h2>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask me anything..."
        className="w-full md:w-1/2 p-2 text-black rounded"
      />

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleAsk}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Ask Tutor
        </button>

        <button
          onClick={handleMic}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          🎤 Speak
        </button>
      </div>

      {answer && (
        <div className="bg-black mt-6 p-4 rounded border border-green-400 max-w-2xl mx-auto">
          <h3 className="text-pink-400 font-semibold">Answer:</h3>
          <p className="whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default AskTutor;
