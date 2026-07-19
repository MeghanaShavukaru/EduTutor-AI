// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = () => {
//   const isAuthenticated = localStorage.getItem('user') === 'loggedIn';
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;

// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../utils/firebase';

// const ProtectedRoute = () => {
//   const [user, loading] = useAuthState(auth);
  
//   if (loading) return <div>Loading...</div>; // or your loading component
  
//   return user ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;

import { Navigate, Outlet } from 'react-router-dom';

// This project login should work with ANY email + password.
// So protected routes are based on localStorage, not Firebase.
const ProtectedRoute = () => {
  const user = localStorage.getItem('user');
  const isAuthenticated = Boolean(user);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
