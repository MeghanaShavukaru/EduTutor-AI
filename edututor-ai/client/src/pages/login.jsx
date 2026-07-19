// 

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0b0c2a] flex items-center justify-center text-white px-4">
      <form onSubmit={handleLogin} className="bg-[#16162d] p-8 rounded-lg w-full max-w-sm shadow-lg border border-pink-500">
        <h2 className="text-2xl font-bold text-center mb-6 text-pink-400">EduTutor Login</h2>
        
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded text-black"
          required
        />
        
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded text-black"
          required
        />
        
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        
        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded"
        >
          Login
        </button>
        
        <p className="text-center mt-4 text-gray-400">
          Don't have an account? <a href="/signup" className="text-pink-400 hover:underline">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;