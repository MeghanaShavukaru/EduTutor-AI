import React, { useState } from 'react';
import { FaGraduationCap } from 'react-icons/fa';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

const modules = [
  {
    id: 1,
    title: 'Introduction to React',
    content: 'Understand what React is, why it is used, and its key benefits.',
    video: 'https://www.youtube.com/embed/w7ejDZ8SWv8'
  },
  {
    id: 2,
    title: 'JSX and Components',
    content: 'Learn how JSX works and how to create reusable components in React.',
    video: 'https://www.youtube.com/embed/Ke90Tje7VS0'
  },
  {
    id: 3,
    title: 'State and Props',
    content: 'Understand state management and how props allow component communication.',
    video: 'https://www.youtube.com/embed/IYvD9oBCuJI'
  },
  {
    id: 4,
    title: 'useEffect and Lifecycle',
    content: 'Learn how useEffect works and what side-effects mean in React apps.',
    video: 'https://www.youtube.com/embed/0ZJgIjIuY7U'
  },
  {
    id: 5,
    title: 'React Router',
    content: 'Understand how to add multiple pages using React Router.',
    video: 'https://www.youtube.com/embed/Law7wfdg_ls'
  }
];

const ReactModules = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = async () => {
    if (!input.trim()) return;
    setResponse('Thinking...');

    try {
      const res = await fetch(`${API_BASE}/tutor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
      });
      const data = await res.json();
      setResponse(data.answer || 'Sorry, no answer found.');
    } catch (error) {
      console.error(error);
      setResponse('Sorry, an error occurred.');
    }
  };

  return (
    <div className="bg-[#0b0c2a] text-white px-4 py-8 min-h-screen">
      <div className="text-center mb-6">
        <img src="/assets/doubt.png" alt="Doubt" className="mx-auto w-20" />
        <h1 className="text-3xl font-bold text-green-400 mb-4">EduTutor AI <FaGraduationCap className="inline ml-2" /></h1>

        {/* Ask Tutor */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="text-black p-2 rounded w-1/2"
          />
          <button onClick={handleAsk} className="bg-green-500 text-white px-4 py-2 rounded ml-2">
            Ask Tutor
          </button>
        </div>
        {response && (
          <div className="bg-gray-800 text-pink-300 p-4 rounded w-full max-w-3xl mx-auto mb-6">
            <strong>Answer:</strong> {response}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto">
        {modules.map((mod, index) => (
          <div key={mod.id} className="relative pl-10 mb-10 border-l-4 border-pink-500">
            <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-pink-500"></div>
            <h2 className="text-xl font-bold text-pink-400 mb-1">{mod.title}</h2>
            <p className="text-gray-300 mb-2">{mod.content}</p>
            {mod.video && (
              <div className="aspect-video w-full max-w-xl">
                <iframe
                  className="rounded"
                  width="100%"
                  height="315"
                  src={mod.video}
                  title={mod.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReactModules;
