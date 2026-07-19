import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="text-center py-16 px-6 bg-black text-white">
      <h1 className="text-4xl md:text-5xl font-bold text-neon glow mb-6">
        Personalized Learning with AI
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
        EduTutor AI helps learners turn vague goals into focused study plans, making quality guidance more accessible for students who need support the most.
      </p>
      <div className="flex justify-center flex-wrap gap-4">
        <Link to="/study-planner">
          <button className="neon-button text-lg px-6 py-3">🧠 TRY AI PLANNER</button>
        </Link>
        <Link to="/signup">
          <button className="border border-neon text-neon text-lg px-6 py-3 rounded">🚀 ENROLL NOW</button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
