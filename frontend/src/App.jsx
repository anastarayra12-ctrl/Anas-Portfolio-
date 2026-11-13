import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { LazyMotion, MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { IntroContext } from './context/IntroContext';
import maintenanceConfig from './maintenance/maintenanceConfig';
import { Header } from './components/layout/Header';
import { Dock } from './components/layout/Dock';
import { Footer } from './components/layout/Footer';
import { Backdrop } from './components/layout/Backdrop';
import { SwitchFx } from './components/effects/SwitchFx';
import { Splash, shouldShowSplash } from './components/effects/Splash';
import { Hero } from './sections/hero/Hero';
import { About } from './sections/about/About';
import { Skills } from './sections/skills/Skills';
import { Projects } from './sections/projects/Projects';
import { Journey } from './sections/journey/Journey';
import { Contact } from './sections/contact/Contact';

const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default);

// Three.js is only needed for the maintenance screen — keep it out of the main bundle.
const MaintenanceScreen3D = lazy(() =>
  import('./maintenance/MaintenanceScreen3D').then((m) => ({ default: m.MaintenanceScreen3D })),
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
          <Skills />
          <Projects />
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
