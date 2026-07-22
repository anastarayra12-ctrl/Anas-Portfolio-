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
import { CoursesSection } from './components/CoursesSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { InteractiveTerminalModal } from './components/InteractiveTerminalModal';
import { StartProjectPage } from './components/StartProjectPage';
import { WhatsAppSuccessModal } from './components/WhatsAppSuccessModal';
import { CyberCodeBackground } from './components/CyberCodeBackground';

export function AppContent() {
  const [splashFinished, setSplashFinished] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'start-project'
  const [isWhatsAppSuccessOpen, setIsWhatsAppSuccessOpen] = useState(false);

  const handleWhatsAppSent = () => {
    setIsWhatsAppSuccessOpen(true);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <CyberCodeBackground />
      <CustomCursor />
      <ScrollProgress />
      {!splashFinished && <SplashScreen onComplete={() => setSplashFinished(true)} />}
      
      {currentPage === 'home' && (
        <>
          <Navbar currentPage={currentPage} onNavigate={navigateTo} />
          <main>
            <HomeSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <CoursesSection onNavigate={() => navigateTo('start-project')} />
            <ContactSection onWhatsAppSent={handleWhatsAppSent} />
          </main>
          <FooterSection onNavigate={() => navigateTo('start-project')} />
        </>
      )}

      {currentPage === 'start-project' && (
        <>
          <Navbar currentPage={currentPage} onNavigate={navigateTo} />
          <main>
            <StartProjectPage onBack={() => navigateTo('home')} onWhatsAppSent={handleWhatsAppSent} />
          </main>
          <FooterSection onNavigate={() => navigateTo('start-project')} />
        </>
      )}

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
