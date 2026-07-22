import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Download, ArrowRight } from 'lucide-react';

export const HomeSection = () => {
  const { t, lang } = useLanguage();

  const rolesList = lang === 'ar' ? [
    'Full-Stack Developer (.NET & Angular)',
    'Vibe Coder',
    'مصمم UI/UX (Wireframes & Interactive Prototypes)',
    'Graphic Designer',
  ] : [
    'Full-Stack Developer (.NET & Angular)',
    'Vibe Coder',
    'UI/UX Designer (Wireframes & Interactive Prototypes)',
    'Graphic Designer',
  ];

  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeletingRole, setIsDeletingRole] = useState(false);

  useEffect(() => {
    const currentRole = rolesList[roleIndex % rolesList.length];
    let timer;

    if (!isDeletingRole) {
      if (roleText.length < currentRole.length) {
        timer = setTimeout(() => {
          setRoleText(currentRole.slice(0, roleText.length + 1));
        }, 65);
      } else {
        timer = setTimeout(() => {
          setIsDeletingRole(true);
        }, 1800);
      }
    } else {
      if (roleText.length > 0) {
        timer = setTimeout(() => {
          setRoleText(currentRole.slice(0, roleText.length - 1));
        }, 30);
      } else {
        setIsDeletingRole(false);
        setRoleIndex((prev) => prev + 1);
      }
    }

    return () => clearTimeout(timer);
  }, [roleText, isDeletingRole, roleIndex, lang]);

  return (
    <section id="home" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', justifyContent: 'center' }}>
      {/* Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-blue-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      <div className="container" style={{ width: '100%', position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* Status Badge */}
            <div className="status-badge" style={{ marginBottom: '24px' }}>
              <span className="pulse-dot" />
              <span>{t.hero.status}</span>
            </div>

            {/* Main Name */}
            <h1
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '20px',
              }}
            >
              {lang === 'ar' ? 'أنس الطرايرة' : 'Anas Al-Tarayrah'}
            </h1>

            {/* Typewriter Role Title */}
            <div
              style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                fontWeight: 700,
                color: 'var(--accent-blue)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                minHeight: '2.5rem',
              }}
            >
              <Sparkles size={24} style={{ flexShrink: 0, color: '#38BDF8' }} />
              <span style={{ fontFamily: 'var(--font-heading)' }}>{roleText}</span>
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '1.2em',
                  backgroundColor: 'var(--accent-blue)',
                  marginLeft: '2px',
                  borderRadius: '2px',
                  animation: 'blink 800ms infinite',
                }}
              />
            </div>

            {/* Intro Paragraph */}
            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-secondary)',
                maxWidth: '640px',
                marginBottom: '40px',
                lineHeight: 1.7,
              }}
            >
              {t.hero.intro}
            </p>

            {/* Home CTAs */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href="/cv.pdf"
                download="Anas_Tarayrah_CV.pdf"
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px', fontSize: '1rem' }}
              >
                <Download size={20} />
                <span>{lang === 'ar' ? 'تحميل السيرة الذاتية (CV)' : 'Download CV'}</span>
              </a>

              <a
                href="#courses"
                className="btn-outline"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px', fontSize: '1rem' }}
              >
                <span>{lang === 'ar' ? 'الخدمات والحلول' : 'Services & Solutions'}</span>
                <ArrowRight size={20} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

