import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { AnasLogo } from './AnasLogo';
import { AmmanClock } from './AmmanClock';
import { Sun, Moon, Globe, Menu, X, ArrowUp, Zap } from 'lucide-react';

export const Navbar = ({ currentPage, onNavigate }) => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#projects', label: t.nav.projects || (lang === 'ar' ? 'بروجيكتس' : 'Projects') },
    { href: '#services', label: t.nav.services || (lang === 'ar' ? 'خدماتي' : 'Services') },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleNavClick = (e, href) => {
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
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '76px',
          backgroundColor: scrolled ? 'var(--navbar-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
          transition: 'all 300ms ease',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '16px' }}>
          {/* Left Side: Transparent Vector Logo + Name */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <AnasLogo size="sm" />
          </a>

          {/* Center Side: Nav Links Container */}
          {currentPage === 'home' && (
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'rgba(20, 22, 28, 0.45)',
                border: '1px solid var(--border-color)',
                padding: '6px 16px',
                borderRadius: '30px',
                backdropFilter: 'blur(12px)',
                margin: '0 auto',
              }}
              className="desktop-nav"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    whiteSpace: 'nowrap',
                    transition: 'color 200ms ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--accent-blue)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* Right Side Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, marginLeft: currentPage !== 'home' ? 'auto' : '0' }}>
            {/* Live Amman Time */}
            <div className="desktop-clock">
              <AmmanClock />
            </div>

            {/* Start Project Button */}
            {currentPage !== 'start-project' && (
              <button
                className="hide-on-mobile"
                onClick={() => onNavigate('start-project')}
                title={lang === 'ar' ? 'ابدأ مشروعك الآن' : 'Start Your Project'}
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  padding: '6px 16px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
                  transition: 'all 200ms ease',
                }}
              >
                <Zap size={14} />
                <span className="desktop-clock">{lang === 'ar' ? 'ابدأ مشروعك' : 'Start Project'}</span>
              </button>
            )}

            {/* Language Toggle Button */}
            <button
              className="hide-on-mobile"
              onClick={toggleLanguage}
              title="Toggle Language / تغيير اللغة"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                borderRadius: '10px',
                padding: '6px 10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontWeight: 600,
                fontSize: '0.82rem',
                whiteSpace: 'nowrap',
                transition: 'all 200ms ease',
              }}
            >
              <Globe size={15} />
              <span>{lang === 'en' ? 'العربية' : 'EN'}</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              className="hide-on-mobile"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: theme === 'dark' ? '#F59E0B' : '#3B82F6',
                borderRadius: '10px',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 200ms ease',
              }}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                borderRadius: '10px',
                width: '38px',
                height: '38px',
                cursor: 'pointer',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '76px',
              left: 0,
              right: 0,
              backgroundColor: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border-color)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ marginBottom: '8px' }}>
              <AmmanClock />
            </div>
            
            {/* Action Buttons inside Drawer */}
            {currentPage !== 'start-project' && (
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <button
                  onClick={() => { setMobileMenuOpen(false); onNavigate('start-project'); }}
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    flex: 1,
                    justifyContent: 'center',
                  }}
                >
                  <Zap size={16} />
                  <span>{lang === 'ar' ? 'ابدأ مشروعك الآن' : 'Start Your Project'}</span>
                </button>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
              <button
                onClick={toggleLanguage}
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontWeight: 600,
                  flex: 1,
                }}
              >
                <Globe size={16} />
                <span>{lang === 'en' ? 'العربية' : 'EN'}</span>
              </button>

              <button
                onClick={toggleTheme}
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: theme === 'dark' ? '#F59E0B' : '#3B82F6',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontWeight: 600,
                  flex: 1,
                }}
              >
                {theme === 'dark' ? <><Sun size={16}/><span>Light</span></> : <><Moon size={16}/><span>Dark</span></>}
              </button>
            </div>

            {currentPage === 'home' && navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { setMobileMenuOpen(false); handleNavClick(e, link.href); }}
                style={{
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  padding: '8px 0',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        <style>{`
          @media (max-width: 1180px) {
            .desktop-clock { display: none !important; }
          }
          @media (max-width: 1040px) {
            .desktop-nav { display: none !important; }
            .mobile-toggle { display: flex !important; }
          }
          @media (max-width: 768px) {
            .hide-on-mobile { display: none !important; }
          }
        `}</style>
      </header>

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Scroll to top"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: lang === 'ar' ? 'auto' : '30px',
            left: lang === 'ar' ? '30px' : 'auto',
            zIndex: 900,
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-blue)',
            color: '#FFFFFF',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 24px var(--accent-blue-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 200ms ease',
          }}
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
};
