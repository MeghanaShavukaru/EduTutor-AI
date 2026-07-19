// client/src/pages/CourseTemplate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/neon.css';
import doubtIcon from '../assets/doubt.png';

const CourseTemplate = ({ courseName }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const handleAsk = () => {
    setAnswer(`Answer for "${question}" will be generated here...`);
  };

  const handleAssignment = () => {
    navigate(`/assignment/${courseName.toLowerCase()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a23] text-white">
      <img src={doubtIcon} alt="doubt" className="w-24 mb-4" />
      <h1 className="text-3xl font-bold text-green-500 mb-4">
        EduTutor AI 🎓
      </h1>
      <input
        type="text"
        placeholder="Ask me anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="p-3 w-[80%] max-w-xl text-black rounded mb-4"
      />
      <button
        onClick={handleAsk}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded mb-6"
      >
        Ask Tutor
      </button>

      {answer && (
        <div className="w-[80%] max-w-2xl border border-green-600 rounded p-4 mb-6 bg-black text-white">
          <strong>Answer:</strong> {answer}
        </div>
      )}

      <button
        onClick={handleAssignment}
        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded"
      >
        Load Assignment
      </button>
    </div>
  );
};

export default CourseTemplate;
