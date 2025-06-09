import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM from 'react-dom/client' for React 18+
import App from './App'; // Assuming App.js is in the same 'src' directory
import './index.css'; // Assuming index.css is also in the 'src' directory

// Get the root DOM element where your React app will be rendered
const rootElement = document.getElementById('root');

// Create a React root and render your App component
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);