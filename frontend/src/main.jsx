import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/base.css';
import App from './App.jsx';
import { initAnalytics } from './lib/analytics';

initAnalytics();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// A small hello for fellow developers who open the console.
console.info(
  '%cAnas Tarayra%c — designed & built by hand. Say hi: anas.tarayra.work@gmail.com',
  'color:#1E3FB8;font:600 13px "Space Grotesk",sans-serif',
  'color:inherit;font:12px sans-serif',
);
