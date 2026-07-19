import React from 'react';
import Courses from '../components/courses';

export default function CoursesPage() {
  return (
    <div className="bg-black text-white min-h-screen pt-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-green-400 neon-glow">
          🚀 Trending Courses
        </h1>
        <Courses />
      </div>
    </div>
  );
}
