// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// // Components
// import Navbar from './components/navbar';
// import Footer from './components/footer';
// import ProtectedRoute from './components/protectedroute';

// // Pages
// import Login from './pages/login';
// import Dashboard from './pages/dashboard';
// import Home from './pages/home';
// import About from './pages/about';
// import Contact from './pages/contact';
// import CoursesPage from './pages/coursespage';
// import ReactCourse from './pages/reactcourse';
// import PythonCourse from './pages/pythoncourse';
// import AICourse from './pages/aicourse';
// import TailwindCourse from './pages/tailwindcourse';
// import ReactModules from './pages/reactmodules';
// import Assignment from './pages/assignment';

// function App() {
//   const isLoggedIn = localStorage.getItem('user');

//   return (
//     <BrowserRouter>
//       <div className="bg-[#0b0c2a] text-white min-h-screen flex flex-col">
//         {/* Show Navbar only after login */}
//         {isLoggedIn && <Navbar />}

//         <main className="flex-grow">
//           <Routes>
//             {/* Public Route */}
//             <Route path="/" element={<Navigate to="/login" />} />
//             <Route path="/login" element={<Login />} />

//             {/* Protected Routes */}
//             <Route path="/dashboard"element={
//                 <ProtectedRoute><Dashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/home"
//               element={
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/about"
//               element={
//                 <ProtectedRoute>
//                   <About />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/contact"
//               element={
//                 <ProtectedRoute>
//                   <Contact />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/courses"
//               element={
//                 <ProtectedRoute>
//                   <CoursesPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/tutor/react"
//               element={
//                 <ProtectedRoute>
//                   <ReactCourse />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/tutor/python"
//               element={
//                 <ProtectedRoute>
//                   <PythonCourse />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/tutor/ai"
//               element={
//                 <ProtectedRoute>
//                   <AICourse />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/tutor/tailwind"
//               element={
//                 <ProtectedRoute>
//                   <TailwindCourse />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/react/modules"
//               element={
//                 <ProtectedRoute>
//                   <ReactModules />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/assignment/:course"
//               element={
//                 <ProtectedRoute>
//                   <Assignment />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </main>

//         {/* Show Footer only after login */}
//         {isLoggedIn && <Footer />}
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/navbar';
import Footer from './components/footer';
import ProtectedRoute from './components/protectedroute';

// Pages
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import CoursesPage from './pages/coursespage';
import ReactCourse from './pages/reactcourse';
import PythonCourse from './pages/pythoncourse';
import AICourse from './pages/aicourse';
import TailwindCourse from './pages/tailwindcourse';
import ReactModules from './pages/reactmodules';
import Assignment from './pages/assignment';
import PythonModules from './pages/pythonmodules';
import StudyPlanner from './pages/studyplanner';
import InteractiveAssignment from './pages/interactive_assignment';
// Main App Layout (now inside BrowserRouter)
function AppLayout() {

  const location = useLocation();
  const isLoggedIn = localStorage.getItem('user');

  // Don't show navbar/footer on login page
  const showLayout = isLoggedIn && !['/login', '/signup'].includes(location.pathname);


  return (
    <div className="bg-[#0b0c2a] text-white min-h-screen flex flex-col">
      {showLayout && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
  path="/python/modules"
  element={
    <ProtectedRoute>
      <PythonModules />
    </ProtectedRoute>
  }
/>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/tutor/react" element={<ReactCourse />} />
            <Route path="/tutor/python" element={<PythonCourse />} />
            <Route path="/tutor/ai" element={<AICourse />} />
            <Route path="/tutor/tailwind" element={<TailwindCourse />} />
            <Route path="/react/modules" element={<ReactModules />} />
            <Route path="/assignment/:course" element={<InteractiveAssignment />} />
            <Route path="/study-planner" element={<StudyPlanner />} />
          </Route>
        </Routes>
      </main>

      {showLayout && <Footer />}
    </div>
  );
}

// Main App Wrapper (sets up BrowserRouter)
function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;