import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const reactModules = [
  {
    title: 'Level 1: Introduction to React',
    description: 'Learn what React is, why it’s useful, and how it works.',
    content: 'React is a JavaScript library for building user interfaces. It lets you build components...'
  },
  {
    title: 'Level 2: JSX & Rendering',
    description: 'Understand JSX syntax and how React renders elements.',
    content: 'JSX is a syntax extension that lets you write HTML in JavaScript. React uses it to describe UI...'
  },
  {
    title: 'Level 3: Components and Props',
    description: 'Dive into functional components and pass data using props.',
    content: 'Components are the building blocks in React. Props allow you to pass data to these components...'
  },
  {
    title: 'Level 4: State and Events',
    description: 'Manage dynamic data and handle user interactions.',
    content: 'useState is a hook that lets you add local state to functional components...'
  },
  {
    title: 'Level 5: useEffect & Lifecycle',
    description: 'Side effects and lifecycle hooks in React components.',
    content: 'useEffect lets you perform side effects like fetching data, updating DOM, etc...'
  }
];

export default function ReactAssignment() {
  const [current, setCurrent] = useState(0);

  const nextModule = () => {
    if (current < reactModules.length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto bg-[#111] border border-pink-500 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-pink-400 mb-4">
          📘 {reactModules[current].title}
        </h2>
        <p className="mb-2 text-lg text-gray-300">{reactModules[current].description}</p>
        <p className="mb-4 text-sm text-gray-400">{reactModules[current].content}</p>
        <div className="flex justify-between items-center">
          {current < reactModules.length - 1 ? (
            <button
              onClick={nextModule}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
            >
              Next Module →
            </button>
          ) : (
            <Link to="/assignment/react">
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                Finish & Submit Assignment
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
