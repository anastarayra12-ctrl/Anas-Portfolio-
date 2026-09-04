import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { AnasLogo } from './AnasLogo';
import { AmmanClock } from './AmmanClock';
import { AvailabilityBadge } from './AvailabilityBadge';
import { AmbientAudioPlayer } from './AmbientAudioPlayer';
import { Sun, Moon, Globe, Menu, X, ArrowUp, Zap } from 'lucide-react';
import useAppStore from '../store/useAppStore';

export const Navbar = ({ currentPage, onNavigate }) => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isMenuOpen, toggleMenu, closeMenu } = useAppStore();
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const shouldReduceMotion = useReducedMotion();
  const isRTL = lang === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#projects', label: t.nav.projects || (lang === 'ar' ? 'المشاريع' : 'Projects') },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleNavClick = (e, href) => {
    closeMenu();
    if (currentPage !== 'home') {
      e.preventDefault();
      onNavigate('home');
      setTimeout(() => {
        window.location.hash = href;
      }, 100);
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: scrolled ? '16px' : '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          width: 'max-content',
          maxWidth: '92vw'
        }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '8px',
          backgroundColor: scrolled ? 'var(--card-bg)' : 'rgba(24, 24, 27, 0.4)',
          border: '1px solid var(--border-color)',
          padding: '8px 12px',
          borderRadius: '100px',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: scrolled ? '0 20px 40px -10px rgba(0,0,0,0.3), 0 0 20px rgba(59, 130, 246, 0.1)' : '0 10px 30px -10px rgba(0,0,0,0.1)',
          pointerEvents: 'auto',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          
          {/* Logo */}
          <div style={{ paddingLeft: '8px', paddingRight: '12px', display: 'flex', alignItems: 'center' }}>
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', opacity: 0.9 }}>
              <AnasLogo size={32} showText={false} />
            </a>
          </div>

          <div className="desktop-nav" style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>

          {/* Desktop Nav Links */}
          {currentPage === 'home' && (
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '0 8px',
              }}
              className="desktop-nav"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{
                      color: isActive ? 'var(--accent-blue)' : 'var(--text-primary)',
                      opacity: isActive ? 1 : 0.7,
                      backgroundColor: isActive ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
                      textDecoration: 'none',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.9rem',
                      padding: '8px 16px',
                      borderRadius: '100px',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          )}

          <div className="desktop-nav" style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '4px' }}>
            {/* Terminal Button */}
            <button
              className="hide-on-mobile"
              onClick={() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
              }}
              title="Terminal (Ctrl + K)"
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                color: 'var(--accent-blue)',
                borderRadius: '100px',
                padding: '6px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600,
                fontSize: '0.8rem',
                minHeight: '36px',
              }}
            >
              <Zap size={14} style={{ color: '#38BDF8' }} />
              <span>{lang === 'ar' ? 'Ctrl+K' : 'Ctrl+K'}</span>
            </button>

            {/* Ambient Audio Player */}
            <div className="hide-on-mobile">
              <AmbientAudioPlayer />
            </div>

            {/* Amman Time */}
            <div className="desktop-clock" style={{ padding: '0 12px', opacity: 0.8, fontSize: '0.85rem' }}>
              <AmmanClock />
            </div>

            {/* Language Toggle Button */}
            <button
              className="hide-on-mobile"
              onClick={toggleLanguage}
              title="Toggle Language"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                opacity: 0.8,
                borderRadius: '100px',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600,
                fontSize: '0.85rem',
                minHeight: '44px',
                minWidth: '44px',
              }}
            >
              <Globe size={16} />
              <span>{lang === 'en' ? 'AR' : 'EN'}</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              className="hide-on-mobile"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              style={{
                background: 'transparent',
                border: 'none',
                color: theme === 'dark' ? '#F59E0B' : '#2563EB',
                opacity: 0.85,
                borderRadius: '100px',
                width: '44px',
                height: '44px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ transition: 'transform 200ms ease', transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)' }}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </div>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMenu}
              aria-label="Toggle Mobile Navigation"
              className="mobile-toggle"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                borderRadius: '100px',
                width: '44px',
                height: '44px',
                minWidth: '44px',
                minHeight: '44px',
                cursor: 'pointer',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ transition: 'transform 200ms ease', transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu & Overlay with Framer Motion */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMenu}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 998,
              }}
            />

            {/* Mobile Slide Drawer */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { x: isRTL ? "-100%" : "100%" }}
              animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: isRTL ? "-100%" : "100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                right: isRTL ? 'auto' : 0,
                left: isRTL ? 0 : 'auto',
                width: '80vw',
                maxWidth: '320px',
                backgroundColor: 'var(--bg-secondary)',
                borderLeft: isRTL ? 'none' : '1px solid var(--border-color)',
                borderRight: isRTL ? '1px solid var(--border-color)' : 'none',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 999,
                boxShadow: '0 0 50px rgba(0,0,0,0.5)',
              }}
            >
              <div>
                {/* Header inside drawer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <AnasLogo size={36} showText={true} />
                  <button
                    onClick={closeMenu}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-primary)',
                      width: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Nav Links List */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {currentPage === 'home' && navLinks.map((link) => {
                    const isActive = activeSection === link.href.replace('#', '');
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        style={{
                          color: isActive ? 'var(--accent-blue)' : 'var(--text-primary)',
                          backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                          textDecoration: 'none',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          padding: '12px 16px',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          minHeight: '44px',
                          width: '100%',
                        }}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Quick Controls in Drawer */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={toggleLanguage}
                    style={{
                      flex: 1,
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      borderRadius: '12px',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontWeight: 600,
                    }}
                  >
                    <Globe size={18} />
                    <span>{lang === 'en' ? 'العربية' : 'English'}</span>
                  </button>

                  <button
                    onClick={toggleTheme}
                    style={{
                      flex: 1,
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      color: theme === 'dark' ? '#F59E0B' : '#2563EB',
                      borderRadius: '12px',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontWeight: 600,
                    }}
                  >
                    {theme === 'dark' ? <><Sun size={18}/><span>Light</span></> : <><Moon size={18}/><span>Dark</span></>}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1180px) {
          .desktop-clock { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .hide-on-mobile { display: none !important; }
        }
      `}</style>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Scroll to top"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: isRTL ? 'auto' : '24px',
            left: isRTL ? '24px' : 'auto',
            zIndex: 900,
            width: '48px',
            height: '48px',
            minWidth: '44px',
            minHeight: '44px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-blue)',
            color: '#FFFFFF',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 24px var(--accent-blue-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowUp size={22} />
        </button>
      )}
    </>
  );
};
