import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Download, ArrowRight } from 'lucide-react';
import { AnasLogo } from './AnasLogo';
import { MagneticElement } from './MagneticElement';
import { AvailabilityBadge } from './AvailabilityBadge';
import { CountUpNumber } from './CountUpNumber';

export const HomeSection = () => {
  const { t, lang } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const glowRef = useRef(null);

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

  useEffect(() => {
    // Don't add on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    const handleMouseMove = (e) => {
      if (!glowRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const moveX = x * 30; // max ±15px
      const moveY = y * 30;
      glowRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    const section = document.getElementById('home');
    if (section) section.addEventListener('mousemove', handleMouseMove);
    return () => { if (section) section.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  return (
    <section id="home" style={{ display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', justifyContent: 'center', paddingTop: '100px', paddingBottom: '60px' }}>
      {/* Ambient Glows */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '5%',
          right: '5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-blue-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(70px)',
          opacity: 0.5,
          zIndex: 0,
          transition: 'transform 0.1s ease-out',
          willChange: 'transform'
        }}
      />

      <div className="container" style={{ width: '100%', position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '850px',
          }}
        >
          {/* Main Hero Elements Above the Fold */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* Availability Status Badge */}
            <div style={{ marginBottom: '20px' }}>
              <AvailabilityBadge status="available" />
            </div>

            {/* Main Name */}
            <h1
              style={{
                fontSize: 'clamp(2.6rem, 5.8vw, 4.6rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '16px',
                background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--accent-blue) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0px',
                flexWrap: 'wrap',
              }}
            >
              {lang === 'ar' ? (
                'أنس الطرايرة'
              ) : (
                <AnasLogo inlineWord={true} />
              )}
            </h1>

            {/* Typewriter Role Title */}
            <div
              style={{
                fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
                fontWeight: 700,
                color: 'var(--accent-blue)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                minHeight: '2.4rem',
              }}
            >
              <Sparkles size={22} style={{ flexShrink: 0, color: '#38BDF8' }} />
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

            {/* Concise Intro Paragraph */}
            <p
              className="line-clamp-2"
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                maxWidth: '660px',
                marginBottom: '28px',
                lineHeight: 1.6,
              }}
            >
              {t.hero.intro}
            </p>

            {/* Clear Primary & Secondary CTAs Above Fold */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '36px' }}>
              <MagneticElement strength={0.3}>
                <a
                  href="/Anas_AL-Tarayra-CV.pdf?v=2"
                  download="Anas_AL-Tarayra-CV.pdf"
                  className="btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px', fontSize: '1rem', textDecoration: 'none' }}
                >
                  <Download size={18} />
                  <span>{lang === 'ar' ? 'تحميل السيرة الذاتية (CV)' : 'Download CV'}</span>
                </a>
              </MagneticElement>

              <MagneticElement strength={0.3}>
                <a
                  href="#projects"
                  className="btn-outline"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 28px', fontSize: '1rem', textDecoration: 'none' }}
                >
                  <span>{lang === 'ar' ? 'استكشف مشاريعي' : 'Explore Projects'}</span>
                  <ArrowRight size={18} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
                </a>
              </MagneticElement>
            </div>
          </motion.div>

          {/* Tech Stack Pills — Glass Style, Equal Height, Responsive Wrap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ width: '100%', marginBottom: '40px' }}
          >
            <div
              style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                padding: '4px 8px',
                maxWidth: '100%',
                justifyContent: 'center',
              }}
            >
              {[
                { label: '.NET 9 & C#' },
                { label: 'Angular 17+' },
                { label: 'TypeScript' },
                { label: 'SQL Server' },
                { label: 'Figma / UI·UX' },
                { label: 'Vibe Coding' },
                { label: 'REST APIs' },
                { label: 'Photoshop' },
              ].map((tech) => (
                <span
                  key={tech.label}
                  className="tech-pill"
                >
                  {tech.label}
                </span>
              ))}
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
