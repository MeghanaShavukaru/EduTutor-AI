import React from 'react';
import { Link } from 'react-router-dom';
import AITutor from '../components/aitutor';

const ReactCourse = () => {
  return (
    <div>
      <AITutor />
      <div className="text-center mt-6">
        <Link to="/react/modules">
          <button className="bg-pink-500 px-6 py-2 rounded text-white">
            Load Assignment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ReactCourse;
