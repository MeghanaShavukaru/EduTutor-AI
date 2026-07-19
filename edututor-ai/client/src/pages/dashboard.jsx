import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#0b0c2a] text-white">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1a1a3d] shadow-lg transform ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 border-b border-pink-500 text-lg font-bold text-pink-400">
          EduTutor Menu
        </div>
        <ul className="p-4 space-y-4 text-white">
          <li>
            <button onClick={() => navigate('/home')}>Home</button>
          </li>
          <li>
            <button onClick={() => navigate('/about')}>About</button>
          </li>
          <li>
            <button onClick={() => navigate('/courses')}>Courses</button>
          </li>
          <li>
            <button onClick={() => navigate('/contact')}>Contact</button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-500"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 bg-[#16162d] shadow-md">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
            ☰
          </button>
          <h1 className="text-xl font-bold text-pink-400">Welcome to EduTutor</h1>
        </div>

        {/* Banner Section */}
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="bg-[#1f1f3c] border border-pink-500 p-6 rounded-lg text-center shadow-lg max-w-3xl">
            <h2 className="text-3xl font-bold mb-4 text-green-400">Empower Your Learning Journey</h2>
            <p className="text-lg text-gray-300">
              Explore AI-powered personalized tutoring, interactive modules, and hands-on coding assignments designed to help you succeed in modern tech skills like React, Python, AI, and Tailwind CSS.
            </p>
            <img
              src="/assets/" // make sure banner image is in public/assets/ or update path
              alt="Education Banner"
              className="mt-6 rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
