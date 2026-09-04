import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Home, User, Briefcase, Star, Code2, Mail, 
  Download, Copy, Sun, Moon, Globe, ExternalLink, X, ChevronRight 
} from 'lucide-react';
import useAppStore from '../store/useAppStore';

export const CmdKModal = () => {
  const { lang, setLang, theme, setTheme } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('anastarayra12@gmail.com');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const dispatchCaseStudy = (slug) => {
    const event = new CustomEvent('navigate-case-study', { detail: { slug } });
    window.dispatchEvent(event);
  };

  const items = [
    // Navigation
    { id: 'nav-home', group: 'Navigation', label: 'Home', icon: Home, action: () => { window.location.hash = '#home'; setIsOpen(false); }, keywords: ['home', 'start'] },
    { id: 'nav-about', group: 'Navigation', label: 'About Me', icon: User, action: () => { window.location.hash = '#about'; setIsOpen(false); }, keywords: ['about', 'me', 'profile'] },
    { id: 'nav-experience', group: 'Navigation', label: 'Experience', icon: Briefcase, action: () => { window.location.hash = '#experience'; setIsOpen(false); }, keywords: ['experience', 'work', 'job'] },
    { id: 'nav-skills', group: 'Navigation', label: 'Skills & Courses', icon: Star, action: () => { window.location.hash = '#skills'; setIsOpen(false); }, keywords: ['skills', 'courses', 'education'] },
    { id: 'nav-projects', group: 'Navigation', label: 'Projects', icon: Code2, action: () => { window.location.hash = '#projects'; setIsOpen(false); }, keywords: ['projects', 'portfolio', 'work'] },
    { id: 'nav-contact', group: 'Navigation', label: 'Contact', icon: Mail, action: () => { window.location.hash = '#contact'; setIsOpen(false); }, keywords: ['contact', 'email', 'message'] },
    
    // Quick Actions
    { id: 'act-cv', group: 'Quick Actions', label: 'Download CV', icon: Download, action: () => { window.open('/Anas_AL-Tarayra-CV.pdf?v=2', '_blank'); setIsOpen(false); }, keywords: ['cv', 'resume', 'download'] },
    { id: 'act-copy', group: 'Quick Actions', label: 'Copy Email', icon: Copy, action: handleCopyEmail, keywords: ['copy', 'email', 'contact'] },
    { id: 'act-theme', group: 'Quick Actions', label: 'Toggle Dark/Light', icon: theme === 'dark' ? Sun : Moon, action: () => { setTheme(theme === 'dark' ? 'light' : 'dark'); }, keywords: ['theme', 'dark', 'light', 'mode', 'toggle'] },
    { id: 'act-lang', group: 'Quick Actions', label: 'Switch to Arabic/English', icon: Globe, action: () => { setLang(lang === 'en' ? 'ar' : 'en'); }, keywords: ['language', 'arabic', 'english', 'switch', 'translate'] },
    
    // Projects
    { id: 'proj-uvp', group: 'Projects', label: 'Ultimate Vibe Portfolio', icon: ExternalLink, action: () => { dispatchCaseStudy('ultimate-vibe-portfolio'); setIsOpen(false); }, keywords: ['ultimate', 'vibe', 'portfolio', 'project'] },
    { id: 'proj-ecommerce', group: 'Projects', label: 'E-Commerce Dashboard', icon: ExternalLink, action: () => { dispatchCaseStudy('ecommerce-dashboard'); setIsOpen(false); }, keywords: ['ecommerce', 'dashboard', 'project'] },
    { id: 'proj-chat', group: 'Projects', label: 'Real-time Chat App', icon: ExternalLink, action: () => { dispatchCaseStudy('realtime-chat'); setIsOpen(false); }, keywords: ['realtime', 'chat', 'app', 'project'] },
    { id: 'proj-fintech', group: 'Projects', label: 'Fintech Mobile App', icon: ExternalLink, action: () => { dispatchCaseStudy('fintech-app'); setIsOpen(false); }, keywords: ['fintech', 'mobile', 'app', 'project'] }
  ];

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(search.toLowerCase()) || 
    item.keywords.some(kw => kw.includes(search.toLowerCase()))
  ).slice(0, 20);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleModalKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].action();
      }
    };

    window.addEventListener('keydown', handleModalKeyDown);
    return () => window.removeEventListener('keydown', handleModalKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      const selectedEl = scrollRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, isOpen]);

  // Group items
  const groups = filteredItems.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  let globalIndex = 0;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '10vh',
              backgroundColor: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(12px)',
            }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.18 }}
              style={{
                width: 'min(620px, 92vw)',
                background: 'rgba(15,15,20,0.95)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '80vh',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                position: 'relative'
              }}>
                <Search size={20} color="rgba(255,255,255,0.5)" />
                <input
                  ref={inputRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type a command or search..."
                  style={{
                    flex: 1,
                    height: '52px',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#fff',
                    fontSize: '1rem',
                    padding: '0 16px',
                  }}
                />
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.4)',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '4px 8px',
                  borderRadius: '6px',
                }}>
                  ESC
                </div>
              </div>

              <div 
                ref={scrollRef}
                style={{
                  overflowY: 'auto',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                {filteredItems.length === 0 ? (
                  <div style={{ padding: '32px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                    No results found.
                  </div>
                ) : (
                  Object.entries(groups).map(([groupName, groupItems]) => (
                    <div key={groupName} style={{ marginBottom: '8px' }}>
                      <div style={{
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'rgba(255,255,255,0.4)',
                        padding: '8px 16px 4px',
                        fontWeight: 600,
                      }}>
                        {groupName}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {groupItems.map((item) => {
                          const currentIndex = globalIndex++;
                          const isSelected = currentIndex === selectedIndex;
                          const Icon = item.icon;
                          
                          return (
                            <div
                              key={item.id}
                              data-index={currentIndex}
                              onClick={() => item.action()}
                              onMouseEnter={() => setSelectedIndex(currentIndex)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px 16px',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                background: isSelected ? 'rgba(59,130,246,0.15)' : 'transparent',
                                borderLeft: isSelected ? '3px solid #3b82f6' : '3px solid transparent',
                                color: isSelected ? '#fff' : 'rgba(255,255,255,0.8)',
                                transition: 'all 0.1s ease',
                              }}
                            >
                              <Icon size={16} style={{ marginRight: '12px', opacity: isSelected ? 1 : 0.7 }} />
                              <span style={{ flexGrow: 1, fontSize: '0.9rem' }}>{item.label}</span>
                              <span style={{ 
                                fontSize: '0.7rem', 
                                color: 'rgba(255,255,255,0.4)', 
                                background: 'rgba(255,255,255,0.05)',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                marginRight: isSelected ? '12px' : '0'
                              }}>
                                {item.group}
                              </span>
                              {isSelected && (
                                <span style={{
                                  fontSize: '1rem',
                                  color: 'rgba(255,255,255,0.5)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  lineHeight: 1
                                }}>
                                  ↵
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div style={{
                padding: '8px 16px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.4)',
                background: 'rgba(0,0,0,0.2)'
              }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>↑↓</span> to navigate
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>↵</span> to select
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '50%',
              background: '#3b82f6',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              zIndex: 10000,
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            Email copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
