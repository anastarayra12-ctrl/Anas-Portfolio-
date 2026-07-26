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
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { InteractiveTerminalModal } from './components/InteractiveTerminalModal';
import { WhatsAppSuccessModal } from './components/WhatsAppSuccessModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './context/LanguageContext';
import { CaseStudyViewer } from './components/CaseStudyViewer';
import { Helmet } from 'react-helmet-async';

const CyberCodeBackground = React.lazy(() => 
  import('./components/CyberCodeBackground').then(module => ({ default: module.CyberCodeBackground }))
);

export function AppContent() {
  const [splashFinished, setSplashFinished] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'case-study'
  const [currentSlug, setCurrentSlug] = useState(null);
  const [isWhatsAppSuccessOpen, setIsWhatsAppSuccessOpen] = useState(false);
  const { lang } = useLanguage();

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
      
      <React.Suspense fallback={null}>
        <CyberCodeBackground />
      </React.Suspense>
      
      <CustomCursor />
      <ScrollProgress />
      {!splashFinished && <SplashScreen onComplete={() => setSplashFinished(true)} />}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentPage}-${lang}`}
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
                <SkillsSection />
                <ProjectsSection />
                <ContactSection onWhatsAppSent={handleWhatsAppSent} />
              </main>
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

      <InteractiveTerminalModal />
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
