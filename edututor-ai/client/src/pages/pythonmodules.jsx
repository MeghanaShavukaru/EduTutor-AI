import React, { useState } from 'react';

const pythonModules = [
  {
    title: "1. Introduction to Python",
    description: "Learn what Python is, why it's popular, and where it's used.",
    video: "https://www.youtube.com/embed/_uQrJ0TkZlc",
  },
  {
    title: "2. Variables and Data Types",
    description: "Understand variables, integers, strings, floats, and basic data types.",
    video: "https://www.youtube.com/embed/khKv-8q7YmY",
  },
  {
    title: "3. Control Flow (if, else, loops)",
    description: "Master conditional logic and loops in Python.",
    video: "https://www.youtube.com/embed/6iF8Xb7Z3wQ",
  },
  {
    title: "4. Functions in Python",
    description: "Learn to write and use reusable code with functions.",
    video: "https://www.youtube.com/embed/NSbOtYzIQI0",
  },
  {
    title: "5. Introduction to OOP",
    description: "Basics of Object-Oriented Programming using Python classes.",
    video: "https://www.youtube.com/embed/JeznW_7DlB0",
  },
];

const PythonModules = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleModule = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0b0c2a] text-white p-6">
      <h1 className="text-center text-3xl font-bold text-green-400 mb-6">
        🐍 Python Course Modules
      </h1>

      <div className="space-y-4 max-w-3xl mx-auto">
        {pythonModules.map((module, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleModule(index)}
              className="w-full text-left px-6 py-4 bg-pink-600 hover:bg-pink-700 font-semibold text-white text-lg"
            >
              {module.title}
            </button>
            {openIndex === index && (
              <div className="p-6 bg-gray-900">
                <p className="mb-4 text-white">{module.description}</p>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="315"
                    src={module.video}
                    title={module.title}
                    allowFullScreen
                    className="rounded-lg border border-pink-500"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PythonModules;
