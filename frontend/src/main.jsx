import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/base.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// A small hello for fellow developers who open the console.
console.info(
  '%cAnas Tarayra%c — designed & built by hand. Say hi: anastarayra12@gmail.com',
  'color:#3B82F6;font:600 13px "Space Grotesk",sans-serif',
  'color:inherit;font:12px sans-serif',
);
