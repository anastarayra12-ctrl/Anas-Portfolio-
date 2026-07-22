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
import { ProjectEstimatorModal } from './components/ProjectEstimatorModal';
import { DirectProjectModal } from './components/DirectProjectModal';
import { WhatsAppSuccessModal } from './components/WhatsAppSuccessModal';
import { CyberCodeBackground } from './components/CyberCodeBackground';

export function AppContent() {
  const [splashFinished, setSplashFinished] = useState(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isDirectModalOpen, setIsDirectModalOpen] = useState(false);
  const [isWhatsAppSuccessOpen, setIsWhatsAppSuccessOpen] = useState(false);

  const handleWhatsAppSent = () => {
    setIsWhatsAppSuccessOpen(true);
  };

  return (
    <>
      <CyberCodeBackground />
      <CustomCursor />
      <ScrollProgress />
      {!splashFinished && <SplashScreen onComplete={() => setSplashFinished(true)} />}
      <Navbar
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        onOpenDirectModal={() => setIsDirectModalOpen(true)}
      />
      <main>
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CoursesSection
          onOpenEstimator={() => setIsEstimatorOpen(true)}
          onOpenDirectModal={() => setIsDirectModalOpen(true)}
        />
        <ContactSection onWhatsAppSent={handleWhatsAppSent} />
      </main>
      <FooterSection
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        onOpenDirectModal={() => setIsDirectModalOpen(true)}
      />
      <InteractiveTerminalModal />
      <ProjectEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onWhatsAppSent={handleWhatsAppSent}
      />
      <DirectProjectModal
        isOpen={isDirectModalOpen}
        onClose={() => setIsDirectModalOpen(false)}
        onWhatsAppSent={handleWhatsAppSent}
      />
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




