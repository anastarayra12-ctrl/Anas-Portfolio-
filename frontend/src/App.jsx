import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { TechRadarSection } from './components/TechRadarSection';
import { ProjectsSection } from './components/ProjectsSection';
import { QuickNotesSection } from './components/QuickNotesSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { NewsletterSection } from './components/NewsletterSection';
import { FooterSection } from './components/FooterSection';
import { HowIBuiltThisSection } from './components/HowIBuiltThisSection';
import { AntiPortfolioSection } from './components/AntiPortfolioSection';
import { PricingSection } from './components/PricingSection';
import { MeetingBookingModal } from './components/MeetingBookingModal';
import { IntroQuestionModal } from './components/IntroQuestionModal';
import { InteractiveTerminalModal } from './components/InteractiveTerminalModal';
import { CmdKModal } from './components/CmdKModal';
import { WhatsAppSuccessModal } from './components/WhatsAppSuccessModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './context/LanguageContext';
import { CaseStudyViewer } from './components/CaseStudyViewer';
import { Helmet } from 'react-helmet-async';

import { TransitionOverlayEffect } from './components/TransitionOverlayEffect';
import { MaintenanceScreen3D } from './components/MaintenanceScreen3D';
import maintenanceConfig from './config/maintenanceConfig';

import { ExperienceTimeline } from './components/ExperienceTimeline';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GitHubActivitySection } from './components/GitHubActivitySection';

import { AmbientBackground } from './components/AmbientBackground';

const CyberCodeBackground = React.lazy(() => 
  import('./components/CyberCodeBackground').then(module => ({ default: module.CyberCodeBackground }))
);

export function AppContent() {
  const [splashFinished, setSplashFinished] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'case-study'
  const [currentSlug, setCurrentSlug] = useState(null);
  const [isWhatsAppSuccessOpen, setIsWhatsAppSuccessOpen] = useState(false);
  const [isMeetingBookingOpen, setIsMeetingBookingOpen] = useState(false);
  const { lang } = useLanguage();

  // Check for maintenance bypass via URL query param (?preview=true) or session storage
  const [isBypassed, setIsBypassed] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('preview') === 'true') {
        sessionStorage.setItem('anas_portfolio_preview', 'true');
        return true;
      }
      return sessionStorage.getItem('anas_portfolio_preview') === 'true';
    }
    return false;
  });

  // Keyboard shortcut Ctrl + Shift + M to toggle bypass
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'm') {
        setIsBypassed((prev) => {
          const next = !prev;
          if (next) sessionStorage.setItem('anas_portfolio_preview', 'true');
          else sessionStorage.removeItem('anas_portfolio_preview');
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isMaintenanceActive = maintenanceConfig.enabled && !isBypassed;

  if (isMaintenanceActive) {
    return (
      <MaintenanceScreen3D
        onBypass={() => {
          sessionStorage.setItem('anas_portfolio_preview', 'true');
          setIsBypassed(true);
        }}
      />
    );
  }

  // Always scroll to top on initial load after React mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const handleNavigate = (e) => navigateTo('case-study', e.detail.slug);
    window.addEventListener('navigate-case-study', handleNavigate);
    return () => window.removeEventListener('navigate-case-study', handleNavigate);
  }, []);

  const handleWhatsAppSent = () => {
    setIsWhatsAppSuccessOpen(true);
  };

  const navigateTo = (page, slug = null) => {
    setCurrentPage(page);
    if (slug) setCurrentSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const seoMetadata = {
    title: lang === 'ar' ? 'أنس الطرايرة | مطور Full Stack ومصمم واجهات' : 'Anas Al-Tarayra | Full Stack Developer & UI/UX Designer',
    description: lang === 'ar' ? 'طموح في بناء تجارب رقمية غامرة، حيث يلتقي التصميم الأنيق بالهندسة الدقيقة.' : 'Ambitious about building immersive digital experiences, where elegant design meets refined engineering.',
  };

  return (
    <>
      <Helmet>
        <title>{seoMetadata.title}</title>
        <meta name="description" content={seoMetadata.description} />
        <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
      </Helmet>

      <AmbientBackground />
      
      <React.Suspense fallback={null}>
        <CyberCodeBackground />
      </React.Suspense>
      
      <CustomCursor />
      <TransitionOverlayEffect />
      <ScrollProgress />
      {!splashFinished && <SplashScreen onComplete={() => setSplashFinished(true)} />}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {currentPage === 'home' && (
            <>
              <Navbar currentPage={currentPage} onNavigate={navigateTo} />
              <main>
                <HomeSection />
                <AboutSection />
                <HowIBuiltThisSection />
                <AntiPortfolioSection />
                <ExperienceTimeline />
                <SkillsSection />
                <TechRadarSection />
                <ProjectsSection />
                <QuickNotesSection />
                <PricingSection onBookMeeting={() => setIsMeetingBookingOpen(true)} />
                <ContactSection onWhatsAppSent={handleWhatsAppSent} />
              </main>
              <NewsletterSection />
              <FooterSection />
            </>
          )}

          {currentPage === 'case-study' && (
            <>
              <Navbar currentPage={currentPage} onNavigate={navigateTo} />
              <main style={{ paddingTop: '100px', minHeight: '80vh' }}>
                <React.Suspense fallback={<div className="container text-center pt-20">Loading Case Study...</div>}>
                   <CaseStudyViewer slug={currentSlug} onBack={() => navigateTo('home')} />
                </React.Suspense>
              </main>
              <FooterSection />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <IntroQuestionModal />
      <MeetingBookingModal isOpen={isMeetingBookingOpen} onClose={() => setIsMeetingBookingOpen(false)} />
      <InteractiveTerminalModal />
      <CmdKModal />
      <WhatsAppSuccessModal
        isOpen={isWhatsAppSuccessOpen}
        onClose={() => setIsWhatsAppSuccessOpen(false)}
      />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
