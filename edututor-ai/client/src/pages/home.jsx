// import React from 'react';
// import Hero from '../components/hero.jsx';
// import Courses from '../components/courses.jsx';
// import Chatbot from '../components/chatbot.jsx';

// function Home() {
//   return (
//     <div>
//       <Hero />
//       <Courses />
//       <Chatbot />
//     </div>
//   );
// }

// export default Home;


import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/hero.jsx';
import Courses from '../components/courses.jsx';
import Chatbot from '../components/chatbot.jsx';

function Home() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem('user') === 'loggedIn';
  //   // if (!isAuthenticated) {
  //   //   navigate('/login');
  //   // }
  // }, [navigate]);

  return (
    <div>
      <Hero />
      <Courses />
      <Chatbot />
    </div>
  );
}

export default Home;  // <-- Add this line at the end