import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Briefcase, Rocket, Eye, X } from 'lucide-react';

export const IntroQuestionModal = () => {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const answered = sessionStorage.getItem('anas_intro_answered');
    if (!answered) {
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelect = (choice) => {
    sessionStorage.setItem('anas_intro_answered', choice);
    setIsOpen(false);

    if (choice === 'hiring') {
      window.location.hash = '#experience';
    } else if (choice === 'client') {
      window.location.hash = '#projects';
    } else if (choice === 'dev') {
      window.location.hash = '#skills';
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem('anas_intro_answered', 'dismissed');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(500px, 92vw)',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <button
              onClick={handleDismiss}
              style={{
                position: 'absolute',
                top: '16px',
                right: lang === 'ar' ? 'auto' : '16px',
                left: lang === 'ar' ? '16px' : 'auto',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px' }}>
              <Sparkles size={16} />
              <span>{lang === 'ar' ? 'مرحباً بك في موقع أنس' : 'Welcome to Anas Portfolio'}</span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>
              {lang === 'ar' ? 'ما هدف زيارتك اليوم؟' : 'What Brings You Here Today?'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              {lang === 'ar' ? 'اختر هدفك لتوجيهك مباشرة للقسم الأكثر أهمية لك.' : 'Select your goal to navigate straight to the relevant content.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => handleSelect('hiring')}
                className="btn-outline"
                style={{ justifyContent: 'flex-start', padding: '14px 18px', borderRadius: '14px', gap: '12px' }}
              >
                <Briefcase size={18} style={{ color: 'var(--cat-work)' }} />
                <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                  {lang === 'ar' ? 'أبحث عن مبرمج للتوظيف (Recruiter / Hiring)' : 'Looking to Hire (Recruiter / HR)'}
                </span>
              </button>

              <button
                onClick={() => handleSelect('client')}
                className="btn-outline"
                style={{ justifyContent: 'flex-start', padding: '14px 18px', borderRadius: '14px', gap: '12px' }}
              >
                <Rocket size={18} style={{ color: 'var(--accent-green)' }} />
                <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                  {lang === 'ar' ? 'أريد مشروع خاص أو استشارة (Client / Project)' : 'Need a Project or App (Client)'}
                </span>
              </button>

              <button
                onClick={() => handleSelect('dev')}
                className="btn-outline"
                style={{ justifyContent: 'flex-start', padding: '14px 18px', borderRadius: '14px', gap: '12px' }}
              >
                <Eye size={18} style={{ color: 'var(--accent-purple)' }} />
                <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                  {lang === 'ar' ? 'مطور أو مهتم بالاطلاع على الكود (Dev / Browsing)' : 'Developer / Just Browsing'}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
