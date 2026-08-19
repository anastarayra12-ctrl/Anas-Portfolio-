import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Play, Sparkles, Terminal, Code2, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';
import { Button } from '../components/ui/button';
import profilePhoto from '../assets/anas_profile.png';

export const Hero = () => {
  const { t } = useLanguage();
  const [codeTyped, setCodeTyped] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [photoRevealed, setPhotoRevealed] = useState(false);

  const fullCodeText = `const developer = {
  name: "Anas Tarayra",
  role: "Vibe Coder / UI-UX Designer",
  location: "Amman, Jordan",
  passion: "Turning ideas into practical, elegant projects",
  status: "Available for work"
};`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullCodeText.length) {
        setCodeTyped(fullCodeText.slice(0, index));
        index++;
      } else {
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const handleRunCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setPhotoRevealed(true);
    }, 900);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home">
      {/* Background Neon Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-[150px] pointer-events-none -z-10 animate-orb" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* Left Column (55%) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start rtl:items-end text-left rtl:text-right space-y-5"
          >
            {/* 1. Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold tracking-widest uppercase">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>HELLO WORLD! I AM</span>
            </div>

            {/* 2. Availability Badge (Separate Line Above H1) */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>{t.hero.availability}</span>
            </div>

            {/* 3. Main H1 Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
              {t.hero.name}
            </h1>

            {/* 4. Subtitle */}
            <p className="text-xl sm:text-2xl font-bold text-[#3B82F6]">
              {t.hero.title}
            </p>

            {/* 5. Tagline Box */}
            <div className="p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] max-w-xl">
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-medium">
                "{t.hero.tagline}"
              </p>
            </div>

            {/* 6. CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => scrollTo('courses')}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              >
                <span>{t.hero.ctaProjects}</span>
                <ArrowRight className="w-4 h-4 rtl-flip group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] font-semibold text-xs border border-[var(--border-subtle)] hover:border-blue-500 transition-all duration-200 cursor-pointer"
              >
                <span>{t.hero.ctaContact}</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Code Editor Panel (45%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="ui-card overflow-hidden font-mono text-xs text-gray-200 border-blue-500/20">

              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                </div>
                <div className="flex items-center gap-2 text-[var(--text-secondary)] text-xs font-semibold">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span>developer.config.js</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                  JS
                </span>
              </div>

              {/* Live Code Area */}
              <div className="p-5 sm:p-6 min-h-[210px] relative font-mono leading-relaxed bg-[#0D0F14] text-left" dir="ltr">
                <pre className="whitespace-pre-wrap break-words text-gray-300">
                  {codeTyped}
                  {!isTypingDone && (
                    <span className="inline-block w-2 h-4 ml-1 bg-blue-400 animate-pulse" />
                  )}
                </pre>

                {/* Run Code Button */}
                <AnimatePresence>
                  {isTypingDone && !photoRevealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="mt-5 flex justify-end"
                    >
                      <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-sans font-bold text-xs shadow-md shadow-emerald-500/25 transition-all active:scale-95 disabled:opacity-75 cursor-pointer"
                      >
                        {isRunning ? (
                          <>
                            <Sparkles className="w-4 h-4 animate-spin" />
                            <span>{t.hero.running}</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-white" />
                            <span>{t.hero.runCode}</span>
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Photo Reveal Output */}
              <AnimatePresence>
                {photoRevealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.5 }}
                    className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-4 sm:p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between text-emerald-400 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        <span className="font-bold">{t.hero.consoleTitle}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3 h-3" />
                        {t.hero.executedSuccess}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] flex flex-col sm:flex-row items-center gap-4 text-left rtl:text-right font-sans shadow-md">
                      <img
                        src={profilePhoto}
                        alt="Anas Tarayra"
                        className="w-22 h-22 sm:w-26 sm:h-26 rounded-xl object-cover border-2 border-[#3B82F6] shadow-md shrink-0"
                      />
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-[var(--text-primary)]">Anas Tarayra</h3>
                        <p className="text-xs font-mono text-[#3B82F6] font-semibold">Vibe Coder / UI-UX Designer</p>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          Al-Zaytoonah University of Jordan — Software Engineering Student
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};