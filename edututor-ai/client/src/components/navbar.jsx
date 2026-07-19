import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

function Navbar() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  // if (loading) return null; // or loading spinner

  return (
    <nav className="bg-black border-b border-neon px-6 py-4 text-white flex flex-col md:flex-row md:justify-between items-center shadow-md">
      <div className="text-2xl text-neon font-bold mb-2 md:mb-0 glow">
        <Link to="/">edututor <span className="text-pink-500">ai</span></Link>
      </div>
      <div className="space-x-4 text-sm md:text-base text-gray-200">
        {/* <Link to="/" className="hover:text-neon">Home</Link> */}
        <Link to="/home" className="hover:text-neon">Home</Link>
        <Link to="/courses" className="hover:text-neon">Courses</Link>
        <Link to="/dashboard" className="hover:text-neon">Dashboard</Link>
        <Link to="/study-planner" className="hover:text-neon">Planner</Link>
        <Link to="/about" className="hover:text-neon">About</Link>
        <Link to="/contact" className="hover:text-neon">Contact</Link>
        {!user ? (
          <>
            {/* <Link to="/login" className="hover:text-neon">Login</Link> */}
            {/* <Link to="/signup" className="hover:text-neon">Sign Up</Link> */}
          </>
        ) : (
          <>
            <span className="text-xs text-gray-400">Hi, {user.email}</span>
            <button onClick={handleLogout} className="text-sm px-3 py-1 neon-button">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
