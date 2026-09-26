import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { LazyMotion, MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import maintenanceConfig from './config/maintenanceConfig';
import { Header } from './components/Header';
import { Dock } from './components/Dock';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Work } from './components/Work';
import { Stack } from './components/Stack';
import { Journey } from './components/Journey';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Backdrop } from './components/Backdrop';
import { SwitchFx } from './components/SwitchFx';
import { Splash, shouldShowSplash } from './components/Splash';
import { IntroContext } from './context/IntroContext';

const loadMotionFeatures = () => import('./motionFeatures').then((mod) => mod.default);

// Three.js is only needed for the maintenance screen — keep it out of the main bundle.
const MaintenanceScreen3D = lazy(() =>
  import('./components/MaintenanceScreen3D').then((m) => ({ default: m.MaintenanceScreen3D })),
);

const PREVIEW_KEY = 'anas_portfolio_preview';

const readBypass = () => {
  try {
    if (maintenanceConfig.allowBypassQuery && new URLSearchParams(window.location.search).get('preview') === 'true') {
      sessionStorage.setItem(PREVIEW_KEY, 'true');
      return true;
    }
    return sessionStorage.getItem(PREVIEW_KEY) === 'true';
  } catch {
    return false;
  }
};

function Site() {
  const { t } = useLanguage();
  const [splash, setSplash] = useState(shouldShowSplash);
  const [ready, setReady] = useState(() => !splash);
  const onLeave = useCallback(() => setReady(true), []);
  const onDone = useCallback(() => setSplash(false), []);
  return (
    <IntroContext.Provider value={ready}>
      {splash && <Splash onLeave={onLeave} onDone={onDone} />}
      <SwitchFx />
      <div className="site">
        <Backdrop />
        <a className="skip-link" href="#main">
          {t.a11y.skip}
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          <Hero />
          <About />
          <Stack />
          <Work />
          <Journey />
          <Contact />
        </main>
        <Footer />
        <Dock />
      </div>
    </IntroContext.Provider>
  );
}

function Gate() {
  const [bypassed, setBypassed] = useState(readBypass);

  const setBypass = useCallback((next) => {
    try {
      if (next) sessionStorage.setItem(PREVIEW_KEY, 'true');
      else sessionStorage.removeItem(PREVIEW_KEY);
    } catch {
      /* ignore */
    }
    setBypassed(next);
  }, []);

  // Ctrl + Shift + M toggles the maintenance preview (owner shortcut)
  useEffect(() => {
    if (!maintenanceConfig.enabled || !maintenanceConfig.allowBypassQuery) return undefined;
    const onKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'm') setBypass(!bypassed);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [bypassed, setBypass]);

  if (maintenanceConfig.enabled && !bypassed) {
    return (
      <Suspense fallback={<div className="boot" aria-busy="true" />}>
        <MaintenanceScreen3D onBypass={maintenanceConfig.allowBypassQuery ? () => setBypass(true) : undefined} />
      </Suspense>
    );
  }
  return <Site />;
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LazyMotion features={loadMotionFeatures}>
          <MotionConfig reducedMotion="user">
            <Gate />
          </MotionConfig>
        </LazyMotion>
      </LanguageProvider>
    </ThemeProvider>
  );
}
