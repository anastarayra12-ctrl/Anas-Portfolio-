import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, MessageSquareHeart, Download, Sparkles, Terminal, CheckCircle2, Eye, Quote } from 'lucide-react';
import { CvModal } from './CvModal';

export const AboutSection = () => {
  const { t, lang } = useLanguage();
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  const highlights = [
    lang === 'ar' ? 'تخصص هندسة برمجيات في جامعة الزيتونة الأردنية' : 'Software Engineering Major @ Alzaytoonah University',
    lang === 'ar' ? 'تصميم واجهات وتجارب مستخدم متكاملة (UI/UX & Figma Systems)' : 'UI/UX Architecture & Interactive Figma Systems',
    lang === 'ar' ? 'تطوير خلفي متقدم C# و ASP.NET Core Web API' : 'Advanced Backend Dev C# & ASP.NET Core Web API',
    lang === 'ar' ? 'بناء تطبيقات تفاعلية متجاوبة وعالية الأداء' : 'Responsive High-Performance Full-Stack Apps',
  ];

  return (
    <>
      <section id="about" style={{ backgroundColor: 'var(--bg-secondary)', transition: 'background-color 250ms ease' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '64px' }}
          >
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '12px' }}>
              {t.about.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              {t.about.subtitle}
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '32px', alignItems: 'stretch' }}>
            {/* Left Column: Overview Box (Equal Height) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card"
              style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', color: 'var(--accent-blue)' }}>
                  <Terminal size={26} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{lang === 'ar' ? 'نبذة عني (Overview)' : 'Overview'}</h3>
                </div>

                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '28px' }}>
                  {t.about.bio}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {highlights.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                      <CheckCircle2 size={18} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CV Action Buttons */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: 'auto' }}>
                <button
                  onClick={() => setIsCvModalOpen(true)}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <Eye size={18} />
                  <span>{lang === 'ar' ? 'معاينة السيرة الذاتية' : 'Preview CV'}</span>
                </button>

                <button
                  onClick={() => setIsCvModalOpen(true)}
                  className="btn-outline"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <Download size={18} />
                  <span>{t.about.downloadCv}</span>
                </button>
              </div>
            </motion.div>

            {/* Right Column: Stacked 2 Cards (Top: Education, Bottom: Personal Message) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%', justifyContent: 'space-between' }}
            >
              {/* Card 1 (Top): Education */}
              <div
                className="glass-card"
                style={{ padding: '30px', borderLeft: '4px solid var(--accent-blue)', flex: 1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(59, 130, 246, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-blue)',
                    }}
                  >
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                      {lang === 'ar' ? 'التعليم والأكاديميا (Education)' : 'Education & Degree'}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Alzaytoonah University of Jordan</span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    padding: '16px 18px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Sparkles size={16} style={{ color: 'var(--accent-blue)' }} />
                    <h5 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                      {t.about.university}
                    </h5>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {lang === 'ar'
                      ? 'دراسة متخصصة في هندسة البرمجيات، تتضمن أنماط التصميم (Design Patterns)، خوارزميات قواعد البيانات، وتطوير الأنظمة الرقمية.'
                      : 'Specialized in Software Engineering methodologies, OOP design patterns, and full-stack system architecture.'}
                  </p>
                </div>
              </div>

              {/* Card 2 (Bottom): Message from Anas (رسالتي لكم) */}
              <div
                className="glass-card"
                style={{ padding: '30px', borderLeft: '4px solid var(--accent-green)', flex: 1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-green)',
                    }}
                  >
                    <MessageSquareHeart size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                      {lang === 'ar' ? 'رسالتي لكم (Personal Message)' : 'A Message From Anas'}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 600 }}>Vision & Passion</span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    padding: '18px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    position: 'relative',
                  }}
                >
                  <Quote size={24} style={{ color: 'var(--accent-green)', opacity: 0.3, marginBottom: '8px' }} />
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.6, fontStyle: 'italic', fontWeight: 500 }}>
                    {lang === 'ar'
                      ? 'أؤمن بأن التكنولوجيا الحقيقية هي التي تجمع بين دقة الهندسة وجمال الفن البصري. كل سطر كود وكل واجهة أصممها أضع فيها شغفي الكامل لتكون تجربة استثنائية تخدم رؤية مشروعاتكم بنجاح.'
                      : 'I strongly believe that true technology connects engineering precision with aesthetic visual design. Every line of code and interface I craft is built with passion to deliver exceptional value.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Live CV Preview Modal */}
      <CvModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} />
    </>
  );
};


