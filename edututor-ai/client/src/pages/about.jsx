import React from 'react';

function About() {
  return (
    <section className="py-16 px-6 max-w-4xl mx-auto text-white space-y-8">
      <h2 className="text-4xl font-bold text-neon glow mb-4">👩‍🏫 About EduTutor AI</h2>
      <p className="text-gray-300 leading-relaxed">
        EduTutor AI is a personalized learning platform that blends modern UI with generative AI to support students at every level.
        Our goal is to make learning interactive, intelligent, and accessible to all through cutting-edge technology.
      </p>
      <div className="glow-box">
        <h3 className="text-xl font-semibold text-neon mb-2">🎯 Mission</h3>
        <p className="text-gray-300">To provide adaptive, AI-driven education to empower lifelong learners globally.</p>
      </div>
      <div className="glow-box">
        <h3 className="text-xl font-semibold text-neon mb-2">🚀 Technologies Used</h3>
        <ul className="list-disc ml-6 text-gray-300 space-y-1">
          <li>React + Vite + Tailwind CSS</li>
          <li>Firebase Auth + Firestore</li>
          <li>Hugging Face Generative AI</li>
          <li>Express.js Backend APIs</li>
        </ul>
      </div>
    </section>
  );
}

export default About;
