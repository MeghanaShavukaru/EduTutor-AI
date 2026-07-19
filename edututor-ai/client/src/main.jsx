import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import './styles/neon.css';
import './index.css'; // optional: tailwind base styles
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
