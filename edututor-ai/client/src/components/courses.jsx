import React from 'react';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 'react',
    title: 'React.js Essentials',
    emoji: '⚛️',
    bg: 'bg-[#111122]',
  },
  {
    id: 'python',
    title: 'Python for Beginners',
    emoji: '🐍',
    bg: 'bg-[#111122]',
  },
  {
    id: 'ai',
    title: 'AI Prompt Engineering',
    emoji: '🧠',
    bg: 'bg-[#111122]',
  },
  {
    id: 'tailwind',
    title: 'Tailwind CSS Mastery',
    emoji: '🎨',
    bg: 'bg-[#111122]',
  },
];

export default function Courses() {
  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
        📚 Enroll in a Course
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`border border-green-500 rounded-xl p-6 shadow-lg hover:shadow-green-500/50 transition ${course.bg}`}
          >
            <div className="text-4xl mb-2">{course.emoji}</div>
            <h3 className="text-xl font-semibold mb-4">{course.title}</h3>
            <Link to={`/tutor/${course.id}`}>
              <button className="bg-pink-600 px-4 py-2 rounded-full text-white hover:bg-pink-500 transition">
                Enroll Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
