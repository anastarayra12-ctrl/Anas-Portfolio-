import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Home, User, Code, Briefcase, GraduationCap, Mail, Terminal, Calculator, Sun, Moon, Globe, FileText, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export const CmdKModal = ({ onOpenEstimator }) => {
  const { lang, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const actions = [
    { id: 'home', title: lang === 'ar' ? 'الرئيسية' : 'Go to Home', icon: Home, action: () => { window.location.hash = '#home'; setIsOpen(false); } },
    { id: 'about', title: lang === 'ar' ? 'عن أنس' : 'Go to About', icon: User, action: () => { window.location.hash = '#about'; setIsOpen(false); } },
    { id: 'skills', title: lang === 'ar' ? 'المهارات والتقنيات' : 'Go to Skills', icon: Code, action: () => { window.location.hash = '#skills'; setIsOpen(false); } },
    { id: 'projects', title: lang === 'ar' ? 'المشاريع البرمجية' : 'Go to Projects', icon: Briefcase, action: () => { window.location.hash = '#projects'; setIsOpen(false); } },
    { id: 'courses', title: lang === 'ar' ? 'الدورات والتطوير' : 'Go to Courses', icon: GraduationCap, action: () => { window.location.hash = '#courses'; setIsOpen(false); } },
    { id: 'contact', title: lang === 'ar' ? 'تواصل معي' : 'Contact Me', icon: Mail, action: () => { window.location.hash = '#contact'; setIsOpen(false); } },
    { id: 'estimator', title: lang === 'ar' ? 'حاسبة تقدير المشروع' : 'Interactive Project Scope Estimator', icon: Calculator, action: () => { setIsOpen(false); if (onOpenEstimator) onOpenEstimator(); } },
    { id: 'theme', title: theme === 'dark' ? (lang === 'ar' ? 'تغيير إلى الوضع المضيء' : 'Switch to Light Mode') : (lang === 'ar' ? 'تغيير إلى الوضع الداكن' : 'Switch to Dark Mode'), icon: theme === 'dark' ? Sun : Moon, action: () => { toggleTheme(); setIsOpen(false); } },
    { id: 'lang', title: lang === 'ar' ? 'Switch Language to English' : 'تغيير اللغة إلى العربية', icon: Globe, action: () => { toggleLanguage(); setIsOpen(false); } },
  ];

  const filteredActions = actions.filter((act) =>
    act.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '15vh',
            }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 'min(640px, 92vw)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                overflow: 'hidden',
              }}
            >
              {/* Search Bar */}
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <Search size={20} style={{ color: 'var(--accent-blue)' }} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={lang === 'ar' ? 'ابحث أو اختر أمراً (Ctrl + K)...' : 'Type a command or search (Ctrl + K)...'}
                  autoFocus
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                  }}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Action List */}
              <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '12px' }}>
                {filteredActions.length > 0 ? (
                  filteredActions.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={item.action}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          cursor: 'pointer',
                          color: 'var(--text-primary)',
                          transition: 'background 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(59, 130, 246, 0.12)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <IconComp size={18} style={{ color: 'var(--accent-blue)' }} />
                        <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{item.title}</span>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    {lang === 'ar' ? 'لم يتم العثور على نتائج' : 'No matching commands found'}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'rgba(0,0,0,0.15)',
                  borderTop: '1px solid var(--border-color)',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>Navigation Command Palette</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
