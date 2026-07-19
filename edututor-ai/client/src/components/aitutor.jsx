import React, { useState } from 'react';

const AITutor = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
      });
      const data = await res.json();
      setResponse(data.answer || 'Sorry, no answer found.');
    } catch (error) {
      console.error(error);
      setResponse('Sorry, an error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center my-8 px-4">
      <h2 className="text-3xl font-bold text-green-400 mb-4">EduTutor AI 🎓</h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
        className="p-2 w-full max-w-md rounded text-black"
      />

      <button
        onClick={handleAsk}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded mt-4"
      >
        Ask Tutor
      </button>

      {loading && <p className="text-yellow-400 mt-4">Thinking...</p>}

      {response && (
        <div className="bg-black text-green-300 border border-green-500 p-4 rounded mt-6 max-w-2xl mx-auto">
          <h3 className="text-pink-400 font-semibold">Answer:</h3>
          <p className="mt-2 whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
};

export default AITutor;
