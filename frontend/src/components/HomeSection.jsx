import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Play, Sparkles, Code, Download, ArrowRight, User, Volume2, VolumeX, Terminal, RefreshCw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const HomeSection = () => {
  const { t, lang } = useLanguage();
  const [typedCode, setTypedCode] = useState('');
  const [isExecuted, setIsExecuted] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Exact Typewriter roles requested by user
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

  // Typewriter Loop Effect
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

  const fullCode = `const developer = {
  name: "Anas Al-Tarayrah",
  title: "Full-Stack Developer & UI/UX Specialist",
  stack: [".NET Core", "Angular", "SQL Server"],
  design: ["Figma Wireframes", "Photoshop", "Prototypes"],
  status: "Open for High-Impact Projects"
};`;

  // Sound click effect
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      // Ignore audio context errors
    }
  };

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullCode.length) {
        setTypedCode(fullCode.slice(0, index + 1));
        playClickSound();
        index++;
      } else {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  const handleRunCode = () => {
    setIsExecuting(true);
    setTerminalLogs(['> Compiling developer profile...']);

    setTimeout(() => {
      setTerminalLogs((prev) => [...prev, '> Loading AI Developer Portrait Showcase...']);
    }, 250);

    setTimeout(() => {
      setIsExecuting(false);
      setIsExecuted(true);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#10B981', '#60A5FA', '#818CF8'],
      });
    }, 500);
  };

  return (
    <section id="home" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
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

      <div className="container" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Bio & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Status Badge */}
            <div className="status-badge">
              <span className="pulse-dot" />
              <span>{t.hero.status}</span>
            </div>

            {/* Main Name */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '16px',
              }}
            >
              {lang === 'ar' ? 'أنس الطرايرة' : 'Anas Al-Tarayrah'}
            </h1>

            {/* Typewriter Role Title */}
            <div
              style={{
                fontSize: 'clamp(1.1rem, 2.3vw, 1.4rem)',
                fontWeight: 700,
                color: 'var(--accent-blue)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                minHeight: '2.2rem',
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

            {/* Intro Paragraph */}
            <p
              style={{
                fontSize: '1.08rem',
                color: 'var(--text-secondary)',
                maxWidth: '540px',
                marginBottom: '36px',
                lineHeight: 1.7,
              }}
            >
              {t.hero.intro}
            </p>

            {/* Home CTAs: Button 1 = Download CV, Button 2 = Services & Solutions */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {/* Button 1: Download CV */}
              <a
                href="/cv.pdf"
                download="Anas_Tarayrah_CV.pdf"
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <Download size={18} />
                <span>{lang === 'ar' ? 'تحميل السيرة الذاتية (CV)' : 'Download CV'}</span>
              </a>

              {/* Button 2: Services & Solutions */}
              <a
                href="#courses"
                className="btn-outline"
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <span>{lang === 'ar' ? 'الخدمات والحلول' : 'Services & Solutions'}</span>
                <ArrowRight size={18} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Code Editor OR Large Developer Portrait Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ width: '100%' }}
          >
            <div
              className="glass-card"
              style={{
                overflow: 'hidden',
                backgroundColor: 'var(--code-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '24px',
                minHeight: '440px',
                position: 'relative',
              }}
            >
              {/* Window Header Bar */}
              <div
                style={{
                  padding: '14px 20px',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#EF4444' }} />
                  <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                  <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10B981' }} />
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Code size={15} />
                  <span>{isExecuted ? 'Anas_Portrait_Showcase.png' : t.hero.codeTitle}</span>
                </div>

                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  title={soundEnabled ? 'Mute typing audio' : 'Enable typing sound'}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: soundEnabled ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '2px',
                  }}
                >
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
              </div>

              {/* View 1: Code Editor Workspace */}
              {!isExecuted && (
                <div style={{ padding: '24px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', minHeight: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <pre style={{ margin: 0, color: 'var(--text-primary)', whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.6 }}>
                      <code>{typedCode}</code>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '1.1em',
                          backgroundColor: 'var(--accent-blue)',
                          verticalAlign: 'text-bottom',
                          marginLeft: '3px',
                          animation: 'blink 900ms infinite',
                        }}
                      />
                    </pre>

                    {/* Terminal Execution Logs */}
                    {terminalLogs.length > 0 && (
                      <div
                        style={{
                          marginTop: '18px',
                          padding: '12px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(0, 0, 0, 0.45)',
                          border: '1px solid var(--border-color)',
                          fontSize: '0.8rem',
                          color: 'var(--accent-green)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                        }}
                      >
                        {terminalLogs.map((log, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Terminal size={12} />
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Run Code Button at Bottom Center */}
                  <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
                    <motion.button
                      onClick={handleRunCode}
                      disabled={isExecuting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary"
                      style={{
                        padding: '12px 32px',
                        fontSize: '0.95rem',
                        borderRadius: '14px',
                        boxShadow: '0 8px 24px var(--accent-blue-glow)',
                      }}
                    >
                      <Play size={18} />
                      <span>{isExecuting ? (lang === 'ar' ? 'جاري التشغيل...' : 'Executing...') : (lang === 'ar' ? 'تشغيل الكود' : 'Run Code')}</span>
                    </motion.button>
                  </div>
                </div>
              )}

              {/* View 2: Large Vertical Developer Portrait Showcase Card (3:4 Ratio) */}
              {isExecuted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: 'relative',
                    height: '540px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                  }}
                >
                  {/* Vertical Personal Portrait Background Image */}
                  <img
                    src="/anas_vertical_portrait.jpg"
                    alt="Anas Al-Tarayrah Vertical Developer Portrait"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      filter: 'contrast(1.05) brightness(0.95)',
                    }}
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.35) 55%, transparent 100%)',
                    }}
                  />

                  {/* Floating Action Badge & Info */}
                  <div style={{ position: 'relative', zIndex: 10, padding: '24px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                          {lang === 'ar' ? 'أنس الطرايرة' : 'Anas Al-Tarayrah'}
                        </h3>
                        <CheckCircle2 size={20} style={{ color: 'var(--accent-green)' }} />
                      </div>
                      <p style={{ fontSize: '0.88rem', color: '#E5E7EB', margin: 0, fontWeight: 500 }}>
                        {lang === 'ar' ? 'طالب هندسة برمجيات & مطور Full-Stack ومصمم UI/UX' : 'Software Engineering Student & Full-Stack .NET Developer'}
                      </p>
                    </div>

                    <button
                      onClick={() => setIsExecuted(false)}
                      style={{
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        color: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '10px 18px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                      }}
                      title="Return to Code Editor"
                    >
                      <RefreshCw size={15} />
                      <span>{lang === 'ar' ? 'إعادة تشغيل الكود' : 'Reset Code'}</span>
                    </button>
                  </div>
                </motion.div>
              )}
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

