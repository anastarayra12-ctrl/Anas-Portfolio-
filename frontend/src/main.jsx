import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import './i18n'
import App from './App.jsx'

// Always start at the top of the page on load/refresh — clear any hash anchor
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname);
}
window.scrollTo(0, 0);


// 🎨 Developer Console Easter Egg
console.log(
  '%c\n  ████████████████████████\n  ██  ANAS AL-TARAYRAH  ██\n  ██  Full-Stack + AI/UX  ██\n  ████████████████████████\n',
  'color: #3B82F6; font-family: monospace; font-size: 10px; font-weight: bold; line-height: 1.4;'
);
console.log(
  '%c👋 Hey dev! You found the easter egg.',
  'color: #10B981; font-size: 15px; font-weight: bold;'
);
console.log(
  '%c📧 anastarayra12@gmail.com',
  'color: #A1A1AA; font-size: 13px;'
);
console.log(
  '%c🐙 github.com/anastarayra12   |   💼 linkedin.com/in/anastarayra12',
  'color: #A1A1AA; font-size: 13px;'
);
console.log(
  '%c🚀 Built with React + Vite + .NET · Open to work!',
  'color: #8B5CF6; font-size: 12px; font-style: italic;'
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
