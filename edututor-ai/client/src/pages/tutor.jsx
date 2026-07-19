import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaMicrophone } from 'react-icons/fa';
import './tutor.css'; // optional for extra styling

const TutorPage = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [listening, setListening] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAskTutor = async () => {
    if (!question.trim()) return;
    setAnswer('Thinking...');
    try {
      const res = await fetch('http://localhost:5000/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer || 'Sorry, no answer found.');
    } catch (err) {
      console.error(err);
      setAnswer('Sorry, an error occurred.');
    }
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
    };

    recognition.start();
  };

  const handleLoadAssignment = () => {
    if (location.pathname.includes('react')) navigate('/react/modules');
    else if (location.pathname.includes('python')) navigate('/python/modules');
    else if (location.pathname.includes('ai')) navigate('/ai/modules');
    else if (location.pathname.includes('tailwind')) navigate('/tailwind/modules');
    else alert('Course not recognized');
  };

  return (
    <div className="text-white flex flex-col items-center py-10">
      <img src="/default-avatar.png" alt="logo" className="w-20 mb-3" />
      <h1 className="text-3xl font-bold text-green-400 mb-4">EduTutor AI 🎓</h1>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-[300px] p-2 text-black rounded"
        />
        <button
          onClick={handleVoiceInput}
          className={`p-2 ${listening ? 'bg-red-500' : 'bg-blue-500'} rounded-full`}
        >
          <FaMicrophone />
        </button>
      </div>

      <button
        className="mt-4 bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        onClick={handleAskTutor}
      >
        Ask Tutor
      </button>

      {answer && (
        <div className="mt-6 bg-black border border-green-400 p-4 w-[80%] rounded text-white">
          <strong>Answer:</strong>
          <p className="mt-2">{answer}</p>
        </div>
      )}

      <button
        className="mt-6 bg-pink-500 px-6 py-3 rounded text-white hover:bg-pink-600"
        onClick={handleLoadAssignment}
      >
        Load Assignment
      </button>
    </div>
  );
};

export default TutorPage;
