import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setChat((prev) => [...prev, userMsg]);
    setInput('');

    try {
      const res = await axios.post(`${API_BASE}/tutor`, { question: input });
      const botMsg = { role: 'bot', text: res.data.answer || '❌ Error from AI API.' };
      setChat((prev) => [...prev, botMsg]);
    } catch {
      setChat((prev) => [...prev, { role: 'bot', text: '❌ Error from AI API.' }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="bg-black border border-neon w-80 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-neon text-black font-bold px-4 py-2 flex justify-between items-center">
            <span>EduTutor Bot 🤖</span>
            <button onClick={() => setOpen(false)} className="font-bold">✖</button>
          </div>
          <div className="h-64 p-3 overflow-y-auto text-white bg-gray-900 text-sm space-y-2">
            {chat.map((msg, idx) => (
              <div key={idx} className={`${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className="inline-block px-3 py-1 bg-gray-800 rounded-lg mb-1">
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex p-2 border-t border-neon bg-black">
            <input
              type="text"
              className="flex-grow p-2 bg-black text-white border border-neon rounded-l"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask anything..."
            />
            <button onClick={sendMessage} className="neon-button rounded-none rounded-r px-4">→</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="neon-button px-4 py-2">💬 Chat</button>
      )}
    </div>
  );
}

export default Chatbot;
